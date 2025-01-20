# Face Recognition Model Tuning

- **Terminal Accuracy Testing**:
    - Tested lightweight models in 3 airport terminals.
    - Average processing time reduced by 12%, but false positive rates increased.
- **Proposed Fixes**:
    - Introduce angle compensation for off-center faces.
    - Enhance training on partial face datasets.
- **Random Updates**:
    - Slack Message from Rachel:
        - "Are we integrating the new biometric standards yet?"
    - Meeting scheduled to discuss model deployment challenges with the autonomous vehicle team.
- **Jira Issues to Track**:
    - #482: Face bounding box overlap in crowded areas.
    - #490: Accuracy dips for masked individuals in low lighting.