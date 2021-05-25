import csv
from ..app import db
from ..models import StockTable

stocks = {}

with open('stocks.csv', 'r') as stock_file:
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