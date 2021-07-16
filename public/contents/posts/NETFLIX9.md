---
title: 넷플릭스 클론 9
date: 2021-04-13
tags: JavaScript, Testing, Testing Library
---

---

테스팅.. 진행중..

---

## Testing

`Player` 컴포넌트를 시작으로 `Footer`, `Accordion`, `Card`, `Feature`, `Form` 컴포넌트까지 특별한 이슈 없이 테스트를 마쳤다. 출력을 쿼리하고 상호작용하는 절차에 있어서 조금씩 다른 API를 사용하기도 했지만 그건 한 번에 따로 정리하고 중간 후기를 기록한다.

`Testing Library`를 직접 사용해보기 전에는 내가 만든 애플리케이션의 어디서부터 어디까지, 어떤 부분을 테스트해야 할지 막연함이 있었다. 나는 계획 단계가 필수적인 사람인데 테스트에 대한 철학이 전혀 없는 상태에서 그 기준을 스스로 정하려고 하다 보니 부담감이 더 크게 느껴졌었다. 난 정말 무에서 유를 생각했던 건데 그럴 필요가 없었다. 이미 내가 사용하려는 기술 자체가 수많은 시행착오 끝에 많은 사람이 공감하고 사용하는 테스트 도구인데..? 그냥 공식 문서부터 꼼꼼히 읽고 내가 공감할 수 있는 철학을 가졌는지부터 확인했으면 되는 거였다. 또 테스트하는 동안 길을 잃지 않도록 가이드라인이 존재했고 그중 하나가 `--coverage` 옵션을 적용하면 확인할 수 있는 `index.html` 보고서다.

**`coverage/index.html`**

![coverage_index.html](static/coverage_index.html1.png)

위와 같이 첫 페이지에서는 전체적인 테스트 진행 상황을 퍼센티지로 확인할 수 있고, 각 파일을 클릭하면 아래와 같이 해당 파일에서 테스트해야 하는 코드가 무엇인지 알 수 있다.

![coverage_components_accordion_index.js.html](static/coverage_components_accordion_index.js.html.png)

### Form

`Form` 컴포넌트를 테스트하는 동안 `react-router-dom`의 `<Link>` 요소에서 아래 오류가 발생했다.

```bash
Error: Uncaught [Error: Invariant failed: You should not use <Link> outside a <Router>]
```

클론 코딩 가이드에서는 [Mock Functions](https://jestjs.io/docs/mock-functions)을 이용해서 `jest.mock('react-router-dom')` 코드를 추가하여 해결했지만 나에겐 또 다른 에러가 발생했다.

```bash
Error: Uncaught [Error: ForwardRef(Link)(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.]
```

Form 컴포넌트, react-scripts 패키지의 버전, React 문법 또는 테스팅 라이브러리 등 문제가 발생할 수 있는 여러 경우의 수를 살펴봤지만 결국 구글링으로는 답을 찾을 수 없었다. 하지만 등잔 밑이 어두운 법.. [공식 문서](https://testing-library.com/docs/example-react-router/)에서 답을 찾았다.

그것은 바로 테스트에 Router components를 많이 추가할 때 사용하는 `wrapper` 옵션이다.

- wrapper 옵션을 사용하여 렌더링 할 구성 요소에 `MemoryRouter`를 wrap 할 수 있다. `MemoryRouter`는 테스트에서 실제로 `history object`에 접근할 필요가 없고 render 또는 navigate 할 수 있는 구성 요소만 필요할 때 작동한다.

- `history`를 변경해야 한다면 `BrowserRouter`를 사용할 수 있다.

```javascript
import React from 'react'
import { render } from '@testing-library/react'
import { Form } from '../../components'
import { MemoryRouter } from 'react-router-dom'

// jest.mock('react-router-dom')

describe('<Form />', () => {
  it('renders the <Form /> with populated data', () => {
    const { container, getByText, getByPlaceholderText } = render(
      <Form>
        <Form.Title>Sign In Now</Form.Title>

        <Form.Base>...

        <Form.Text>
          New to Netflix?
          {/* <BrowserRouter> */}
          <Form.Link to="/signup">Sign up now</Form.Link>
          {/* </BrowserRouter> */}
        </Form.Text>
        <Form.TextSmall>...
      </Form>
      // , { wrapper: MemoryRouter }
    )

    expect(getByText(`Sign In Now`)).toBeTruthy()
    expect(getByText(`Sign In`)).toBeTruthy()
    expect(getByText(`Sign In`).disabled).toBeTruthy()
    expect(getByText(`This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.`)).toBeTruthy()
    expect(getByPlaceholderText('Email or phone number')).toBeTruthy()
    expect(getByPlaceholderText('Password')).toBeTruthy()
    expect(container.firstChild).toMatchSnapshot()
  })
})
```
