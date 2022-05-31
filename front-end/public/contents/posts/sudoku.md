---
title: sudoku
date: 2021-01-12
tags: JavaScript, Algorithm
---

---

## Algorithm

### 문제

일부 칸이 비어있는 스도쿠 퍼즐을 완성시킨다.

- 스도쿠는 가로 9칸 x 세로 9칸으로 이루어진 표에 1부터 9까지의 숫자를 채워 넣는 숫자 퍼즐이다.
- 가로, 세로, 3x3 칸 모두 1부터 9까지 숫자가 중복될 수 없다.

### 입력

**인수: board**

- 가로 길이(`board[i].length`)와 세로 길이(`board.length`)가 모두 9인 2차원 배열
- `matrix[i][j]`는 1 이상 9 이하의 자연수

### 주의사항

- 입력 `board`로 완성시킬 수 있는 보드는 유일(unique)하다.
- 빈칸은 0이 입력되어 있다.

### 풀이

며칠 동안 붙잡고 있었는지 모르겠다. 알고리즘 문제 하나를 위해 코드를 이렇게 많이 쳐본 적이 없어서 당황스러웠다. 수도코드를 세세하게 작성하는 것을 못하니 하나씩 분할해서 구현하는 것도 어려웠다. 퇴각 검색(backtracking)이 쓰였다.

#### 수도코드

빈칸을 찾고 중복을 확인하고 숫자를 입력해서 스도쿠를 완성한다. 이 한 줄을 구현하면 되는 거다. 문제를 어떻게 분할할 수 있을까?

1. `board`에서 빈칸을 찾는다.
   - `blanks` 배열에 빈칸 좌표를 기록한다.
2. 빈칸이 아니면 중복 확인을 위해 좌표와 숫자를 기록한다.
   - `rowused`, `colused`, `boxused` 배열에 가로 / 세로 / 3x3 박스 좌표와 숫자를 기록한다.
   - 맨 처음 중복 확인 박스는 모든 칸을 거짓으로 만든다.
   - 빈 칸이 아닌 좌표와 숫자를 참으로 기록한다.
   - `getBoxNum` 함수는 입력 좌표의 3x3 박스 번호를 찾는다.
3. 빈칸에 숫자를 하나씩 입력하기 전, 가로 | 세로 | 3x3 위치의 중복을 확인한다.
   - `isValid` 함수는 가로 | 세로 | 3x3 박스 안에 중복 숫자를 확인한다. 모든 좌표가 거짓(=빈 칸)일 때 참을 리턴한다. 이때 인수는 입력할 수 있는 숫자다.
4. 첫 번째 빈칸에 숫자를 입력하고 다음 빈칸 좌표에서 3번 과정을 반복한다.
   - `toggleNum` 함수는 숫자를 입력한다. 빈칸에 숫자를 입력했을 때는 거짓을 부정해서 변경하고, 틀린 숫자를 입력했을 땐 참을 부정해서 다시 변경한다.
   - 재귀, 퇴각 검색

#### 빈칸 확인

```javascript
// 빈 칸 배열
const blanks = []

// 빈 칸 확인
for (let row = 0; row < N; row++) {
	for (let col = 0; col < N; col++) {
		if (board[row][col] === 0) {
			blanks.push([row, col])
		} else {
			const num = board[row][col]
			const box = getBoxNum(row, col)
			rowused[row][num] = true
			colused[col][num] = true
			boxused[box][num] = true
		}
	}
}
```

#### 중복 확인

중복 확인을 위한 세팅이 필요하다.

```javascript
// 가로, 세로, 3x3 중복 확인 배열
const rowused = []
const colused = []
const boxused = []

// 중복 확인 박스를 만든다.
for (let i = 0; i < N; i++) {
	rowused.push(Array(N + 1).fill(false))
	colused.push(Array(N + 1).fill(false))
	boxused.push(Array(N + 1).fill(false))
}

// 중복 확인 메소드
const isValid = function (row, col, num) {
	const box = getBoxNum(row, col)
	return (
		rowused[row][num] === false &&
		colused[col][num] === false &&
		boxused[box][num] === false
	)
}
```

#### 3x3 박스

3x3 박스 안에서 중복되는 숫자를 확인할 때 해당 좌표의 박스 번호가 필요하다.

```javascript
// 3x3 박스 번호
const boxes = [
	[0, 0, 0, 1, 1, 1, 2, 2, 2],
	[0, 0, 0, 1, 1, 1, 2, 2, 2],
	[0, 0, 0, 1, 1, 1, 2, 2, 2],
	[3, 3, 3, 4, 4, 4, 5, 5, 5],
	[3, 3, 3, 4, 4, 4, 5, 5, 5],
	[3, 3, 3, 4, 4, 4, 5, 5, 5],
	[6, 6, 6, 7, 7, 7, 8, 8, 8],
	[6, 6, 6, 7, 7, 7, 8, 8, 8],
	[6, 6, 6, 7, 7, 7, 8, 8, 8]
]

// 3x3 박스 번호 찾는 메소드
const N = board.length
const getBoxNum = function (row, col) {
	return boxes[row][col]
}
```

#### 스도쿠 게임

```javascript
// 숫자 입력
const toggleNum = function (row, col, num) {
	const box = getBoxNum(row, col)
	board[row][col] = num
	rowused[row][num] = !rowused[row][num]
	colused[col][num] = !colused[col][num]
	boxused[box][num] = !boxused[box][num]
}

// 스도쿠 게임
const aux = function (idx, blanks, board) {
	// 모든 빈 칸을 다 봤으면 리턴
	if (idx === blanks.length) {
		return true
	}

	// 빈칸 확인 백트래킹
	const [row, col] = blanks[idx]
	for (let num = 1; num <= 9; num++) {
		if (isValid(row, col, num) === true) {
			toggleNum(row, col, num)
			if (aux(idx + 1, blanks, board) === true) {
				return true
			}
			toggleNum(row, col, num)
		}
	}
	return false
}

// 시작
aux(0, blanks, board)
return board
```

#### 완성

```javascript
const sudoku = function (board) {
	// 3x3 박스
	// 중복 확인
	// 빈칸 확인
	// 스도쿠 게임
}
```
