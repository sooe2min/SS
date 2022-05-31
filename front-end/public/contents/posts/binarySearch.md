---
title: binarySearch
date: 2021-01-18
tags: JavaScript, Algorithm
---

## Algorithm

### 문제

오름차순 정렬되어 있는 `arr` 배열에서 `target`의 인덱스를 찾는다.

### 입력

**인수1: arr**

- `number` 타입으로 정렬되어 있는 배열

**인수2: target**

- `number` 타입의 정수

### 출력

- `number` 타입으로 리턴해야 한다.

### 주의사항

- **이진 탐색 알고리즘**(`O(logN)`)을 사용해야 한다.
- 단순한 배열 순회(`O(N)`)로는 통과할 수 없는 테스트 케이스가 존재한다.
- `target`이 없으면 `-1`을 리턴해야 한다.

### 풀이

이진 탐색 알고리즘은 데이터를 반으로 쪼개서 검색 범위를 좁히고 답을 찾는다. 값을 비교하므로 데이터가 꼭 정렬되어 있어야 한다.

1. 첫 번째 값(`left`)과 마지막 값(`right`)을 할당하여 최초의 검색 범위를 설정한다.
2. 데이터를 둘로 나누기 위해 중간 값의 인덱스(`mid`)를 할당한다.
3. 타겟 값과 중간 값을 비교한다.
   - 타겟 값보다 중간 값이 크면 데이터는 중간 값 왼쪽에 있다. 오른쪽 값을 변경하여 검색 범위를 좁힌다.
   - 타겟 값보다 중간 값이 작으면 데이터는 중간 값 오른쪽에 있다. 왼쪽 값을 변경하여 검색 범위를 좁힌다.
   - 중간 값과 타겟 값이 같으면 해당 인덱스를 리턴한다.

```javascript
const binarySearch = function (arr, target) {
	let left = 0
	let right = arr.length - 1
	while (left <= right) {
		let mid = parseInt((left + right) / 2)
		if (arr[mid] === target) return mid
		if (target < arr[mid]) {
			right = mid - 1
		} else {
			left = mid + 1
		}
	}
	return -1
}
```

## References

[이진 탐색](https://terms.naver.com/entry.nhn?docId=2270440&cid=51173&categoryId=51173)
