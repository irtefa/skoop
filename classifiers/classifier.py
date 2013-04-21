"""
Classifier  -- the abstract class from which all classifier's must be derived
"""

from abc import *


class Classifier:
    __metaclass__ = ABCMeta

    # this is the abstract method that recieves document info and returns the score from 0 to 1
    @abstractmethod
    def score_document(self, title, content, rank):
        print "you must implement this function"
