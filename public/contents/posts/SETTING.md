---
title: 파이널 프로젝트 3 (SETTING)
date: 2020-12-05
tags: JavaScript, Project
---

---

MVC

HTTPS

---

## Development

개발을 시작하기 전 우리는 Milestones, Sprint, Kanban을 작성했다. 이는 **Agile Scrum**에 대한 내용인데 완벽히 숙지하고 적용한 것은 아니었다. 기업 실무에서도 사용하는 좋은 개발 프로세스인 것 같으니 회고 마지막에 정리하면 좋을 것 같다.

백엔드에서는 `Express` 프레임워크를 기반으로 `HTTPS` 프로토콜과 `MVC` 패턴을 적용한 `Node.js` 서버를 구축했다.

### MVC

[MVC](https://smss.netlify.app/2020-10-27-PIANO/)는 소프트웨어 디자인 패턴이다. Express 라우팅과 함께 적용하면 참 좋다. 가장 체감하는 이점은 코드의 가독성과 디버깅이다.

<details><summary><span style="background-color:#f5f2f0"><strong>tree</strong></span></summary>

```bash
├── config
│   ├── config.js
│   └── multer.js
├── controllers
│   ├── board
│   ├── oauth
│   ├── setting
│   └── users
├── index.js
├── models
│   ├── article.js
│   ├── comment.js
│   ├── index.js
│   ├── like.js
│   ├── movie.js
│   └── user.js
└── routes
    ├── board.js
    ├── index.js
    ├── setting.js
    └── users.js
```

</details>

그런데 각 폴더마다 로직이 적절하게 위치한 건지 의문이 있다. 답을 확실하게 짚고 넘어가고 싶은데.. 또 `HTTP API`와 `CRUD`에 관한 허점이 있다. 라우팅만 보면 알 수 있는 건데 구현 당시엔 개념이 없었다.

### HTTPS

보안을 상징하는 HTTPS는 언급이 많이 되었던 (아마 쿠키와 OAuth 관련) 이슈 키워드 중 하나라서 꼭 내 힘으로 정복하고 싶었다. 구현의 핵심은 SSL/TLS 인증서였다.

#### #1

먼저 [Let's Encrypt](https://letsencrypt.org/ko/)의 SSL 인증서를 AWS의 EC2: 클라우드 가상 서버에 가져다 놓는다.

인증서는 [certbot](https://certbot.eff.org/)으로 받는다. 이때 DNS가 필요한데 처음 [내도메인.한국](https://xn--220b31d95hq8o.xn--3e0b707e/)의 DNS는 인증서를 받을 때 문제가 있었다. [freenom](https://freenom.com)의 국가 코드 최상위 도메인으로 문제를 해결했다.

#### #2

[HTTPS](https://nodejs.org/api/https.html#https_https) 서버를 구현하는 코드를 작성한다.

- option 객체에는 인증서 정보를 담는다.
- HTTPS의 443 포트 번호를 잘 설정해 줘야 한다.
- 로컬에서는 인증서를 받을 수 없다. 환경 변수를 가지고 개발과 배포 환경을 구분 지어 번거로움을 줄였다.

> Let’s Encrypt can’t provide certificates for “localhost” because nobody uniquely owns it, and it’s not rooted in a top level domain like “.com” or “.net”.

<details><summary><span style="background-color:#f5f2f0"><strong>index.js</strong></span></summary>

```javascript
const express = require('express')
const http = require('http')
const https = require('https')
const fs = require('fs')

// env
require('dotenv').config()

// express, port
const app = express()
const PORT = process.env.PORT || 3000

// https options
const option =
	process.env.NODE_ENV === 'production'
		? {
				key: fs.readFileSync(
					'/etc/letsencrypt/live/cinephile.tk/privkey.pem'
				),
				cert: fs.readFileSync(
					'/etc/letsencrypt/live/cinephile.tk/fullchain.pem'
				)
		  }
		: undefined

// server
let httpServer
let httpsServer
option
	? (httpsServer = https.createServer(option, app).listen(PORT, () => {
			console.log(`HTTPS is running at port ${PORT}`)
	  }))
	: (httpServer = http.createServer(app).listen(PORT, () => {
			console.log(`HTTP is running at port ${PORT}`)
	  }))
const server = httpsServer ? httpsServer : httpServer
```

</details>

## References

[무료 도메인 종류와 방식 알고 선택하세요!](https://studyforus.tistory.com/132)

[SSL 인증서를 활용하여 Express 서버 HTTPS 연결하기](https://eunsukimme.github.io/nodejs/2019/09/20/Express-SSL-HTTPS/)
