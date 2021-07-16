---
title: 넷플릭스 클론 1 (시작)
date: 2021-02-15
tags: JavaScript, React, styled-components
---

---

클론. 프론트엔드 개발의 구조를 배우고 싶다. 타인의 정답으로 나의 정답을 찾는다. 기록보다 실행.

`styled-components`부터 시작한다. 사용해보니 위에서 아래로 흐르는 `React`의 데이터 흐름과 연관이 깊다.

---

## package.json

```json
"dependencies": {
  "@testing-library/jest-dom": "^5.11.4",
  "@testing-library/react": "^11.1.0",
  "@testing-library/user-event": "^12.1.10",
  "firebase": "^8.2.6",
  "fuse.js": "^6.4.6",
  "normalize.css": "^8.0.1",
  "react": "^17.0.1",
  "react-dom": "^17.0.1",
  "react-router-dom": "^5.2.0",
  "react-scripts": "4.0.2",
  "styled-components": "^5.2.1",
  "web-vitals": "^1.0.1"
}
```

`normalize.css`는 브라우저 스타일 간 차이점을 정규화한다. 리셋과는 다르게 유용한 기본값은 유지하고 최신 표준에 맞는 일관성을 제공한다. 크로스 브라우징에 유용할 것 같다.

`styled-components`는 자바스크립트를 이용하여 리액트 컴포넌트를 스타일링(`CSS in JS`) 한다. `function`, `props` 등으로 동적인 스타일링이 가능하다.

## CSS

위에 두 개의 패키지로 전역 스타일을 핸들링한다. `normalize.css`는 그냥 `import` 해주면 되고 `styled-components`는 자식 속성을 허용하지 않는 헬퍼 함수 `createGlobalStyle`을 이용한다. 둘 다 적용하면 헬퍼 함수의 속성이 `normalize.css`의 속성을 덮어쓴다.

둘 다 하나의 HTML 페이지의 고유한 스타일을 추가하는 `Internal CSS`로써 `<head>` 요소의 자식으로 `<style>` 태그 내부에 정의된다.

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

**`global-styles.js`**

```jsx
import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html, body {
    font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -mos-osx-font-smoothing: grayscale;
    ...
  }
`
```

## Components

`conponents` 폴더를 만들고 새로운 컴포넌트가 추가될 때마다 하위 폴더를 만든다. 그리고 각 컴포넌트마다 JS와 CSS 코드를 `index.js`와 `styles`로 분리해서 작성한다. 다음 흐름을 따르는데 코드 작성은 순서를 거꾸로 하는 것도 괜찮은 것 같다.

1. `app.js`에서 라우팅한다.
2. `containers/<conponent_name>.js`에서 컴포넌트를 배치한다.
3. `components/<conponent_name>/index.js`에서 컴포넌트를 정의한다.
4. `components/<conponent_name>/styles/<conponent_name>.js`에서 컴포넌트를 스타일링한다.
5. `components/index.js`에서 `default` 함수를 `export` 한다.

### Jumbotron

점보트론은 대형 스크린을 말한다.

![jumbotron](static/jumbotron.png)

- 가장 외부 `Container`
- 각 내부 `Item`, `Inner`마다 2개의 `Pane`(left, right)
- 각 `Pane`마다 `Title`과 `SubTitle`, `Image`

`CSS in JS`을 이용해서 만드는 첫 컴포넌트이고 오랜만에 다루는 리액트의 흐름도 낯설기 때문에 데이터의 흐름대로 코드를 충분히 기록한다.

**`app.js`**

```jsx
import React from 'react'
import { JumbotronContainer } from './containers/jumbotron'

export default function App() {
	return <JumbotronContainer />
}
```

**`containers/jumbotron.js`**

`jumbotron` 컨테이너부터 마지막 스타일링 단계까지 `props`를 이용해서 `direction` 값을 전달한다.

```jsx
import React from 'react'
import jumboData from '../fixtures/jumbo.json'
import { Jumbotron } from '../components'

export function JumbotronContainer() {
	return (
		<Jumbotron.Container>
			{jumboData.map(item => (
				<Jumbotron key={item.id} direction={item.direction}>
					<Jumbotron.Pane>
						<Jumbotron.Title>{item.title}</Jumbotron.Title>
						<Jumbotron.SubTitle>{item.subTitle}</Jumbotron.SubTitle>
					</Jumbotron.Pane>
					<Jumbotron.Pane>
						<Jumbotron.Image src={item.image} alt={item.alt} />
					</Jumbotron.Pane>
				</Jumbotron>
			))}
		</Jumbotron.Container>
	)
}
```

**`components/jumbotron/index.js`**

`Jumbotron`을 구성하는 작은 요소들을 메소드로 작성했다. 때문에 `Jumbotron` 함수만 `export default` 해주면 된다. 여기에 보이는 `props`들은 CSS를 향한다.

```javascript
import React from 'react'
import {
	Item,
	Inner,
	Container,
	Pane,
	Title,
	SubTitle,
	Image
} from './styles/jumbotron'

export default function Jumbotron({
	children,
	direction = 'row',
	...restProps
}) {
	return (
		<Item>
			<Inner direction={direction}>{children}</Inner>
		</Item>
	)
}

Jumbotron.Container = function JumbotronContainer({
	children,
	...restProps
}) {
	return <Container {...restProps}>{children}</Container>
}

Jumbotron.Pane = function JumbotronPane({ children, ...restProps }) {
	return <Pane {...restProps}>{children}</Pane>
}

Jumbotron.Title = function JumbotronTitle({ children, ...restProps }) {
	return <Title {...restProps}>{children}</Title>
}

Jumbotron.SubTitle = function JumbotronSubTitle({
	children,
	...restProps
}) {
	return <SubTitle {...restProps}>{children}</SubTitle>
}

Jumbotron.Image = function JumbotronImage({ ...restProps }) {
	return <Image {...restProps}></Image>
}
```

**`components/jumbotron/styles/jumbotron.js`**

`styled-components/macro`를 `import` 해주면 ClassName이 더 직관적이다. `styled-components`가 아니었다면 `flex-direction` 프로퍼티 하나 때문에 코드가 더 복잡해졌을 거다. `props`는 템플릿 리터럴의 표현식(`${expression}`)을 이용해서 접근한다.

```jsx
import styled from 'styled-components/macro'

export const Item = styled.div`...
`

export const Inner = styled.div`
	display: flex;
	align-items: center;
	flex-direction: ${({ direction }) => direction};
	justify-content: space-between;
	max-width: 1100px;
	margin: auto;
	width: 100%;

	@media (max-width: 1000px) {
		flex-direction: column;
	}
`
export const Container = styled.div`
	@media (max-width: 1000px) {
		${Item}: last-of-type h2 {
			margin-bottom: 50px;
		}
	}
`

export const Pane = styled.div`...
`

export const Title = styled.h1`...
`

export const SubTitle = styled.h2`...
`

export const Image = styled.img`...
`
```

**`components/index.js`**

```jsx
export { default as Jumbotron } from './jumbotron'
```
