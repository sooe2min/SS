---
title: 파이널 프로젝트 5 (COMMUNICATION)
date: 2020-12-19
tags: JavaScript, Project
---

---

CORS

Session

OAuth

Encryption

---

## Development

인증(`authentication`) 관련 이슈가 몇 가지 있었다. 먼저 말하고 싶은 건 개발자로서 기능을 구현하는 동안 이슈를 마주하고 시행착오를 겪는 과정은 너무나도 당연하고 자연스러운 일이다. 하지만 절대 여기서 끝이 아니다. 늘 뒤에 따라붙는 것이 있는데 그건 바로 `UI/UX`다. 사용자 경험 이슈는 각자의 좋았던 경험이 다르고 정답이 없다 보니 최선의 답을 찾기 위한 `커뮤니케이션`으로 이어진다. 간단하게 말해서 인증 구현보다 토론하는 시간이 더 많았다.

백엔드에서 계정 관련 기능은 가입 절차가 정해지면 유저 정보 암호화를 각별히 잘 신경 쓰고 쿠키와 세션, 토큰, OAuth 등으로 인증을 구현하면 된다.

### CORS

계정 인증을 구현하고 쿠키를 가지고 놀기 위해 [cors](https://www.npmjs.com/package/cors) 미들웨어를 이용해서 매 응답마다 필수적인 헤더 작성을 피했다. 여러 옵션으로 `CORS` 관련 헤더를 구성하고 `credentials` 옵션으로 헤더를 pass 하면 된다. [Access-Control-Allow-Credentials](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials)

<details><summary><span style="background-color:#f5f2f0"><strong>index.js</strong></strong></span></summary>

```javascript
const express = require('express')
const cors = require('cors')

const app = express()

app.use(
	cors({
		origin: true,
		methods: ['GET', 'POST'],
		credentials: true
	})
)
```

</details>

### Session

일반(이메일) 계정 인증은 [express-session](https://www.npmjs.com/package/express-session) 미들웨어로 구현했다. 추가 헤더를 작성하지 않아도 자동으로 `Set-Cookie`를 응답한다. 쿠키 암호화, 쿠키 이름 변경, `httpOnly`, `sameSite`, `secure` 등 여러 옵션 설정이 가능하다.

<details><summary><span style="background-color:#f5f2f0"><strong>index.js</strong></strong></span></summary>

```javascript
const express = require('express')
const session = require('express-session')

const app = express()

app.use(
	session({
		secret: '@final',
		key: 'token',
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: false
			// sameSite: 'none', // 모든 요청마다 쿠키 전송이 가능합니다. with secure
			// secure: true // HTTPS
		}
	})
)
```

</details>

### OAuth

OAuth는 공식 문서가 워낙 잘 되어 있어서 기본 흐름만 잘 이해하면 된다. 목적은 토큰 하나다. 프론트엔드에서 시작된다.

1. **클라이언트의 사용자가 OAuth에게 `인가 코드`를 요청한다.**

<details><summary><span style="background-color:#f5f2f0"><strong>login.js</strong></span></summary>

```jsx
<button className="sideBarButton" id="naver">
	<a
		href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI_NA}&state=test`}></a>
</button>
```

</details>

리액트에서 custom 환경 변수를 추가할 때는 `REACT_APP_`로 시작하는 환경 변수를 만들어야 한다. 환경 변수는 `process.env`에 정의된다. 그리고 `dotenv`를 사용한다면 `.env` 파일의 위치를 잘 확인해서 `.gitignore`에 똑바로 적용될 수 있도록 해야 한다.

<details><summary><span style="background-color:#f5f2f0"><strong>.env</strong></span></summary>

```javascript
// kakao
REACT_APP_REST_API_KEY = ID
REACT_APP_REDIRECT_URI_KA = http://localhost:3000/users/kakao
// naver
REACT_APP_CLIENT_ID = ID
REACT_APP_REDIRECT_URI_NA = http://localhost:3000/users/naver
// facebook
REACT_APP_APP_ID = ID
REACT_APP_REDIRECT_URI_FA = http://localhost:3000/users/facebook
```

</details>

나머지 코드는 백엔드에서 작성한다.

2. **OAuth는 서버에게 `인가 코드`를 응답한다.**
3. **서버는 `인가 코드`를 가지고 OAuth에게 `접근 토큰`을 요청한다.**
4. **OAuth는 서버에게 `접근 토큰`을 응답한다.**
5. **서버는 `접근 토큰`을 클라이언트에게 건넨다.**

<details><summary><span style="background-color:#f5f2f0"><strong>controllers/oauth/naver.js</strong></span></summary>

```javascript
const { user } = require('../../models')
const axios = require('axios')

require('dotenv').config()
const CLIENT_ID = process.env.CLIENT_ID // CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET // CLIENT_Secret

module.exports = {
	link: async (req, res) => {
		// 코드를 얻었다.
		const code = req.query.code
		const state = req.query.state

		// 토큰을 요청한다.
		const token = await axios({
			method: 'post',
			url: `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&state=${state}`,
			headers: {
				'X-Naver-Client-Id': CLIENT_ID,
				'X-Naver-Client-Secret': CLIENT_SECRET
			}
		})
		// 토큰을 얻었다.
		const ACCESS_TOKEN = token.data.access_token

		// 토큰으로 유저정보를 요청한다.
		const userinfo = await axios({
			method: 'get',
			url: `https://openapi.naver.com/v1/nid/me`,
			headers: {
				Authorization: `Bearer ${ACCESS_TOKEN}`,
				'Content-Type': 'application/xml'
			}
		})

		// 로그인 & 회원가입
		const id = userinfo.data.response.id
		await user
			.findOrCreate({
				where: { oauth_id: id },
				defaults: {
					oauth_id: id
				}
			})
			.then(user => {
				if (user[1]) {
					res.cookie('token', ACCESS_TOKEN)
					res.cookie('oauth_id', user[0].id)
					res.status(200).redirect('http://localhost:3001')
				} else {
					res.cookie('token', ACCESS_TOKEN)
					res.cookie('user', user[0].id)
					res.status(200).redirect('http://localhost:3001')
				}
			})
			.catch(err => console.log(err))
	},

	unlink: async (req, res) => {
		const token = req.cookies.token
		if (token) {
			const deleteToken = await axios({
				method: 'post',
				url: `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&access_token=${token}&service_provider=NAVER`,
				headers: {
					'X-Naver-Client-Id': CLIENT_ID,
					'X-Naver-Client-Secret': CLIENT_SECRET
				}
			})
			if (deleteToken.data.result === 'success') {
				res.status(200).send(`naver unlink success`)
			}
		} else {
			res.status(401).send('this access token does not exist')
		}
	}
}
```

</details>

### Encryption

유저 정보를 보호하기 위해 가입과 로그인 비밀번호를 암호화했다. 처음에는 `Sequelize`의 `Hooks`를 이용했다.

<details><summary><span style="background-color:#f5f2f0"><strong>models/user.js</strong></span></summary>

```javascript
const crypto = require('crypto')

user.init(
	{
		oauth_id: DataTypes.STRING,
		nickname: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		age: DataTypes.INTEGER,
		gender: DataTypes.STRING
	},
	{
		hooks: {
			// 가입할 때
			beforeCreate: (data, options) => {
				var shasum = crypto.createHmac('sha1', 'secret')
				shasum.update(data.password)
				data.password = shasum.digest('hex')
			},
			// 로그인할 때
			beforeFind: (data, options) => {
				if (data.where.password) {
					var shasum = crypto.createHmac('sha1', 'secret')
					shasum.update(data.where.password)
					data.where.password = shasum.digest('hex')
				}
			}
		},
		sequelize,
		modelName: 'user'
	}
)
```

</details>

하지만 위에 `beforeCreate`는 암호화가 필요 없는 OAuth 가입 절차에도 영향을 미쳤다. 그 이유는 서로 다른 가입 절차에 동일하게 작성했던 `findOrCreate` 때문이다.

<details><summary><span style="background-color:#f5f2f0"><strong>join</strong></span></summary>

```sql
// OAuth 가입
.findOrCreate({
  where: { oauth_id: id },
  defaults: {
    oauth_id: id
  }
})

// 일반 가입
.findOrCreate({
  where: { email: email },
  defaults: {
    email: email,
    password: hashPassword,
    nickname: nickname,
    gender: gender,
    age: age
  }
})
```

</details>

그래서 `Hooks`를 이용하지 않고 일반 가입 및 로그인에만 따로 암호화 기능을 구현했다.

<details><summary><span style="background-color:#f5f2f0"><strong>controllers/users/signup</strong></span></summary>

```javascript
const { user } = require('../../models')
const crypto = require('crypto')

module.exports = async (req, res) => {
  const { email, password, nickname, gender, age } = req.body
  if (email && password && nickname && gender && age) {
    // 암호화
    const hashPassword =
      crypto.createHmac('sha1', 'secret').update(password).digest('hex')
    ...
  }
  ...
}

```

</details>

## References

[Adding Custom Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
