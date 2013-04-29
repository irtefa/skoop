"""
Phrase Classifier -- scores a doc based on a Phrase
"""

from classifier import Classifier
from wordcountclassifier import WordCountClassifier as WordRank


class PhraseClassifier(Classifier):

    # constructs a phrase classifier by taking a dict containing 'phrase' as a key
    def __init__(self, options):
        phrase = options['phrase']
        self.phrase = phrase.split()

    # take each word in phrase and score the documents
    def score_document(self, title, content, rank):
        scores = 1
        for word in self.phrase:
            chunk = WordRank(word)
            score = chunk.score_document(title, content, rank)
            scores *= score
        return scores
