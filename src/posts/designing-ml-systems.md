---
title: Book Review: Designing Machine Learning Systems by Chip Huyen
slug: designing-ml-systems
date: '2024-10-28'
image: /images/logo.png
description: Chip Huyen’s Designing Machine Learning Systems (2022) is a refreshing departure from conventional machine learning (ML) texts, which often spotlight algorithms and modeling techniques alone. Huyen’s book offers a holistic perspective on ML rather than merely focusing on models, it explores the extensive architecture needed to bring machine learning solutions into production. The book’s emphasis on creating a sustainable ML ecosystem—from data pipelines and infrastructure to deployment and maintenance—makes it essential for both seasoned ML engineers and those interested in taking their skills beyond academic models. It's the first book I've read by this author, and it won't be the last.
published: false
---

## Contents 


# It's too simple for machine learning

The author does a great job highlighting common misperceptions throughout the book. I personally liked how the author starts with providing context for those reading, that *"an incredible amount of excitement and hype generated by people both inside and outside the field, machine learning (ML) is not a magic tool that can solve all problems."*

# Your priorities are not the companies priorities

> *A machine learning system is a Vague wrapping term for all the interfaces, data algorithms, infrastructure, and hardware that are used in Machine Learning applications*

The author highlights that production ML Systems are vastly different from place to place due to the business requirements that are put into place.

> *While most of us are comfortable with using a microwave without understanding how it works, many don’t feel the same way about AI yet, especially if that AI makes important decisions about their lives.*

Production system stakeholders care more about, Latency and throughput speeds of the model, Data privacy, Fairness, Bias, Interoperability

## System Requirements

> *ML systems design is the process of defining all the components of an ML system, including interface, algorithms, data, infrastructure, and hardware, so that the system satisfies specified requirements.*

For the purposes of highlighting the key points of the authors work, I've listed out the the *Key Requirements* for ML systems in general

- Reliability - Preventing down time, system configuration errors, and architecture problems ensuring your system is reliable is important
- Scalability - Providing enough computational power (vertically/horizontally) whilst being able to scale down to save cost is necessary. ML models are not cheap to train in production
- Maintainability - Infrastructure as Code, Code Versioning, and other DevOps techniques for ML create the "MLOps" buzzword term. It's a niche overlap, but a requirement non the less
- Adaptability - The system should be flexible to introduce change without refactoring the foundational architecture. Simple, intuitive, and explainable.

## How to create any ML system

The author creates a valuable outline, from her experiences in different production environments. She notes: *This is often times a never ending process, there will always be new emerging technologies and things to iterate. The 'process' can be viewed as a cycle, or a lot of back and forth steps.*

Essentially follow these steps:
1. Scope out your project - outline objectives. goals, constraints, evaluation criteria, budget, etc.
2. Engineer your Data - source datasets, develop pipelines, and process your data
3. Develop your model - proceed with a model selection and training process, and identify what is best for your project
4. Deploy your model - Make the model as accessible to end users/apps, evaluate which deployment technique is best for you
5. Monitor your model - evaluate the deployed models performance, and evaluate the predictions for bias, fairness, etc.
6. Perform Business Analysis - finally, return to your goals and identify the metrics that can provide business insights 

## Data is King

A common perception, the author identifies, that engineers have is that tweaking the underlying ML algorithm in a clever way will make the model become drastically better. *Instead of focusing on improving ML algorithms, most companies focus on managing and improving their data.*

**Note: The author does not suggest to ignore the benefits of developing better algorithms**

ML systems are rooted in data, while there are major improvements to model algorithms that are found in research state of the arts. The author also highlights throughout the text, that state of the art models are not always made for production settings.

### Data sources

An ML System works with many different data sources. the author suggests sources may contain different formats, characteristics, or even shared hidden relationships between other sourced data (multimodal relationships).

Different types of data:
- user data - explicit input by users
- system generated data - implicit data of users (logs, system metrics, etc.)
- system generated user data - *"behaviors, such as clicking, choosing a suggestion, scrolling, zooming, ignoring a popup"*

### Data formats

This was one of my favorite sections as it highlighted some information that I had forgotten about. The author outlines a quick write up on common data formats (csv, json, parquet, avro, protobuf, and pickle) before she outlines **when to use certain formats**.

