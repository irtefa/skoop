"""
Dummy classifier -- scores a doc based on ???
"""

from classifier import Classifier


class DummyClassifier(Classifier):

    # constructs a dummy classifier
    def __init__(self, options):
        pass

    def score_document(self, title, content, rank):
        return 0.33

    def get_labels(self):
        return ["Dummy Score", "Low", "High"]
