"""
Phrase Classifier -- scores a doc based on a Phrase
"""

from classifier import Classifier
from wordcountclassifier import WordCountClassifier as WordRank


class PhraseClassifier(Classifier):

    # constructs a phrase classifier by taking a phrase as an input and turning it into an list
    def __init__(self, phrase):
        self.phrase = phrase.split()

    # take each word in phrase and score the documents
    def score_document(self, title, content, rank):
        scores = 1
        for word in self.phrase:
            chunk = WordRank(word)
            score = chunk.score_document(title, content, rank)
            scores *= score
        return scores
