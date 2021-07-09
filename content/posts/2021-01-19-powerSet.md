---
title: powerSet
date: 2021-01-19
description: JavaScript, Algorithm
---

## Algorithm

### 문제

입력 문자열은 하나의 집합을 의미한다. 각 문자를 가지고 모든 부분 집합을 만든다.

### 입력

**인수1: str**

- `string` 타입의 공백이 없는 알파벳 소문자 문자열

### 출력

-  배열(`arr`)을 리턴해야 한다.

### 주의사항

- `arr[i]`는 알파벳 순서로 정렬되어야 한다.
- 집합은 중복된 원소를 허용하지 않는다.
- 부분집합은 빈 문자열을 포함한다.
- `arr`은 사전식 순서(lexical order)로 정렬되어야 한다.

### 입출력 예시

```javascript
let output1 = powerSet('abc');
console.log(output1); // ['', 'a', 'ab', 'abc', 'ac', 'b', 'bc', 'c']

let output2 = powerSet('jjump');
console.log(output2); // ['', 'j', 'jm', 'jmp', 'jmpu', 'jmu', 'jp', 'jpu', 'ju', 'm', 'mp', 'mpu', 'mu', 'p', 'pu', 'u']
```

### 풀이

1. 사전식 순서로 배열을 출력하기 위해 부분집합을 만들기 전 입력 문자열 `str`을 정렬한다. 2번 단계를 위해 배열로 만든다.
2. `reduce` 메소드로 `acc`의 마지막 문자가 `item` 문자와 다를 때 문자를 합쳐 중복을 제거한다.
3. 출력 배열에 빈 문자열을 포함시켜 놓는다.
4. 부분집합을 하나씩 만들어 배열에 추가한다.

부분집합을 만드는 원리는 출력 배열 `arr`의 길이만큼 `deduplicated`의 각 문자와 `arr`의 각 문자를 **합쳐서** 다시 출력 배열 `arr`에 추가하는 것이다.

```javascript
const powerSet = function (str) {
  // 정렬
  const sorted = str.split('')

  // 중복 제거
  const deduplicated = sorted.reduce((acc, item) => {
    if (acc[acc.length - 1] !== item) {
      acc = acc + item
    }
    return acc
  })

  // 부분집합 생성 및 추가
  let arr = ['']
  for (let i = 0; i < deduplicated.length; i++) {
    let len = arr.length
    for (let j = 0; j < len; j++) {
      arr.push(arr[j].concat(deduplicated[i])) 
    }
  }
  return arr.sort()
}
```

## References

[Powerset Algorithm](https://medium.com/@abc810221/powerset-algorithm-760512ee60f3)