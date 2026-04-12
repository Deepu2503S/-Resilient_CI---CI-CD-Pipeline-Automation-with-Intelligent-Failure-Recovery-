from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import pickle
import sys
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")

texts = [
    # LOGIC ERRORS
    "typeerror cannot read property",
    "referenceerror variable not defined",
    "undefined is not a function",
    "null pointer exception",
    "invalid argument type",
    "object is not iterable",
    "cannot set property of undefined",
    "division by zero error",
    "ufunc add did not contain a loop",
    "numpy ufunc type mismatch",
    "numpy core exceptions ufuncnolooperror",
    "dtype float64 string mismatch",
    "numpy type error incompatible types",
    # SYNTAX ERRORS
    "syntaxerror unexpected token",
    "invalid syntax python",
    "indentationerror unexpected indent",
    "missing semicolon",
    "unexpected end of input",
    "unterminated string literal",
    "missing bracket syntax error",
    "invalid token javascript",
    # DEPENDENCY ERRORS
    "module not found",
    "cannot find package express",
    "importerror no module named numpy",
    "npm install failed",
    "pip install error",
    "missing node modules",
    "dependency resolution failed",
    "package not installed",
    # ENVIRONMENT ERRORS
    "permission denied linux",
    "access denied error",
    "environment variable missing",
    "port 3000 already in use",
    "database connection failed",
    "invalid db credentials",
    "config file missing",
    "mysql connection refused",
    # TIMEOUT ERRORS
    "execution timeout exceeded",
    "request timed out",
    "connection timeout",
    "process killed due to timeout",
    "api request timeout",
    "server timeout reached",
    "long running process killed",
    "build timeout error",
    # UNKNOWN
    "unexpected runtime failure",
    "application crashed",
    "internal server error",
    "fatal error occurred"
]

labels = [
    # LOGIC
    "LOGIC_ERROR","LOGIC_ERROR","LOGIC_ERROR","LOGIC_ERROR",
    "LOGIC_ERROR","LOGIC_ERROR","LOGIC_ERROR","LOGIC_ERROR",
    "LOGIC_ERROR","LOGIC_ERROR","LOGIC_ERROR","LOGIC_ERROR","LOGIC_ERROR",
    # SYNTAX
    "SYNTAX_ERROR","SYNTAX_ERROR","SYNTAX_ERROR","SYNTAX_ERROR",
    "SYNTAX_ERROR","SYNTAX_ERROR","SYNTAX_ERROR","SYNTAX_ERROR",
    # DEPENDENCY
    "DEPENDENCY_ERROR","DEPENDENCY_ERROR","DEPENDENCY_ERROR","DEPENDENCY_ERROR",
    "DEPENDENCY_ERROR","DEPENDENCY_ERROR","DEPENDENCY_ERROR","DEPENDENCY_ERROR",
    # ENVIRONMENT
    "ENVIRONMENT_ERROR","ENVIRONMENT_ERROR","ENVIRONMENT_ERROR","ENVIRONMENT_ERROR",
    "ENVIRONMENT_ERROR","ENVIRONMENT_ERROR","ENVIRONMENT_ERROR","ENVIRONMENT_ERROR",
    # TIMEOUT
    "TIMEOUT_ERROR","TIMEOUT_ERROR","TIMEOUT_ERROR","TIMEOUT_ERROR",
    "TIMEOUT_ERROR","TIMEOUT_ERROR","TIMEOUT_ERROR","TIMEOUT_ERROR",
    # UNKNOWN
    "ML_CLASSIFIED_FAILURE","ML_CLASSIFIED_FAILURE",
    "ML_CLASSIFIED_FAILURE","ML_CLASSIFIED_FAILURE"
]

def train():
    print("[ML] Training model...")

    X_train, X_test, y_train, y_test = train_test_split(
        texts, labels, test_size=0.2, random_state=42, stratify=labels
    )

    vectorizer = TfidfVectorizer(
        ngram_range=(1, 2),
        stop_words='english',
        max_features=1000
    )

    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec  = vectorizer.transform(X_test)

    model = LogisticRegression(
        max_iter=1000,
        class_weight='balanced',
        C=2
    )
    model.fit(X_train_vec, y_train)

    y_pred   = model.predict(X_test_vec)
    accuracy = accuracy_score(y_test, y_pred)

    print(f"[ML] Accuracy: {accuracy}")
    print(classification_report(y_test, y_pred, zero_division=0))

    with open(MODEL_PATH, "wb") as f:
        pickle.dump((vectorizer, model), f)

    print(f"[ML] Model saved to {MODEL_PATH}")

def predict(error_text):
    if not os.path.exists(MODEL_PATH):
        train()

    with open(MODEL_PATH, "rb") as f:
        vectorizer, model = pickle.load(f)

    X          = vectorizer.transform([error_text.lower()])
    prediction = model.predict(X)[0]
    print(prediction)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("ML_CLASSIFIED_FAILURE")
        sys.exit(0)

    mode = sys.argv[1]

    if mode == "train":
        train()
    elif mode == "predict":
        error_text = " ".join(sys.argv[2:]) if len(sys.argv) > 2 else ""
        predict(error_text)
    else:
        predict(" ".join(sys.argv[1:]))