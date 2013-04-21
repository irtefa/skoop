"""
Server for skoop


"""


from flask import Flask
from flask import request
app = Flask(__name__)


@app.route('/search')
def search():
    query = request.args.get('query')
    print query  # insert your function here irtefa
    return 'Hello World!'  # return encoded json with {title: , content: , url: , rank: }

if __name__ == '__main__':
    app.run()
