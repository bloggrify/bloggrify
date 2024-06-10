---
id: "4"
title: "Mermaid"
description: "Mermaid is a diagramming and charting tool that uses Markdown-like text for fast and easy diagram creation."
date: "2024-02-11"
categories:
  - markdown
  - documentation
tags:
  - markdown
  - mermaid
  - thailand
---

Mermaid is a diagramming and charting tool that uses Markdown-like text for fast and easy diagram creation.

You'll find more information on the [official website](https://mermaid-js.github.io/mermaid/).

:toc




## Flowchart

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

## Sequence Diagram

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

## Gantt Chart

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

## Class Diagram

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

## State Diagram

```mermaid
stateDiagram
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
```

## Pie Chart

```mermaid
pie
    title Key elements in Product X
    "Calcium" : 42
    "Potassium" : 50
    "Magnesium" : 10
```


## User Journey

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



