---
title: 미니멀 (SIMPLE IS THE BEST)
date: 2020-09-30
description: JavaScript, CommonJS, Express
---

---

간단하게

---
## [CommonJS](http://www.commonjs.org/)

> javascript: not just for browsers any more!

자바스크립트를 브라우저뿐 아니라 Server-side 또는 Desktop 애플리케이션에서도 사용할 수 있도록 한다. 그 핵심은 모듈화다.

1. 스코프(Scope): 모든 모듈은 자신만의 독립적인 실행 영역이 있어야 한다.

2. 정의(Definition): 모듈 정의는 `exports` 객체를 이용한다.
   - `exports`는 `module.exports`를 참조한다.

3. 사용(Usage): 모듈 사용은 `require` 함수를 이용한다.

## [Express](https://expressjs.com/)

> Fast, unopinionated, minimalist web framework for Node.js 

- *Routing* refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

- [API reference](https://expressjs.com/en/4x/api.html)

- [Middleware](https://expressjs.com/ko/resources/middleware.html)

  ![Middleware](/static/Middleware.png)

