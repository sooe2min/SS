---
title: treeDFS
date: 2021-01-13
description: JavaScript, Algorithm
---

## Algorithm

### 문제

트리 구조의 노드를 깊이 우선 탐색하여 값을 찾는다.

### 입력

**인수: node**

- `value`, `children` 자식을 갖는 객체 (Node)
- `node.value`는 `number` 타입
- `node.children`은 Node를 요소로 갖는 배열

### 출력

탐색 순서대로 노드의 값이 담긴 배열을 리턴한다.

### 풀이

깊이 우선 탐색으로 첫 노드의 마지막 깊이의 노드까지 탐색한다. 스택 또는 재귀함수로 구현한다.

1. 출력 배열 `values`에 `node.value`를 추가한다.
2. `node.children` 배열의 Node 요소를 `forEach`와 `재귀함수`로 탐색한다.

위 과정을 반복하고 `node.children`이 빈 배열이면 `forEach`는 자동으로 스킵 된다. 그리고 `concat`은 기존 배열을 변경하지 않으므로 꼭 기존 출력 배열 `values`에 할당을 해줘야 한다.

```javascript
let dfs = function (node) {
  let values = [node.value]
  node.children.forEach(n => {
    values = values.concat(dfs(n))
  })
  return values
}

// 이 아래 코드는 변경하지 않아도 됩니다. 자유롭게 참고하세요.
let Node = function (value) {
  this.value = value;
  this.children = [];
}

// 위 Node 객체로 구성되는 트리는 매우 단순한 형태의 트리입니다.
// membership check(중복 확인)를 따로 하지 않습니다.
Node.prototype.addChild = function (child) {
  this.children.push(child);
  return child;
}
```

