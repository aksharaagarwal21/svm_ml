import json
import numpy as np
import sklearn
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

# Every model gets exactly the same examples and held-out test set.
X, y = make_moons(n_samples=300, noise=0.25, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y
)
models = [
    ("Logistic Regression", LogisticRegression(random_state=42, max_iter=1000)),
    ("Decision Tree", DecisionTreeClassifier(random_state=42)),
    ("KNN", KNeighborsClassifier(n_neighbors=5, n_jobs=1)),
    ("Neural Network", MLPClassifier(hidden_layer_sizes=(16, 16),
                                    solver="lbfgs", max_iter=2000, random_state=42)),
    ("SVM", SVC(kernel="rbf", C=1.0, gamma="scale")),
]

# Render actual predictions on one shared grid, with held-out examples on top.
# SVG needs no plotting dependency in the browser and stays sharp on a projector.
x_min, y_min = X.min(axis=0) - 0.4
x_max, y_max = X.max(axis=0) + 0.4
size = 80
xx, yy = np.meshgrid(np.linspace(x_min, x_max, size),
                     np.linspace(y_max, y_min, size))
grid = np.c_[xx.ravel(), yy.ravel()]

def boundary_svg(model):
    regions = model.predict(grid).reshape(size, size)
    parts = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240">',
             '<rect width="320" height="240" fill="#dce8fb"/>']
    for row in range(size):
        start = 0
        while start < size:
            end = start + 1
            while end < size and regions[row, end] == regions[row, start]:
                end += 1
            if regions[row, start] == 1:
                parts.append(f'<rect x="{start*4}" y="{row*3}" '
                             f'width="{(end-start)*4}" height="3" fill="#fbdede"/>')
            start = end
    for point, label in zip(X_test, y_test):
        px = (point[0] - x_min) / (x_max - x_min) * 320
        py = (y_max - point[1]) / (y_max - y_min) * 240
        color = "#1c62d6" if label == 0 else "#e03131"
        parts.append(f'<circle cx="{px:.2f}" cy="{py:.2f}" r="3.8" '
                     f'fill="{color}" stroke="#fff" stroke-width="1.2"/>')
    return "".join(parts) + "</svg>"

results = []
for name, estimator in models:
    # Each scaler learns only from the training set.
    model = make_pipeline(StandardScaler(), estimator)
    model.fit(X_train, y_train)
    results.append({"name": name,
                    "accuracy": accuracy_score(y_test, model.predict(X_test)),
                    "svg": boundary_svg(model)})
_result = {"models": results, "train_count": len(y_train),
           "test_count": len(y_test), "sklearn": sklearn.__version__}