CSVs for example are efficient when you want to access/filter on the rows because of its **row-major format**. Parquet for example would be efficient when you want to access/filter on a column (timestamp, or another similar kind of attribute) because of its **column-major format

> *AWS recommends using the Parquet format because “the Parquet format is up to 2x faster to unload and consumes up to 6x less storage in Amazon S3, compared to text formats.”*

### Data Processing

> *As the speed at which applications respond to users queries has become a competitive advantage, it’s become more and more important to make data available for use as fast as possible.*

As the author outlines, companies desire online processing not just for transactional queries, but also for analytical queries. Essentially, this is real-time data processing
### The difference between a data lake and a data warehouse

> *Structured data is data that follows a predefined data model, also known as a data schema.*

Unstructured data is data that doesn’t adhere to a predefined data schema. It’s usually text but can also be numbers, dates, etc. For example, a text file of logs generated by your ML model is unstructured data.

Storage for structured data it called a **data warehouse**, and storage for unstructured data is called a **data lake.
### Do you ETL or ELT 

One of the more interesting sections in the text in my opinion. The author does a great job in highlighting some problems that companies really run into. 

> With the knowledge of production data pipelines, the constantly changing formats of data, the rapid growth of the size of data, and the growth of data sources... *“Why not just store all data in a data lake so we don’t have to deal with schema changes? Whichever application needs data can just pull out raw data from there and process it.”*

**ETL** means to **Extract, Transform, and Load**. It can be general purpose processing and aggregating functions for manipulating data in to the desired output shape. **ELT** means to **Extract, Load, and Transform.** Where loading data into storage first and then processing it later is used for faster arrival of formatted data

## Cost Sensitive Learning

One of the most interesting approaches the author discusses for handling class imbalance. Unlike traditional loss functions that treat all misclassifications equally, cost-sensitive learning assigns different costs to different types of errors.

> _Cost-sensitive learning introduces the idea that not all prediction errors should be treated equally. In real-world applications, the cost of missing a fraudulent transaction might be much higher than flagging a legitimate transaction for review._

### Class Weights vs Sample Weights

The author makes an important distinction here that I found particularly valuable. While both approaches modify the loss function, they serve different purposes:

- Class weights: applied uniformly to all samples of a particular class
- Sample weights: can be unique for each individual training example

> _Class weights are easier to implement but less flexible than sample weights. Sample weights give you the flexibility to assign different importance to different samples within the same class._

## Data Distribution Shifts

This section resonated with me as it addresses a real challenge in production ML systems. The author emphasizes that data distributions change over time, and models need to account for this reality.

Different types of distribution shifts:

- Covariate shift - input distribution changes but the relationship stays the same
- Label shift - output distribution changes but the relationship stays the same
- Concept drift - the relationship between inputs and outputs changes

> _In production, multiple types of shifts often happen simultaneously, making it difficult to identify and address each type individually._

### Detecting Distribution Shifts

The author does a great job breaking down various approaches to detect when your data has shifted. I particularly liked how she emphasizes that detecting shifts isn't just about mathematical tests.

Some key methods include:

- Statistical tests (KS test, Chi-squared test)
- Monitoring prediction confidence
- Tracking feature statistics
- Evaluating model performance metrics

> _While statistical tests can help detect distribution shifts, they shouldn't be your only line of defense. Domain expertise and business context are crucial for interpreting whether detected shifts are meaningful._

### Handling Distribution Shifts

**Notice: The author emphasizes that preventing all distribution shifts is impossible, so having strategies to handle them is crucial**

The author outlines several practical approaches:

- Continuous training with fresh data
- Maintaining separate models for different data distributions
- Using adaptive learning techniques
- Implementing robust feature engineering

> _The key is not to try to prevent all distribution shifts—which is impossible—but to build systems that can detect and adapt to these shifts as they occur._

## Model Development

This chapter particularly stood out to me because it challenges common assumptions about model development in production environments.

> _While most ML courses and research papers focus on model architectures and training algorithms, in production, your choice of model architecture is often constrained by your system requirements._

### The Trade-offs in Model Selection

The author presents a realistic view of model selection that I found refreshing. Instead of just chasing state-of-the-art performance, she emphasizes considering various practical factors:

- Computational resources available
- Latency requirements
- Model interpretability needs
- Deployment constraints
- Maintenance overhead

