---
title: rockPaperScissors
date: 2021-01-04
tags: JavaScript, Algorithm
---

---

## Algorithm

### 문제

가위바위보 게임. 판수에 따라 낼 수 있는 모든 경우의 수를 구한다.

### 출력

2차원 배열을 리턴한다.

### 입출력 예시

- 판수가 1일 때 낼 수 있는 경우의 수는 [[묵], [찌], [빠]]
- 판수가 2일 때는 [[묵묵], [묵찌], [묵빠], [찌묵], [찌찌], [찌빠], [빠묵], [빠찌], [빠빠]]

### 풀이

- 낼 수 있는 손 모양은 3개다. 묵 / 찌 / 빠
- 출력에 답이 있다. 출력되는 배열의 모양을 보면 반복이 보인다.
- 반복문으로 모든 경우의 수를 따져볼 수 있다.
- 하지만 변하는 판수에 대응할 수 없으며, 중첩이 보기 싫다. 중첩은 곧 시간 복잡도 증가를 의미한다.

```javascript
const rockPaperScissors = function () {
	// 가위바위보
	const rps = ['rock', 'paper', 'scissors']

	// 출력은 2차원 배열이다.
	const games = []

	// 모든 경우의 수를 구한다.
	// 묵묵묵, 묵묵찌, 묵묵빠, ...
	// 반복문을 쓴다.
	for (let i = 0; i < rps.length; i++) {
		for (let j = 0; j < rps.length; j++) {
			for (let k = 0; k < rps.length; k++) {
				let game = []
				game.push(rps[i], rps[j], rps[k])
				games.push(game)
			}
		}
	}
	return games
}
```

재귀를 사용하면 판수에 대응하며(-1), 중첩을 개선할 수 있다. 어려운 것은 어떻게 원하는 모양의 출력을 구현할 것인지?

1. 가위바위보를 한다.
2. 손 모양을 배열에 기록한다.
3. 다음 라운드를 진행한다.
4. 1~3을 반복한다.
5. 마지막 라운드 때 배열을 기록한다.
6. 게임을 종료한다.

```javascript
const rockPaperScissors = function (rounds) {
	// 라운드
	rounds = rounds || 3

	// 가위바위보
	const rps = ['rock', 'paper', 'scissors']

	// 출력은 2차원 배열이다.
	const games = []

	// for문 중첩을 개선하고 싶다면? 재귀
	const play = function (game, rounds) {
		// 라운드가 0이 되면 기록하고 끝낸다.
		if (rounds === 0) {
			// 4
			games.push(game)
			return // 5
		}
		// 묵묵묵, 묵묵찌, 묵묵빠, ...
		// 반복해서 게임을 한다.
		for (let i = 0; i < rps.length; i++) {
			// 1
			let hand = rps[i]
			play(game.concat(hand), rounds - 1) // 2~3
		}
	}
	play([], rounds)
	return games
}
```
