---
title: fibonacci
date: 2021-01-05
tags: JavaScript, Algorithm
---

---

## Algorithm

### 문제

피보나치 수열 중 n번 째 항의 수를 구한다.

- 피보나치 수열은 첫 번째 항의 값은 0이고 두 번째 항의 값은 1일 때, 이후의 항들이 이전의 두 항을 더한 값으로 이루어지는 수열이다.
- `0 1 1 2 3 5 8 13 21 34 55 89 144 ...`

### 주의사항

- 재귀함수를 이용해 구현해야 한다.
- 반복문은 금지한다.

### 풀이

```javascript
function fibonacci(n) {
	if (n === 0) return 0
	if (n === 1) return 1

	let a = 0,
		b = 1,
		c
	let count = 2
	let result
	const sum = function (a, b, count) {
		if (count === n) {
			result = a + b
			return result
		}
		c = a + b
		a = b
		b = c
		count++
		sum(a, b, count)
	}
	sum(a, b, count)
	return result
}
```

위에처럼 풀었는데 쓸데없이 복잡하다. 더 간단한 방법이 있더라.

```javascript
// naive solution: O(2^N)
function fibonacci(n) {
	if (n <= 1) return n
	return fibonacci(n - 2) + fibonacci(n - 1)
}
```

잘 읽히지만 중복이 있다.

fibonacci(10)
= fibonacci(8) + fibonacci(9)
= fibonacci(6) + **fibonacci(7)** + **fibonacci(7)** + fibonacci(8)

이미 계산했던 값은 메모해두면 된다.

```javascript
// dynamic with meoization: O(N)
function fibonacci(n) {
	let memo = [0, 1]
	const aux = n => {
		// 계산한 적 있으면 메모에서 찾는다.
		if (memo[n] !== undefined) return memo[n]
		// 계산한 적 없으면 계산하고 기록한다.
		memo[n] = aux(n - 2) + aux(n - 1)
		return memo[n]
	}
	return aux(n)
}
```
