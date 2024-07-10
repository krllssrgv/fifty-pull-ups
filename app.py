# This Python file uses the following encoding: utf-8
import os
import sys

from flask import Flask, render_template, redirect, request, url_for, jsonify, json, send_from_directory, abort
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, upgrade, init, migrate
from flask_login import LoginManager, login_user, UserMixin, login_required, current_user, logout_user
from flask_cors import CORS, cross_origin


import datetime
from werkzeug.security import generate_password_hash, check_password_hash

from data import Data
from functools import wraps
from apscheduler.schedulers.background import BackgroundScheduler



# App
app = Flask(__name__, static_folder='build', static_url_path='')
app.config['SECRET_KEY'] = '8f42a73054b1749f8f58848be5e6502c'

CORS(app)


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



# Login
login_manager = LoginManager(app)
login_manager.login_view = 'log'


@login_manager.user_loader
def load_user(user_id):
    return db.session.get(users, user_id)
    
def api_login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if not current_user.is_authenticated:
            return '', 401
        return f(*args, **kwargs)
    return wrapper


# Login
@app.route('/log', methods=['POST', 'GET'])
def log():
    if current_user.is_authenticated:
        return redirect(url_for('serve'))
    
    if (request.method == 'POST'):
        data = request.json
        user = users.query.filter_by(email=data['email']).first()

        if user:
            if check_password_hash(user.password, data['password']):
                login_user(user)
                return redirect(url_for('serve'))
            else:
                return jsonify({'password': 'Неправильный пароль'}), 401
        else:
            return jsonify({'email': 'Нет такого пользователя'}), 401
    else:
        return render_template('log.html')


# Logout
@app.route('/logout', methods=['POST', 'GET'])
def logout():
    logout_user()
    return redirect(url_for('log'))


# Registration
@app.route('/reg', methods=['POST', 'GET'])
def reg():
    if current_user.is_authenticated:
        return redirect(url_for('serve'))
    
    if request.method == 'POST':
        data = request.json
        check = True
        result = {}

        if (users.query.filter(users.email == data['email']).all()):
            check = False
            result['email'] = 'Пользователь уже существует'

        if (len(data['password']) < 8):
            check = False
            result['password'] = 'Минимальная длина 8 символов'

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
                return redirect(url_for('log'))
            except:
                return jsonify({'result': 'Ошибка на сервере'}), 500
        else:
            return jsonify(result), 400
    
    else:
        return render_template('reg.html')



def update_weeks():
    # Добавьте здесь ваш код
    # Например, вы можете обновить записи в базе данных или выполнить другие задачи
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
scheduler.add_job(update_weeks, 'cron', day_of_week='wed', hour=19, minute=15)
scheduler.start()



#API
@app.route('/api/get_user_acts')
@api_login_required
def get_user_acts():
    user = db.session.get(users, int(current_user.get_id()))
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

    return jsonify({
        'name': user.name,
        'progress': int((round(user.current_week / 13, 2)) * 100),
        'success': user.success,
        'current_week': user.current_week,
        'types': user_data[0],
        'days': days
    })


@app.route('/api/set_day_as_done', methods=['POST'])
@api_login_required
def set_day_as_done():
    data = request.json
    user = db.session.get(users, int(current_user.get_id()))
    if (user):
        if ('set_day' in data):
            if (data['set_day'] == 1):
                user.day_one = True
                if (user.day_two and user.day_three):
                    user.success = '0'

            elif (data['set_day'] == 2):
                user.day_two = True
                if (user.day_one and user.day_three):
                    user.success = '0'

            elif (data['set_day'] == 3):
                user.day_three = True
                if (user.day_one and user.day_two):
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




@app.route('/api/send_result', methods=['POST'])
@api_login_required
def send_result():
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
                return jsonify({'success': user.success}), 200
            except:
                return '', 500
            
        else:
            return '', 400

    else:
        return '', 401


# Serve
@app.route('/', defaults={'path': ''})
@app.route('/<path>')
@login_required
def serve(path):
    if (path != "") and (os.path.exists(os.path.join(app.static_folder, path))):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
