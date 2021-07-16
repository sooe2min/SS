---
title: 넷플릭스 클론 2
date: 2021-02-16
tags: JavaScript, Flexbox, Grid
---

---

푸터는 `grid`와 `flex`에 대해 고민해 볼 수 있는 컴포넌트다.

---

## Components

### Footer

![footer](static/footer.png)

푸터는 흐름보다 스타일링에서 어려움이 있었다. 중앙 링크들의 `direction`이 `row`인지 `column`인지 헷갈렸다. `display`마다 방향의 표시가 다르다는 것을 몰랐기 때문이다.

`flex`의 방향은 아이템이 놓이는 방향을 말한다. 수평으로 나열하고 싶다면 `row` 값을 주면 된다.

`grid`의 방향은 트랙의 방향을 말한다. 트랙의 방향을 따라 아이템이 위치한다. 그러니까 `column` 값을 줘야 아이템이 수평으로 나열된다.

아마 계속 헷갈릴 거 같은데?? 하여튼 푸터의 링크는 아래처럼 작성한다.

**`containers/footer.js`**

```jsx
import React from 'react'
import { Footer } from '../components'

export function FooterContainer() {
  return (
    <Footer>
      <Footer.Title>Questions? Call 00-308-321-0161</Footer.Title>
      <Footer.Break />
      <Footer.Row>
        <Footer.Column>
          <Footer.Link href="#">FAQ</Footer.Link>
          <Footer.Link href="#">Investor Relations</Footer.Link>
          <Footer.Link href="#">Privacy</Footer.Link>
          <Footer.Link href="#">Speed Test</Footer.Link>
        </Footer.Column>
        <Footer.Column>...
        <Footer.Column>...
        <Footer.Column>...
      </Footer.Row>
      <Footer.Select>...
      <Footer.Text>Netflix South Korea</Footer.Text>
      <Footer.Break />
      <Footer.Copy>...
    </Footer >
  )
}
```

**`components/fotter/styles/footer.js`**

```javascript
import styled from 'styled-components/macro'

export const Container = styled.div`
	display: Flex;
	flex-direction: Column;
	max-width: 1000px;
	margin: auto;
	width: 100%;
	padding: 70px 45px 20px 45px;
	color: #757575;
`

export const Title = styled.div`...
`

export const Row = styled.div`
	display: grid;
	grid-template-columns: repeat(4, minmax(auto, 210px));
	grid-gap: 12px;
	margin: 0px 40px;

	@media (max-width: 1000px) {
		grid-template-columns: repeat(2, minmax(150px, 1fr));
	}
`

export const Column = styled.div`
	display: flex;
	flex-direction: Column;
`

export const Break = styled.p`
	flex-basis: 100%;
	height: 0;
`
```
