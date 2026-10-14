# Support Vector Machines: Presentation Script

Spoken script for every screen of the site, split between the three presenters.

---

## AMAN KOLEY · Chapter 1: SVM Fundamentals

### Title card
Hello everyone! Today we're going to learn about Support Vector Machines, or SVM, one of the most important ideas in machine learning. We'll use one example all the way through: predicting whether a student will pass or fail an exam. I'm Aman, and I'll start with Chapter 1: SVM Fundamentals.

### Introduction to SVM
SVM is a supervised machine learning method. It uses labeled data to classify new examples and to find patterns.

Our example uses two things we can measure about every student: how many hours they studied and how many classes they attended. From those, we want to predict whether a student will pass or fail.

So the question for today is: how does SVM classify new data?

### What is Machine Learning?
In traditional programming, we write the rules ourselves. We give the computer rules and data, and it gives us answers.

Machine learning flips this around. We give the computer data and the correct answers, and it learns the rules by itself.

Think of apples and oranges. Apples are red, round and smooth. Oranges are orange, round and textured. After seeing about a hundred labeled examples, a model can look at a fruit it has never seen and predict: apple. Machine learning uses patterns in labeled examples to classify unseen data.

### Features and Labels
A computer doesn't see a student. It sees numbers. Each student is represented by numerical features.

In this table, Riya studied 6 hours and attended 8 classes, and she passed. Aarav studied 4 hours and attended 4 classes, and he failed. Each row becomes one dot on the graph: hours studied along the bottom, classes attended up the side. Blue dots passed, red dots failed.

The numbers we measure, hours and classes, are called features. The answer we already know, pass or fail, is called the label.

Notice the pattern: the blue dots are at the top right and the red dots are at the bottom left.

### Supervised Learning
In supervised learning, the model learns from examples with known labels. Examples and their labels go in, and a trained model comes out.

There are two main kinds of tasks. Classification predicts a category, like pass or fail. Regression predicts a number, like exam marks out of a hundred. SVM can do both, and today we'll focus on classification.

### What is SVM?
SVM finds the best line to separate two groups: the line with the widest gap between them.

Many lines separate the blue dots from the red dots, and all of these work. SVM keeps only the one with the widest road around it, the biggest safety gap on both sides.

The name has three parts.

Support: only a few points hold up the line. These highlighted points are the ones closest to the boundary.

Vector: each point is a vector, a list of numbers. Riya is six and eight.

Machine: a method, a set of steps, that the computer follows.

### What is a Hyperplane?
The boundary SVM uses to separate the groups is called a hyperplane.

In one dimension, the boundary is a point. In two dimensions, it's a line. In three dimensions, it's a flat plane. In four or more dimensions, we call it a hyperplane. We can't draw four dimensions, but the maths works exactly the same way.

Many boundaries separate the classes. Which one gives the largest margin?

Over to Akshara.

---

## AKSHARA AGARWAL · Chapter 2: Margins and Optimisation

### Title card
Thank you, Aman. I'm Akshara, and I'll present Chapter 2: Margins and Optimisation. We'll look at maximum margins, support vectors, and the objective SVM optimises.

### Comparing Decision Boundaries
Think of the boundary as a road between two groups: the Fail examples in red and the Pass examples in blue.

Right now the road cuts through both groups, and seven students are on the wrong side.

If I adjust the boundary so it runs between the groups, every red point is on one side and every blue point is on the other. The road now splits the two groups.

But it isn't the only boundary that works. Here are five more, A to E, and all of them separate the classes.

Let's compare margins. A boundary that is too close to the red points is risky, and so is one that is too close to the blue points. The best choice is equally far from the nearest red and the nearest blue point. That's the maximum margin.

This is the best line: it leaves the biggest gap to the closest points on both sides. Of our five roads, road C comes closest to it.

### Finding the Maximum Margin
Now the road has a width, and that width is the margin. Right now it's only 12 metres wide, because the road passes close to some points.

Finding the widest position by hand is hard, so let's fit an SVM.

Twenty-nine metres. That's the maximum margin.

The highlighted points touch the edges of the road. These are the support vectors.

If I move a point that is far from the road, nothing changes. If I move one of the support vectors, the road moves with it. Only the support vectors decide where the boundary goes.

Three points are highlighted because a straight road needs three things fixed: its tilt, its position and its width. Two points on one edge fix the tilt, and one point on the other edge fixes the width.

### The Math: A Line That Decides
You already know the line y equals m x plus c. SVM writes a line like this: w one x one, plus w two x two, plus b, equals zero.

