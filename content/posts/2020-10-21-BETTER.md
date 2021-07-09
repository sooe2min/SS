---
title: 어제보다 더 나은 오늘 (BETTER)
date: 2020-10-21
description: JavaScript, Database, RDB, SQL, NoSQL
---

---

더 나은 기술

---

## DATABASE

[NoSQL vs Relational Databases](https://www.mongodb.com/scale/nosql-vs-relational-databases)

[What are the major differences between NoSQL and SQL?](https://www.mongodb.com/nosql-explained/nosql-vs-sql)

### Structured Query Language

- 데이터 정의 언어(`DDL`) & 데이터 조작 언어(`DML`)
- 터미널에서 데이터를 쿼리하는 것은 GUI에 비해 비효율적이다. 특히 `JOIN`이 그렇다. 
- `ORM`

### Relational Databases

- 관계형 데이터베이스 관리 시스템(RDBMS)
- [MYSQL](https://dev.mysql.com/)
- `schema.sql`를 작성하여 데이터베이스를 디자인(mapping cardinality)하고 `MySQL` 서버에 [Batch](https://dev.mysql.com/doc/refman/8.0/en/batch-mode.html)한다. `Node.js`의 [mysql](https://github.com/mysqljs/mysql) 모듈로 데이터베이스를 `연결`하고 `쿼리`한다.
- [dotenv](https://www.npmjs.com/package/dotenv) is a zero-dependency module that loads environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env).
- [SQL Tutorial](https://www.w3schools.com/sql/default.asp) / [Node.js MySQL](https://www.w3schools.com/nodejs/nodejs_mysql.asp)

### NoSQL

- [mongoDB](https://www.mongodb.com/) 

## Issue & Keyword

- `ERROR 1064 (42000) at line n: You have an error in your SQL syntax`

  문법

- `ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: YES)` 

  비밀번호

- `ERROR 1075 (42000) at line n: Incorrect table definition; there can be only one auto column and it must be defined as a key` 

  PRIMARY KEY + AUTO INCREMENT