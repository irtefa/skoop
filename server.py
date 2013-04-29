"""
Server for skoop


"""


import json
from flask import Flask
from flask import request
from utils import bingscraper
from utils import htmlparser
from flask import Response
from flask import render_template
from classifiers.phraseclassifier import PhraseClassifier

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/search', methods=['POST'])
def search():
    #q = request.args.get('query')
    q = request.form['query']
    query = '+'.join(q.split())
    urls = bingscraper.get_urls(query, 1)
    results = []
    for index, url in enumerate(urls):
            result = {}
            result['title'] = url['title']
            result['url'] = url['url']
            result['rank'] = index
            result['content'] = htmlparser.strip_tags(url['url'])
            if result['content'] != "":
                scorer = PhraseClassifier(q)
                score = scorer.score_document(result['title'], result['content'], index)
                result['score'] = score
                results.append(result)
    # return encoded json with {title: , content: , url: , score:, rank: }
    return Response(json.dumps(results), mimetype='application/json')  

if __name__ == '__main__':
    app.debug = True
    app.run()
