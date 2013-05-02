"""
WordCount classifier -- scores a doc based on word count
"""

from classifier import Classifier
import string


class WordCountClassifier(Classifier):

    # constructs a word count classifier based a given input word
    def __init__(self, options):
        keyword = options['keyword-word']
        self.keyword = keyword

    # scores the document based on word count
    def score_document(self, title, content, rank):
        words = content.lower().split()
        punc = set(string.punctuation)
        words = [''.join(ch for ch in word if ch not in punc) for word in words]
        count = words.count(self.keyword)
        return float(count)/float(len(words))

    def get_labels(self):
        word = '"' + self.keyword + '"'
        return ["Proportion of word " + word, "Low", "High"]
