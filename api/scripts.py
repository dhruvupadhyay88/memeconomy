from index import *
from models import *
import praw
from psaw import PushshiftAPI
import csv


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

def initial_data():
    api = PushshiftAPI()
    reddit = praw.Reddit()
    subreddit = reddit.subreddit('wallstreetbets')

    for post in subreddit.top(limit=100):
        print(post.title, post.id)




   

initial_data()
