# This Python file uses the following encoding: utf-8
import os
import copy

from flask import Flask, render_template, redirect, request, url_for, jsonify, json, send_from_directory, abort
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, UserMixin, login_required, current_user, logout_user

import datetime
from werkzeug.security import generate_password_hash, check_password_hash



# App
app = Flask(__name__, static_folder='build', static_url_path='')
app.config['SECRET_KEY'] = '8f42a73054b1749f8f58848be5e6502c'


# DataBase
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)

class users(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(30), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    surname = db.Column(db.String(40), nullable=False)

    def __repr__(self):
        return '<users %r>' % self.id


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
    

# Login
login_manager = LoginManager(app)
login_manager.login_view = 'log'


@login_manager.user_loader
def load_user(user_id):
    return db.session.get(users, user_id)
    

# Login
@app.route('/log', methods=['POST', 'GET'])
def log():
    if current_user.is_authenticated:
        return redirect(url_for('serve'), code=400)
    
    if (request.method == 'POST'):
        data = request.json
        user = users.query.filter_by(email=data['email']).first()

        if user:
            if check_password_hash(user.password, data['password']):
                login_user(user)
                return redirect(url_for('serve'))
            else:
                return jsonify({'error': 'password'}), 401
        else:
            return jsonify({'error': 'email'}), 401
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

        if not (users.query.filter(users.email == data['email']).all()):
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
                abort(500)
        else:
            abort(409)
    
    else:
        return render_template('reg.html')



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
    app.run(host='0.0.0.0')
