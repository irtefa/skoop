"""
Server for skoop


"""


import json
from flask import Flask, request, Response, render_template

from utils import bingscraper, htmlparser

from classifiers import *
from classifiers.phraseclassifier import PhraseClassifier

app = Flask(__name__)

# TODO figure out a better way to do this
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

    print "FORM", request.form, request.form.getlist('classifier')

    # TODO clean this up, this shouldn't be in the server code
    query = request.form['query']
    print "QUERY", query
    bingQuery = '+'.join(query.split())
    urls = bingscraper.get_urls(bingQuery, 1)
    results = []
    for index, url in enumerate(urls):
            result = {}
            result['title'] = url['title']
            result['url'] = url['url']
            result['rank'] = index
            content = htmlparser.strip_tags(url['url'])

            if content != "":
                scorer = PhraseClassifier(request.form)

                # Classifiers are now given the entire 'request.form' object, which is just
                # all the form fields from the search page, in a dict. They can then extract
                # whatever user input they need to do their job
                # Eventually, we will get these from special forms on the page
                # For now, they're just the query itself
                # This also doesn't support using multiple classifiers yet, but it's a start
                # TO do that, we'll probably have to give a list of indices
                # Martin: I'll try to finish this part up early this week
                #request.form['phrase'] = query   # TODO temporary hack
                #request.form['keyword'] = (query.split())[0]   # TODO temporary hack

                # Get the classifiers selected by user, and instantiate
                classifier_indices = map(int, request.form.getlist('classifier'))
                classifier_index = classifier_indices[0]  # only take 1 classifier for now, TODO
                scorer = classifiers[classifier_index][2](request.form)  # instantiate the classifier

                score = scorer.score_document(result['title'], content, index)
                result['score'] = score
                results.append(result)

    # return encoded json with {title: , content: , url: , score:, rank: }
    return Response(json.dumps(results), mimetype='application/json')

if __name__ == '__main__':
    app.debug = True
    app.run()
