---
title: largestProductOfThree
date: 2021-01-14
tags: JavaScript, Algorithm
---

## Algorithm

### 문제

입력 배열의 요소 3개를 곱해서 나올 수 있는 최댓값을 구한다.

### 입력

**인수: arr**

- `number` 타입의 요소를 갖는 임의의 배열

### 출력

- `number` 타입을 리턴해야 한다.

### 주의사항

- 배열의 요소는 음수와 0을 포함하는 정수다.

### 풀이

1. 배열을 오름차순으로 정렬한다.
2. 최댓값이 될 수 있는 후보 1과 후보 2의 값을 구한다.
3. 두 후보의 값을 비교하여 최댓값을 찾는다.

최댓값이 될 수 있는 후보가 2개인 이유는 음수의 성질 때문이다.

- 음수는 절댓값이 클수록 더 작은 수다.
- 음수와 음수를 곱하면 양수가 된다.

배열을 오름차순으로 정렬하고 뒤에서 3개의 요소를 곱했을 때 최댓값이 되거나, 가장 작은 음수와 그다음 음수의 절댓값이 가장 큰 수와 그다음 큰 수의 절댓값보다 클 때 최댓값이 된다.

```javascript
const largestProductOfThree = function (arr) {
	const sorted = arr.sort((a, b) => a - b)
	const len = arr.length
	candi1 = arr[0] * arr[1] * arr[len - 1]
	candi2 = arr.slice(-3).reduce((acc, cur) => acc * cur)
	return Math.max(candi1, candi2)
}
```
