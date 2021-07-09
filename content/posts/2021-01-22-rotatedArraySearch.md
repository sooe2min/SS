---
title: rotatedArraySearch
date: 2021-01-22
description: JavaScript, Algorithm
---

## Algorithm

### 문제

부분적으로 오름차순 정렬된 배열 `rotated`에서 `target`의 인덱스를 찾는다.

- `부분적으로 정렬된 배열`: 배열을 왼쪽 혹은 오른쪽으로 0칸 이상 순환 이동할 경우 완전히 정렬되는 배열
- 예시: `[4, 5, 6, 0, 1, 2, 3]`은 왼쪽으로 3칸 또는 오른쪽으로 4칸 순환 이동할 경우 완전히 정렬된다.

### 입력

**인자 1 : rotated**

- `number` 타입을 요소로 갖는 배열

**인자 2 : target**

- `number` 타입의 정수

### 출력

- `number` 타입을 리턴해야 한다.

### 주의사항

- `rotated`에 중복된 요소는 없다.
- `target`이 없는 경우, `-1`을 리턴해야 한다.

### 힌트

- 이진 탐색(binary search)을 약간 변형하여 해결한다.

### 풀이

이진 탐색을 활용하기 위해선 배열이 정렬되어 있어야 한다. `부분적으로 정렬된 배열`이라는 조건을 이용한다.

1. `mid` 값을 기준으로 입력 배열에서 정렬되어 있는 범위를 찾는다.
   - `left` 값보다 `mid` 값이 더 크다면 해당 좌측 범위는 정렬되어 있는 것이다.
   - `mid` 값보다 `right` 값이 더 크다면 해당 우측 범위는 정렬되어 있는 것이다.
2. 입력 타깃이 정렬되어 있는 범위 안에 포함되어 있는지를 판단한다.
   - 포함되어 있다면 이진 탐색을 실행한다.
   - 포함되어 있지 않다면 반대편으로 범위를 좁혀 이진 탐색을 실행한다.

```javascript
const rotatedArraySearch = function (rotated, target) {
  let left = 0,
    right = rotated.length - 1
  while (left <= right) {
    let mid = parseInt((left + right) / 2)
    if (rotated[mid] === target) return mid
    
    // 정렬되어 있는 범위가 좌측일 때
    if (rotated[left] < rotated[mid]) {
      if (rotated[left] <= target && target < rotated[mid]) {
        right = mid - 1    
      }
      else {
        left = mid + 1
      }
    }
    // 정렬되어 있는 범위가 우측일 때
    else {
      if (rotated[mid] < target && target <= rotated[right]) {
        left = mid + 1
      }
      else {
        right = mid - 1
      }
    }
  }
  return -1
}
```
