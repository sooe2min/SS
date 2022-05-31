---
title: 색안경은 벗어던져 (PREJUDICE)
date: 2020-10-09
tags: JavaScript, React
---

---

선입견. 재미없다고 생각하면 재미없다. 관심을 가지고 보면 다르게 보인다.

처음 DOM 배울 때 내가 타자 연습을 하는 건지, 코딩을 하는 건지 손가락이 너무 아팠다. 그래서 프론트엔드는 못 해먹겠다고 생각했는데 알고 보니 React가 있었다.

리액트를 사용하면 Client-side의 UI를 더 쉽게 만들 수 있다.

---

## [React](https://reactjs.org/)

> A JavaScript library for building user interfaces

**Declarative**: React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

**Component-Based**: Build encapsulated components that manage their own state, then compose them to make complex UIs.

Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.

### 1. [Create React App](https://create-react-app.dev/)

- `npx create-react-app my-app`

### 2. JSX

- JSX는 JavaScript를 확장한 문법입니다. UI가 어떻게 생겨야 하는지 설명하기 위해 React와 함께 사용할 것을 권장합니다.
- JSX는 React '엘리먼트(element)' 를 생성합니다. 엘리먼트는 화면에 표시할 내용을 기술합니다.
- React는 별도의 파일에 마크업과 로직을 넣어 *기술*을 인위적으로 분리하는 대신, 둘 다 포함하는 '컴포넌트'라고 부르는 느슨하게 연결된 유닛으로 관심사를 분리합니다.
- JSX의 중괄호 안에는 유효한 모든 JavaScript 표현식을 넣을 수 있습니다.

### 3. 엘리먼트 렌더링

브라우저 DOM 엘리먼트와 달리 React 엘리먼트는 일반 객체이며(plain object) 쉽게 생성할 수 있습니다. React DOM은 React 엘리먼트와 일치하도록 DOM을 업데이트합니다.

#### DOM에 엘리먼트 렌더링하기

