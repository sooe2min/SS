---
title: DP
date: 2021-01-11
tags: JavaScript, Algorithm
---

---

## Algorithm

### 동적 계획법 Dynamic Programming

DP는 **time-memory trade-off** 아이디어를 실현한다.

- 중복되는 하위 문제의 풀이를 되풀이하지 않도록 메모리에 답을 저장하여 이미 알고 있는 답으로 상위 문제를 해결한다.
- 분할 정복과 비슷하지만 다르다. `Memoization`, `Tabulation` 두 가지 방식으로 구현한다.
- 문제가 `Optimal Substructure`, `Overlapping Subproblem` 속성을 가지고 있다면 DP를 적용할 수 있다.

**Optimal Substructure**: 하위 문제 해결이 상위 문제 해결로 이어진다.

**Overlapping Subproblem**: 답이 같은 하위 문제가 중복된다.

**Memoization**

- Top-down, `recursive` approach
- 상위 문제를 풀다가 하위 문제를 만나면 그 값을 계산하고 저장한다.

**Tabulation**

- Bottom-up, `iterative` approach
- 하위 문제부터 차근차근 답을 미리 계산하고 저장한다.

## References

[Optimal Substructure and Overlapping Subproblems](https://afteracademy.com/blog/optimal-substructure-and-overlapping-subproblems)

[Idea of Dynamic Programming](https://afteracademy.com/blog/idea-of-dynamic-programming)
