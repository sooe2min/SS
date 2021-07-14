---
title: 깊이보단 단계 (DEPTH)
date: 2020-08-09
description: JavaScript, Parameter, Primitive Type, Reference Type
---

# 깊이보단 단계 (DEPTH)

---

얼마나 깊게. 깊이보단 단계가 아닐까.

## JavaScript

### Parameter

- [Spread syntax](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax)(...): 인수, 요소, 키값 쌍으로 확장
- [Rest parameter](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/rest_parameters)(...): 배열로 압축
- [Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
- [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments): `Array`-like object

  “Array-like” means that `arguments` has a [`length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments/length) property and properties indexed from zero, but it doesn't have [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)'s built-in methods like [`forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) or [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

### Primitive Type vs Reference Type

#### Primitive Type

- Number, String, Boolean, null, undefined
- Access By Value
- 변수에 할당될 때 고정된 크기로 저장되고 해당 변수가 원시 데이터의 값을 보관한다.
- 변수 선언, 초기화, 할당시 값이 저장된 메모리 영역에 직접 접근한다.
- 변수에 새 값이 할당될 때 변수에 할당된 메모리 블럭에 저장된 값을 바로 변경한다.

#### Reference Type

- Array, Object, Function
- Access By Reference
- 변수에 할당될 때 크기가 정해져 있지 않고 값이 직접 해당 변수에 저장될 수 없으며 변수에는 데이터에 대한 참조만 저장된다.
- 변수의 값이 저장된 힙 메모리의 주소 값을 저장한다.
- 참조 타입은 변수의 값이 저장된 메모리 블럭의 주소를 가지고 있고 자바스크립트 엔진이 변수가 가지고 있는 메모리 주소를 이용해서 변수의 값에 접근한다.

## Test Framework

- mocha, chai, jest, supertest, karma, jasmine
- 범주적 추론(Categorical Reasoning): 작성하고자 하는 코드가 그 기능을 충실히 이행할 수 있도록 모든 범주를 찾아야 한다. 모든 함수(컴포넌트)에 유닛 테스트를 해야 한다.
