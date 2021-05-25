from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import db

class StockTable(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    ticker = db.Column(db.String, nullable=False)