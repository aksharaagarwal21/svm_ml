# Collect the fitted model's actual results for the teaching interface.
from sklearn.metrics import confusion_matrix
import sklearn
import json

_result = {
    "accuracy": accuracy_score(y_test, y_pred),
    "matrix": confusion_matrix(y_test, y_pred).tolist(),
    "labels": iris.target_names.tolist(),
    "species": str(iris.target_names[prediction[0]]),
    "kernel": model.named_steps["svc"].kernel,
    "C": model.named_steps["svc"].C,
    "sklearn": sklearn.__version__,
}
