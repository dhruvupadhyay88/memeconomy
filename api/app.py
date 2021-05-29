from logging import WARN
from flask import Flask, json
from flask import request, render_template, jsonify, url_for
from flask_sqlalchemy import SQLAlchemy
from index import *
from models import *

@app.route('/', methods=['GET'])
def hello_world():
    return {
        'name': 'Hello World'
    }

@app.route('/api/top/daily', methods=['GET'])
def top_daily():
    stocks = WallStreetBets.query.order_by(WallStreetBets.mentions.desc()).limit(10).all()
    res = []
    for stock in stocks:
        res.append(stock.mentions)
    return {"res": res}



if __name__ == '__main__':
    app.run(debug=True)

