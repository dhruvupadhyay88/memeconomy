from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:dhruv@localhost/memeconomy'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.debug = True

db = SQLAlchemy(app)

