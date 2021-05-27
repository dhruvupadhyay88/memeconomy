from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from index import *

class StockTable(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    ticker = db.Column(db.String, nullable=False)

class WallStreetBets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    stock = db.Column(db.String, nullable=False)
    mentions = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)