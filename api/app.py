from logging import WARN
import re
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
    stocks = WallStreetBets.query.order_by(WallStreetBets.date.desc(), WallStreetBets.mentions.desc()).limit(10).all()
    res = []
    for stock in stocks:
        info = {}
        info['stock'] = stock.stock
        info['mentions'] = stock.mentions
        info['positive'] = stock.positive
        info['negative'] = stock.negative
        res.append(info)

    return {"data": res}

@app.route('/api/top/weekly', methods=['GET'])
def top_weekly():
    stock_dict = {}
    tickers = StockTable.query.all()
    for i in tickers:
        # mentions, positive, negative
        stock_dict[str(i.ticker)] = [0,0,0]

    stocks = WallStreetBets.query.order_by(WallStreetBets.mentions.desc()).limit(7*4245)
    data = []
    for key in stock_dict:
        week = stocks.query(WallStreetBets.stock == key).all()
        stock = {}
        mentions = 0
        positive = 0
        negative = 0
        for day in week:
            mentions += day.mentions
            positive += day.positive
            negative += day.negative
        stock['stock'] = key
        stock['mentions'] = mentions
        stock['positive'] = positive
        stock['negative'] = negative
        data.append(stock)

    sorted_data = sorted(data, key = lambda i: i['mentions'], reverse=True)

    return {"data": sorted_data[:10]}
    






if __name__ == '__main__':
    app.run(debug=True)
