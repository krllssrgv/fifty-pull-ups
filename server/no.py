# Home
@app.route('/', methods=['GET', 'POST'])
@login_required
def main():
    user_role = int(db.session.get(users, int(current_user.get_id())).role)
    if request.method == 'POST':
        filter_date = datetime.datetime.fromtimestamp((int(request.json['date'])/1000.0)).date()
        filter_date_2 = datetime.datetime.fromtimestamp((int(request.json['date'])/1000.0) + 24 * 60 * 60).date()
        data_meetings = meetings.query.filter(meetings.date >= filter_date).filter(meetings.date < filter_date_2).order_by(meetings.date).all()
        
        list_of_objects_of_meetings = []
        for element in data_meetings:
            current_meeting = {
                'title': element.title,
                'owner': element.owner,
                'date': str(element.date.year) + '.' + str(element.date.month) + '.' + str(element.date.day),
                'time': element.time,
                'classroom': element.classroom,
                'status': element.status,
                'descr': element.descr
            }
            list_of_objects_of_meetings.append(copy.deepcopy(current_meeting))
            del current_meeting

        meetings_to_sent = {}
        for i in range(0, len(list_of_objects_of_meetings)):
            meetings_to_sent[i] = list_of_objects_of_meetings[i]
        
        return jsonify(list_of_objects_of_meetings)
    
    else:
        return render_template('main.html', user_role=user_role)
    


# Control meetings
@app.route('/meetings', methods=['POST', 'GET'])
@login_required
def meeting():
    user_role = int(db.session.get(users, int(current_user.get_id())).role)
    if user_role > 1:
        today = datetime.datetime.today().date()

        if (today.month < 10) and (today.day < 10):
            data_today = f'{today.year}-0{today.month}-0{today.day}'
        elif (today.month < 10) and (today.day > 10):
            data_today = f'{today.year}-0{today.month}-{today.day}'
        elif (today.month > 10) and (today.day < 10):
            data_today = f'{today.year}-{today.month}-0{today.day}'
        else:
            data_today = f'{today.year}-{today.month}-{today.day}'

        data_classrooms = classrooms.query.all()
        data_meetings = meetings.query.filter(meetings.owner == int(current_user.get_id())).order_by(meetings.date).all()

        if request.method == 'POST':
            data = request.json

            if data['type'] == 'createMeeting':
                owner = int(current_user.get_id())
                title = data['title']
                time = data['time']
                date = datetime.datetime.fromtimestamp(int(data['date'])/1000.0)
                classroom = data['classroom']
                descr = data['descr']
                members = data['members']
                
                new_meeting = meetings(owner=owner, title=title, date=date, time=time, classroom=classroom, descr=descr)

                try:
                    db.session.add(new_meeting)
                    db.session.commit()
                    return jsonify({'status': '200'})
                except:
                    return jsonify({'status': '500'})
                
            elif data['type'] == 'getClassroomTimetable':
                pass
        else:
            return render_template('meetings.html', data_meetings=data_meetings, data_classrooms=data_classrooms, data_today=data_today)
    else:
        return redirect(url_for('main'))


@app.route('/meeting<int:id>', methods=['POST', 'GET'])
@login_required
def meet(id):
    user_role = int(db.session.get(users, int(current_user.get_id())).role)
    if user_role > 1:
        today = datetime.datetime.today().date()
        
        if (today.month < 10) and (today.day < 10):
            data_today = f'{today.year}-0{today.month}-0{today.day}'
        elif (today.month < 10) and (today.day > 10):
            data_today = f'{today.year}-0{today.month}-{today.day}'
        elif (today.month > 10) and (today.day < 10):
            data_today = f'{today.year}-{today.month}-0{today.day}'
        else:
            data_today = f'{today.year}-{today.month}-{today.day}'

        data_classrooms = classrooms.query.all()

        meeting = db.session.get(meetings, id)
        meeting_copy = copy.deepcopy(meeting)
        meeting_copy.date = int(meeting.date.timestamp() * 1000)

        if request.method == 'POST':
            data = request.json
            if data['act'] == 'change':
                meeting.title = data['title']
                meeting.date = datetime.datetime.fromtimestamp(int(data['date'])/1000.0)
                meeting.classroom = data['classroom']
                meeting.status = data['status']
                meeting.descr = data['descr']
                
                try:
                    db.session.commit()
                    return jsonify({'status': '200'})
                except:
                    return jsonify({'status': '500'})
                
            elif data['act'] == 'delete':
                try:
                    db.session.delete(meeting)
                    db.session.commit()
                    return jsonify({'status': '200', 'url': url_for('meeting')})
                except:
                    return jsonify({'status': '500'})
            
        else:
            return render_template('meet.html', meeting=meeting_copy, data_today=data_today, data_classrooms=data_classrooms)
    else:
        return redirect(url_for('main'))
    



