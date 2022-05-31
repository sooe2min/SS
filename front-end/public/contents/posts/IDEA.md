---
title: 결국 (IDEA)
date: 2020-10-12
tags: JavaScript, Redux
---

---

문제를 인식하고 아이디어를 실현한다.

---

## Redux

### 1. [Motivation](https://ko.redux.js.org/understanding/thinking-in-redux/motivation)

### 2. [Three Principles](https://ko.redux.js.org/understanding/thinking-in-redux/three-principles/)

### 3. [Glossary](https://ko.redux.js.org/understanding/thinking-in-redux/glossary/)

#### Action

`type Action = Object`

**액션**은 상태를 변화시키려는 의도를 표현하는 평범한 객체입니다. 액션은 저장소에 데이터를 넣는 유일한 방법입니다.

액션은 어떤 형태의 액션이 행해질지 표시하는 `type` 필드를 가져야 합니다. 타입은 상수로 정의되고 다른 모듈에서 임포트할 수 있습니다.

#### Action Creator

**액션 생산자**는 단지 액션을 만드는 함수입니다. 액션은 정보의 묶음이고, 액션 생산자는 액션을 만드는 곳이니 두 용어를 혼동하지 마세요.

액션 생산자를 호출하면 액션을 만들어낼 뿐 디스패치하지는 않습니다. 저장소를 변경하기 위해서는 [`dispatch`](https://ko.redux.js.org/api/store#dispatch) 함수를 호출해야 합니다. 액션 생산자를 호출해 그 결과를 저장소 인스턴스로 바로 디스패치하는 함수를 **바인드된 액션 생산자**라고 부르기도 합니다.

액션 생산자가 현재 상태를 읽어야 하거나, API 호출을 실행해야 하거나, 라우트 전환같은 부수효과를 일으켜야 한다면, 액션 대신 [비동기 액션](https://ko.redux.js.org/understanding/thinking-in-redux/glossary/#비동기-액션)을 반환해야 합니다.

#### State

`type State = any`

**상태**(**상태 트리**라고도 합니다)는 넓은 의미의 단어이지만, Redux API에서는 보통 저장소에 의해 관리되고 [`getState()`](https://ko.redux.js.org/api/store#getState)에 의해 반환되는 하나의 상태값을 지칭합니다. 상태는 Redux 애플리케이션의 전체 상태를 나타내며, 보통 깊게 중첩되어 있는 객체입니다.

####Reducer

`type Reducer<S, A> = (state: S, action: A) => S`

**리듀서**(**리듀싱 함수**라고 부르기도 합니다)는 누적값과 값을 받아서 새로운 누적값을 반환하는 함수입니다. 이들은 값들의 컬렉션을 받아서 하나의 값으로 줄이는데 사용됩니다.

Redux에서 누적값은 상태 객체이고, 누적될 값은 액션입니다. 리듀서는 주어진 이전 상태와 액션에서 새로운 상태를 계산합니다. 이들은 반드시 같은 입력이 있으면 같은 출력을 반환하는 **순수 함수**여야만 합니다. 이들은 부수효과를 가져서는 안됩니다.

리듀서를 순수하게 유지하는것은 매우 중요합니다. 여러분이 **절대로** 리듀서 내에서 하지 말아야 할 것들은:

- 인수들을 변경(mutate)하기
- API 호출이나 라우팅 전환같은 사이드이펙트를 일으키기
- `Date.now()`나 `Math.random()` 같이 순수하지 않은 함수를 호출하기

#### [Store](https://ko.redux.js.org/basics/store)

저장소는 애플리케이션의 상태 트리를 가지고 있는 객체입니다. 리듀서 수준에서 결합이 일어나기 때문에, Redux 앱에는 단 하나의 저장소만 있어야 합니다.

이전 섹션에서 우리는 "무엇이 일어날지"를 나타내는 [액션](https://ko.redux.js.org/basics/actions)과 이 액션에 따라 상태를 수정하는 [리듀서](https://ko.redux.js.org/basics/reducers)를 정의했습니다.

**저장소**는 이들을 함께 가져오는 객체입니다. 저장소는 아래와 같은 일들을 해야 합니다:

- 애플리케이션의 상태를 저장하고
- [`getState()`](https://ko.redux.js.org/api/store#getState)를 통해 상태에 접근하게 하고
- [`dispatch(action)`](https://ko.redux.js.org/api/store#dispatch)를 통해 상태를 수정할 수 있게 하고
- [`subscribe(listener)`](https://ko.redux.js.org/api/store#subscribe)를 통해 리스너를 등록합니다.

#### Dispatching Function

`type BaseDispatch = (a: Action) => Action`

`type Dispatch = (a: Action | AsyncAction) => any`

**디스패치 함수**는 액션이나 [비동기 액션](https://ko.redux.js.org/understanding/thinking-in-redux/glossary/#비동기-액션)을 받는 함수입니다. 받은 다음 하나나 여러개의 액션을 저장소에 보낼수도 보내지 않을수도 있습니다.

보통의 디스패치 함수와 저장소 인스턴스가 미들웨어를 거치지 않고 제공하는 기본 [`dispatch`](https://ko.redux.js.org/api/store#dispatchaction) 함수를 구분해야 합니다.

기본 디스패치 함수는 **반드시** 동기적으로 저장소의 리듀서에 액션을 보내야 합니다. 그러면 리듀서는 저장소가 반환한 이전 상태와 함께 새 상태를 계산합니다. 리듀서가 사용하기 위해서 액션은 평범한 객체여야 합니다.

[미들웨어](https://ko.redux.js.org/understanding/thinking-in-redux/glossary/#미들웨어)는 기본 디스패치 함수를 감쌉니다. 미들웨어를 통해 디스패치 함수는 액션 뿐 아니라 비동기 액션을 처리할 수 있습니다. 미들웨어는 액션이나 비동기 액션을 다음 미들웨어에 넘기기 전에 변환하거나, 지연시키거나, 무시하거나, 해석할 수 있습니다.

### 4. [Using Redux with React](https://ko.redux.js.org/basics/usage-with-react/)

####Presentational and Container Components

Redux용 React 바인딩은 **presentational 컴포넌트와 container 컴포넌트 components를 분리**하는 아이디어를 채택했습니다. 이런 용어에 익숙하지 않으시다면, [이 글을 먼저 읽어보시고](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) 다시 이곳으로 돌아오세요.

| Presentational       | Container                               |                                                         |
| -------------------- | --------------------------------------- | ------------------------------------------------------- |
| 목적                 | 어떻게 보여질 지 <br />(마크업, 스타일) | 어떻게 동작할 지 <br />(데이터 불러오기, 상태 변경하기) |
| Redux와 연관됨       | 아니오                                  | 예                                                      |
| 데이터를 읽기 위해   | props에서 데이터를 읽음                 | Redux 상태를 구독                                       |
| 데이터를 바꾸기 위해 | props에서 콜백을 호출                   | Redux 액션을 보냄                                       |
| Are written          | By hand                                 | Usually generated by React Redux                        |

우리가 작성할 대부분의 컴포넌트는 presentational 컴포넌트가 될 것입니다. 하지만 여러 개의 container 컴포넌트를 만들어서 Redux store와 연결해야 할 필요성도 있습니다.

#### 컴포넌트 계층을 설계하기[#](https://ko.redux.js.org/basics/usage-with-react/#컴포넌트-계층을-설계하기)

#### 컴포넌트 구현하기[#](https://ko.redux.js.org/basics/usage-with-react/#컴포넌트-구현하기)

1. Presentational Component 구현하기
2. Container 컴포넌트 구현하기

이제 위에서 만들었던 presentational 컴포넌트를 Redux와 연결해줄 시간입니다. 이를 위해 몇 개의 container 컴포넌트를 만들 것입니다. 여러분이 container 컴포넌트를 직접 작성할 수도 있지만, 그 대신 React Redux 라이브러리에 내장된 `connect()` 함수를 통해 container 컴포넌트를 생성하는 것을 추천합니다.

`connect()`를 사용하려면, `mapStateToProps`라 불리는 특별한 함수를 정의해야 합니다. 이 함수에는 현재 Redux 저장소의 상태를 어떻게 변형할지, 그리고 어떤 속성을 통해 presentational 컴포넌트로 넘겨줄 지를 서술하면 됩니다.

상태를 읽어오는 일 외에, container 컴포넌트는 저장소에 액션을 보낼 수 있습니다. 위와 비슷한 방식으로 `mapDispatchToProps()` 함수를 정의하면 되는데, 이 함수는 [`dispatch()`](https://ko.redux.js.org/api/store#dispatch) 메소드를 인자로 받습니다. 이 함수가 콜백으로 이루어진 속성들을 반환하도록 만들어주면, presentational 컴포넌트에 이 속성들이 주입됩니다.