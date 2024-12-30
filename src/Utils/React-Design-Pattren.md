# React Design Pattern - by Dispesh Malavia https://youtu.be/KlbIcAYhY4o
- Container Presentation Pattern
- custom Hooks
- HoC 
## Container Presentation Pattern
```
             COMPONENT
                 |
                 |
         ------------------------
         |                      |
  container(smart)     Presentation(Dumb) 
```

- Container : api calls , state, data manipulation
- Presentation : NO side effects only Presentational

**Pros:**
- improved reusability
- simplified Reusability
- Enhanced Maintainability

**Cons:**
- Increased Boiler Plate
- Over Head for Small apps
- Potential Prop Drilling
- Learning Curve
---
## Custom Hooks

Pros: 
- code Reusability
- Consistency of behavior
- improved Readability
Cons:
-learning 
- Debugging 
- over abstraction
- Performance Concerns
