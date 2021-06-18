from logging import StringTemplateStyle, WARN
from flask import Flask, request, render_template, jsonify, url_for
from flask_sqlalchemy import SQLAlchemy
from index import *
from models import *
import praw
from praw.models import MoreComments
from psaw import PushshiftAPI

@app.route('/', methods=['GET'])
def hello_world():
    return {
        'name': 'Hello World'
    }




@app.route('/api/top/daily', methods=['GET'])
def top_daily():
    stocks = WallStreetBets.query.order_by(WallStreetBets.date.desc(), WallStreetBets.mentions.desc()).limit(15).all()
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
    stocks = {}
    tickers = StockTable.query.all()
    for i in tickers:
        # mentions, positive, negative
        stocks[str(i.ticker)] = {}
        stocks[str(i.ticker)]['stock'] = str(i.ticker)
        stocks[str(i.ticker)]['mentions'] = 0
        stocks[str(i.ticker)]['positive'] = 0
        stocks[str(i.ticker)]['negative'] = 0

    query = WallStreetBets.query.order_by(WallStreetBets.date.desc()).limit(7*4245).all()
    data = []
    for item in query:
        stocks[item.stock]['mentions'] += item.mentions
        stocks[item.stock]['positive'] += item.positive
        stocks[item.stock]['negative'] += item.negative

    for key in stocks: 
        data.append(stocks[key])

    sorted_data = sorted(data, key = lambda i: i['mentions'], reverse=True)

    return jsonify(sorted_data[:15])

@app.route('/api/top/monthly', methods=['GET'])
def top_monthly():
    stocks = {}
    tickers = StockTable.query.all()
    for i in tickers:
        # mentions, positive, negative
        stocks[str(i.ticker)] = {}
        stocks[str(i.ticker)]['stock'] = str(i.ticker)
        stocks[str(i.ticker)]['mentions'] = 0
        stocks[str(i.ticker)]['positive'] = 0
        stocks[str(i.ticker)]['negative'] = 0

    query = WallStreetBets.query.order_by(WallStreetBets.date.desc()).limit(30*4245).all()
    data = []
    for item in query:
        stocks[item.stock]['mentions'] += item.mentions
        stocks[item.stock]['positive'] += item.positive
        stocks[item.stock]['negative'] += item.negative

    for key in stocks: 
        data.append(stocks[key])

    sorted_data = sorted(data, key = lambda i: i['mentions'], reverse=True)

    return jsonify(sorted_data[:15])
    
@app.route('/api/stock/chart', methods=['GET'])
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

@app.route('/api/market/posts', methods=['GET'])
def market_posts():
    api = PushshiftAPI()
    reddit = praw.Reddit()
    subreddit = reddit.subreddit('wallstreetbets')
    posts = subreddit.search('market', sort='top',time_filter="week", limit=20)
    data = []
    for post in posts: 
        obj = {}
        obj['title'] = post.title
        obj['time'] = post.created_utc
        obj['link'] = post.permalink
        obj['upvotes'] = post.score
        obj['id'] = post.id
        obj['author'] = post.author.name
        obj['comments'] = post.num_comments
        data.append(obj)
    
    return jsonify(data)

@app.route('/api/stock/posts', methods=['GET'])
def stock_posts():
    stock = request.args.get('stock')
    api = PushshiftAPI()
    reddit = praw.Reddit()
    subreddit = reddit.subreddit('wallstreetbets')
    posts = subreddit.search(stock, sort='top',time_filter="week", limit=20)
    data = []
    for post in posts: 
        obj = {}
        obj['title'] = post.title
        obj['time'] = post.created_utc
        obj['link'] = post.permalink
        obj['upvotes'] = post.score
        obj['id'] = post.id
        obj['author'] = post.author.name
        obj['comments'] = post.num_comments
        data.append(obj)
    
    return jsonify(data)

@app.route('/api/stock/list', methods=['GET'])
def get_stocks():
    stocks = StockTable.query.all()
    res = []
    for stock in stocks:
        obj = {}
        obj['stock'] = stock.ticker
        obj['id'] = stock.id
        res.append(obj)

    return jsonify(res)

if __name__ == '__main__':
    app.run(debug=True)
