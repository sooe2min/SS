---
title: getItemFromTwoSortedArrays
date: 2021-01-28
tags: JavaScript, Algorithm
---

## Algorithm

### 문제

오름차순으로 정렬되어 있는 입력 배열들의 전체 요소 중 k번 째 요소를 찾는다.

### 입력

**인자 1 : arr1**

- 자연수를 요소로 갖는 배열
- `arr1.length`는 m

**인자 2 : arr2**

- 자연수를 요소로 갖는 배열
- `arr1.length`는 n

**인자 3 : k**

- `number` 타입의 0 이상의 정수

### 출력

- `number` 타입을 리턴해야 한다.

### Advanced

이진 탐색을 응용해서 처음부터 끝까지 찾는 `O(K)` 대신 더 빠른 방법 `O(logK)`으로 구현해보자.

### 풀이

1. 정렬된 배열이므로 두 배열의 요소를 하나씩 비교하여 `k`번 째 요소를 찾는다.
   - 비교마다 카운팅하고 `k` 값까지만 비교한다.
   - 첫 번째 배열의 요소가 두 번째 배열의 요소보다 작다면 리턴하는 `target` 값으로 첫 번째 배열의 요소를 저장하고 첫 번째 배열의 인덱스(`idx1`)를 +1 한다.
   - 그 반대라면 두 번째 배열의 요소를 `target` 값으로 저장하고 두 번째 배열의 인덱스(`idx2`)를 +1 한다.
2. 비교하는 범위를 제한해서 더 빠르게 `k` 값을 찾을 수 있는데 어렵다.. 나중에 돌아온다..
   - [How to find the kth smallest element in the union of two sorted arrays?](https://stackoverflow.com/questions/4607945/how-to-find-the-kth-smallest-element-in-the-union-of-two-sorted-arrays)
   - [Kth Smallest Element in Two Sorted Arrays](https://yao.page/posts/kth-smallest-element-in-two-sorted-arrays-python/)
   - [Find the Kth Smallest Element in Two Sorted Arrays in Java](https://www.baeldung.com/java-kth-smallest-element-in-sorted-arrays)

```javascript
// naive solution
const getItemFromTwoSortedArrays = function (arr1, arr2, k) {
	let cnt = 0,
		idx1 = 0,
		idx2 = 0
	let target
	while (cnt < k) {
		if (arr1[idx1] < arr2[idx2]) {
			target = arr1[idx2]
			left++
		} else {
			target = arr2[idx2]
			right++
		}
		cnt++
	}
	return target
}
```
