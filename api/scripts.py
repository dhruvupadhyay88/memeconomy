from flask import jsonify
from index import *
from models import *
import praw
from praw.models import MoreComments
from psaw import PushshiftAPI
import csv
from datetime import datetime
import requests, json

# should add error handling for scraping and database interactions
# globals
flagged_words =    ["YOLO", "PUMP", "RH", "EOD", "IPO", "ATH", "ALL", "DD","GO", "A", "ARE", "I", "B", "IT", "SO", "ON", "U", "FOR", "CAN"]
positive =      ['call','long','up','buy','bull','good','fire','lambo','pump','calls','diamond','bear-trap',
                    'hands','green','rich','moon','love','potential','double','undervalued','under-valued','sexy',
                    '🚀','💎','😎','🔥','🤑','💵','💸','💲','rocket','squeeze','short-squeeze','positive',
                    'oversold','over-sold','recover','bounce','🌈','🏳‍🌈','🌑','🐂','CC','CCS','PMCC','LEAPS']

negative =      ['put','short','down','sell','drop','fall','lose','bear','out','bad','loss','negative',
                    'mistake','burned','wrecked','destroyed','overvalued','over-valued','tank','trash','shit',
                    'bull-trap','overbought','over-bought','overextended','over-extended','rip','cash-secured',
                    '💩','🤡','👎','🙅‍♀️','🚫','😭','🐻','negative','crash','idiots','crashing','tanking']
    
market_track = ['SPY','SPX','QQQ','NASDAQ','MARKET','ECONOMY']

def stock_table():
    stocks = {}
    with open('../assets/stocks.csv', 'r') as stock_file:
        csv_reader = csv.reader(stock_file)
        # skip first line
        next(csv_reader)
        for line in csv_reader:
            stocks[line[0]] = line[0]
    id = 0
    for stock in stocks:
        id += 1
        row = StockTable(
            id = id,
            ticker = stocks[stock]
        )
        print(id)
        db.session.add(row)
        db.session.flush()
    db.session.commit()

def get_comments(comment, stock_dict, market, count):
    count[0] += 1
    stock_mention = False
    market_mention = False
    p = 0   
    n = 0
    for word in comment.body.split():
        if (word == word.upper() and word in stock_dict and word not in flagged_words):
            stock_mention = word
        elif (word.upper() in market_track):
            market_mention = True
        if (word in positive) and not(p or n):
            p = 1
        elif (word in negative) and not(p or n):
            n = 1

    if stock_mention:
        stock_dict[stock_mention][0] += 1
        stock_dict[stock_mention][1] += p
        stock_dict[stock_mention][2] += n

    if market_mention:
        market[0] += 1
        market[1] += p
        market[2] += n
    
    if len(comment.replies) > 0:
        print('replies')

def add_id(comment, fullnames):
    fullnames.append('t1_'+ comment.id)
    try:
        if (comment.replies):
            for reply in comment.replies:
                add_id(reply, fullnames)
    except:
        pass

def initial_data():
    api = PushshiftAPI()
    reddit = praw.Reddit()
    subreddit = reddit.subreddit('wallstreetbets')
    stock_dict = {}
    stocks = StockTable.query.all()
    
    for i in stocks:
        # mentions, positive, negative
        stock_dict[str(i.ticker)] = [0,0,0]

    # mentions, positive, negative
    market = [0,0,0]

    top = subreddit.top(time_filter="day", limit=30)
    total = 0
    
    for submission in top:
        print(submission.title)
        print(submission.created_utc)
        print(submission.id)
        count1 = 0
        count2 = [0]
        comments = submission.comments
        fullnames = []
        for comment in comments:
            count1+=1
            add_id(comment, fullnames)
        
        print("{} comments retreived".format(count1))

        for comment in reddit.info(fullnames):
            get_comments(comment, stock_dict, market, count2)
        
        total += count2[0]
        print("{} comments analyzed".format(count2[0]))
            
    print("{} comments analyzed in total".format(total))

    print("Stock   Mentions   Positive   Negative ")
    for key in stock_dict:
        if ((stock_dict[key][0] > 10)):
            print('{}:    {}      {}     {}'.format(key,stock_dict[key][0],stock_dict[key][1],stock_dict[key][2]))

    percent = round(((market[1]*100)/(market[1] + market[2])),2)
    print('Market Sentiment : {}% Positive'.format(percent))

    date = datetime.today().strftime('%Y-%m-%d')

    # add to wsb table
    for key in stock_dict:
        
        row = WallStreetBets(
            stock = key,
            mentions = stock_dict[key][0],
            positive = stock_dict[key][1],
            negative = stock_dict[key][2],
            date = date
        )
        db.session.add(row)
        db.session.flush()
    db.session.commit()

    # market sentiment
    row = MarketSentiment(
        mentions = market[0],
        positive = market[1],
        negative = market[2],
        date = date
    )
    db.session.add(row)
    db.session.flush()
    db.session.commit()

initial_data()




    # p = 0
    # n = 0
    # arr = ['SPY','SPX','market','economy']
    # for key in arr:
    #     p += stock_dict[key][1]
    #     n += stock_dict[key][2]

    # percent = round(((p*100)/(p+n)),2)
    # print('Market Sentiment : {}% Positive'.format(percent))

    # def iter_top_level(comments):
    # for top_level_comment in comments:
    #     if isinstance(top_level_comment, MoreComments):
    #         yield from iter_top_level(top_level_comment.comments())
    #     else:
    #         yield top_level_comment