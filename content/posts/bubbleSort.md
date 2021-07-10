---
title: bubbleSort
date: 2021-01-07
description: JavaScript, Algorithm
---

---

## Algorithm

### 문제

버블 정렬. 배열의 요소를 비교하여 오름차순으로 정렬한다.

### 풀이

1. 첫 번째 요소가 두 번째 요소보다 크면 위치를 swap 한다.
2. 두 번째 요소가 세 번째 요소보다 크면 위치를 swap 한다.
3. 1~2 과정을 마지막까지 반복한다. (마지막에서 두 번째 요소와 마지막 요소까지)
4. 배열의 길이만큼 1~3을 반복한다.

```javascript
const bubbleSort = function (arr) {
  let temp
  for (let j = 0; j < arr.length; j++) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i]) {
        temp = arr[i - 1]
        arr[i - 1] = arr[i]
        arr[i] = temp
      }
    }
  }
    
  return arr
}
```

처음엔 위 로직으로 기능을 구현했다. 하지만 배열의 길이만큼 모든 과정을 반복하는 것은 때로는 무의미했다. 3번 과정에 step 하나를 더 추가했다.

- 3.1: 요소 간 위치가 바뀐 적이 없다면, 정렬이 끝난 것이므로 반복문을 멈춰야 한다.

요소 간 위치를 바꿀 때마다 카운팅 하는 것으로 구현했다. 값이 0이면 바꾼 적이 없는 것으로 정렬이 끝난 거다.

```javascript
const bubbleSort = function (arr) {
  let temp
  let swaps = 0
  for (let j = 0; j < arr.length; j++) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i]) {
        temp = arr[i - 1]
        arr[i - 1] = arr[i]
        arr[i] = temp
        swaps++
      }
    }
      
    if (swaps === 0) {
      break
    }
  }
    
  return arr
}
```

3번 과정에 step 하나를 더 추가하고 반복 사용하는 `swap` 기능을 분리했다.

- 1~3 과정을 한 번 거치게 되면, 가장 큰 요소가 마지막에 위치한다. 앞으로 마지막 요소는 제외해도 된다.

```javascript
const swap = function (idx1, idx2, arr) {
  // 1) 임시 변수
  let temp = arr[idx1]
  arr[idx1] = arr[idx2]
  arr[idx2] = temp

  // 2) Destructuring assignment
  // [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
}

const bubbleSort = function (arr) {
  const N = arr.length
  for (let i = 0; i < N; i++) {
    let swaps = 0

    for (let j = 0; j < N - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swaps++
        swap(j, j + 1, arr)
      }
    }
      
    if (swaps === 0) {
      break
    }
  }
    
  return arr
}
```