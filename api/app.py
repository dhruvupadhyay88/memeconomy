from flask import Flask
from flask import request, render_template, jsonify, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:dhruv@localhost/memeconomy'
app.debug = True

db = SQLAlchemy(app)

@app.route('/api/yo', methods=['GET'])
def index():
    return {
        'name': 'Hello World'
    }


if __name__ == '__main__':
    app.run(debug=True)
