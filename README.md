# Build the Widest Road

An interactive website that teaches Support Vector Machines (SVM) to beginners, using one example throughout: predicting whether a student passes or fails from hours studied and classes attended. It's built for presenting on a projector by three presenters.

The big idea: SVM builds the **widest road** between two groups. The road's center line is the decision boundary, its width is the margin, and the points touching its edges are the support vectors.

## How to open it

Open `index.html` in Chrome or Edge, and keep the `live-demo` folder next to it.

Everything works offline except the first load of Python for the Live Demo, which comes from the internet. If Python can't load, the demo offers **Show saved output** instead. See [`live-demo/README.md`](live-demo/README.md).

## What's inside

| Part | Presenter | Screens |
|---|---|---|
| Chapter 1: SVM Fundamentals | Aman Koley | Introduction, machine learning, features and labels, supervised learning, what SVM is, hyperplanes |
| Chapter 2: Margins and Optimisation | Akshara Agarwal | Comparing decision boundaries, finding the maximum margin, the maths of the margin, the optional objective, outliers and soft margins |
| Chapter 3: Kernels and Applications | Shivam Singh | Nonlinear classification and the kernel trick, kernels, gamma, overfitting, types and applications, pros and cons, from data to prediction |
| Review and Summary | All three | Quick quiz and SVM summary |
| Live Demo | All three | Real Python (scikit-learn) in the browser: the Iris example, evaluation metrics, and SVM vs other algorithms |

Presenter names are set in `window.PRESENTERS` at the top of `index.html`.

## Presenting

| Key | What it does |
|---|---|
| → / Space / Page Down | Next step or screen |
| ← / Page Up | Previous screen |
| Home / End | First or last screen |
| N | Show or hide presenter notes |
| M | Menu to jump to any chapter |
| F | Full screen |
| A–C or 1–3 | Answer a quiz question |

## More files

- [`SCRIPT.md`](SCRIPT.md): the spoken script for every screen.
- [`PRESENTER-CHECKLIST.md`](PRESENTER-CHECKLIST.md): what to check before class, timing, and a Live Demo backup plan.
- [`GLOSSARY.md`](GLOSSARY.md): the key SVM terms in plain language.
