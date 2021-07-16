---
title: 급할수록 (STEP BY STEP)
date: 2020-09-29
tags: JavaScript, Node.js
---

---

한 걸음씩

---

## [Node.js](https://nodejs.dev/learn)

### About Node.js

Node.js is a JavaScript runtime built on [Chrome's V8 JavaScript engine](https://v8.dev/). As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications.

There are several dependencies that Node.js relies on to work the way it does.

- 런타임: 프로그래밍 언어가 동작하는 환경(프로그램)

- **V8**: The V8 library provides Node.js with a JavaScript engine, which Node.js controls via the V8 C++ API. V8 is maintained by Google, for use in Chrome.

- **npm**: Node.js is all about modularity, and with that comes the need for a quality package manager; for this purpose, npm was made. With npm comes the largest selection of community-created packages of any programming ecosystem, which makes building Node.js apps quick and easy.

  package.json: `npm` 및 `project` 정보

  _dependencies_: 작동을 위한 모듈 `--save`

  _devDependencies_: 개발과 작동을 위한 모듈

  _scripts_: `npm`으로 실행시킬 수 있는 명령어

- [Node Version Manager](https://github.com/jasongin/nvs)

### **API reference documentation**

The [API reference documentation](https://nodejs.org/api/) provides detailed information about a function or object in Node.js. This documentation indicates what arguments a method accepts, the return value of that method, and what errors may be related to that method. It also indicates which methods are available for different versions of Node.js.

This documentation describes `the built-in modules` provided by Node.js. It does not document modules provided by the community.

### [Anatomy of an HTTP Transaction](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)

The purpose of this guide is to impart a solid understanding of the process of Node.js HTTP handling.

- Instantiate an HTTP server with a request handler function, and have it listen on a port.
- Get headers, URL, method and body data from `request` objects.
- Make routing decisions based on URL and/or other data in `request` objects.
- Send headers, HTTP status codes and body data via `response` objects.
- Handle stream errors in both the `request` and `response` streams.

#### Create the Server

- Any node web server application will at some point have to create a web server object. This is done by using `createServer`
- When an HTTP request hits the server, node calls the request handler function with a few handy objects for dealing with the transaction, `request` and `response`.
- In order to actually serve requests, the `listen` method needs to be called on the `server` object. In most cases, all you'll need to pass to `listen` is the port number you want the server to listen on.

#### Request

1. Method, URL and Headers
2. Request Body
   - The `request` object that's passed in to a handler implements the [`ReadableStream`](https://nodejs.org/api/stream.html#stream_class_stream_readable) interface.
   - We can grab the data right out of the stream by listening to the stream's `'data'` and `'end'` events.
   - The chunk emitted in each `'data'` event is a [`Buffer`](https://nodejs.org/api/buffer.html). If you know it's going to be string data, the best thing to do is collect the data in an array, then at the `'end'`, concatenate and stringify it.
3. A Quick Thing About Errors
   - An error in the `request` stream presents itself by emitting an `'error'` event on the stream.
   - **If you don't have a listener for that event, the error will be _thrown_, which could crash your Node.js program.**
   - You should therefore add an `'error'` listener on your request streams, even if you just log it and continue on your way.

#### Response

1. HTTP Status Code
   - If you don't bother setting it, the HTTP status code on a response will always be 200.
   - `response.statusCode`
2. Setting Response Headers
   - `response.setHeader(name, value)`
   - When setting the headers on a response, the case is insensitive on their names. If you set a header repeatedly, the last value you set is the value that gets sent.
3. Explicitly Sending Header Data
   - `response.writeHead(statusCode[, statusMessage][, headers])`
   - Once you've set the headers (either implicitly or explicitly), you're ready to start sending response data.
4. Sending Response Body
   - `response.write(chunk[, encoding][, callback])`
   - `response.end([data[, encoding]][, callback])`
