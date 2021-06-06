from logging import StringTemplateStyle, WARN
from flask import Flask, request, render_template, jsonify, url_for
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

    return jsonify(res)

@app.route('/api/top/weekly', methods=['GET'])
def top_weekly():
    stock_dict = {}
    tickers = StockTable.query.all()
    for i in tickers:
        # mentions, positive, negative
        stock_dict[str(i.ticker)] = [0,0,0]

    stocks = WallStreetBets.query.order_by(WallStreetBets.date.desc())
    data = []
    for key in stock_dict:
        week = stocks.filter(WallStreetBets.stock == key).limit(7).all()
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

    return jsonify(sorted_data[:10])

@app.route('/api/top/monthly', methods=['GET'])
def top_monthly():
    stock_dict = {}
    tickers = StockTable.query.all()
    for i in tickers:
        # mentions, positive, negative
        stock_dict[str(i.ticker)] = [0,0,0]

    stocks = WallStreetBets.query.order_by(WallStreetBets.date.desc())
    data = []
    for key in stock_dict:
        month = stocks.filter(WallStreetBets.stock == key).limit(30).all()
        stock = {}
        mentions = 0
        positive = 0
        negative = 0
        for day in month:
            mentions += day.mentions
            positive += day.positive
            negative += day.negative
        stock['stock'] = key
        stock['mentions'] = mentions
        stock['positive'] = positive
        stock['negative'] = negative
        data.append(stock)
    sorted_data = sorted(data, key = lambda i: i['mentions'], reverse=True)
    return jsonify(sorted_data[:10])
    
@app.route('/api/stock/chart/', methods=['GET'])
def stock_chart():
    stock = request.args.get('stock')
    data = WallStreetBets.query.filter(WallStreetBets.stock == str(stock)).order_by(WallStreetBets.date.desc()).limit(30).all()
    res = []
    for day in data:
        obj = {}
        obj['stock'] = day.stock
        obj['mentions'] = day.mentions
        obj['positive'] = day.positive
        obj['negative'] = day.negative
        obj['date'] = day.date.strftime("%Y-%m-%d")
        res.append(obj)

    return jsonify(res)

@app.route('/api/market/chart', methods=['GET'])
def market_chart():
    data = MarketSentiment.query.order_by(MarketSentiment.date.desc()).limit(30).all()
    res = []
    for day in data:
        obj = {}
        obj['mentions'] = day.mentions
        obj['positive'] = day.positive
        obj['negative'] = day.negative
        obj['date'] = day.date.strftime("%Y-%m-%d")
        res.append(obj)

    return jsonify(res)






if __name__ == '__main__':
    app.run(debug=True)
