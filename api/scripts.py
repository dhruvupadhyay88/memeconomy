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

def iter_top_level(comments):
    for top_level_comment in comments:
        if isinstance(top_level_comment, MoreComments):
            yield from iter_top_level(top_level_comment.comments())
        else:
            yield top_level_comment

def initial_data():
    api = PushshiftAPI()
    reddit = praw.Reddit()
    subreddit = reddit.subreddit('wallstreetbets')
    flagged_words =    ["YOLO", "PUMP", "RH", "EOD", "IPO", "ATH", "DD","GO", "A", "I", "B", "IT", "SO", "ON", "U", "FOR", "CAN"]

    positive =      ['call','long','up','buy','bull','good','fire','lambo','pump','calls','diamond','bear-trap',
                    'hands','green','rich','moon','love','potential','double','undervalued','under-valued','sexy',
                    '🚀','💎','😎','🔥','🤑','💵','💸','💲','rocket','squeeze','short-squeeze','positive',
                    'oversold','over-sold','recover','bounce','🌈','🏳‍🌈','🌑','🐂','CC','CCS','PMCC','LEAPS']

    negative =      ['put','short','down','sell','drop','fall','lose','bear','out','bad','loss','negative',
                    'mistake','burned','wrecked','destroyed','overvalued','over-valued','tank','trash','shit',
                    'bull-trap','overbought','over-bought','overextended','over-extended','rip','cash-secured',
                    '💩','🤡','👎','🙅‍♀️','🚫','😭','🐻','negative','crash','idiots','crashing','tanking']
    
    stock_dict = {}
    stocks = StockTable.query.all()
    for i in stocks:
        # mentions, positive, negative
        stock_dict[str(i.ticker)] = [0,0,0]

    discussion = subreddit.search('flair:"Daily Discussion"', time_filter='day')
    top = subreddit.top(time_filter="day", limit=30)
    
    for submissions in [discussion, top]:
        for submission in submissions:
            print(submission.title)
            print(submission.created_utc)
            print(submission.id)
            count = 0
            comments = submission.comments
            fullnames = []
            for comment in comments:
                count+=1
                fullnames.append('t1_'+ comment.id)
                
            for comment in reddit.info(fullnames):
                p = 0
                n = 0
                for word in comment.body.split():
                    if (word == word.upper() and word in stock_dict and word not in flagged_words):
                        stock_dict[word][0] += 1
                        stock_dict[word][1] += p
                        stock_dict[word][2] += n
                    if (word in positive):
                        p = 1
                    elif (word in negative):
                        n = 1

    print("Stock   Mentions   Positive   Negative ")
    for key in stock_dict:
        if ((stock_dict[key][0] > 10) and (key not in ['SPY','SPX','market','economy'])):
            print('{}:    {}      {}     {}'.format(key,stock_dict[key][0],stock_dict[key][1],stock_dict[key][2]))
    

    # add to table
    for key in stock_dict:
        date = datetime.today().strftime('%Y-%m-%d')
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

    
initial_data()




    # p = 0
    # n = 0
    # arr = ['SPY','SPX','market','economy']
    # for key in arr:
    #     p += stock_dict[key][1]
    #     n += stock_dict[key][2]

    # percent = round(((p*100)/(p+n)),2)
    # print('Market Sentiment : {}% Positive'.format(percent))