# Profile
@app.route('/profile')
@login_required
def profile():
    user = db.session.get(users, int(current_user.get_id()))
    return render_template('profile.html', user=user)



class meetings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    time = db.Column(db.String, nullable=False)
    status = db.Column(db.String, nullable=False, default='Запланирована')
    descr = db.Column(db.Text, nullable=False)
    members = db.Column(db.LargeBinary)

    def __repr__(self):
        return '<meetings %r>' % self.id
    






















# Serve
@app.route('/', defaults={'path': ''})
@app.route('/<path>')
@login_required
def serve(path):
    if (path != "") and (os.path.exists(os.path.join(app.static_folder, path))):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
    
















# This Python file uses the following encoding: utf-8
import os
import sys

from flask import Flask, request, send_from_directory, Blueprint, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, upgrade, init, migrate
from flask_login import LoginManager, login_user, UserMixin, current_user, logout_user
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

from flask_cors import CORS
from flask_restx import Api, Resource, Namespace, fields

import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta

from data import Data
from apscheduler.schedulers.background import BackgroundScheduler


# App
app = Flask(__name__, static_folder='build', static_url_path='')
app.config['SECRET_KEY'] = '8f42a73054b1749f8f58848be5e6502c'
app.config['JWT_SECRET_KEY'] = 'cicdcc3ddndjnfjcicmcdkcm'
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_CSRF_PROTECT'] = True


CORS(app, supports_credentials=True, origins=["http://localhost:3000"])


# JWT
jwt = JWTManager(app)


# API
api_bp = Blueprint('API', __name__, url_prefix='/api')
api = Api(api_bp)
user_api = Namespace('user')
act_api = Namespace('act')
api.add_namespace(act_api, path='/act')
api.add_namespace(user_api, path='/user')

app.register_blueprint(api_bp)


# Login
login_manager = LoginManager(app)
login_manager.login_view = 'log'


# DataBase
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

@app.cli.command("init-db")
def init_db():
    init()
    migrate()
    upgrade()


