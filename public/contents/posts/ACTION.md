---
title: 먹고 자고 하고 (ACTION)
date: 2020-09-03
tags: JavaScript, this, Function, method, ESlint
---

---

이것은 무엇인가.

---

## JavaScript

### this

this는 실행 컨텍스트를 따라서 함수를 호출하는 방법으로 결정된다.

1. **Global context**

   전역 실행 문맥에서 `this`는 전역 객체를 참조한다.

   - `console.log(this === window)`

2. **Function context**

   함수 문맥에서 `this`는 런타임, 컨텍스트를 따른다.

   - 기본값으로 전역 객체를 참조한다.
   - 엄격 모드에서는 `undefined`
   - 같은 함수라도 다른 객체에서 호출했다면 `this`가 참조하는 값은 달라진다.

3. **As an object method**

   메소드(객체의 프로퍼티 함수)로 함수를 호출하면 `this`는 해당(부모) 객체를 따른다.

4. **As an constructor**

   `new` 연산자로 생성자 함수를 호출하면 `this`는 새로 생긴 객체(=인스턴스)에 묶인다.

   - [new](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/new) 연산자는 객체 타입의 인스턴스를 생성한다.

   - 사용자 정의 객체 생성

     Define the object type by writing a function.

     Create an instance of the object with `new`.

5. **Arrow functions**

   화살표 함수에서 `this`는 자신을 감싼 정적 범위(lexical context)를 따른다.

   - `function`, `return` 축약
   - 자신의 `this` 값이 없다. 외부에서 값을 가져온다.
   - `call`, `apply`, `bind`의 `this`는 무시된다.
   - 그러니까 메소드(객체의 프로퍼티 함수)를 선언할 때, 그리고 화살표 함수 안에서 `this` 사용은 피한다.

6. **Function method**

   맥락을 전달한다. 첫번째 인수는 `this`

   `func.call(thisArg[, arg1[, arg2[, ...]]])`

   - argument list를 받는다.

   `func.apply(thisArg, [argsArray])`

   - single array of arguments & `arguments`를 받는다.

   `func.bind(thisArg[, arg1[, arg2[, ...]]])`

   - 원본 함수에 `this` 값을 바인딩하는 함수를 생성한다. 바로 호출하지 않는다.

```javascript
let max = Math.max.apply(null, [1, 2, 22])
let min = Math.min.bind(null, 1, 2, 22)
console.log(max) // 22
console.log(min) // f min() {}
console.log(min()) // 1
```

## [ESlint](https://eslint.org/)

- Find and fix problems in your JavaScript code
- 규칙적인 코드 작성으로 가독성을 높인다.
