---
title: 사라지기 전에 (RECORD)
date: 2020-10-30
description: JavaScript, Encryption, Authentication
---

---

무엇을 어떻게 기록할지.

---

## Encryption

인증 키워드는 쿠키, 세션, 토큰, OAuth 등이 있다. 일단 `HTTPS`는 필수다. 그리고 어떤 인증이든 암호화없이 비밀번호를 저장하는 것은 범죄를 저지를 것과 다름없다고 말한다. 암호화는 비밀번호를 해싱하는 것인데 그것만으로는 쉽게 크랙당한다. 그래서 `rainbow table`을 막기 위해 소금도 뿌리고 `bruto froce`를 막기 위해 해싱을 반복해서 알고리즘 수행 시간을 늦춘다. 패스워드 크랙을 막기 위해 암호화를 직접 구현할 필요는 없다. 형님들이 만들어놓은 추천 알고리즘이 있다. `bcrypt, scrypt, PBKDF2`

## [Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies), [#](https://ko.javascript.info/cookie)

`HTTP`는 `stateless`하다. 서버는 독립적인 요청마다 동일한 클라이언트에서 들어왔는지 판단할 수 없다. 하지만 때로는 상태 정보를 기억해야 한다. 쿠키가 그 역할을 한다. 헤더 확장성을 사용하여, 쿠키가 추가되면 각 요청이 동일한 `context` 또는 동일한 `state`를 공유할 수 있다.

- **Session management**: Logins, shopping carts, game scores, or anything else the server should remember
- **Personalization**: User preferences, themes, and other settings
- **Tracking**: Recording and analyzing user behavior

과거엔 쿠키가 클라이언트에 데이터를 저장할 수 있는 유일한 방법이었다. 하지만 지금은 **Web Storage API**(`localStorage`와 `sessionStorage`)가 있다. 

## Session

쿠키 말고 세션 기반 인증이 있다. 세션은 서버 자원을 이용해서 인증을 구현한다. 쿠키와 개념이 헷갈릴 수 있는데 클라이언트 입장에서 쿠키를 전달 받고(`Set-Cookie`) 쿠키를 요청에 담아(`Cookie`) 인증하는 것은 다름없다. 

`Node.js`, `Express`로 서버를 만들 때는 [express.session](https://www.npmjs.com/package/express-session) 모듈로 세션을 구현한다. 클라이언트마다 자동으로 `sessionID`를 부여하고 쿠키 옵션을 자세하게 설정할 수 있다. 세션은 인증 정보를 store에 저장한다. defeault 값은 MemoryStore, 그리고 `redis`가 있다.

## Token

세션 기반 인증은 서버(또는 데이터베이스)에 인증 정보를 저장한다. 그런데 세션의 자원은 한계가 있고 매 요청마다 저장 되어있는 세션 값과 일치하는지 확인하는 과정이 번거롭다. 그래서 인증 정보를 클라이언트가 보관하도록 만든 것이 토큰 기반 인증이다. 클라이언트가 받는 토큰에는 애초에 민감한 인증 정보를 담지 않고 당연히 암호화해서 건넨다. 

[JSON Web Token](https://jwt.io/)

- HEADER: ALGORITHM & TOKEN TYPE
- PAYLOAD: DATA
- VERIFY SIGNATURE

## OAuth

OAuth는 접근 권한과 인증을 위한 표준이다. 이미 사용자 정보를 가지고 있는 Authorization server에서 인증을 대신하고 원하는 정보에 접근하기 전 사용자에게 미리 권한을 동의 받는다. 유저는 OAuth 정보만 있으면 서로 다른 서비스를 이용할 때마다 매번 다른 인증 정보를 입력하지 않아도 된다. 편리하고 안전하다.

흐름을 알면 된다.

1. 클라이언트는 OAuth에게 Authorization code를 요청한다.
2. OAuth는 서버에게 Authorization code를 응답한다.
3. 서버는 Authorization code를 가지고 OAuth에게 Access token을 요청한다.
4. OAuth는 Access token을 응답한다.
5. 서버는 Access token을 클라이언트에게 건넨다.
   