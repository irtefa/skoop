"""
Server for skoop


"""


import json
from flask import Flask
from flask import request
from pygoogle import pygoogle

app = Flask(__name__)


@app.route('/search')
def search():
    query = request.args.get('query')
    g = pygoogle(query)
    g.pages = 1  # number of pages worth or results
    urls = g.get_urls()
    results = []
    for index, url in enumerate(urls):
            result = {}
            result['title'] = url['title']
            result['url'] = url['url']
            result['rank'] = index
            results.append(result)

    return json.dumps(results)  # return encoded json with {title: , content: , url: , rank: }

if __name__ == '__main__':
    app.debug = True
    app.run()
