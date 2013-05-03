"""
Sentiment classifier -- scores a doc based on Sentiment
"""

import pickle
import collections
from classifier import Classifier


class SentimentClassifier(Classifier):

    def __init__(self, options):
        pass

    def score_document(self, title, content, rank):
        # by default every word has a word count of 0
        word_dict = collections.defaultdict(lambda: 0)
        words = content.lower().split()
        # increment word count as you see that word
        for word in words:
            word_dict[word] += 1
        # load our classifier
        classifier = pickle.load(open('static/resources/classifier.bin'))

        sentiment_sum = classifier.classify(word_dict)
        return float(sentiment_sum) / 5

    def get_labels(self):
        return ["Sentiment of documents", "Sad", "Happy"]