x one and x two are the features: hours and classes. w one and w two are the weights, which say how important each feature is. And b is the bias, which moves the line.

For Riya: 2 times 6, plus 1 times 8, minus 15, equals plus 5. The result is positive, so the prediction is Pass.

For Aarav: 2 times 4, plus 1 times 4, minus 15, equals minus 3. The result is negative, so the prediction is Fail.

If the result is greater than zero, the prediction is Pass. If it's less than zero, it's Fail. The sign decides the group.

Changing the bias slides the line. Setting the weight for classes to zero means classes don't count at all, and five students end up on the wrong side.

In a real SVM, the weights and the bias are learned from the training data, not chosen by hand.

### The Math: The Widest Road
This is the boundary SVM chooses.

The middle line is where w dot x plus b equals zero. The dashed lines are where it equals plus one and minus one: the edges of the road. The width of the road is the margin, and it equals 2 divided by the size of w. A smaller w means a wider road.

The points on the dashed lines, Aditya, Meera and Aarav, are the support vectors. The arrow from Aarav across the road shows the margin.

SVM's goal is to make the road as wide as possible while keeping every point on the correct side.

A bigger margin helps, but it doesn't guarantee correct predictions.

### SVM's Goal in One Line (optional)
Here is the whole SVM idea in one line: a wide road plus a penalty for margin violations.

The formula has four parts.

One half times the size of w squared: the first part rewards a wide margin.

C times the sum of xi: the second part penalises margin violations.

C controls the penalty for margin violations.

And xi measures how much each point violates the margin.

A real SVM solves this mathematically. Our animations only show the idea.

### Outliers and Soft Margins
Real data is messy. Arjun is an outlier: a Fail example located among the Pass examples.

A hard-margin SVM needs perfect separation, with no point inside the margin. That makes it very sensitive to outliers like Arjun.

A soft-margin SVM allows some margin violations, but it charges a penalty for each one. The size of that penalty is C.

With a low C, the penalty is small. The road stays wide, 31 metres, and Arjun is misclassified, which costs only a small penalty.

As C increases, violations cost more. Now Arjun sits inside the margin.

With a high C, violations are expensive. The road squeezes past Arjun so he's correctly classified, but the road is only 4 metres wide.

So low C means a lower penalty and a wider margin, and high C means a higher penalty and a narrower margin. In a soft margin, the support vectors can also include points inside the margin or on the wrong side.

But what if no straight road works at all?

Over to Shivam.

---

## SHIVAM SINGH · Chapter 3: Kernels and Applications

### Title card
Thank you, Akshara. I'm Shivam, and I'll present Chapter 3: Kernels and Applications. We'll look at curved boundaries, how to tune SVM, and where it's used in the real world.

### Nonlinear Classification
Here, the red points form a central cluster, and the blue points surround them. A straight boundary cannot separate them. Wherever we put the line, fourteen points end up on the wrong side. This is called non-linearly separable data.

The solution is a feature mapping. We add a new feature, z equals x squared plus y squared, and lift each point to that height.

The red points near the center stay low, and the blue points far from the center rise high. Now a flat plane separates the two classes.

Bringing the points back down, the separating plane becomes a circular boundary in two dimensions.

This is the kernel trick. A kernel computes similarities in the transformed space without calculating every new coordinate, which saves a lot of computation.

### SVM's Kernel Toolbox
A kernel determines the types of decision boundaries SVM can learn.

Linear gives a straight line. It's the best place to start, especially for simple data or text.

Polynomial gives curved boundaries, for patterns that bend.

RBF, also called Gaussian, gives flexible shapes, like a red cluster in the middle. It's a popular default.

Sigmoid gives S-shaped boundaries and is related to neural networks. It's less common in practice.

Choose a kernel that suits the data.

### Gamma: Circles of Influence
Gamma is a setting for the RBF kernel. It controls how far each point's circle of influence reaches.

With a low gamma, each point influences a wide area, so the boundary is smooth and broad.

With a high gamma, each point only influences its close neighbourhood, so the boundary becomes very local and complex.

Don't confuse gamma with C. C is the penalty for margin violations. Gamma is how far each point's influence reaches. This picture is a conceptual illustration.

### Overfitting vs Underfitting
Underfitting happens when a model is too simple to capture the underlying pattern. It's like learning only three definitions before an exam.

Overfitting happens when a model fits the noise in the training data and performs poorly on new data. It's like memorising last year's paper and getting stuck when a question changes.

