import os
from .db import init_app as db_init_app
from flask import Flask
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, send_from_directory
)
from flask import jsonify
from .db import get_db


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/runs', methods=('GET', 'POST'))
    def runs():
        if request.method == "POST":
            arr = []
            testArr = request.form
            for x in testArr:
                print(x, " ", testArr[x])
            numTries = request.form.get("numTries", None)
            if not numTries:
                return jsonify({"error": "no numTries was passed"})
            arr.append(numTries)
            for i in range(12):
                arr.append(request.form.get("itemNumTries" + str(i), None))
            for i in range(len(arr)):
                if arr[i] is None:
                    return str(i) + "th value was not provided"
            db = get_db()
            db.execute("INSERT INTO runs (numTries, itemNumTries0, itemNumTries1, itemNumTries2, itemNumTries3, itemNumTries4, itemNumTries5, itemNumTries6, itemNumTries7, itemNumTries8, itemNumTries9, itemNumTries10, itemNumTries11) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", arr)
            db.commit()
            return "ok"
        elif request.method == "GET":
            db = get_db()
            dictionary = {}
            dictionary["numTries"] = db.execute(
                "SELECT AVG(numTries) FROM runs").fetchone()[0]
            dictionary["itemNumTries0"] = db.execute(
                "SELECT AVG(itemNumTries0) FROM runs").fetchone()[0]
            dictionary["itemNumTries1"] = db.execute(
                "SELECT AVG(itemNumTries1) FROM runs").fetchone()[0]
            dictionary["itemNumTries2"] = db.execute(
                "SELECT AVG(itemNumTries2) FROM runs").fetchone()[0]
            dictionary["itemNumTries3"] = db.execute(
                "SELECT AVG(itemNumTries3) FROM runs").fetchone()[0]
            dictionary["itemNumTries4"] = db.execute(
                "SELECT AVG(itemNumTries4) FROM runs").fetchone()[0]
            dictionary["itemNumTries5"] = db.execute(
                "SELECT AVG(itemNumTries5) FROM runs").fetchone()[0]
            dictionary["itemNumTries6"] = db.execute(
                "SELECT AVG(itemNumTries6) FROM runs").fetchone()[0]
            dictionary["itemNumTries7"] = db.execute(
                "SELECT AVG(itemNumTries7) FROM runs").fetchone()[0]
            dictionary["itemNumTries8"] = db.execute(
                "SELECT AVG(itemNumTries8) FROM runs").fetchone()[0]
            dictionary["itemNumTries9"] = db.execute(
                "SELECT AVG(itemNumTries9) FROM runs").fetchone()[0]
            dictionary["itemNumTries10"] = db.execute(
                "SELECT AVG(itemNumTries10) FROM runs").fetchone()[0]
            dictionary["itemNumTries11"] = db.execute(
                "SELECT AVG(itemNumTries11) FROM runs").fetchone()[0]
            return jsonify(dictionary)

    @app.route('/hello')
    def hello():
        db = get_db()
        avg = db.execute("SELECT AVG(numTries) FROM runs").fetchone()
        # print(jsonify(a))
        return 'Average Score:' + str(avg[0])

#    @app.route('/index')
#    def send_index():
#        return send_from_directory('react', 'index.html')

    @app.route('/js/<path:path>')
    def send_js(path):
        return send_from_directory('js', path)

    db_init_app(app)

    return app
