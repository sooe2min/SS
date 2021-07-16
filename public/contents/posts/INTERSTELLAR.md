---
title: 우린 답을 찾을 것이다 (INTERSTELLAR)
date: 2020-09-23
tags: JavaScript, Asynchronous, Callback, Promise, Async/await
---

---

We will find a way. We always have.

---

## Asynchronous

> As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications.

`Node.js`에 대한 설명이다. `asynchronous`는 이벤트 관계가 시간적인 관계가 아니란 말이다. 그래서 다수의 명령을 동시에 처리할 수 있다. `Node.js`에서는 `Event Loop`가 `Non-Blocking` I/O operations을 돕는다. 하지만 `synchronous`는 순차적으로 operation하므로 `blocking` 된다.

"I/O" refers primarily to interaction with the system's disk and network supported by [libuv](https://libuv.org/).

**Blocking** is when the execution of additional JavaScript in the Node.js process _must wait_ until a non-JavaScript operation completes. This happens because the event loop is unable to continue running JavaScript while a **blocking** operation is occurring.

**Blocking** methods execute **synchronously** and **non-blocking** methods execute **asynchronously**.

### Callback

`asynchronous` 동작을 스케줄링 하려면 나중에 호출하는 함수, `콜백` 함수를 사용하면 된다. 이런 방식을 '콜백 기반' 비동기 프로그래밍이라고 한다. 무언가를 비동기적으로 수행하는 함수는 함수 내 동작이 처리된 후 실행되어야 하는 함수가 들어갈 `콜백`을 반드시 인수로 제공해야 한다.

하지만 콜백은 한계가 있다. 꼬리에 꼬리를 무는 비동기 동작을 순차적으로 처리하기 위해선 `콜백 안 콜백`으로 코드를 작성해야 하는데, `에러 핸들링`까지 고려한다면 결국, 콜백 지옥에 빠질 수밖에 없다.

### Promise

```javascript
let promise = new Promise(function (resolve, reject)) {executor})
```

`Promise`는 비동기 작업의 완료 또는 실패를 나타내는 객체이다. `new Promise`에 전달되는 함수는 *executor(실행자, 실행 함수)*라고 부른다. executor의 인수 `resolve`와 `reject`는 콜백이다.

*executor*는 프라미스 객체가 만들어질 때 자동으로 실행되는데 여기서 보통 시간이 걸리는 일을 수행한다. 처리가 끝나면 반드시 `resolve`와 `reject`중 하나를 호출하고 프라미스 객체의 상태가 변한다.

- `resolve(value)`: 일이 성공적으로 끝나면, 그 결과를 나타내는 `value`와 함께 호출
- `reject(error)`: 에러가 발생하면, 에러 객체를 나타내는 `error`와 함께 호출
- `new Error(message)`: 오류 객체를 생성한다.

`new Promise` 생성자가 반환하는 프라미스 객체는 내부 프로퍼티를 가지고 있다.

- `state`: 처음에는 _보류(pending)_, `resolve`가 호출되면 _이행(fulfilled)_, `reject`가 호출되면 _거부(rejected)_
- `result`: 처음에는`undefined`, `resolve(value)`가 호출되면 `value`, `reject(error)`가 호출되면 `error`
- 이행(resolved)되거나 거부(rejected)된 상태의 프라미스는 '처리(settled)된 프라미스'라고 부른다. 반대는 '대기(pending) 상태의 프라미스'다.

`then(onFulfilled, onRejected)` 메소드는 프라미스 객체를 리턴한다. 그래서 다시 `then` 메소드를 호출할 수 있고, *Promises Chaining*이 가능하다.

- 첫 번째 인수는 프라미스가 *이행*되었을 때 호출되는 함수, 실행 결과(값) 하나를 인수로 받는다.
- 두 번째 인수는 프라미스가 *거부*되었을 때 호출되는 함수, 거부 이유(에러) 하나를 인수로 받는다.

에러를 발생하는 경우만 다루고 싶다면 `null`을 첫 번째 인수로 전달하면 된다. `catch(onRejected)`을 써도 되는데, `catch(f)`는 `then(null,f)`과 같다.

`finally` 핸들러엔 인수가 없다. 프라미스가 이행되었는지, 거부되었는지 알 수 없다. 그저 일을 마무리 짓고 다음 핸들러에 결과 또는 에러를 전달한다.

`then` 또는 `catch` / `finally` 핸들러가 프라미스 객체를 반환하면, 나머지 체인은 프라미스가 처리될 때까지 기다린다. 처리가 완료되면 `result`(값 또는 에러)가 다음 체인으로 전달된다.

### Promise API

`Promise.all(iterable)` 메소드는 모든 프라미스가 이행될 때까지 기다렸다가 그 결과값을 담은 배열을 리턴한다. 주어진 프라미스 하나라도 거부하면 `Promise.all`은 거부되고, 나머지 결과도 무시한다.

### Async/await

`async function`은 프라미스 객체를 반환하는 비동기 함수를 정의한다. 비동기 함수는 이벤트 루프를 통해 비동기적으로 작동하는 함수로, 암시적으로 `Promise`를 사용하여 결과를 반환한다.

function 앞에 `async` 키워드를 추가하면 함수는 언제나 프라미스를 반환한다. 그리고 함수 안에서 `await`을 사용할 수 있다.

`await` 키워드는 `async` 함수 안에서만 동작한다. `await`은 함수 실행을 기다리게 만든다. 프라미스 앞에 `await`을 붙이면 자바스크립트는 프라미스가 처리(settled)될 때까지 대기한다.

- 프라미스가 이행되면 `await promise`는 프라미스 객체 `result`에 저장된 값을 반환한다.
- 프라미스가 거부되면 `throw`처럼 에러가 던져진다. `await`이 던진 에러는 `try...catch`로 잡을 수 있다.
