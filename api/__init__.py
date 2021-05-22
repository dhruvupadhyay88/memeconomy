from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['DEBUG'] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tmp/test.db"
    
    db.init_app(app)
    
    return app