A good fit captures the pattern and generalises to unseen data. SVM finds this balance using its margin, C, the kernel and gamma.

### SVM Types and Applications
SVM comes in several types. SVC is for classification, like pass or fail. SVR is for regression: it predicts a number, keeping most points inside a tube around a line. One-Class SVM learns what normal looks like and flags anything unusual. And for more than two groups, one-vs-rest trains one SVM per group and combines their answers.

SVM is used in many real-world areas. In spam detection, it learns from known spam and normal emails. With medical data, it helps classify disease patterns, though it needs careful clinical checking before real use. In finance, it explores whether prices may move up or down, with no guarantee of profit. And in anomaly detection, it learns normal sensor readings and flags unusual ones.

### Advantages vs Disadvantages
SVM's advantages: it works well with many features, it's built on a clear idea, the widest margin, kernels let it handle curved patterns, and it performs well on small and medium datasets.

Its disadvantages: kernel SVMs can be slow on very large datasets, they are sensitive to feature scaling, the kernel and settings may need tuning, and curved models are hard to explain.

Every tool has strengths and weaknesses. No algorithm is automatically best for every dataset.

### From Data to Prediction
Here is the whole process in five steps. One: collect data, such as hours, classes and results. Two: turn it into features and labels. Three: scale the features and choose a kernel, along with C and gamma. Four: train the model, which means finding the widest road. Five: test it, then predict for new students.

Let's predict a new student who studied 7 hours and attended 4 classes. The calculation is 0.5 times 7, plus 0.5 times 4, minus 5, which is plus 0.5. The result is positive, so the predicted class is Pass.

But this point is inside the margin, close to the decision boundary, so the prediction is less certain. Predictions are model estimates, not certainties.

Now let's review the key concepts, all three of us together.

---

## ALL PRESENTERS · Review and Summary

### Quick Quiz

**Aman**

Question 1: What does SVM try to maximise in classification? The number of features, the margin, or the number of errors?
The answer is the margin.

Question 2: What are support vectors? The closest influential training points, all points in a dataset, or a type of graph?
The answer is the closest influential training points.

**Akshara**

Question 3: What is a kernel used for? Deleting noisy data, increasing accuracy to 100%, or learning nonlinear boundaries?
The answer is learning nonlinear boundaries.

Question 4: What happens with a very high C? Violations become more costly, the model becomes more forgiving, or the dataset becomes bigger?
The answer is that violations become more costly.

**Shivam**

Question 5: What does SVR predict? Only two classes, numerical values, or only flower names?
The answer is numerical values. SVR is the regression version of SVM.

### SVM Summary

**Aman**

To summarise: SVM learns a decision boundary that separates the classes while maximising the margin. The training points that determine this boundary are called support vectors, and the boundary is called a hyperplane. If a straight boundary isn't enough, SVM can use kernels to find more complex boundaries. The result is a model that can classify new data.

**Akshara**

And the key takeaway: SVM doesn't simply try to separate training examples. It tries to learn a boundary that balances separation, margin size and allowed errors, so it can make useful predictions on unseen data.

**Shivam**

Thank you. We're happy to take questions. And now, let's try it with real Python.

---

## ALL PRESENTERS · Live Demo: Try It with Real Python

### Python Code: SVM in Action (Aman)
Let's train a real SVM on the Iris flower dataset. First, we load 150 flowers, each with four measurements and a species label. Then we split them, keeping some flowers aside as an honest test. Next, we scale the measurements and train the SVM, learning both from the training flowers only. Then we predict the species of the unseen test flowers, compare the predictions with the real answers, and finally predict the species of one new flower. Because the scaling is learned only from the training data, no test data sneaks into training. That's called preventing data leakage.

### Is Our SVM Any Good? (Akshara)
Accuracy isn't the whole story. If a model classifies 90 out of 100 emails correctly, its accuracy is 90%. Precision asks: of the emails we called spam, how many really were spam? Recall asks: of all the real spam, how much did we catch? The F1-score balances the two, and the confusion matrix shows every correct and incorrect prediction. When one class is rare, like fraud, precision and recall tell us much more than accuracy alone.

### SVM vs Other Algorithms (Shivam)
Same data, different ways of learning. Logistic regression learns a straight-line score and turns it into probabilities. A decision tree learns a series of yes-or-no questions. KNN looks at the closest known examples. A neural network learns layers of transformations. And SVM learns the boundary with the widest margin. Let's start the race and compare them on the same test data. No single algorithm is best for every problem.

Thank you all!