class users(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(30), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    surname = db.Column(db.String(40), nullable=False)
    
    current_week = db.Column(db.Integer, nullable=False, default=0)
    day_one = db.Column(db.Boolean, nullable=False, default=False)
    day_two = db.Column(db.Boolean, nullable=False, default=False)
    day_three = db.Column(db.Boolean, nullable=False, default=False)
    success = db.Column(db.String(2), nullable=False, default='')

    def __repr__(self):
        return '<users %r>' % self.id



# @login_manager.user_loader
# def load_user(user_id):
#     return db.session.get(users, user_id)


@login_manager.user_loader
def load_user(user_id):
    return users.query.get(int(user_id))


# Models
user_login_model = user_api.model('user_login', {
    'email': fields.String(required=True, description='Email'),
    'password': fields.String(required=True, description='Password')
})



# API
@user_api.route('/register')
class Register(Resource):
    def post(self):
        if (current_user.is_authenticated):
            return '', 403
        else:
            data = request.json
            check = True
            result = {}

            if (users.query.filter(users.email == data['email']).all()):
                check = False
                result['email'] = 'Пользователь уже существует'

            if (len(data['password']) < 6):
                check = False
                result['password'] = 'Минимальная длина 6 символов'

            if (data['password'] != data['repeatedPassword']):
                check = False
                result['repeatedPassword'] = 'Пароли не совпадают'

            if check:
                new_user = users(
                    email=data['email'],
                    password=generate_password_hash(data['password']),
                    name=data['name'],
                    surname=data['surname']
                )
                try:
                    db.session.add(new_user)
                    db.session.commit()
                    return '', 204
                except:
                    return '', 500
            else:
                return result, 400


@user_api.route('/login')
class Login(Resource):
    @user_api.header('Access-Control-Allow-Credentials', 'true')
    @user_api.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    @user_api.expect(user_login_model)
    def post(self):
        if (current_user.is_authenticated):
            return '', 400
        else:
            data = request.json
            user = users.query.filter_by(email=data['email']).first()

            if user:
                if check_password_hash(user.password, data['password']):
                    access_token = create_access_token(identity={'user_id': user.id})
                    print(access_token)
                    return '', 200, {'Set-Cookie': f'access_token_cookie={access_token}; HttpOnly; SameSite=None; Secure=False; Path=/; Max-Age={int(timedelta(days=30).total_seconds())}'}
                else:
                    return {'password': 'Неправильный пароль'}, 401
            else:
                return {'email': 'Нет такого пользователя'}, 401


@user_api.route('/logout')
class Logout(Resource):
    def post(self):
        logout_user()
        return '', 200
    

@user_api.route('/check_login')
class CheckLogin(Resource):
    @jwt_required()
    def get(self):
        # if (current_user.is_authenticated):
        #     return '', 200
        # else:
        #     return '', 401
        user = get_jwt_identity()
        print(user)
        return '', 401
        

# response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
# response.headers['Access-Control-Allow-Credentials'] = 'true'


@act_api.route('/get_acts')
class GetActs(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()['user_id']
        user = db.session.get(users, user_id)
        if (user):
            user_data = Data.get_week(user.current_week)
            days = [
                {
                    'number': 1,
                    'done': user.day_one,
                    'acts': user_data[1]
                },
                {
                    'number': 2,
                    'done': user.day_two,
                    'acts': user_data[2]
                },
                {
                    'number': 3,
                    'done': user.day_three,
                    'acts': user_data[3]
                }
            ]

            return {
                'name': user.name,
                'progress': int((round(user.current_week / 13, 2)) * 100),
                'success': user.success,
                'current_week': user.current_week,
                'types': user_data[0],
                'days': days
            }
        else:
            return '', 401


@act_api.route('/set_day_as_done')
class DoneDay(Resource):
    def post(self):
        if (current_user.is_authenticated):
            data = request.json
            user = db.session.get(users, int(current_user.get_id()))
            if (user):
                if ('set_day' in data):
                    if (data['set_day'] == 1):
                        user.day_one = True

                    elif (data['set_day'] == 2):
                        user.day_two = True

                    elif (data['set_day'] == 3):
                        user.day_three = True
                    
                    if (user.day_one and user.day_two and user.day_three):
                        user.success = '0'

                    try:
                        db.session.commit()
                        return '', 200
                    except:
                        return '', 500
                else:
                    return '', 400
            
        else:
            return '', 401


@act_api.route('/send_result')
class Result(Resource):
    def post(self):
        if (current_user.is_authenticated):
            data = request.json
            user = db.session.get(users, int(current_user.get_id()))
            if (user):
                if ('success' in data):
                    if (data['success']):
                        user.success = '1'
                    else:
                        user.success = '-1'
                    
                    try:
                        db.session.commit()
                        return {'success': user.success}, 200
                    except:
                        return '', 500
                    
                else:
                    return '', 400

            else:
                return '', 401
        else:
            return '', 401
        

# Serve
@app.route('/', defaults={'path': ''})
@app.route('/<path>')
def serve(path):
    if (path != "") and (os.path.exists(os.path.join(app.static_folder, path))):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')



# BackgroundScheduler
def update_weeks():
    with app.app_context():
        all_users = users.query.all()
        for user in all_users:
            user.day_one = False
            user.day_two = False
            user.day_three = False

            if (user.success == '1'):
                user.current_week += 1

            user.success = ''
        db.session.commit()

scheduler = BackgroundScheduler()
scheduler.add_job(update_weeks, 'cron', day_of_week='mon', hour=1, minute=0)
scheduler.start()


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