> _A slightly less accurate model that's faster, more interpretable, and easier to maintain might be a better choice for your production system than a state-of-the-art model that requires significant computational resources._

I personally appreciated how the author maintains a practical perspective throughout this section, focusing on real-world considerations rather than just theoretical performance.

# Data Augmentation

One of the most practical chapters in Chen's book addresses the challenge of limited training data. I particularly appreciated how the author breaks down different augmentation techniques based on their application domains.

> *Data augmentation techniques have been shown to make our models more robust to noise and even adversarial attacks.*

The author categorizes data augmentation into three main approaches:

## Simple Transformations

What I found interesting here is how the techniques vary dramatically by domain. For example:
- Images: cropping, rotating, inverting
- Text: synonym replacement, word substitution

## Perturbation

The author makes a fascinating point about how perturbation affects different types of data differently. 

> *Adversarial augmentation is less common in NLP (an image of a bear with randomly added pixels still looks like a bear, but adding random characters to a random sentence will render it gibberish)*

This quote particularly resonated with me as it highlights a key difference between computer vision and NLP tasks that isn't often discussed.

## Data Synthesis

**Notice: The author emphasizes that while data synthesis is an active research area, it's not yet widely adopted in production systems**

# Feature Engineering

This section was particularly valuable to me as it challenges a common misconception in the ML community. Chen makes a bold but accurate statement:

> *State-of-the-art model architectures can still perform poorly if they don't use a good set of features.*

## Learned vs. Engineered Features

The author addresses a question I've heard many times in my own work:

> *Why do we have to worry about feature engineering? Doesn't deep learning promise us that we no longer have to engineer features?*

What I appreciate about Chen's response is her practical perspective. She acknowledges that while many features can be learned automatically, we're still far from complete automation. She provides a great example with spam detection:

> *Regarding NLP.... ML systems will likely need data beyond just what can be extracted from text. For example, when detecting whether a comment is spam or not, on top of the text in the comment itself, you might want to use other information about:*
> *- the comment: such as who posted this comment, how many upvotes/downvotes it has.*
> *- the user who posted this comment: such as when this account was created, how often they post.*
> *- the thread in which the comment was posted: such as how many views it has*

## Common Feature Engineering Operations

The author provides a comprehensive toolkit of feature engineering techniques. I found her treatment of data leakage particularly valuable.

### Handling Missing Values

Chen presents two main approaches:
- Deletion (row-wise or column-wise)
- Imputation (replacing with theoretical defaults or statistical measures)

> *With imputation, you risk adding noise to your data, or worse, data leakage.*

### Scaling

**Notice: The author emphasizes that scaling is one of the simplest yet most effective techniques for improving model performance**

The section on scaling particularly resonated with me because it addresses a common problem in real-world data:

> *When we input these two variables into an ML model, it won't understand that 150,000 and 40 represent different things. It will just see them both as numbers*

### Feature Crossing

One of the more sophisticated techniques discussed is feature crossing. I appreciated how Chen explains its importance while also noting its limitations:

> *For example, for the task of predicting whether someone will want to buy a house in the next 12 months, you suspect that there might be a non-linear relationship between marital status and number of children*

## Data Leakage

This section particularly stood out to me as it addresses a critical issue that's often overlooked in academic settings:

> *Data leakage can happen not only with newcomers to the field, but has also happened to several experienced researchers whose work I admire, and in one of my own projects. Despite its prevalence, data leakage is rarely covered in ML curricula.*

The author's honesty about her own experiences with data leakage makes this section particularly impactful.

### Common Cases of Data Leakage

I found the author's breakdown of common leakage scenarios particularly useful:
- Time-correlated data splitting issues
- Scaling before splitting data
- Poor handling of data duplication
- Group leakage
- Collection process leakage

> *For example, if you have data from 5 weeks, use the first 4 weeks for the train split, then randomly split week 5 into validation and test splits*

## Engineering Good Features

The author concludes with practical advice about feature management. What I found particularly valuable was her emphasis on the balance between quantity and quality:

> *The list of features used for a model in production only grows over time. However, more features doesn't always mean better model performance.*

This resonates with my own experience in production ML systems, where feature bloat can become a significant source of technical debt.

### Navigating Model Development: Key Concepts and Practical Insights

