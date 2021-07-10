---
title: power
date: 2021-01-15
description: JavaScript, Algorithm
---

## Algorithm

### 문제

입력 두 수의 거듭제곱을 구한다.

### 입력

**인수1: base**

- `number` 타입의 자연수 (`base` >= 2)

**인수2: exponent**

- `number` 타입의 정수 (`exponent` >= 0)

### 출력

- 거듭제곱 값을 `1000000009`으로 나눈 나머지를 `number` 타입으로 리턴해야 한다.

### 주의사항

- `Math.pow`, 거듭제곱 연산자(`**`) 사용은 금지다.
- 시간 복잡도 `O(logN)`을 만족해야 한다.
- 나머지를 구하는 이유는 계산 결과가 컴퓨터로 나타낼 수 있는 수의 범위를 넘을 수 있기 때문이다. 연산을 할 때마다 나머지를 구하고 그 결과에 연산을 이어가라.

### 풀이

먼저 지수의 수만큼 거듭제곱하여 시간 복잡도 `O(N)`으로 답을 구할 수 있다.

```javascript
function power(base, exponent) {
  if (exponent === 0) return 1
  return base * power(base, exponent - 1) % 1000000009
}
```

경우의 수를 절반으로 줄여가며 `O(N)`보다 빠르게 답을 찾을 수도 있다. 시간 복잡도 `O(logN)`을 적용하기 위해선 지수법칙에 대한 이해가 선행되어야 한다.

- exponent가 짝수일 때는 지수를 절반으로 줄이고 x 값을 제곱하면 거듭제곱을 구할 수 있다. 

  ![positive](static/positive.png)

- exponent가 홀수일 때는 지수가 1인 값을 한 번 더 곱해줘야 한다.

  ![positive](static/nagative.png)

```javascript
function power(base, exponent) {
  if (exponent === 0) return 1
  if (exponent === 1) return base
  const half = parseInt(exponent / 2)
  const temp = power(base, half)
  const result = temp * temp % 1000000009
  return result * power(base, exponent % 2) % 1000000009
}
```

## Reference

[데이터구조 5차시](https://youtu.be/X9Q6ZuvbOV0)