---
title: 넷플릭스 클론 5
date: 2021-02-19
tags: JavaScript, Firebase
---

---

Firebase를 연동하여 Form 컴포넌트와 Signup, Signin 페이지를 만든다.

---

## Firebase

파이어베이스의 `인증`과 `Cloud Firestore` 제품을 이용한다.

- 인증: 사용자 인증 흐름을 설정한다.
- Cloud Firestore: 사용자 정보 등의 데이터를 저장한다.

**`lib/firebase.prod.js`**

프로젝트 설정에서 스크립트를 확인하고 먼저 파이어베이스를 초기화한다. config 정보가 유출되지 않도록 `.gitignore`를 활용한다.

```javascript
import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
	apiKey: 'API_KEY',
	authDomain: 'PROJECT_ID.firebaseapp.com',
	projectId: 'PROJECT_ID',
	storageBucket: 'PROJECT_ID.appspot.com',
	messagingSenderId: 'SENDER_ID',
	appId: 'APP_ID'
}

const firebase = Firebase.initializeApp(config)

export { firebase }
```

**`context/firebse.js`**

파이어베이스를 모든 컴포넌트에서 사용할 수 있도록 콘텍스트를 만들고 트리의 가장 높은 위치에서 value prop을 전달한다.

```javascript
import { createContext } from 'react'

export const FirebaseContext = createContext(null)
```

**`index.js`**

```jsx
import React from 'react'
import { render } from 'react-dom'
import 'normalize.css'
import App from './app'
import { GlobalStyles } from './global-styles'
import { FirebaseContext } from './context/firebase'
import { firebase } from './lib/firebase.prod'

render(
	<>
		<FirebaseContext.Provider value={{ firebase }}>
			<GlobalStyles />
			<App />
		</FirebaseContext.Provider>
	</>,
	document.getElementById('root')
)
```

## Components

### Form

![signin](static/signin.png)

Signin, Signup 페이지에서는 사용자로부터 데이터를 수집하여 서버에 제출한다. `form`, `input`, `submit` 엘리먼트 등으로 구성되어 있는 폼 컴포넌트가 이를 돕는다. 여기서 `button` 엘리먼트는 타입만 `submit`으로 설정하면 `input` 엘리먼트와 차이가 없으며 오히려 스타일을 적용하기가 훨씬 수월하다.

## Pages

### pages/signin.js

- 파이어베이스로 인증을 처리하고 데이터를 저장한다.
- `react-route-dom`의 `useHistory` hooks를 이용해서 세션 기록을 관리한다.
- `error`: 인증 요청에서 에러가 발생하면 `Form.Error` 컴포넌트를 렌더링 한다.
- `isInvalid`: 이메일과 비밀번호 중 하나라도 공백일 경우 `disabled` 속성을 이용하여 `submit` 버튼을 비활성 한다.

```jsx
export default function Signin() {
  const { firebase } = useContext(FirebaseContext)
  const history = useHistory()

  const [emailAdress, setEmailAdress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const isInvalid = emailAdress === '' || password === ''

  const handleSignin = function (event) {...}

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign In</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}

          <Form.Base onClick={handleSignin} method='POST'>
            <Form.Input
              placeholder='Email or phone number'
              value={emailAdress}
              onChange={({ target }) => setEmailAdress(target.value)}
            />
            <Form.Input
              type='password'
              autoComplete='off'
              placeholder='Password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.Submit disabled={isInvalid} type='submit'>
              Sign In
            </Form.Submit>
          </Form.Base>

          <Form.Text>...
          <Form.TextSmall>...
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </>
  )
}
```

**`handleSignin`**:

- `signInWithEmailAndPassword`: 인증(로그인)을 요청한다. 실패하면 `error` 상태를 갱신한다.
- `push(path, [state])` - (function) Pushes a new entry onto the history stack

```javascript
const handleSignin = function (event) {
	event.preventDefault()

	// 인증을 요청한다.
	firebase
		.auth()
		.signInWithEmailAndPassword(emailAdress, password)
		.then(() => {
			history.push(ROUTES.BROWSE)
		})
		.catch(error => {
			setEmailAdress('')
			setPassword('')
			// error 상태를 갱신한다.
			setError(error.message)
		})
}
```

### pages/signup.js

**`handleSignup`**:

- `createUserWithEmailAndPassword`: 신규 계정을 생성한다. 실패하면 `error` 상태를 갱신한다.
- `push(path, [state])` - (function) Pushes a new entry onto the history stack

```javascript
const handleSignup = function (event) {
	event.preventDefault()

	// 신규 계정을 생성한다.
	firebase
		.auth()
		.createUserWithEmailAndPassword(emailAdress, password)
		.then(result => {
			result.user
				.updateProfile({
					displayName: firstName,
					photoURL: Math.floor(Math.random() * 5 + 1)
				})
				.then(() => {
					history.push(ROUTES.BROWSE)
				})
		})
		.catch(error => {
			setFirstName('')
			setEmailAdress('')
			setPassword('')
			// error 상태를 갱신한다.
			setError(error.message)
		})
}
```
