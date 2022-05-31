---
title: insertionSort
date: 2021-01-21
tags: JavaScript, Algorithm
---

## Algorithm

### 문제

삽입 정렬. 배열의 요소를 비교하여 오름차순으로 정렬한다.

### 풀이

1. 입력 배열의 첫 번째 값을 `sorted` 배열에 추가한다.

2. 입력 배열의 두 번째 값(=현재 값)과 `sorted` 배열의 마지막 값을 비교한다.

   - 현재 값이 마지막 값보다 크다면 그대로 현재 값을 `sorted` 배열에 추가한다.

3. 현재 값이 마지막 값보다 작다면 현재 값과 `sorted` 배열의 모든 값과 비교하여 자리를 찾는다.

   - `sorted` 배열의 어떤 값보다 현재 값이 클 때, 어떤 값을 기준으로 배열을 자른다.
   - 어떤 값보다 앞에 있는 숫자들은 `left`, 어떤 값보다 뒤에 있는 숫자들은 `right`, 현재 값은 둘 사이에 위치하면 된다.

   - `left` 배열의 값, 현재 값, `right` 배열의 값을 모두 더하여 `sorted` 배열의 값으로 새로 할당한다.

4. 앞에 2~3번 과정을 반복한다.

```javascript
const insertionSort = function (arr, transform = item => item) {
	let sorted = [arr[0]]
	for (let i = 1; i < arr.length; i++) {
		if (transform(sorted[i - 1]) < transform(arr[i])) {
			sorted.push(arr[i])
		} else {
			for (let j = 0; j < sorted.length; j++) {
				if (transform(arr[i]) < transform(sorted[j])) {
					const left = sorted.slice(0, j)
					const right = sorted.slice(j)
					sorted = left.concat(arr[i], right)
					break
				}
			}
		}
	}
	return sorted
}
```
