"""
Dummy classifier -- scores a doc based on ???
"""

from classifier import Classifier
import string


class DummyClassifier(Classifier):

    # constructs a dummy classifier 
    def __init__(self, options):
      pass

    def score_document(self, title, content, rank):
      return 0.33
