import pickle
import os

from fiscal.settings import BASE_DIR

from nltk.tokenize import word_tokenize
from nltk import pos_tag
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

from collections import defaultdict
from nltk.corpus import wordnet as wn

class Classifier:
    """
    Holds the pickled classifier model and classifies expendenture entries
    
    Attributes:
        model (classifier_model): The pickled classifier model saved from the external
            jupyter-notebook
    """
    
    def __init__(self):
        """
        Initializes the Classifier object

        Arguments:
            model_path (string): The name of the pickled classifier model
        """
        self.model_path = os.path.join(BASE_DIR.parent, "machine_learning", "pickled_objs", "linear_clf.pkl")
        self.vectorizer_path = os.path.join(BASE_DIR.parent, "machine_learning", "pickled_objs", "Tfidf_vect.pkl")

        self.__categories = ['Housing', 'Transportation', 'Debt', 'Insurance',
            'Utilities', 'Medical/Healthcare', 'Savings', 'Retirement',
            'Education', 'Groceries/Household', 'Entertainment', 'Essentials',
            'Non-Essentials', 'Other']

        with open(self.model_path, 'rb') as pickle_file:
            self.model = pickle.load(pickle_file)

        with open(self.vectorizer_path, 'rb') as vect_file:
            self.vectorizer = pickle.load(vect_file)

    
    def classify(self, dict):
        """
        Determines a category for the passed expenditure string

        Arguments:
            dict (dictionary): A dictionary consisting of the attributes of the example to be classified
        
        Returns:
            string: The name of the class that the expenditure was placed into
        """

        tag_map = defaultdict(lambda: wn.NOUN)
        tag_map['J'] = wn.ADJ
        tag_map['V'] = wn.VERB
        tag_map['R'] = wn.ADV

        description = dict["description"].lower()

        words = word_tokenize(description)

        # list of tokenized and processed words
        Final_words = []
        word_Lemmatized = WordNetLemmatizer()
        # pos_tag function below will provide the 'tag' i.e if the word is Noun(N) or Verb(V) or something else.
        for word, tag in pos_tag(words):
            # Below condition is to check for Stop words and consider only alphabets
            if word not in stopwords.words('english') and word.isalpha():
                word_Final = word_Lemmatized.lemmatize(word, tag_map[tag[0]])
                Final_words.append(word_Final)

        # transform words to vector from pickeled model
        word_trans = self.vectorizer.transform([str(Final_words)])

        prediction = self.model.predict(word_trans)

        return self.__categories[prediction[0]]

if __name__ == '__main__':
    model = Classifier()
    print(model.classify({"description": "Independence Blue Cross payment"}))