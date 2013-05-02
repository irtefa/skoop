"""
Server for skoop


"""


import json
from flask import Flask, request, Response, render_template

from utils import bingscraper, htmlparser

from classifiers import *
from classifiers.phraseclassifier import PhraseClassifier

app = Flask(__name__)
NUM_PAGES = 10

# These are all the classifiers that the client can choose from
classifiers = [
    #(index, name to display to client, classifier class)
    (0, "Phrase Count", phraseclassifier.PhraseClassifier, '<input name="keyword-phrase"></input>'),
    (1, "Word Count", wordcountclassifier.WordCountClassifier, '<input name="keyword-word"></input>'),
    (2, "Dummy", dummy.DummyClassifier, '<input name="keyword-dummy"></input>'),
]


@app.route('/')
def index():
    return render_template('index.html', classifiers=classifiers)


@app.route('/search', methods=['POST'])
def search():
    # TODO clean this up, this shouldn't be in the server code
    print "FORM", request.form, request.form.getlist('classifier')
    query = request.form['query']
    print "QUERY", query
    bingQuery = '+'.join(query.split())
    urls = bingscraper.get_urls(bingQuery, NUM_PAGES)
    documents = []
    rank = 0
    
    # Get the classifiers selected by user, and instantiate
    instance_from_index = lambda i: classifiers[int(i)][2](request.form)
    scorers = map(instance_from_index, request.form.getlist('classifier'))

    ##
    ## Check API_INFO.txt for description server/client json response format
    ##
    for url in urls:
        result = {}
        result['title'] = url['title']
        result['url'] = url['url']
        result['rank'] = rank
        content = htmlparser.strip_tags(url['url'])

        if content != "":
            score_document = lambda c: c.score_document(result['title'], content, rank)
            scores = map(score_document, scorers)
            result['scores'] = scores
            documents.append(result)
            rank += 1
    
    # [ [axis,low,high], ...]
    clabels = map(lambda c: c.get_labels(), scorers)

    results = {'documents': documents, 'classifiers': clabels}

    # return encoded json with {title: , content: , url: , score:, rank: }
    return Response(json.dumps(results), mimetype='application/json')

if __name__ == '__main__':
    app.debug = True
    app.run()
