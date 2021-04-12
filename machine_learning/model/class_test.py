import numpy as np
import pandas as pd

import pickle
import sys

from nltk.tokenize import word_tokenize
from nltk import pos_tag
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.preprocessing import LabelEncoder
from collections import defaultdict
from nltk.corpus import wordnet as wn
from sklearn.feature_extraction.text import TfidfVectorizer

from sklearn import svm

def main():
    # verify that a description has been passed: `python class_test.py 'morgage payment'`
    if (len(sys.argv) < 2):
        print('Error: please enter description to classify')
    elif (len(sys.argv) == 2):
        #description entered in ""
        desc = str(sys.argv[1])
        print_result(desc)
    else:
        #description entered as list of args: `python class_test.py morgage payment`
        desc = ' '.join(sys.argv[1:])
        print_result(desc)

def make_tag_map():
    #create tag map for word pre-processing
    tag_map = defaultdict(lambda : wn.NOUN)
    tag_map['J'] = wn.ADJ
    tag_map['V'] = wn.VERB
    tag_map['R'] = wn.ADV
    return tag_map

def get_cat(cat_desc):
    #Import pickled models
    clf = pickle.load(open('linear_clf.pkl', 'rb'))
    Tfidf_vect = pickle.load(open('Tfidf_vect.pkl', 'rb'))

    #create tag map for word pre-processing
    tag_map = make_tag_map()

    #list of the category names
    cat_list = ['Housing', 'Transportation', 'Debt', 'Insurance',
            'Utilities', 'Medical/Healthcare', 'Savings', 'Retirement',
            'Education', 'Groceries/Household', 'Entertainment', 'Essentials',
            'Non-Essentials', 'Other']
    cat_desc = cat_desc.lower()
    words = word_tokenize(cat_desc)
    
    #list of tokenized and processed words
    Final_words = []
    word_Lemmatized = WordNetLemmatizer()
    # pos_tag function below will provide the 'tag' i.e if the word is Noun(N) or Verb(V) or something else.
    for word, tag in pos_tag(words):
        # Below condition is to check for Stop words and consider only alphabets
        if word not in stopwords.words('english') and word.isalpha():
            word_Final = word_Lemmatized.lemmatize(word,tag_map[tag[0]])
            Final_words.append(word_Final)
            
    #transform words to vector from pickeled model
    word_trans = Tfidf_vect.transform([str(Final_words)])
    #predict classification num
    prediction = clf.predict(word_trans)
    #return string of predicted category
    return (cat_list[prediction[0]])

def print_result(cat_desc):
    result = get_cat(cat_desc)
    print(cat_desc + ": " + result)

if __name__ == "__main__":
    main()