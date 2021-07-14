---
title: 현실에 안주할 텐가? (FEAR)
date: 2020-08-17
description: JavaScript, Higher-order function
---

# 현실에 안주할 텐가? (FEAR)

---

두려움을 느낀다는 것은 현실에 안주하고 있지 않다는 것.

---

## JavaScript

### 고차함수

- 고차 함수: 다른 함수를 인자로 받거나 다른 함수를 리턴하는 함수
- 콜백 함수: 다른 함수의 인자로 전달되는 함수
- 커리 함수: 함수를 리턴하는 함수

### 일급 객체: 함수

- 변수에 할당할 수 있다.
- 다른 함수의 인자로 전달될 수 있다.
- 다른 함수의 결과로서 리턴될 수 있다.

### Array 객체 고차 함수

<Image src='/images/Array methods cheatsheet.png' alt="me" width="590px" height="670px" />

- `arr.filter(callback(element[, index[, array]])[, thisArg])`

calls a provided `callback` function once for each element in an array, and constructs a new array of all the values for which `callback` returns [a value that coerces to `true`](https://developer.mozilla.org/en-US/docs/Glossary/Truthy).

A new array with the elements that pass the test. If no elements pass the test, an empty array will be returned.

- `arr.map(callback(currentValue[, index[, array]])[, thisArg])`

calls a provided `callback` function once for each element in an array, in order, and constructs a new array from the results.

- `arr.reduce(callback( accumulator, currentValue[, index[, array]] )[, initialValue])`

If `initialValue` is provided in the call to `reduce()`, then `accumulator` will be equal to `initialValue`, and `currentValue` will be equal to the first value in the array.

If no `initialValue` is provided, then `accumulator` will be equal to the first value in the array, and `currentValue` will be equal to the second.

If the array is empty and no `initialValue` is provided, [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) will be thrown.
