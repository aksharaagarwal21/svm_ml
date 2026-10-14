# SVM Glossary

The key terms from the lesson, in plain language.

| Term | Remember it as |
|---|---|
| **Machine learning** | The computer learns rules from examples instead of us writing them. |
| **Supervised learning** | Learning from examples that already have the correct answers. |
| **Features** | What we measure, like hours studied and classes attended. |
| **Label** | The answer we already know, like Pass or Fail. |
| **Classification** | Predicting a category, like Pass or Fail. |
| **Regression** | Predicting a number, like exam marks. |
| **SVM** | A method that finds the boundary with the widest margin between groups. |
| **Hyperplane** | The decision boundary: a point in 1D, a line in 2D, a plane in 3D. |
| **Margin** | The safety gap between the boundary and the closest points. Width = 2 / ‖w‖. |
| **Support vectors** | The training points closest to the boundary (or inside the margin). They decide where it goes. |
| **Hard margin** | Every point must be on the correct side, outside the margin. Sensitive to outliers. |
| **Soft margin** | Allows some margin violations, with a penalty, to get a better overall boundary. |
| **C** | The penalty for margin violations. Low C is more tolerant; high C is stricter. |
| **Kernel** | A way to learn curved boundaries by measuring similarity in a transformed space. |
| **Linear kernel** | A straight or flat boundary. A good starting point, especially for text. |
| **RBF kernel** | A flexible, curved boundary. A popular default for nonlinear patterns. |
| **Gamma (γ)** | How far each point's influence reaches in the RBF kernel. Low is smooth; high is very local. |
| **Underfitting** | The model is too simple to capture the pattern. |
| **Overfitting** | The model fits noise in the training data and does badly on new data. |
| **SVR** | Support Vector Regression: the SVM family's way of predicting numbers. |

## In one sentence

SVM learns a boundary that balances separation, margin size and allowed errors, so it can make useful predictions on data it has never seen.
