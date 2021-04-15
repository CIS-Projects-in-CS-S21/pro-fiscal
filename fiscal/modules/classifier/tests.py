from django.test import TestCase

from modules.classifier.classifier import Classifier

class ClassifierTest(TestCase):

    def test_classifier_output(self):
        model = Classifier()
        input = {"description": "Apples and Oranges"}
        self.assertEquals(type(model.classify(input)), str, "Classifier.classify() should return a string")

    def test_classifier_requires_key(self):
        model = Classifier()
        input = {}
        with self.assertRaises(KeyError):
            model.classify(input)