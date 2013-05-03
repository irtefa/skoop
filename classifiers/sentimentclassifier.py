"""
Sentiment classifier -- scores a doc based on Sentiment
"""

import json
import re
import urllib
import urllib2
from classifier import Classifier


class SentimentClassifier(Classifier):

    def __init__(self, options):
        pass

    def score_document(self, title, content, rank):
        # pick only valid words and make it a long space separated string
        words = u' '.join(re.findall('[a-z]+', content.lower()))
        # load our classifier
        url = 'http://text-processing.com/api/sentiment/'
        vals = {'text': words}
        data = urllib.urlencode(vals)
        request = urllib2.Request(url, data)
        try:
            response = urllib2.urlopen(request)
            result = json.loads(response.read())
            probability = float(result['probability']['pos'])
            return probability
        except:
            return 0.5

    def get_labels(self):
        return ["Sentiment of documents", "Sad", "Happy"]
