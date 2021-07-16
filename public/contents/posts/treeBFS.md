---
title: treeBFS
date: 2021-01-20
tags: JavaScript, Algorithm
---

## Algorithm

### 문제

트리 구조의 노드를 너비 우선 탐색하여 값을 찾는다.

### 입력

**인수: node**

- `value`, `children` 자식을 갖는 객체 (Node)
- `node.value`는 `number` 타입
- `node.children`은 Node를 요소로 갖는 배열

### 출력

탐색 순서대로 노드의 값이 담긴 배열을 리턴한다.

### 풀이

너비 우선 탐색으로 첫 노드와 가까운 노드부터 차례대로 탐색한다. `queue` 자료 구조를 반복문으로 구현한다.

1. 첫 번째 노드를 큐에 넣는다.
2. 출력 배열 `values`를 선언한다.
3. 큐에 남아있는 노드가 없을 때까지 노드의 값을 찾는다.
   - 선입을 의미하는 `head`를 선언하고 큐의 첫 번째 노드를 추가한다.
   - 선출되는 첫 번째 노드는 큐에서 제거한다.
   - `head` 노드의 `value`를 출력 배열 `values`에 추가한다.
   - `head` 노드의 `children` 배열을 탐색하고 Node를 큐에 추가한다.

```javascript
let bfs = function (node) {
	let queue = [node]
	const values = []
	while (queue.length !== 0) {
		const head = queue[0]
		queue = queue.slice(1)
		values.push(head.value)
		head.children.forEach(el => queue.push(el))
	}
	return values
}

// 이 아래 코드는 변경하지 않아도 됩니다. 자유롭게 참고하세요.
let Node = function (value) {
	this.value = value
	this.children = []
}

// 위 Node 객체로 구성되는 트리는 매우 단순한 형태의 트리입니다.
// membership check(중복 확인)를 따로 하지 않습니다.
Node.prototype.addChild = function (child) {
	this.children.push(child)
	return child
}
```
