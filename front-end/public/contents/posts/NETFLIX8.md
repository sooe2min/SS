---
title: 넷플릭스 클론 8
date: 2021-04-04
tags: JavaScript, Testing, Testing Library
---

---

테스팅을 시작한다.

---

## React Testing Library

테스팅에 대한 첫인상은 막연함이다. 클론 코딩에서 테스트 코드를 작성하는 과정을 따라가고 테스팅 라이브러리 API를 살펴봐도 코드 작성에 대한 이해만으로는 부족한 어떤 의문이 있었다. 고작 이것만 테스트하는 게 맞는 건지? 모든 구현을 마치고 컴포넌트를 테스트하는 건지 아니면 테스트에 맞춰 구현을 하는 건지? 아마 현업 경험이 없고 애플리케이션 테스트의 목적과 의미에 대한 철학(지향하는 바)이 없으니 질문부터 막연했던 것 같다. 배경을 알아보자.

`React Testing Library`와 `Jest`는 `Create React App`을 사용하면 기본적으로 제공되는 [인기 있는](https://2020.stateofjs.com/en-US/technologies/testing/) 테스팅 라이브러리다. `Testing Library` 패키지는 사용자 중심의 방식으로 UI 구성 요소를 테스트할 수 있도록 돕는다.

- 구성 요소가 `사용자를 위해` 작동한다는 확신을 줄 수 있는 `유지 관리 가능한` 테스트를 작성한다.
- 코드 사용자가 일반적으로 사용하거나, 보거나, 알지도 못하는 `구현 세부 사항`을 포함하지 않는다. 이는 구성 요소의 동작이 아닌 `구현`만 변경하는 리팩토링으로 인해 테스트가 중단되지 않도록 한다.

- 최종 사용자는 렌더링 되는 것을 보거나 상호작용한다. 개발자는 구성 요소로 전달되는 props를 보거나 상호작용한다. 따라서 테스트는 일반적으로 전달된 소품 또는 렌더링된 출력만 보거나 상호 작용해야 한다.
- 테스트는 컴포넌트의 리액트 요소를 가짜 props와 함께 제공한다음, 사용자에게 표시될 콘텐츠에 대한 출력을 쿼리하고 렌더링되는 버튼을 클릭하여 렌더링 된 출력과 상호작용한다.

## Testing

### Configuring Jest

`package.json ` 파일에서 Jest의 구성을 정의할 수 있다. Jest가 셋팅을 알 수 있도록 top level에 `"jest"` 키를 사용한다.

- `collectCoverageFrom` [array]: 커버리지 정보를 수집해야하는 파일 세트를 나타내는 [glob patterns](https://github.com/jonschlinkert/micromatch) 배열이다. This option requires `collectCoverage` to be set to true or Jest to be invoked with `--coverage`.
- `coverageThreshold` [object]: 커버리지 결과에 대한 최소 임계값 시행을 구성하는데 사용된다. 임계값을 넘지 못하면 jests는 실패한다.
- `coverageReporters`: A list of reporter names that Jest uses when writing coverage reports. Any [istanbul reporter](https://github.com/istanbuljs/istanbuljs/tree/master/packages/istanbul-reports/lib) can be used.

```
{
	"jest": {
		"collectCoverageFrom": [
			"<rootDir>/src/**/*.js",
			"!<rootDir>/src/app.js",
			"!<rootDir>/src/helpers/routes.js",
			"!<rootDir>/src/lib/firebase.js",
			"!<rootDir>/src/lib/firebase.prod.js",
			"!<rootDir>/src/index.js",
			"!<rootDir>/src/seed.js",
			"!<rootDir>/src/utils/index.js",
			"!<rootDir>/src/pages/index.js",
			"!<rootDir>/src/global-styles.js",
			"!<rootDir>/src/components/index.js",
			"!<rootDir>/src/firebase.prod.js",
			"!<rootDir>/src/hooks/*.js",
			"!<rootDir>/src/context/*.js"
		],
		"coverageThreshold": {
			"global": {
				"branches": 90,
				"functions": 90,
				"lines": 90,
				"statements": 90
			}
		},
		"coverageReporters": ["html", "text"]
	}
}
```

### Jest CLI Options

The `jest` command line runner has a number of useful options.

- `--coverage[=<boolean>]`: Indicates that test coverage information should be collected and reported in the output.
- `--watchAll`: 파일에서 변경을 지켜보다 어떤 변경이 있을 때 모든 테스트를 다시 시작한다.

### Player

**`__tests__/components/player.test.js`**

```javascript
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Player } from '../../components'

describe('<Player />', () => {
	it('renders the <Player /> with a bunny video', () => {
		const { container, getByText, queryByTestId } = render(
			<Player>
				<Player.Button />
				<Player.Video src="/videos/bunny.mp4" />
			</Player>
		)

		expect(queryByTestId('player')).toBeFalsy()
		fireEvent.click(getByText('Play'))

		expect(queryByTestId('player')).toBeTruthy()
		fireEvent.click(getByText('Play'))

		expect(queryByTestId('player')).toBeFalsy()
		expect(container.firstChild).toMatchSnapshot()
	})
})
```

- `describe(name, fn)` creates a block that groups together several related tests.
- `test(name, fn, timeout)`: alias `it`. The first argument is the test name; the second argument is a function that contains the expectations to test. The third argument (optional) is `timeout` (in milliseconds) for specifying how long to wait before aborting. _The default timeout is 5 seconds._
- The `expect` function is used every time you want to test a value. You will rarely call `expect` by itself. Instead, you will use `expect` along with a "matcher" function to assert something about a value.
- `render(ui: React.ReactElement<any>, options?)` 메소드는 `...queries`, `container`, `debug` 등 몇 가지 속성이 있는 객체를 반환한다.
- `getBy...`: 쿼리에 대해 일치하는 노드를 반환하고 일치하는 요소가 없거나 둘 이상 일치하면 **오류**가 발생한다. 오류는 테스트가 중단을 의미한다. 그러니까 없어야하는 요소를 주장하고 싶을 땐 오류가 발생하지 않는 `queryby...`를 사용한다.
- `queryBy...`: 쿼리에 대해 첫 번째 일치하는 노드를 반환하고 일치하는 요소가 없으면 `null`을 반환한다. 둘 이상 일치하면 오류가 발생한다.
- `ByTestId`: A shortcut to `container.querySelector('[data-testid="${yourId}"]')`
- `ByText`: This will search for all elements that have a text node with `textContent` matching the given [`TextMatch`](https://testing-library.com/docs/queries/about#textmatch).
- `.toBeTruthy()`: 값이 참인지 확인하고 싶을 때
- `.toBeFalsy()`
- `fireEvent[eventName](node: HTMLElement, eventProperties: Object)`: Convenience methods for firing DOM events.
- `.toMatchSnapshot(propertyMatchers?, hint?)`: 스냅샷이 일치하지 않으면 테스트는 실패한다.

## References

[Jest](https://jestjs.io/)

[Testing Library](https://testing-library.com/)

[How to use React Testing Library Tutorial](https://www.robinwieruch.de/react-testing-library)

[Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)