In *Deep Learning for Production*, Chen’s take on model development is pragmatic and direct—cutting through the noise to focus on the mechanics of building, tuning, and applying machine learning models effectively. Here’s the essence of her insights:

---

#### 1. **Understanding Models at a High Level**
   - Models are functions that transform inputs into outputs, like text classification predicting whether a sentence is positive or negative. Where conventional programming defines a function, ML is about discovering it from data.

   > *"In ML, inputs and outputs are known, but their functions are unknown."*

#### 2. **Objective Function: Guiding Model Accuracy**
   - A core component is the **objective function** (or loss function), shaping how well a model performs. For classification, cross-entropy is common, whereas regression models often rely on Mean Squared Error. This objective defines a model's **loss surface**—the potential range of outcomes based on parameter values.

   > *"Modifying the objective function can direct a model to prioritize rare cases or hard-to-learn patterns."*

#### 3. **Learning Procedure: How Models Improve**
   - Using iterative algorithms like **gradient descent**, models adjust parameters to reduce loss. Gradient descent, combined with optimizers (e.g., Adam or RMSProp), is widely used to refine these parameters and make models converge faster.

   > *"A good optimizer accelerates training and fine-tunes parameters for better predictions."*

#### 4. **Choosing the Right Model**
   - Chen emphasizes that each ML task has an optimal model type, but starting simple is often best. Classification models handle binary, multiclass, or multilabel outputs, and certain tasks may benefit from hierarchical classification to simplify complex decisions.

   > *"Simple models frequently outperform complex ones due to ease of use and interpretability."*

#### 5. **Balancing Multiple Objectives**
   - When juggling several goals, consider decoupling objective functions to maintain clarity. Training separate models for each objective and then blending results provides flexibility without needing retraining.

   > *"Decoupling objectives makes tweaking and maintaining models more manageable."*

#### 6. **Algorithm Selection: Classical vs. Deep Learning**
   - Classical ML algorithms (e.g., Naive Bayes, tree-based models) remain valuable despite the rise of deep learning. For latency-sensitive tasks, tree algorithms like gradient-boosted trees often outperform deep learning due to speed and efficiency.

   > *"Even with deep learning’s rise, classic ML models retain their role in high-performance tasks."*

#### 7. **Deciding on Your Next ML Model**
   - Chen offers tips for model selection:
      - Avoid “state-of-the-art” hype; simplest effective models usually work best.
      - Assess trade-offs between latency and accuracy, prioritize models that handle biases, and be mindful of assumptions that influence performance.

   > *"Start with the simplest model that meets your needs; complexity often adds diminishing returns."*


### Ensemble Methods: An Overview

Ensemble methods combine multiple models to improve predictive performance, particularly useful in handling complex data patterns and enhancing robustness. However, Chen points out that deploying ensembles in production is often challenging due to their complexity. Here’s a breakdown of the primary types of ensemble methods:

---

#### 1. **Bagging** (reducing variance)

- **Concept**: Each model in a bagging ensemble gets a random subset of the data (sampling with replacement), and predictions are made through majority voting (for classification) or averaging (for regression).
- **Use Case**: Works well when individual model variance is high. Random Forest is a prime example.

> _"Bagging is effective for reducing variance and stabilizing models, though its reliance on multiple models can add to computational cost."_

#### 2. **Boosting** (reducing bias)

- **Concept**: Boosting iteratively adjusts model weights, focusing on misclassified examples, which strengthens weak learners across rounds.
- **Use Case**: Ideal when aiming to reduce bias and enhance model accuracy, with algorithms like AdaBoost and XGBoost leading the way.

> _"Boosting builds models sequentially, tuning their focus on challenging data points, and is highly effective for reducing bias."_

#### 3. **Stacking** (improving generalization)

- **Concept**: In stacking, multiple base learners make predictions which are then combined by a meta-learner (often a simpler model) that synthesizes these outputs into final predictions.
- **Use Case**: Great for improving model generalization; suitable for complex tasks where a mix of models enhances predictive power.

> _"Stacking enables flexibility by leveraging diverse model strengths, although it requires careful tuning to avoid overfitting."_

