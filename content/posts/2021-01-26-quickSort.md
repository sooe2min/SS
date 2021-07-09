---
title: quickSort
date: 2021-01-26
description: JavaScript, Algorithm
---

## Algorithm

### 문제

퀵 정렬. 배열의 요소를 비교하여 오름차순으로 정렬한다.

### 입력

**인자 1 : arr**

- `number` 타입 요소를 가진 배열
- `arr[i]`는 정수

### 출력

- `number` 타입을 리턴해야 한다.
- 오름차순으로 정렬해야 한다.

### 주의사항

- 퀵 정렬을 구현해야 한다.
- `arr.sort` 사용은 금지다.

### 풀이

1. 입력 배열 길이가 1보다 작거나 같으면 그대로 리턴한다.
2. 입력 배열의 첫 번째 요소를 `pivot`으로 정한다.
3. 입력 배열의 모든 요소와 `pivot`을 비교한다.
   - 첫 번째 요소는 `pivot` 요소이므로 제외한다.
   - `pivot`보다 작으면 `left` 배열에 추가한다.
   - `pivot`보다 크면 `right` 배열에 추가한다.
4. `left`, `right` 배열을 인수로 하여 `quickSort` 함수를 재귀 호출하고 각각 `sortedL`, `sortedR`에 할당한다.
5. `sortedL`, `pivot`, `sortedR`을 하나의 배열에 연결하고 리턴한다. 

```javascript
function quickSort(arr, transform = (item) => item) {
  if (arr.length <= 1) return arr

  const pivot = arr[0]
  const left = []
  const right = []

  for (let i = 1; i < arr.length; i++) {
    if (transform(arr[i]) < transform(pivot)) left.push(arr[i])
    else right.push(arr[i])
  }

  const lSorted = quickSort(left, transform)
  const rSorted = quickSort(right, transform)
  return [...lSorted, pivot, ...rSorted]
}
```
