from flask import Flask
from flask import request, render_template, jsonify, url_for
from flask_sqlalchemy import SQLAlchemy
from index import *
from models import *


@app.route('/api/yo', methods=['GET'])
def index():
    return {
        'name': 'Hello World'
    }
