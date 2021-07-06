from dataclasses import dataclass
from datetime import datetime
from enum import unique
from os import waitpid
from flask import Flask, jsonify, request
import flask
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPBasicAuth
from werkzeug.security import generate_password_hash, check_password_hash
import time
import configparser
import random
from werkzeug.utils import redirect

from sqlalchemy import Table, Column, Integer, ForeignKey, desc
from sqlalchemy.orm import relationship


from flask_cors import CORS

app = Flask(__name__, static_url_path='',
            static_folder='static')
auth = HTTPBasicAuth()

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

# TODO: remove allow all cors, once GUI development finishes or allow in other branch
CORS(app)

config = configparser.ConfigParser()
# Sets default config, if ini is missing
# If you want to change any of these settings,
# please rename the "config.ini.example" to "config.ini" and change them there
#
# The settings below are the default in case the config.ini is missing
config['SETTINGS'] = {
    'port': 5000,
    'host': '0.0.0.0',
    'usePassword': False,
    'user': 'admin',
    'unlock_password': 'supersecret'
}

# user config
# Overwrites local config with file (if exists)
config.read('config.ini')

users = {
    str(config['SETTINGS']['user']): generate_password_hash(str(config['SETTINGS']['unlock_password'])),
}


# Model
@dataclass
class LogEntry(db.Model):
    __tablename__ = 'logentry'
    id: int
    dateObj: datetime

    id = db.Column(db.Integer, primary_key=True)
    dateObj = db.Column(
        db.DateTime, unique=False, nullable=False)
    log_posts = relationship("Post", cascade="all,delete", backref="LogEntry")


@dataclass
class Post(db.Model):
    __tablename__ = 'post'
    id: int
    log_FK_id: int
    elapsedTime: int
    learnMethod: str
    comment: str

    id = db.Column(db.Integer, primary_key=True)
    log_FK_id = db.Column(db.Integer, ForeignKey(LogEntry.id))
    elapsedTime = db.Column(db.Integer, unique=False, nullable=False)
    learnMethod = db.Column(db.String, unique=False, nullable=False)
    comment = db.Column(db.String, unique=False, nullable=False)


# Routes
@app.route("/")
def entry():
    if(not isLoggedIn() and checkPassReq()):
        return flask.redirect('/login')
    return app.send_static_file('index.html')
    # commands = Command.query.all()
    # return jsonify(commands)


@app.route("/login")
@auth.login_required
def login():
    return flask.redirect('/')


@app.route("/loggedIn")
def loggedIn():
    return str(isLoggedIn())


@app.route("/logs")
def logs():
    if(not isLoggedIn() and checkPassReq()):
        return flask.redirect('/login')
    logentries = LogEntry.query.order_by(desc(LogEntry.dateObj)).all()
    return jsonify(logentries)


# creates a new entry for current date. use '/addLog?manual=YYYY-MM-DD' to insert already past days
# also catch "dateAlreadyExist", when a day already exists


@app.route("/addLog")
def addLog():
    if(not isLoggedIn() and checkPassReq()):
        return flask.redirect('/login')

    logs = LogEntry.query.all()
    # format: yyyy-mm-dd
    addManualDay = request.args.get('manual', default="", type=str)
    isManual = addManualDay != ""
    if(isManual):
        newDate = datetime.fromisoformat(addManualDay)
        db.session.add(LogEntry(dateObj=newDate))
    else:
        db.session.add(LogEntry(
            dateObj=datetime.now()))

    localDateObj = datetime.utcnow()
    if(isManual):
        localDateObj = datetime.fromisoformat(addManualDay)
    for item in logs:

        # check if date is already present
        if(item.dateObj.day == localDateObj.day and item.dateObj.month == localDateObj.month and item.dateObj.year == localDateObj.year):
            return ("dateAlreadyExist")

        # logentries = LogEntry.query.all()
    db.session.commit()
    logentries = LogEntry.query.order_by(desc(LogEntry.dateObj)).all()
    return jsonify(logentries)


# link logs with /addPost?logid=<id>. Yes, I know, shoud've used post req - whatever
@app.route("/addPost", methods=['GET', 'POST'])
def addPost():
    if(not isLoggedIn() and checkPassReq()):
        return flask.redirect('/login')
    if request.method == 'POST':
        if(request.form['logid']):
            logid = request.form['logid']
            elapsedTime = request.form['elapsedTime']
            learnMethod = request.form['learnMethod']
            comment = request.form['comment']

            db.session.add(Post(
                log_FK_id=logid,
                elapsedTime=elapsedTime,
                learnMethod=learnMethod,
                comment=comment,
            ))

            db.session.commit()

            results = (db.session.query(Post.id, Post.log_FK_id, Post.elapsedTime,
                                        Post.learnMethod, Post.comment).join(LogEntry).filter(LogEntry.id == logid)).all()

            row_as_dict = []
            for row in results:
                row_as_dict.append(dict(row))

            # posts = Post.query.all()
            return jsonify(row_as_dict)

        return jsonify("no id was given")
    else:
        return "Use post request"


# outputs posts by logid with /getPosts?logid=<id>
@ app.route("/getPosts")
def getPosts():
    if(not isLoggedIn() and checkPassReq()):
        return flask.redirect('/login')

    logid = request.args.get('logid', default=0, type=int)

    # results = Post.query.join(LogEntry).all()
    results = (db.session.query(Post.id, Post.log_FK_id, Post.elapsedTime,
                                Post.learnMethod, Post.comment).join(LogEntry).filter(LogEntry.id == logid)).all()

    row_as_dict = []
    for row in results:
        row_as_dict.append(dict(row))

    return jsonify(row_as_dict)


@app.route("/deleteLog")
def deleteLog():
    if(not isLoggedIn() and checkPassReq()):
        return flask.redirect('/login')

    logid = request.args.get('logid', default=0, type=int)
    if(logid == 0):
        return "no logid was passed"
    else:
        logs = LogEntry.query.all()
        for item in logs:
            if(item.id == logid):
                db.session.delete(item)
                db.session.commit()
                logentries = LogEntry.query.order_by(
                    desc(LogEntry.dateObj)).all()
                return jsonify(logentries)
    return "no item to be deleted"

# shows all possible learnmethods that were entered so far (for autocompletion in frontend)


@ app.route("/getLearnMethods")
def getLearnMethods():
    if(not isLoggedIn() and checkPassReq()):
        return flask.redirect('/login')

    results = (db.session.query(Post.learnMethod).join(LogEntry)).all()

    data = []
    for row in results:
        data.append([x for x in row][0])

    return jsonify(list(dict.fromkeys(data)))


# logic

def checkPassReq():
    cmp1 = bool(str(config['SETTINGS']['usePassword']).lower() == "true")
    return cmp1


def isLoggedIn():
    x = auth.get_auth()
    return not (x == None)


# user auth

@auth.verify_password
def verify_password(username, password):
    if username in users and \
            check_password_hash(users.get(username), password):
        return username
