---
id: "7"
title: "Adding mermaid support"
description: "Introducing MermaidJS Support: Create Stunning Diagrams in Bloggrify"
date: "2024-06-13"
categories:
    - markdown
    - documentation
tags:
    - markdown
    - mermaid
    - documentation
cover: "covers/santorin.jpg"
---

## Introducing MermaidJS Support: Create Stunning Diagrams in Bloggrify

Hello, readers! We are thrilled to announce another fantastic addition to Bloggrify: support for MermaidJS. With MermaidJS, you can now effortlessly create and embed beautiful diagrams and flowcharts directly in your Markdown posts. This powerful feature is perfect for visualizing complex information, making your content more engaging and easier to understand.

:toc{showChildren=true}


## What is MermaidJS?
MermaidJS is a JavaScript library that allows you to generate diagrams and flowcharts from text in a Markdown-like syntax. It supports a wide range of diagram types, including flowcharts, sequence diagrams, class diagrams, state diagrams, and more. MermaidJS is designed to be easy to use, yet powerful enough to handle complex visualizations.

You'll find more information on the [official website](https://mermaid-js.github.io/mermaid/).

## Why Use MermaidJS in Bloggrify?
Adding MermaidJS support to Bloggrify brings several advantages:

* Visualization: Enhance your content with clear and concise diagrams that help illustrate complex concepts.
* Ease of Use: Write simple text in MermaidJS syntax within your Markdown files to create sophisticated diagrams.
* Versatility: MermaidJS supports a variety of diagram types, making it suitable for many use cases, from technical documentation to process flows.

## Example Usage

### Flowchart

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

### Sequence Diagram

```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail...
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```

### Gantt Chart

```mermaid
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2024-02-10, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2024-02-12  , 12d
    another task     : 24d
```

### Class Diagram

```mermaid
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal
    Duck : +String beakColor
    Duck : +swim()
    Fish : +int sizeInFeet
    Fish : +canEat()
    Zebra : +bool is_wild
    Zebra : +run()
```

### State Diagram

```mermaid
stateDiagram
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
```

### Pie Chart

```mermaid
pie
    title Key elements in Product X
    "Calcium" : 42
    "Potassium" : 50
    "Magnesium" : 10
```


### User Journey

```mermaid
journey
    title My working day
    section Go to work
        Make tea: 5: Me
        Go upstairs: 3: Me
        Do work: 1: Me, Cat
    section Go home
        Go downstairs: 5: Me
        Sit down: 5: Me
```

## Conclusion

With MermaidJS support, Bloggrify empowers you to create dynamic, informative, and visually appealing content. Whether you need to visualize workflows, represent complex systems, or simply add a touch of creativity to your posts, MermaidJS is the perfect tool.

We look forward to seeing the amazing diagrams you create with MermaidJS in your Bloggrify posts. Share your experiences and feedback with us, and stay tuned to Mistral for more exciting updates and tutorials!

Happy blogging!

