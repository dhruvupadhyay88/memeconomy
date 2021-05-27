from flask import jsonify
from index import *
from models import *
import praw
from praw.models import MoreComments
from psaw import PushshiftAPI
import csv
import datetime


def stock_table():
    stocks = {}
    with open('../assets/stocks.csv', 'r') as stock_file:
        csv_reader = csv.reader(stock_file)

        # skip first line
        next(csv_reader)

        for line in csv_reader:
            stocks[line[0]] = line[0]
    print(stocks)

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

    stock_dict = {}
    stocks = StockTable.query.all()
    for i in stocks:
        stock_dict[str(i.ticker)] = 0

    submissions = subreddit.search('flair:"Daily Discussion"', time_filter='day')

    for submission in submissions:
        print(submission.title)
        print(submission.created_utc)
        count = 0
        #comments = api.search_comments(url=submission.url)
        for comment in iter_top_level(submission.comments):
            print(comment.body)
            for word in comment.body.split():
                if word in stock_dict:
                    stock_dict[word] += 1
            count+=1
            if (count==1000):
                break

    print(stock_dict)

   
    

    
    



    # start_time = int(datetime.datetime(2021, 5, 24).timestamp())
    # submissions = api.search_submissions(after=start_time, subreddit='wallstreetbets', filter=['url','author','title','subreddit'])
    # for submission in submissions:
    #     for key in stock_dict:
    #         words = submission.title.split()
    #         if key in words:
    #             stock_dict[key] += 1

    # for comment in comments:
    #     for key in stock_dict:
    #         words = comment.body.split()
    #         if key in words:
    #             stock_dict[key] += 1

    # print(stock_dict)
    

    

    # for post in subreddit.top(limit=100):
    #      print(post.title, post.id)




   

initial_data()