- React 엘리먼트를 루트 DOM 노드에 렌더링하려면 둘 다 [`ReactDOM.render()`](https://ko.reactjs.org/docs/react-dom.html#render)로 전달하면 됩니다.

#### 렌더링 된 엘리먼트 업데이트하기

- React 엘리먼트는 '불변객체' 입니다. 엘리먼트를 생성한 이후에는 해당 엘리먼트의 자식이나 속성을 변경할 수 없습니다. 엘리먼트는 영화에서 하나의 프레임과 같이 특정 시점의 UI를 보여줍니다.

  지금까지 소개한 내용을 바탕으로 하면 UI를 업데이트하는 유일한 방법은 새로운 엘리먼트를 생성하고 이를 `ReactDOM.render()`로 전달하는 것입니다.

#### 변경된 부분만 업데이트하기

- React DOM은 해당 엘리먼트와 그 자식 엘리먼트를 이전의 엘리먼트와 비교하고 DOM을 원하는 상태로 만드는데 필요한 경우에만 DOM을 업데이트합니다.

### 4. Components와 Props

> 컴포넌트를 통해 UI를 재사용 가능한 개별적인 여러 조각으로 나누고, 각 조각을 개별적으로 살펴볼 수 있습니다.

개념적으로 컴포넌트는 JavaScript 함수와 유사합니다. 'props'라고 하는 임의의 입력을 받은 후, 화면에 어떻게 표시되는지를 기술하는 React 엘리먼트를 반환합니다.

#### 함수 컴포넌트와 클래스 컴포넌트

- 컴포넌트를 정의하는 가장 간단한 방법은 JavaScript 함수를 작성하는 것입니다. 또한 ES6 `class`를 사용하여 컴포넌트를 정의할 수 있습니다.

#### 컴포넌트 렌더링

- React가 사용자 정의 컴포넌트로 작성한 엘리먼트를 발견하면 JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 전달합니다. 이 객체를 'props'라고 합니다.

#### props는 읽기 전용입니다.

- 함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트의 자체 props를 수정해서는 안 됩니다.

  모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 *순수 함수*처럼 동작해야 합니다.

### 5. State와 Lifecycle

#### 생명주기 메서드를 클래스에 추가하기

- [react-lifecycle-methods-diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

#### State를 올바르게 사용하기

- 직접 State를 수정하지 마세요. `setState()`를 사용합니다.
- `this.state`를 지정할 수 있는 유일한 공간은 바로 constructor입니다.
- 객체보다는 함수를 인자로 사용하는 다른 형태의 `setState()`를 사용합니다. 그 함수는 이전 state를 첫 번째 인자로 받아들일 것이고, 업데이트가 적용된 시점의 props를 두 번째 인자로 받아들일 것입니다.

#### 데이터는 아래로 흐릅니다

- 부모 컴포넌트나 자식 컴포넌트 모두 특정 컴포넌트가 유상태인지 또는 무상태인지 알 수 없고, 그들이 함수나 클래스로 정의되었는지에 대해서 관심을 가질 필요가 없습니다.
- 컴포넌트는 자신의 state를 자식 컴포넌트에 props로 전달할 수 있습니다.
- 모든 state는 항상 특정한 컴포넌트가 소유하고 있으며 그 state로부터 파생된 UI 또는 데이터는 오직 트리구조에서 자신의 '아래'에 있는 컴포넌트에만 영향을 미칩니다. 일반적으로 이를 “하향식(top-down)” 또는 “단방향식” 데이터 흐름이라고 합니다.

### 6. 이벤트 처리하기

#### React 엘리먼트에서 이벤트를 처리하는 방식은 DOM 엘리먼트에서 이벤트를 처리하는 방식과 매우 유사합니다.

- React의 이벤트는 소문자 대신 캐멀 케이스(camelCase)를 사용합니다.

- JSX를 사용하여 문자열이 아닌 함수로 이벤트 핸들러를 전달합니다.

  `<a href="#" onClick={this.handleClick}>`

- React를 사용할 때 DOM 엘리먼트가 생성된 후 리스너를 추가하기 위해 `addEventListener`를 호출할 필요가 없습니다. 대신, 엘리먼트가 처음 렌더링될 때 리스너를 제공하면 됩니다.

#### ES6 클래스를 사용하여 컴포넌트를 정의할 때, 일반적인 패턴은 이벤트 핸들러를 클래스의 메서드로 만드는 것입니다.

- JSX 콜백 안에서 `this`의 의미에 대해 주의해야 합니다. JavaScript에서 클래스 메서드는 기본적으로 바인딩되어 있지 않습니다. `this.handleClick`을 바인딩하지 않고 `onClick`에 전달하였다면, 함수가 실제 호출될 때 `this`는 `undefined`가 됩니다.

#### 이벤트 핸들러에 인자 전달하기

- 루프 내부에서는 이벤트 핸들러에 추가적인 매개변수를 전달하는 것이 일반적입니다.

  `<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>`

  `<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>`

  두 경우 모두 React 이벤트를 나타내는 `e` 인자가 ID 뒤에 두 번째 인자로 전달됩니다. 화살표 함수를 사용하면 명시적으로 인자를 전달해야 하지만 `bind`를 사용할 경우 추가 인자가 자동으로 전달됩니다.

### 7. 조건부 렌더링

React에서 조건부 렌더링은 JavaScript에서의 조건 처리와 같이 동작합니다. `if` 나 `조건부 연산자`와 같은 JavaScript 연산자를 현재 상태를 나타내는 엘리먼트를 만드는 데에 사용하세요.

#### 논리 && 연산자로 If를 인라인으로 표현하기

- JSX 안에는 중괄호를 이용해서 표현식을 포함 할 수 있습니다. 그 안에 JavaScript의 논리 연산자 `&&`를 사용하면 쉽게 엘리먼트를 조건부로 넣을 수 있습니다.

  JavaScript에서 `true && expression`은 항상 `expression`으로 평가되고 `false && expression`은 항상 `false`로 평가됩니다.

#### 조건부 연산자로 If-Else구문 인라인으로 표현하기

- 엘리먼트를 조건부로 렌더링하는 다른 방법은 조건부 연산자인 `condition ? true: false`를 사용하는 것입니다.

### 8. 리스트와 키

- 'key'는 엘리먼트 리스트를 만들 때 포함해야 하는 특수한 문자열 어트리뷰트입니다.
- Key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕습니다. key는 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정해야 합니다.
- 항목의 순서가 바뀔 수 있는 경우 key에 인덱스를 사용하는 것은 권장하지 않습니다. 만약 리스트 항목에 명시적으로 key를 지정하지 않으면 React는 기본적으로 인덱스를 key로 사용합니다.

### 9. State 끌어올리기

종종 동일한 데이터에 대한 변경사항을 여러 컴포넌트에 반영해야 할 필요가 있습니다. 이럴 때는 가장 가까운 공통 조상으로 state를 끌어올리는 것이 좋습니다.

- React 애플리케이션 안에서 변경이 일어나는 데이터에 대해서는 “진리의 원천(source of truth)“을 하나만 두어야 합니다. 보통의 경우, state는 렌더링에 그 값을 필요로 하는 컴포넌트에 먼저 추가됩니다. 그러고 나서 다른 컴포넌트도 역시 그 값이 필요하게 되면 그 값을 그들의 가장 가까운 공통 조상으로 state를 끌어올리면 됩니다. 이렇게 하는 방법을 'state 끌어올리기'라고 부릅니다.

## Issue & Keyword

- `import React from 'react'`

  `export default App`

- Warning: Each child in a list should have a unique "key" prop.

- Uncaught Error: Objects are not valid as a React child 렌더링할 수 없는 엘리먼트

  `new Date().toString()`

- `new Date().toLocaleDateString('ko-KR')`

- ```javascript
  let date = new Date()
  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  ```

- 파라미터가 하나만 있을 때는 주변 괄호를 생략할 수 있다.

  화살표 함수의 유일한 문장이 'return'일 때 'return'과 중괄호({})를 생략할 수 있다.

- debounce, throttle
