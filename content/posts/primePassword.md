---
title: primePassword
date: 2021-01-25
description: JavaScript, Algorithm
---

## Algorithm

### 문제

다음 조건을 만족하며 현재 비밀번호를(`curPwd`) 새 비밀번호(`newPwd`)로 변경하는데 필요한 최소 단계 수를 구한다.

- 한 번에 한 개의 숫자만 변경이 가능하다.
- 비밀번호는 4자리의 소수(prime)로만 변경이 가능하다.

### 입력

**인자 1 : curPwd**

- `number` 타입의 1,000 이상 9,999 이하의 자연수

**인자 2 : newPwd**

- `number` 타입의 1,000 이상 9,999 이하의 자연수

### 출력

- `number` 타입을 리턴해야 한다.

### 주의사항

- 4자리인 소수는 1,000 이상의 소수를 말한다. (0011, 0997 등은 제외)

### 풀이

1. 큐가 빌 때까지 현재 비밀번호의 한 개의 숫자를 반복해서 변경한다.
   - 천의 자리부터 일의 자리까지 4번 반복
   - 원래 숫자는 제외하고 0부터 9까지 반복
   - 변경 숫자가 새 비밀번호와 일치하면 현재 단계 값 +1을 하고 리턴한다.
   - 변경 숫자가 체크한 적 없는 1000 이상 소수면 체크하고 큐에 추가한다.
2. `number` 타입인 인자를 변경하기 위해 배열로 바꾸거나 숫자로 바꾸는 헬퍼 함수를 이용한다.
3. 한 번에 한 개의 숫자만 변경이 가능하므로 단계를 밟아가야 한다. 선입선출의 자료 구조인 큐를 이용하고 너비 우선 탐색(BFS) 한다.

**`헬퍼 함수`**

```javascript
// 소수 확인
// 자기 자신 또는 1이 아닌 숫자로 나누어지면 소수가 아니다.
// 제곱근까지 정수만 보면 된다.
const isPrime = (num) => {
  if (num % 2 === 0) return false
  let sqrt = parseInt(Math.sqrt(num))
  for (let divider = 3; divider <= sqrt; divider += 2) {
    if (num % divider === 0) {
      return false
    }
  }
  return true
}

// 숫자 -> 배열
const splitNum = (num) => {
  const digits = num.toString().split('')
  return digits.map((d) => Number(d))
}

// 배열 -> 숫자
const joinDigits = (digits) => Number(digits.join(''))
```

**`새로운 소수 패스워드를 찾는 함수 `**

```javascript
const primePassword = (curPwd, newPwd) => {
  if (curPwd === newPwd) return 0
  
  // queue
  let front = 0
  let rear = 0
  const queue = []
  const isEmpty = (queue) => front === rear
  const enQueue = (queue, item) => {
    queue.push(item)
    rear++
  }
  const deQueue = (queue) => {
    return queue[front++]
    // const item = queue[front];
    // front++;
    // return item;
  }

  // check
  const isVisited = Array(10000).fill(false)
  isVisited[curPwd] = true
  
  // BFS 시작
  enQueue(queue, [0, curPwd])
  
  // BFS는 큐가 빌(empty) 때까지 탐색한다.
  while (isEmpty(queue) === false) {
    const [step, num] = deQueue(queue)
    // 천의 자리부터 일의 자리까지 4번 반복
    for (let i = 0; i < 4; i++) {
      // 숫자 -> 배열
      const digits = splitNum(num)
      // 0부터 9까지 반복
      for (let d = 0; d < 10; d++) {
        // 원래 숫자는 제외하고
        if (d !== digits[i]) {
          // 현재 자리의 숫자를 변경하고 배열 -> 숫자
          digits[i] = d
          const next = joinDigits(digits)
          
          // 변경 숫자가 새 비밀번호와 일치하면 현재 단계 값 +1을 하고 리턴한다.
          if (next === newPwd) return step + 1
          // 변경 숫자가 체크한 적 없는 1000 이상 소수면 체크하고 큐에 추가한다.
          if (next > 1000 && isPrime(next) && isVisited[next] === false) {
            isVisited[next] = true
            enQueue(queue, [step + 1, next])
          }
        }
      }
    }
  }

  // 큐가 빌 때까지 리턴되지 않았다면 현재 비밀번호에서 새 비밀번호를 만들 수 없다.
  return -1
}
```

