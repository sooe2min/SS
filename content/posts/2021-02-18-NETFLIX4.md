---
title: 넷플릭스 클론 4
date: 2021-02-18
description: JavaScript, React Router Dom
---

---

링크가 있는 Header 컴포넌트와 라우팅을 함께 작성한다.

---

## Routing

리액트로 만들고 CSR으로 작동하는 SPA에서 라우팅은 `react-router-dom`의 `BrowserRouter`를 이용한다.

- Single Page Application(SPA): 최초 모든 정적 리소스를 가지고 있는 하나의 페이지를 로드한다. 이후 유저와의 인터렉션으로 필요한 자원을 동적으로 받거나 페이지의 일부만 업데이트한다.
- Client Side Rendering(CSR): 자바스크립트를 사용하여 브라우저에서 페이지를 직접 렌더링 한다. 초기 페이지 로드가 느리고 구글을 제외한 SEO에 좋지 않다.
- BrowserRouter는 `HTML5 History API`를 사용하여 UI를 URL과 동기화하는 라우터로서, 세션 기록 접근을 가능하게 만든다.

링크 로케이션과 page를 분리하여 작성하고 `app.js`에서 라우팅을 적용한다.

**`constants/routes.js`**

```javascript
export const HOME = '/'
export const BROWSE = '/browse'
export const SIGN_UP = '/signup'
export const SIGN_IN = '/signin'
```

**`pages/home.js`**

홈(`/`) 컴포넌트(페이지)에서는 지금까지 만든 template 관련 컴포넌트가 렌더링 된다.

```jsx
import React from 'react'
import { HeaderContainer } from '../containers/header'
import { JumbotronContainer } from '../containers/jumbotron'
import { FaqsContainer } from '../containers/accordion'
import { FooterContainer } from '../containers/footer'
import { Feature, OptForm } from '../components'

export default function Home() {
  return (
    <>
      <HeaderContainer>...
      <JumbotronContainer />
      <FaqsContainer />
      <FooterContainer />
    </>
  )
}
```

**`app.js`**

```jsx
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, Browse, Signup, Signin } from './pages'
import * as ROUTES from './constants/routes'

export default function App() {
  return (
    <Router>
      {/* <Switch> */}
      <Route exact path={ROUTES.HOME}>
        <Home />
      </Route>
      <Route path={ROUTES.BROWSE}>
        <Browse />
      </Route>
      <Route path={ROUTES.SIGN_UP}>
        <Signup />
      </Route>
      <Route path={ROUTES.SIGN_IN}>
        <Signin />
      </Route>
      {/* </Switch> */}
    </Router>
  );
}
```

`exact`는 path와 URL이 정확하게 일치할 때만 UI를 렌더링 하는 옵션이다. 이 옵션이 없으면 모든 경로에서 `/`를 읽고 위에 홈페이지(`<Home />`)를 같이 렌더링 한다.

## Components

### Header

![header](static/header.png)

헤더 컴포넌트에서 특별한 것은 `<Link>`의 활용이다. 로고와 버튼의 링크를 구현하는 위치가 다르다.

**`components/header/index.js`**

`로고`의 링크는 컴포넌트를 정의하는 단계에서 구현한다.

```jsx
import React from 'react'
import { Background, Container, Logo, ButtonLink } from './styles/header'
import { Link as ReactRouterLink } from 'react-router-dom'

Header.Logo = function HeaderLogo({ to, ...restProps }) {
  return (
    <ReactRouterLink to={to}>
      <Logo {...restProps} />
    </ReactRouterLink>
  )
}

Header.ButtonLink = function HeaderButtonLink({ children, ...restProps }) {
  return <ButtonLink {...restProps}>{children}</ButtonLink>
}
```

**`components/header/styles/header.js`**

`Sign in` 버튼의 링크는 컴포넌트 스타일링 단계에서 구현한다.

```jsx
import styled from 'styled-components/macro'
import { Link as ReactRouterLink } from 'react-router-dom'

export const Logo = styled.img`
  width: 165px;
  padding-top: 8px;

  @media (max-width: 1450px) {
    width: 135px;
  }
`

export const ButtonLink = styled(ReactRouterLink)`
  background: #e50914;
  color: white;
  width: 84px;
  height: fit-content;
  border-radius: 3px;
  font-size: 16px;
  padding: 8px 17px;
  text-decoration: none;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background: #f40612;
  }
`
```

**`containers/header.js`**

`to` 옵션으로 로고와 버튼의 링크 로케이션을 가리킨다.

```jsx
import React from 'react'
import { Header } from '../components'
import * as ROUTES from '../constants/routes'
import logo from '../logo.svg'

export function HeaderContainer({ children }) {
  return (
    <Header>
      <Header.Frame>
        <Header.Logo to={ROUTES.HOME} src={logo} alt='Netflix' />
        <Header.ButtonLink to={ROUTES.SIGN_IN}>Sign In</Header.ButtonLink>
      </Header.Frame>
      {children}
    </Header>
  )
}
```

<details><summary><span style="background-color:#f5f2f0"><strong>홈페이지</strong></span></summary>
![home](static/home.png)

</details>

## References

[Rendering on the Web](https://developers.google.com/web/updates/2019/02/rendering-on-the-web?hl=ko)

[어서 와, SSR은 처음이지? - 도입 편](https://d2.naver.com/helloworld/7804182)

