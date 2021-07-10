---
title: 나만의 속도 (PACE)
date: 2020-07-30
description: JavaScript, for, while, Array, Object
---

---

뒤처지면 어때. 할 수 있는 걸 하는 거야. 페이스를 지키자.

---

## JavaScript

### Statement

- [for](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for)
- [while](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/while)
- [continue](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/continue)

### Array [배열](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array)

- `new Array(element0, element1[, ...[, elementN]])`
  `new Array(arrayLength)`
- `arr[index]`
- `arr.indexOf(searchElement[, fromIndex])`
- `array.isArray(obj)`
- `arr.length`
- `arr.push(element1[, ...[, elementN]])`
- `arr.pop()`
- `arr.unshift([...elementN])`
- `arr.shift()`
- `arr.reverse()`
- `array.from(arrayLike[, mapFn[, thisArg]])`
- `arr.join([separator])` 하나의 문자열을 반환
- `array.concat([value1[, value2[, ...[, valueN]]]])` 새로운 배열을 반환
- `array.splice(start[, deleteCount[, item1[, item2[, ...]]]])` 배열의 내용을 변경
- `arr.slice([begin[, end]])` end까지 (end 미포함) 새로운 배열을 반환

### Object [객체](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object)

- `object['key'] = value`

- `object.key = value`

- `delete object.property`

  `delete object['property']`
  
- `Object.keys(obj)` 키(문자열)를 배열로 반환

- `Object.values(obj)` 값을 배열로 반환

- `Object.entries(obj)` [키, 값] 쌍의 배열을 반환

- `for (variable in object) {}`

- `for (variable of iterable) {statement}`

## Issue & Keyword

- 변수는 자유로운 놈이다. 변수는 갱신된다. 
- `for`, `while` 변수를 자유롭게 쓸 수 있다.
- `for`, `while` 초기화, 증감문도 자유롭게 쓸 수 있다.