Chen also recommends Kaggle’s _[Ensemble Guide](https://mlwave.com/kaggle-ensembling-guide)_, which provides further practical insights into implementing these techniques.

### AutoML

AutoML automates parts of the machine learning pipeline, improving efficiency and potentially model accuracy. Chen explains two main types:

1. **Soft AutoML** (Hyperparameter Tuning):
    
    - **Definition**: The process of finding the best set of hyperparameters within a search space, with each set's performance evaluated on a validation set.
        
    - **Hyperparameters**: These control the learning process, e.g., learning rate, batch size, dropout probability, etc.
        
    - **Tools and Methods**: scikit-learn with auto-sklearn, TensorFlow with Keras Tuner, and common tuning techniques like random search, grid search, and Bayesian optimization.
        
    
    > _"Different hyperparameter sets can lead the same model to perform drastically differently on the same dataset."_
    
2. **Hard AutoML** (Architecture Search and Learned Optimizer):
    
    - **Concept**: Treats elements of model architecture (e.g., layer types, size) as hyperparameters. Instead of manually building the model architecture, a search algorithm can combine building blocks (e.g., convolution layers, pooling layers) to find optimal configurations.
    - **Neural Architecture Search (NAS)**: Consists of three parts:
        - **Search Space**: Defines possible network architectures.
            
        - **Performance Estimation**: Evaluates each candidate architecture.
            
        - **Search Strategy**: Guides the search for optimal architectures.
            
    
    > _"By making model structure part of the search space, NAS allows discovering novel architectures that may outperform manually designed ones."_

### Model Training

Effective model training involves more than just choosing an algorithm; it includes techniques that address computational scale and data handling.

1. **Distributed Training**
    
    - **Purpose**: For large datasets that don’t fit in memory or require high computational power, distributed training scales the process across multiple machines.
        
    - **Techniques**: Preprocessing (normalization, shuffling), batching, and parallelization improve efficiency.
        
    
    > _"When dealing with massive datasets (e.g., CT scans, genome sequences), distributed training ensures scalability and reduces training time."_
    
2. **Data Parallelism**
    
    - **Definition**: Splitting data across machines to train models in parallel, then aggregating gradients across machines.
    - **Challenges**: Effective gradient accumulation is key. Approaches include:
        - **Synchronous Stochastic Gradient Descent (SSGD)**: Waits for all machines to complete before updating.
            
        - **Asynchronous SGD (ASGD)**: Updates weights independently, though staleness in updates can affect performance.
            
    
    > _"ASGD converges with fewer steps, but SSGD can improve accuracy due to synchronized updates."_
    
3. **Model Parallelism**
    
    - **Concept**: Different parts of the model are assigned to different machines. For example, one machine handles initial layers, while others handle subsequent layers.
        
    - **Pipeline Parallelism**: Allows components of the model to run concurrently. For instance, Machine 1 passes intermediate results to Machine 2 while continuing its own computation.
        
    
    > _"Combining model and data parallelism optimizes hardware use, though it demands complex engineering to maintain balance."_
    

Distributed training often combines both data and model parallelism, maximizing computational resources, though the configuration can be complex.

## Experiment Tracking and Versioning

Tracking experiment metadata (loss curves, performance metrics, hyperparameters, etc.) is essential for reproducibility and comparability. Tools like **Weights & Biases** and **DVC** are widely used to manage both experiment tracking and versioning, although data versioning remains challenging due to the large size of datasets.

---

## Model Offline Evaluation

Model evaluation is a continuous process, and selecting a proper baseline and evaluation metric is critical. Chen suggests several common baselines:

- **Random Baseline**: Performance if predictions are random.
- **Simple Heuristic**: E.g., ranking items by recency.
- **Zero Rule Baseline**: Using the most common class as the prediction.
- **Human Baseline**: Performance of human labelers or experts.
- **Existing Solutions**: Current business logic or algorithms in place.

---

### Advanced Evaluation Techniques

Chen emphasizes that models must be robust, calibrated, fair, and explainable in production settings:

1. **Perturbation Tests**: Checks model robustness to small, random changes in data inputs.
2. **Invariance and Directional Tests**: Ensures models respond predictably to expected changes, and helps mitigate biases.
3. **Model Calibration**: Ensures predicted probabilities match real-world outcomes, e.g., **Platt Scaling** and **Temperature Scaling**.
4. **Confidence Measurement**: Evaluates the certainty of individual predictions, providing a threshold for high-confidence outputs.
5. **Slice-based Evaluation**: Looks at model performance across subgroups, helping to uncover biases or issues with critical data subsets.