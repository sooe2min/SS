---
title: 꾸준하게 (PIANO)
date: 2020-10-26
description: JavaScript, MVC, ORM
---

---

미루지 말고 피아노를 치자.

---

## Model-View-Controller, MVC

**MVC**는 소프트웨어 디자인 패턴, 아키텍처 패턴이다. 

비즈니스 로직과 프리젠테이션 로직을 분리하여 서로 영향을 받지 않도록 한다. 

코드 가독성이 좋고 재사용성이 높다. 분업과 유지 보수가 쉽다.

![mvc](./static/mvc2.png)

- **Model**

  비즈니스 로직을 구현한다. 데이터베이스에 접근하고 데이터를 처리한다.

- **View**

  프리젠테이션 로직을 구현한다. 컨트롤러로부터 받은 데이터를 사용자 인터페이스에 시각적으로 표현한다.

- **Controller**

  입력 분석 로직과 요청 처리 로직을 구현한다. 입력 분석 로직으로 사용자의 입력(요청)을 분석한다. 요청 처리 로직으로 모델의 상태(데이터)를 변경한다. 뷰에게 데이터를 건넨다.  

## Object-relational mapping, ORM

- 객체 지향 프로그래밍(`OOP`)의 **클래스**와 관계형 데이터베이스(`RDB`)의 **테이블**은 일치하지 않는다. 
- `ORM`은 `객체`와 `RDB`를 매핑하여 자동으로 `SQL`을 생성한다. 
- 객체 지향적으로 데이터를 조작할 수 있다.

### [Sequelize ORM](https://sequelize.org/)

> Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.

- [Migrations](https://sequelize.org/master/manual/migrations.html)
- `npx sequelize-cli --help`

## Issue & Keyword

- `app.use(express.json())` // for parsing application/json
  `app.use(express.urlencoded({ extended: true }))` // for parsing application/x-www-form-urlencoded

- 라우트 경로에서 헤맸다. app.js 파일에서 라우팅이 `app.use(/links, router)`로 되어 있었는데, routes 폴더에서 `router.get('/links')`라고 작성을 해서 라우트 경로를 중복으로 작성했다. 답은 `router.get('/')`

- [res.json()](https://expressjs.com/en/4x/api.html#res.json): Send a JSON response.

  [res.redirect()](https://expressjs.com/en/4x/api.html#res.redirect): Redirect a request. 

  [res.sendStatus()](https://expressjs.com/en/4x/api.html#res.sendStatus): Set the response status code and send its string representation as the response body.

- `CommonJS`가 헷갈렸다. 내보내는 것과 받는 것은 무엇이고 받는 방법은? `module.exports`, `exports`, `require`

  `require()`의 최종 경로가 디렉토리일 때, 뒤에 파일명이 없으면 `index.js`을 불러온다.

- **모델**과 **데이터베이스**는 `models` 폴더의 `index.js` 파일에서 연결되어 있다. 그러니까 `index.js` 파일을 `require`하고 각 모델에 접근한다.

- `sequelize` 메소드 `findOne`, `findAll`, `findOrCreate`, `update`, `create` 등은 **프라미스 객체**를 리턴한다. 그래서 `then`으로 받아서 값을 처리할 수 있다. 