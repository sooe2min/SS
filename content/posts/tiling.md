---
title: tiling
date: 2021-01-08
description: JavaScript, Algorithm
---

---

## Algorithm

### 문제

세로x가로: 2xn 보드가 있다. 2x1 타일로 보드를 채우는 모든 경우의 수를 구한다. 

### 입력

**인수: n**

- `number` 타입의 1 이상 자연수

### 출력

`number` 타입을 리턴해야 한다.

## 주의사항

타일을 놓는 방향은 가로, 세로 둘 다 가능하다.

### 풀이

나의 가정은 두 가지였다. 

- 첫 번째는 2차원 배열을 만들어서 값을 바꿔가며 배열을 채워가는 건가..?
- 두 번째는 테스트 케이스를 보고 힌트를 얻은 건데, n이 1일 때, n이 2일 때 답이 정해져있었다. 그럼 피보나치처럼 n을 분할해서 푸는 건가..? 하지만 어떻게(!!) 분할하는 건지 떠올릴 수 없었다.

**`test case`**

```javascript
tiling 1을(를) 입력받은 경우, 1을(를) 리턴해야 합니다.
tiling 2을(를) 입력받은 경우, 2을(를) 리턴해야 합니다.
tiling 4을(를) 입력받은 경우, 5을(를) 리턴해야 합니다.
...
```

이번 문제를 풀면서 느낀 거는 난 여전히 컴퓨터랑 대화(=컴퓨터처럼 생각)하는 게 서툴다는 거다. 알고리즘 문제를 푸는 것과 현실의 문제를 푸는 것은 다르다. 

첫 번째 가정은 너무 1차원적이고 현실적이다. 좋게 말하면 참신해서? 어떻게 구현해야 할지 접근법을 알 수 없었다. 근데 두 번째 가정은 똑같이 구현은 못하지만 어떤 맥락인지는 알고 있었다. 피보나치 문제를 memo 변수로 풀었던 경험으로 아는 것인데, `DP`와 `memoization` 개념은 이번에 알게 되었다.

[Dynamic Programming](https://smss.netlify.app/2021-01-04-DP/)

분할 구현을 위한 수도코드를 작성하지 못했는데 주의사항에 힌트가 있었다.

_타일을 놓는 방향은 가로, 세로 둘 다 가능하다._ 

이 말은 첫 번째 타일의 방향으로 경우의 수가 분할된다는 의미다. 그리고 첫 번째 타일을 놓는 순간 나머지 면적의 경우의 수를 찾는 문제가 된다.

```javascript
// 2x4 보드에 타일을 놓는 경우의 수
= (첫 번째 타일이 가로) + (첫 번째 타일이 세로)
= 2x2 + (2x3)
= 2 + (첫 번째 타일이 가로) + (첫 번째 타일이 세로)
= 2 + 2x1 + 2x2
= 2 + 1 + 2
= 5

// naive solution: O(2^N)
let tiling = function (n) {
  if (n <= 2) return n
  return tiling(n - 1) + tiling(n - 2)
}


// dynamic with memoization: O(N)
let tiling = function (n) {
  const memo = [0, 1, 2]
  // 재귀를 위한 보조 함수(auxiliary function)를 선언
  const aux = function (n) {
    if (memo[n] !== undefined) return memo[n] 
    memo[n] = aux(n - 2) + aux(n - 1)
    return memo[n]
  }
  return aux(n)
} 


// dynamic with tabulation: O(N)
let tiling = function (n) {
  let memo = [0, 1, 2]
  if (n <= 2) return n
  for (let size = 3; size <= n; size++) {
    memo[size] = memo[size - 2] + memo[size - 1]
  }
  return memo[n]
}
```

그래서 난 이렇게 고민하고 경험하는 과정이 알고리즘 실력을 키우는 올바른 과정이라고 생각한다. 이미 잘 정리된 알고리즘 기법을 하나씩 숙지해나가는 거다.