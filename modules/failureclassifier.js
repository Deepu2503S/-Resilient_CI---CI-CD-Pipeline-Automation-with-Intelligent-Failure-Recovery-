class FailureClassifier {
  classify(errorMessage) {
    if (!errorMessage) {
      return "NO_FAILURE";
    }

    if (errorMessage.includes("TypeError") || errorMessage.includes("ReferenceError")) {
      return "LOGIC_ERROR";
    }

    if (errorMessage.includes("SyntaxError")) {
      return "SYNTAX_ERROR";
    }

    if (errorMessage.includes("ENOENT") || errorMessage.includes("MODULE_NOT_FOUND")) {
      return "DEPENDENCY_ERROR";
    }

    if (errorMessage.includes("Permission denied")) {
      return "ENVIRONMENT_ERROR";
    }

    if (errorMessage.includes("Timeout")) {
      return "TIMEOUT_ERROR";
    }

    return this.mlClassify(errorMessage);
  }
  mlClassify(errorMessage) {
    
    console.log("ML model analyzing error...");
    return "ML_CLASSIFIED_FAILURE";
  }
}

module.exports = FailureClassifier;
