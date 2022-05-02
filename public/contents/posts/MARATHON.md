---
title: 긴 호흡 (MARATHON)
date: 2020-08-05
tags: JavaScript, Scope, Context, Closure
---

# 긴 호흡 (MARATHON)

---

이건 스프린트처럼 보이는 마라톤. 하루가 완벽하지 않아도 괜찮다. 조금씩 나아질 거다.

### Scope

#### 1. 정의

- 변수를 참조(reference)할 수 있는 범위
- 함수가 다른 함수 내부에서 선언되었다면 내부 함수는 외부 함수의 변수를 참조할 수 있다. 하지만 외부 함수는 내부 함수의 변수를 참조할 수 없다.
- 함수는 서로의 스코프에 접근할 수 없다.
- Lexical Scoping: Scope는 함수를 어디에 선언하였는지에 따라 정해진다.

#### 2. Global Scope

- 함수 또는 중괄호 바깥에서 변수를 선언, 코드 어디서든 접근 가능
- 전역 변수는 전역 객체 Window의 키가 된다.
- 선언하지 않은 변수는 전역 변수가 되므로 전역 변수 선언은 지양한다.
- '네임스페이스', 'Strict Mode'

#### 3. Local Scope

- Function Scope: 함수 내부에서 변수를 선언, 함수 내부에서만 접근 가능
- Block Scope: 중괄호 내부에서 변수를 선언, 중괄호 내부에서만 접근 가능
- 함수에서 전역 변수보다 지역 변수를 우선하여 참조한다.

|           |  let   | const(상수) |   var    |
| :-------: | :----: | :---------: | :------: |
| 유효 범위 | Block  |    Block    | Function |
|  재할당   |  가능  |   불가능    |   가능   |
|  재선언   | 불가능 |   불가능    |   가능   |

### Excution Context

#### 1. 정의: 코드가 실행되는 환경

> Execution context (abbreviated form — EC) is the abstract concept used by ECMA-262 specification for typification and differentiation of an executable code.

- Global execution context
- Function execution context

#### 2. 실행 컨텍스트의 객체

##### Variable Object 변수객체

- 변수, parameter, arguments, function declarations
- 전역 컨텍스트: 변수 객체는 전역 변수, 전역 함수 등을 포함하는 전역 객체(Global Object)를 가리킨다.
- 함수 컨텍스트: 변수 객체는 지역 변수, 지역 함수 등을 포함하는 활성 객체(Activation Object)를 가리키고, arguments object가 추가된다. 매개변수, 인수들의 정보를 담고 있다.

##### Scope Chain

- 변수를 검색하는 메커니즘
- 엔진은 스코프 체인으로 렉시컬 스코프를 파악한다.
- 함수는 중첩될 때마다 부모 함수의 스코프가 자식 함수의 스코프 체인에 포함된다. 스코프 체인은 함수가 참조할 수 있는 변수, 함수 선언 등의 정보를 가지고 있는 전역 객체(GO) 또는 활성 객체(AO)를 가리킨다.
- 먼저 함수 자신의 Scope 활성 객체에 접근하여 변수를 검색한다. 실패하면 외부 함수의 활성 객체 또는 전역 객체를 검색한다. 변수 검색에 실패하면 정의되지 않은 변수에 접근하는 것으로 판단하여 `ReferenceError`

##### this

### Closure

> A closure is the combination of a function and the lexical environment within which that function was declared.

- 자신이 선언되었을 때의 환경을 기억하는 함수
- 외부 함수의 변수에 접근할 수 있는 내부 함수
- 클로저가 참조할 수 있는 외부 함수의 변수를 자유변수라고 부른다. 클로저라는 이름은 자유변수에 닫혀있는(closed) 함수를 의미한다.
- 실행 컨텍스트로 설명하면 외부함수가 종료해도 외부 함수의 활성 객체가 내부 함수에 의해 참조되고 있다면 내부 함수는 외부 함수의 활성 객체를 스코프 체인으로 참조할 수 있다.

### References

[실행 컨텍스트와 자바스크립트의 동작 원리 | PoiemaWeb](https://poiemaweb.com/js-execution-context)

[클로저 | PoiemaWeb](https://poiemaweb.com/js-closure)
