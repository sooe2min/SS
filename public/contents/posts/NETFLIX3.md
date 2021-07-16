---
title: 넷플릭스 클론 3
date: 2021-02-17
tags: JavaScript, React, Context, Hook
---

---

Accordion 컴포넌트에서는 토글 기능을 구현한다. 헤더를 클릭해서 바디의 display를 조작하는 것인데 이때 `Hook`과 `Context`를 이용한다.

---

## Hook

Hook은 함수 컴포넌트에서 React state와 생명주기 기능을 연동할 수 있게 해주는 함수다.

- `const [state, setState] = useState(initialState)`: 상태 값과 그 값을 갱신하는 함수를 반환한다. state의 초기값을 인수로 받는다.
- `useEffect`: 리액트에게 컴포넌트가 렌더링 이후에 어떤 일을 수행해야하는 지를 말한다. 명령형 또는 어떤 effect를 발생하는 함수를 인수로 받는다. 리액트는 우리가 넘긴 함수를 기억했다가 첫 번째 렌더링과 이후의 모든 업데이트에서 불러낼 것이다. 업데이트는 네트워크 리퀘스트, DOM 수동 조작, 로깅 등을 말한다. 업데이트 시 effect를 건너뛰고 싶다면 두 번째 인수로 배열을 넘기면 된다.
- `const value = useContext(MyContext)`: context 객체의 현재 값을 반환한다. context의 현재 값은 트리 안에서 이 Hook을 호출하는 컴포넌트에 가장 가까이에 있는 `<MyContext.Provider>`의 `value` prop에 의해 결정된다.

## Context

콘텍스트는 위에서 아래로 흐르는 리액트의 일반적인 데이터 흐름을 기분좋게 거스를 수 있는 기능이다. 단계마다 일일이 `props`를 넘겨주지 않아도 컴포넌트 트리 전체에 데이터를 제공할 수 있다.

- `React.createContext`: Context 객체를 만든다. Context 객체를 구독하고 있는 컴포넌트를 렌더링할 때 React는 트리 상위에서 가장 가까이 있는 Provider로부터 현재 값을 읽는다. 인수는 적절한 Provider를 찾지 못했을 때 쓰이는 값이다.
- `Context.Provider`: Context 오브젝트에 포함된 Provider 컴포넌트는 value prop을 받아서 이 값을 하위에 있는 컴포넌트에게 전달한다.

콘텍스트 활용의 핵심은 상태가 어떤 컴포넌트에서 쓰이는지를 정확히 알고 Provider를 작성하는 것으로 보인다.

## Components

### Accordion

![footer](static/accordion.png)

**`containers/accordion.js`**

아코디언 컨테이너에서 토글 state가 쓰이는 위치는 `Header`와 `Body` 컴포넌트다. 때문에 상위에 있는 `Item` 컴포넌트에 Provider를 작성한다.

```jsx
import React from 'react'
import faqsData from '../fixtures/faqs.json'
import { Accordion, OptForm } from '../components'

export function FaqsContainer() {
  return (
    <Accordion>
      <Accordion.Title>Frequently Asked Questions</Accordion.Title>
      {faqsData.map(item => (
        <Accordion.Item key={item.id}>
          <Accordion.Header>{item.header}</Accordion.Header>
          <Accordion.Body>{item.body}</Accordion.Body>
        </Accordion.Item>
      ))}

      <OptForm>...
    </Accordion>
  )
}
```

**`components/accordion/index.js`**

1. 콘텍스트 객체를 만든다.
2. 초기값이 false인 상태와 갱신 함수를 선언한다.
3. Provider 컴포넌트를 이용해서 value prop을 하위 컴포넌트에 전달한다.
4. 하위 컴포넌트에서 콘텍스트 객체의 현재 값을 받는다.
   - 4-1. Header를 클릭하면 toggleShow 값이 바뀌고 값에 따라 이미지가 변경된다.
   - 4-2. togglwShow 값에 따라 className을 변경된다. 또는 Body 컴포넌트를 렌더링한다.

```jsx
import React, { useState, createContext, useContext } from 'react'
import {
	Container,
	Inner,
	Item,
	Title,
	Header,
	Body
} from './styles/accordion'

// 1
const ToggleContext = createContext()

export default function Accordion({ children, ...restProps }) {
	return (
		<Container {...restProps}>
			<Inner>{children}</Inner>
		</Container>
	)
}

Accordion.Item = function AccordionItem({ children, ...restProps }) {
	// 2
	const [toggleShow, setToggleShow] = useState(false)

	return (
		// 3
		<ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
			<Item {...restProps}>{children}</Item>
		</ToggleContext.Provider>
	)
}

Accordion.Title = function AccordionTitle({ children, ...restProps }) {
	return <Title {...restProps}>{children}</Title>
}

Accordion.Header = function AccordionHeader({ children, ...restProps }) {
	// 4
	const { toggleShow, setToggleShow } = useContext(ToggleContext)

	// 4-1
	return (
		<Header onClick={() => setToggleShow(!toggleShow)} {...restProps}>
			{children}
			{toggleShow ? (
				<img src="/images/icons/close-slim.png" alt="close" />
			) : (
				<img src="/images/icons/add.png" alt="Open" />
			)}
		</Header>
	)
}

Accordion.Body = function AccordionBody({ children, ...restProps }) {
	// 4
	const { toggleShow } = useContext(ToggleContext)

	// 4-2
	return toggleShow ? <Body {...restProps}>{children}</Body> : null

	// return (
	//   <Body className={toggleShow ? 'open' : 'close'} {...restProps}>
	//     { children}
	//     {/* <ToggleContext.Consumer>
	//       {value => console.log(value)}
	//     </ToggleContext.Consumer> */}
	//   </Body >
	// )
}
```
