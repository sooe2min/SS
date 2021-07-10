---
title: 넷플릭스 클론 6
date: 2021-02-21
description: JavaScript, Firebase, Storage, Custom Hook
---

---

사용자 정보에 따른 라우팅을 위해 Custom Hook과 헬퍼 함수를 만든다.

---

## Routing

커스텀 훅과 헬퍼 함수를 이용하여 기존 라우팅을 리팩토링한다.

- 커스텀 훅 `useAuthListener`을 이용해서 사용자를 가져온다.
- 헬퍼 함수 `IsUserRedirect`, `ProtectedRoute`을 이용해서 사용자 정보에 따라 라우팅한다.

```jsx
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Home, Browse, Signup, Signin } from './pages'
import * as ROUTES from './constants/routes'
import { useAuthListener } from './hooks'
import { IsUserRedirect, ProtectedRoute } from './helpers/routes'


export default function App() {
  // 사용자를 가져온다.
  const { user } = useAuthListener()

  return (
    // 헬퍼 함수를 이용한 라우팅
    <Router>
      <IsUserRedirect
        user={user}
        loggedInPath={ROUTES.BROWSE}
        path={ROUTES.HOME}
        exact
      >
        <Home />
      </IsUserRedirect>

      <IsUserRedirect
        user={user}
        loggedInPath={ROUTES.BROWSE}
        path={ROUTES.SIGN_UP}
      >
        <Signup />
      </IsUserRedirect>

      <IsUserRedirect
        user={user}
        loggedInPath={ROUTES.BROWSE}
        path={ROUTES.SIGN_IN}
      >
        <Signin />
      </IsUserRedirect>

      <ProtectedRoute
        user={user}
        path={ROUTES.BROWSE}
      >
        <Browse />
      </ProtectedRoute>
    </Router>
  )
}
```

## Custom Hook

사용자 정의 Hook의 이름은 `use`로 시작되어야 한다.

### hooks/use-auth-listener.js

- `onAuthStateChanged`: 인증 상태 관찰자를 설정하고 사용자의 로그인 상태가 변경될 때마다 관찰자를 호출한다.
- 사용자가 로그인되면 사용자 정보를 JSON 문자열로 변환하여 로컬 저장소(localStorage)에 저장한다.
- `user` 상태를 갱신하고 리턴한다.

```javascript
import { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../context/firebase'

export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('authUser'))
  )
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    // Auth 객체에 관찰자를 설정한다.
    const listener = firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        // localStorage에 사용자 정보를 저장한다.
        localStorage.setItem('authUser', JSON.stringify(authUser))
        // user 상태를 갱신한다.
        setUser(authUser)
      }
      else {
        localStorage.removeItem('authUser')
        setUser(null)
      }

      return () => listener()
    })
  }, [])

  return { user }
}
```

### hooks/use-content.js

콘텐츠 훅은 나중에 browse 페이지에서 슬라이드를 구현할 때 쓰인다.

- 초기값이 빈 배열인 `content` 상태 변수를 선언한다.
- `collection(target).get()`: target 컬렉션의 데이터를 가져온다.
- `content` 상태를 갱신하고 리턴한다.

```javascript
import { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../context/firebase'

export default function useContent(target) {
  const [content, setContent] = useState([])
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    // 데이터를 가져온다.
    firebase
      .firestore()
      .collection(target)
      .get()
      .then(snapshot => {
        const allContent = snapshot.docs.map(contentObj => ({
          ...contentObj.data(),
          docId: contentObj.id
        }))
        // content 상태를 갱신한다.
        setContent(allContent)
      })
      .catch(error => {
        console.log(error.message)
      })
  }, [])

  return { [target]: content }
}
```

## Helpers

### helpers/routes.js

**`IsUserRedirect`**:

- `user` 값이 있으면 `loggedInPath` 경로로 redirect 한다. 
- 없으면 `children` 페이지를 렌더링 한다. 
- `Home`, `Signin`, `Signout` 페이지에 쓰인다.

```javascript
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export function IsUserRedirect({ user, loggedInPath, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        if (!user) {
          return children
        }

        if (user) {
          return (
            <Redirect
              to={{
                pathname: loggedInPath
              }}
            />
          )
        }

        return null
      }}
    />
  )
}
```

**`ProtectedRoute`**:

- `user` 값이 있으면 `children` 페이지를 렌더링 한다. 
- 없으면 로그인이 필요하므로 `signin` 페이지로 redirect 한다. 
- `browse` 페이지에서만 쓰인다.

```javascript
export function ProtectedRoute({ user, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return children
        }

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: location }
              }}
            />
          )
        }

        return null
      }}
    />
  )
}
```
