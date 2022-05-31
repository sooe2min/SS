---
title: isSubsetOf
date: 2021-01-06
tags: JavaScript, Algorithm
---

---

## Algorithm

### 문제

두 개의 입력 `sample` 배열이 `base` 배열의 부분 집합인지 판별한다.

### 입력

**인수1: base**

- `number` 타입의 요소를 갖는 임의의 배열, `base.length`는 100 이하

**인수2: sample**

- `number` 타입의 요소를 갖는 임의의 배열, `sample.length`는 100 이하

### 출력

`boolean` 타입으로 리턴한다.

### 풀이

우선 `every`, `inclued` 메소드를 이용한 로직이 있다.

- `every`: 배열의 모든 요소가 주어진 판별 함수를 통과하는지 테스트한다.
- `includes`: 배열이 특정 요소를 포함하고 있는지 판별한다.

```javascript
// naive solution: O(M * N)
const isSubsetOf = function (base, sample) {
	return sample.every(el => base.includes(el))
}
```

처음에 난 메소드를 까맣게 잊고 있었고 아래처럼 생각했다.

1. 각 입력 배열의 요소를 반복문으로 비교한다.
2. 다르면 `base` 배열의 다음 요소와 비교를 진행한다.
3. 같으면 카운팅하고 `sample` 배열의 다음 요소로 비교를 진행한다.

- `break`는 for문의 다음 단계가 남아있어도 더 진행하지 않는다.

4. 카운팅 숫자와 `sample.length`의 값을 비교한다. 같으면 `sample` 배열은 `base` 배열에 부분 집합이다.

```javascript
const isSubsetOf = function (base, sample) {
	let count = 0
	for (let el1 of sample) {
		for (let el2 of base) {
			if (el1 === el2) {
				count++
				break
			}
		}
	}
	if (count === sample.length) {
		return true
	}
	return false
}
```

모든 요소를 비교하는 위 방법은 배열의 길이가 길어지면 너무 오래 걸린다. 시간 복잡도 개선이 필요하다. 다시 문제를 보자.

_`sample` 배열이 `base` 배열의 부분 집합인지 판별한다._

이 문장을 바꿔 말하면, `sample`의 요소 중 하나라도 `base` 배열에 포함되어 있지 않으면 더 볼 필요 없이 `false`라는 말이다. 이때 앞에 하나 다르다고 바로 `false`를 출력하면 엉터리 결과가 된다. `base` 배열의 **모든 요소**와 비교를 하는 것이 핵심이다. 이런 경우에는 변수에 값을 저장하고 마지막에 판별한다.

맥락은 이렇고 테스트했던 `base`의 요소는 건너뛰어서 시간을 줄이는 센스가 있다. 그러기 위해선 정렬이 먼저다.

```javascript
const isSubsetOf = function (base, sample) {
	// 각 배열을 정렬: O(N * logN), O(M * logM)
	// N >= M 이므로, O(N * logN)
	base.sort((a, b) => a - b)
	sample.sort((a, b) => a - b)

	// 변수를 찾는 여행
	const findVariable = function (el, from) {
		for (let i = from; i < base.length; i++) {
			if (el === base[i]) return i
			else if (el < base[i]) return -1
		}
		return -1
	}

	// 판별
	let baseIdx = 0
	for (let i = 0; i < sample.length; i++) {
		baseIdx = findVariable(sample[i], baseIdx)
		if (baseIdx === -1) return false
	}
	return true
}
```
