# Live Demo

Open the presentation normally and select **Live Demo** from the **M** menu.
The three screens follow the existing closing screen. Arrow keys, Space, N,
and M continue to use the presentation's navigation. On the Python screen,
Next / Space walks through the six blocks before advancing.

Python loads only when a demo screen opens. It runs in a web worker to keep
the presentation responsive. The pinned runtime is Pyodide 0.27.7 from
cdn.jsdelivr.net, with scikit-learn 1.6.1. No audience installation is needed.

If loading fails, **Show saved output** uses the included local results.
That button also becomes available after 20 seconds on a slow connection.
**Retry Python** retries failed loading. Saved Iris output explicitly uses
RBF and C=1.0; selecting it restores those settings. Live reruns use the
current controls. Result labels always identify the actual run settings.
Keep the `live-demo` directory alongside `index.html` for offline use.

The binary matrix keeps the dataset size and actual classes fixed: changing
one prediction transfers an example to the other cell in that actual-class
row. Iris metrics use macro averages for precision, recall and F1. Zero
denominators are displayed as zero with an explanation where applicable.

The race uses 300 `make_moons` examples, noise 0.25, seed 42, and a stratified
75%/25% train/test split. All five models share that split and learn scaling
from training data only. The SVG images show real predictions on an 80×80
grid with held-out examples overlaid. Accuracies are test scores, not timing
measurements. The explicit estimator settings are in `race.py`.

## Reproduce saved results

With local Python available, install the pinned scikit-learn 1.6.1 and run:

```sh
pip install -r live-demo/requirements.txt
python live-demo/generate_saved.py
```

This executes `iris.py` plus `iris-result.py`, and `race.py`, then writes
`data.js`. The browser runs those same packaged source strings. Saved data
includes source hashes, generation time, library version, printed Iris
output, its confusion matrix, and the five race scores and boundary SVGs.
Never edit the generated scores or images by hand.

Runtime reference: https://pyodide.org/en/0.27.7/usage/webworker.html
