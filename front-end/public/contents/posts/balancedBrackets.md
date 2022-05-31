---
title: balancedBrackets
date: 2021-01-27
tags: JavaScript, Algorithm
---

## Algorithm

### 문제

입력 문자열 내의 모든 괄호의 짝이 맞는지 확인한다.

### 입력

**인자 1 : str**

- `string` 타입의 괄호(`(`, `)`, `{`, `}`, `[`, `]`)로 이루어진 문자열

### 출력

- `boolean` 타입을 리턴해야 한다.

### 주의사항

- 괄호는 먼저 열리고 열린 만큼만 닫혀야 한다.
- 입력이 빈 문자열이면 `true`를 리턴해야 한다.

### 풀이

1. 후입선출의 자료 구조인 스택을 이용한다.
2. 열리는 괄호와 닫히는 괄호를 각각 `opener` 객체, `closer` 문자열로 구분 짓는다.
3. 입력 문자열의 모든 문자를 확인한다.
   - 문자열의 문자가 `opener` 객체의 속성이면 해당 문자를 스택에 추가한다.
   - 문자열의 문자가 `closer` 문자열에 포함되면 스택의 마지막 요소를 제거하고 해당 문자와 제거한 마지막 요소가 짝이 맞는지 확인한다.

```javascript
const balancedBrackets = function (str) {
	const stack = []
	const opener = {
		'{': '}',
		'[': ']',
		'(': ')'
	}
	const closer = '}])'

	for (let i = 0; i < str.length; i++) {
		if (str[i] in opener) {
			stack.push(str[i])
		} else if (closer.includes(str[i])) {
			const top = stack.pop()
			const pair = opener[top]
			if (pair !== str[i]) {
				return false
			}
		}
	}

	return stack.length === 0
}
```
