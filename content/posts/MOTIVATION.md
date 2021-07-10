---
title: 2주 프로젝트 회고 (MOTIVATION)
date: 2020-11-22
description: JavaScript, Project
---

---

프로젝트가 끝났다. 솔직히 재미없었다. 남은 시간 한 달, 그리고 취업까지 갈 길이 먼 데. 타이밍 나쁜 건지, 위기는 기회인지. 짚고 넘어갈 건데 쉬워 보이진 않지만 떠 있는 마음을 다잡기 위해 애를 써보려 한다. 

왜 동기부여가 되지 않았을까. 어떤 결핍이 있었길래?? 콘텐츠, 난이도, 실력, 완성도, etc.

이번 프론트엔드 역할을 맡게 되었을 때 내가 아는 것은 `React`와 `CSS`가 전부였다. 그렇게 직접 프로젝트를 진행해보니 어떤 불편함이 있었는데 그것은 나만 느낀 게 아니었다. 자연스럽게 새로운 기술에 대한 욕구를 느꼈지만 주어진 기간 내에 배우고 적용하기엔 무리가 있었다. 에디터가 있는데 메모장으로 코드를 치는 기분, 답답했다. 

콘텐츠와 난이도, 완성도에 대해 이렇다저렇다 말하기엔 그냥 뒤처진 내 실력이 문제였다. 못하니까 재미없었던 거다. 많이 헤맸고 그만큼 배웠지만, 갈증을 느낀다. 어렴풋이 오아시스가 보인다. '좋아하는 일'이라는 것은 존재하지 않는 것인가? 어쩌면 여태 내가 좇던 꿈은 환상에 불과했던 것일지도 모르겠다. 하지만 환상이 나쁜 것만은 아니다. 환상이 나의 트리거였으니까. 그저 새로운 신기루를 향하면 된다. `'어떤 일을 하고 싶은지'`는 알고 있으니 이젠 `'그 일을 어떻게 즐기는지'`를 찾을 때다.

---

## Planning

1. 어떤 욕구(needs)가 있는지 모르는데 무슨 기획을 하고 무엇을 서비스할까? 더 나은 세상을 꿈꾼다면 꾸준히 관심을 가져야 한다.
2. 기본적인 `Flex`와 [CSS](https://www.w3schools.com/css/default.asp)를 모르니까 와이어 프레임을 작성하는 것이 어려웠다.
3. 프로젝트 흐름이 낯설고 도구([miro](https://miro.com/app/), [figma](https://www.figma.com/))를 다루는 게 서툴다 보니 시간이 많이 걸렸다. 
4. `UI/UX`에 관한 생각이 전혀 없었다. `User Experience`는 개념도 몰랐다. 알고 보니 굉장히 전문 분야더라.
5. 기획 단계에서 컴포넌트와 상태를 분명하게 설계하고자 했다. 하지만 모달처럼 구현해본 적 없는 기능이 있어서 쉽지 않았다. 이것은 개발 과정에서 혼란을 일으켰다. 

## Development

### React Router

라우팅을 하고 props로 데이터를 전달하고 싶었다. 하지만 `<Switch>`, `<Route>` 안에서는 생각대로 되지 않았다. 

- [render: func](https://reactrouter.com/web/api/Route/render-func)를 이용하면 된다.

- `<Route exact path="/" render={() => <Main data={this.state} />} />`

### React

#### #1

자식들이 늘어나서 단축 문법 `<>`, `</>`으로 구현하려고 했다. 하지만 `key` 이슈가 발생했다.

- 단축 문법은 key 또는 어트리뷰트를 지원하지 않는다. 
- `<React.Fragment>`로 대체하면 된다.

#### #2

모든 기능을 `js` 파일로 분리해야 하는 건가? 언제 컴포넌트를 새로 만들지 의문이 있었다. 이번 프로젝트에선 몇 가지 상황에서 새로운 컴포넌트를 추가했다. 재사용이 가능한 기능은 컴포넌트를 따로 분리해놓는 것이 디버깅하는데도 그렇고 효율적이다.

- 독립적인 역할을 수행하는 컴포넌트 추가
- 반복해서 렌더링 해야 하는 엘리먼트가 있을 때 하위 컴포넌트 추가

아래는 `recruit` 페이지의 게시글을 렌더링 하는 섹션이다. 또 `aplly` 페이지에서도 게시글을 렌더링 한다. 

<details><summary><span style="background-color:#f5f2f0"><strong>components/recruit.js</strong></span></summary>

```jsx
{/* recruit_section */}
<section className="recruit__section">
  <div className="recruit_articles">
    {this.state.data.map((team) => (
      <Article
        key={team.id}
        team={team}
        modalOn={this.modalOn.bind(this)}
        />
    ))}
  </div>
</section>
```

</details>

게시글 렌더링 기능을 `article` 컴포넌트로 따로 분리해서 구현했다.

<details><summary><span style="background-color:#f5f2f0"><strong>components/article.js</strong></span></summary>

```jsx
import React from 'react';

const Article = (props) => (
  <>
    {props.team ? (
      <>
        <div className="recruit_card">
          <img src={props.team.img} className="recruit_card_img"></img>
          <div className="recruit_card_nav">
            <div className="recruit_card_title">
              <div>{props.team.title}</div>
            </div>
            <div className="recruit_card_info">
              <dl>
                <dt>user</dt>
                <dd>: 닉네임{props.team.username}</dd>
                <dt>position</dt>
                <dd>: {props.team.team_position}</dd>
                <dt>region</dt>
                <dd>: {props.team.team_region}</dd>
                <dt>date</dt>
                <dd className="date">: 날짜</dd>
              </dl>
            </div>
          </div>
        </div>
      </>
    ) : (
        <>
          <div className="apply_card" onClick={() => props.modalOn(props.user)}>
            <img src={props.user.url} className="apply_card_img"></img>
            <span className="apply_card_info">
              <dl>
                <dt>user</dt>
                <dd>: {props.user.username}</dd>
                <dt>position</dt>
                <dd>: {props.user.user_position}</dd>
                <dt>region</dt>
                <dd>: {props.user.user_region}</dd>
                <dt>status</dt>
                <dd>: {props.user.user_status}</dd>
              </dl>
            </span>
            <div className="apply_card_desc">{props.user.description}</div>
          </div>
        </>
      )}
  </>
);

export default Article;

```

</details>

#### #3

함수 컴포넌트가 죄다 클래스 컴포넌트가 되어가고 있다. `상태`와 `props`가 난장판이다. 규모가 더 큰 프로젝트를 하게 된다면 이렇게는 디버깅할 수 없다.

내가 난장판이라고 생각했던 이유는 서로 다른 컴포넌트에서 똑같은 상태를 반복해서 선언하는 것과 매번 props를 전달하는 코딩이 귀찮아서 싫었던 거다. 클래스 컴포넌트가 싫은 이유는 없었다. 차이를 몰랐던 것인데 리액트는 싫었나 보다. [Introducing Hooks](https://ko.reactjs.org/docs/hooks-intro.html)

- `Hooks`를 이용하면 클래스 컴포넌트는 사용하지 않아도 될 것 같다.
- [Context](https://ko.reactjs.org/docs/context.html)를 이용하면 Redux도 필요 없을 것 같다. 다음 프로젝트에서 적용해보려 한다. 아? 아마 미들웨어 때문에 `Redux`는 계속 쓰는 것 같다.

### Modal

모달은 `state`와 `method`로 구현한다. `onClick` 이벤트로 모달을 조작한다. 이때 화면 전체를 차지하는 div를 하나 만들면 모달 창을 쉽게 끌 수 있다.

모달 구현은 어렵지 않다. 하지만 이번 프로젝트는 모달 창이 나타나도 특별하게 렌더링 할 콘텐츠(데이터)가 없었다. 그 이유는 와이어 프레임을 설계할 때 어떤 페이지의 어떤 내용을 보여줄지를 정하지 않았기 때문이다. 로그인, 회원가입 등 기능이 분명할 때 모달을 쓰는 것이 좋다.

<details><summary><span style="background-color:#f5f2f0"><strong>components/recruit.js</strong></span></summary>

```javascript
{/* state */}
class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      modal: false,
      modalData: null
    }
  }
}

{/* method */}
modalOn(modal) {
  this.setState({ modal: true })
  this.setState({ modalData: modal })
}

modalOff() {
  this.setState({ modal: false })
}

{/* modal_section */}
{this.state.modal ? (
  <>
    <section className="modal_section">
      <div className="modal_overlay" onClick={this.modalOff.bind(this)}></div>
      <div className="modal_card">
        <div className="title">{this.state.modalData.title}</div>
        <div className="username">작성자: 추노</div>
        <div className="description">
          {this.state.modalData.description}
        </div>
        <div className="position">
          {this.state.modalData.team_position}
        </div>
        <div className="region">{this.state.modalData.team_region}</div>
      </div>
    </section>
  </>
) : null}
```

</details>

<details><summary><span style="background-color:#f5f2f0"><strong>styles/main.css</strong></span></summary>

```css
/* modal_section *//
.modal_overlay {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  background-color: #0000009d;
}
```

</details>

### Filter

<details><summary><span style="background-color:#f5f2f0"><strong>filter</strong></span></summary>

![apply](static/aplly.gif)

</details>

우선 필터 컴포넌트를 따로 분리해서 구현했다. 필터는 지역, 직무, 상태 세 종류다.

<details><summary><span style="background-color:#f5f2f0"><strong>components/filter</strong></span></summary>

```jsx
import React from 'react';

class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter_check: false
    }
  }

  filterOn(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ filter_check: !this.state.filter_check })
  }

  filterOff() {
  }

  render() {
    return (
      <>
        <div className="filter">
          <span className="ft_ic"></span>
          <span className="ft_list">
            지역
            <span className="ft_arrow_down_ic"></span>
            <div className="ft_resion">
              <ul className="ft_ul" onClick={(e) => this.props.addQuery(e, 'resion')}>
                <li>서울특별시</li>
                <li>부산광역시</li>
                <li>인천광역시</li>
                <li>대구광역시</li>
                <li>광주광역시</li>
                <li>대전광역시</li>
                <li>울산광역시</li>
                <li>세종시</li>
                <li>경기도</li>
                <li>강원도</li>
                <li>충청북도</li>
                <li>충청남도</li>
                <li>경상북도</li>
                <li>경상남도</li>
                <li>전라북도</li>
                <li>전라남도</li>
                <li>제주도</li>
              </ul>
            </div>
          </span>
          <span className="ft_list">
            직무
            <span className="ft_arrow_down_ic"></span>
            <ul className="ft_ul" onClick={(e) => this.props.addQuery(e, 'position')}>
              <li className={this.state.filter_check ? "ft_check_ic" : null} onClick={this.filterOn.bind(this)}>Planner</li>
              <li className={this.state.filter_check ? "ft_check_ic" : null} onClick={this.filterOn.bind(this)}>Designer</li>
              <li className={this.state.filter_check ? "ft_check_ic" : null} onClick={this.filterOn.bind(this)}>Developer</li>
              <li className={this.state.filter_check ? "ft_check_ic" : null} onClick={(e) => this.filterOn.bind(this)}>ETC</li>
            </ul>
          </span>

          <span className={this.props.team ? "team_state_filter_close" : "ft_list"}>
            상태
            <span className="ft_arrow_down_ic"></span>
            <ul className="ft_ul" onClick={(e) => this.props.addQuery(e, 'state')}>
              <li>구직중</li>
              <li>구인중</li>
              <li>재직중</li>
              <li>이직희망</li>
              <li>사이드잡희망</li>
            </ul>
          </span>

          {/* { 필터 아이템이 몇 개 이상 되면 오버 레이아웃으로 이동 */}
          <span className={this.props.ft_items.length > 5 ? null : "ft_items"}>
            {this.props.ft_items.map((item, index) => (
              <span key={index} className="item">{item}
                <span className="ft_close" onClick={(e) => this.props.replaceQuery(e, item)}></span>
              </span>
            ))}
          </span>
        </div>
      </>
    )
  }
}

export default Filter
```

</details>

#### 필터링 아이템을 선택하면 

- 쿼리를 추가하는 `addQuery` 메소드가 실행된다.

  <details><summary><span style="background-color:#f5f2f0"><strong>addQuery</strong></span></summary>

  ```javascript
  addQuery(e, item) {
    // ft_items 상태를 변경한다.
    // 필터링 아이템을 추가한다.
    this.setState({ ft_items: [...this.state.ft_items, e.target.textContent] })
  
    // 첫 번째 쿼리는 앞에 ?가 붙는다.
    if (this.state.query === '') {
      if (item === 'resion') {
        // query 상태를 변경한다.
        // 필터링 아이템을 쿼리에 적는다.
        this.setState(
          (state) => ({
            query: state.query + `?resion=${e.target.textContent}`,
          }),
          this.filterFetch
        )
      } else if (item === 'position') {
        // 반복
      } else if (item === 'state') {
        // 반복
      }
    // 나머지 쿼리는 앞에 &가 붙는다.
    } else {
      if (item === 'resion') {
        this.setState(
          (state) => ({
            query: state.query + `&resion=${e.target.textContent}`,
          }),
          this.filterFetch
        )
      } else if (item === 'position') {
        // 직무 반복
      } else if (item === 'state') {
        // 상태 반복
      }
    }
  }
  ```

  </details>

- 필터링 목록에 아이템이 추가된다.

- 필터링이 적용된 게시글이 렌더링 된다.

#### 다시 필터링 아이템을 선택하면

- 쿼리를 수정하는 `replaceQuery` 메소드가 실행된다.

  <details><summary><span style="background-color:#f5f2f0"><strong>replaceQuery</strong></span></summary>

  ```javascript
  replaceQuery(e, item) {
    if (
      item === '구직중' ||
      item === '구인중' ||
      item === '재직중' ||
      item === '이직희망' ||
      item === '사이드잡희망'
    ) {
      // query 상태를 변경한다.
    	// 필터링 아이템을 쿼리에서 지운다.
      this.setState(
        (state) => ({
          query: state.query.replace(`state=${item}`, ''),
        }),
        this.filterFetch
      )
      this.setState(
        (state) => ({
          ft_items: state.ft_items.filter((el) => el !== item),
        }),
        this.filterFetch
      )
    } else if (
      item === 'Planner' ||
      item === 'Designer' ||
      item === 'Developer' ||
      item === 'ETC'
    ) {
      // 직무 반복
    } else {
      // 지역 반복
    }
  
    if (this.state.ft_items.length === 1) {
      this.setState({ query: '' })
    }
  }
  ```

  </details>

- 필터링 목록에 아이템이 삭제된다.

- 게시글이 새로 렌더링 된다.

클라이언트에는 직접 데이터를 필터링하는 로직이 없다. `MySQL`과 `Sequelize`를 사용하는 서버에서 필터링하는 것이 더 수월하다고 판단했기 때문이다. 그래서 view & 렌더링에 더 집중할 수 있었다. 

필터링을 위한 마지막 메소드 `filterFetch`는 겨우 얻은 쿼리를 가지고 서버에 데이터를 요청한다. 위에 보면 쿼리 상태를 변경할 때마다 호출한다.

<details><summary><span style="background-color:#f5f2f0"><strong>filterFetch</strong></span></summary>

```javascript
filterFetch() {
  let url = `http://server/users/apply${this.state.query}`
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include'
    },
  })
    .then((res) => res.json())
    .then((res) => {
      this.setState({ data: res })
    })
    .catch((err) => console.log(err))
}
```

</details>

#### #1

아마 필터를 구현할 때 꽤 헤맸던 것이 데이터 요청이다. 서버 입장에서 생각하면 된다. 서버에서 데이터를 받을 때 세 가지 방법이 있다. 클라이언트는 데이터를 본문에 담는 `body`를 제외하고 **URL**만 신경 쓰면 된다.

- [`request.params`](http://expressjs.com/ko/api.html#req.params)
- [`request.query`](http://expressjs.com/ko/api.html#req.query)
- [`request.body`](http://expressjs.com/ko/api.html#req.body)

#### #2

파라미터를 여러 개 적어서 보내는 게 어려웠다. 조건문으로 겨우 보냈더니 뜬금없이 한글 `Query string`은 인코딩(16진수) 돼서 보내지는 것이다. 하지만 `express`는 자동으로 디코딩 해줘서 그냥 `req.query`로 값에 접근하면 된다.

[노드에서는 쿼리스트링 인코딩을 어떻게 처리할까?](https://jeonghwan-kim.github.io/2016/06/29/querystring-body-in-express.html)

### Debugging failed

#### #1

필터를 하나만 체크해도 모든 아이콘이 체크된다. 상태를 하나만 공유하기 때문이다.

어떻게 각 `<li>` 엘리먼트마다 상태를 가질 수 있는 건지. 어떻게 각각 상태를 가지고 각각 클래스명이 변화되는 건지. 결국 해결하지 못하고 특정 엘리먼트를 조작하는 `createRef`, `useRef` 키워드만 얻었다.

#### #2

필터 취소는 x 버튼으로 가능하다. 그리고 필터링 아이템을 다시 클릭해도 취소가 되어야 한다. 하지만 클릭할 때마다 똑같은 아이템이 계속 추가만 된다. 필터 아이템이 많이 추가되었을 때 레이아웃이 바뀌는 것도 구현하지 못했다.

```jsx
{/* { 필터 아이템이 몇 개 이상 되면 오버 레이아웃으로 이동 */ }
<span className={this.props.ft_items.length > 5 ? null : "ft_items"}>
  {this.props.ft_items.map((item, index) => (
    <span key={index} className="item">{item}
      <span className="ft_close" onClick={(e) => this.props.replaceQuery(e, item)}></span>
    </span>
  ))}
</span>
```

`replaceQuery` 메소드가 각 `<li`> 엘리먼트에도 적용되어야 한다.

진짜 내가 필터는 언젠가 무조건 똑바로 구현하고 만다.

### Cookies

#### #1

CSRF를 막기 위해 크롬의 기본 옵션은 `sameSite = Lax`다. 이때 쿠키는 `get` 요청에서만 주고받을 수 있다.

`post` 요청에서 쿠키를 사용하려면 `sameSite = none` 옵션이 필요하다. 하지만 `HTTPS` 프로토콜을 사용하지 않으면 `sameSite = none`을 설정해도 쿠키가 보내지지 않는다. 그리고 `HTTPS` 프로토콜과 함께 `secure` 옵션을 추가해야 비로소 `post` 요청에서 쿠키를 설정할 수 있다.

`HTTPS`는 `SSL` 또는 `TLS` 인증서를 가지고 구현한다. 로컬 환경에서는 `mkcert`를 이용하면 된다. 그 외 무료 인증서는 [Let’s Encrypt](https://letsencrypt.org)가 있다.

#### #2

쿠키 이슈는 이렇고.. HTTPS가 답인 줄 몰랐을 때 `fetch`, `axios`, 아래 자격 증명, `cors` 같은 미들웨어 옵션까지 정말 몇 시간 동안 서버와 클라 구분 없이 할 수 있는 모든 것을 다 해봤다. 근데 웃픈 거는 서버를 담당하시는 팀원 분이 오자마자 3분 만에 답을 알려주신 거다. 정말 소통의 중요성이란..  

하여튼 쿠키를 주고받기 위한 자격 증명 헤더([Access-Control-Allow-Credentials](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials))가 있다.

<details><summary><span style="background-color:#f5f2f0"><strong>credentials</strong></span></summary>

```javascript
// fetch
credentials: "include"

// axios
withCredentials: true

// 서버는 cors 모듈을 사용하면 아래처럼 작성한다.
app.use(cors({
  origin: true,
  credentials: true
}))

// cors 모듈을 사용하지 않으면 응답 헤더를 작성해야 한다.
res.setHeader('Access-Control-Allow-Origin', 'localhost:3000')
res.setHeader('Access-Control-Allow-Credentials', 'true')
```

</details>

### etc.

- `<li>`의 value는 `textContent`

- 이미지는 `src` 폴더 아래에 있어야 한다.

- 태그에 이미지를 넣고 싶다면? `<div>`가 아닌 `<img>` 태그를 사용하면 된다.

- `kill -9 $(lsof -t -i:3000)`

- 로그인 유지는? [localStorage](https://ko.javascript.info/localstorage#ref-350) / [sessionStorage](https://ko.javascript.info/localstorage#ref-354)

- 첫 프로젝트를 진행하는 동안 `git`을 이용한 협업을 제대로 경험했다.

  <details><summary><span style="background-color:#f5f2f0"><strong>git</strong></span></summary>

  ```bash
  // local
  git init
  git status
  git add *
  git commit -m "description"
  
  // fork
  git clone "URL"
  
  // local
  git checkout dev
  git push origin dev
  
  git checkout -b featureN
  git push origin featureN
  
  // 업스트림은 자동으로 등록되지 않는다.
  git remote add upstream "URL"
  git pull upstream dev
  
  // 삭제
  git branch origin --delete <branch name>
  git branch -d <branch name>
  git push origin --delete <branch name>
  ```

  </details>

## Issue & Keyword

그래서 첫 번째 프로젝트를 마치고 배우고 싶은 것이 잔뜩 생겼다. 시야가 넓어졌다.

- Single-page application
- React Router, HashBang, Pjax

- React, Hooks
- CSS, Sass(SCSS)
- Tailwind CSS, BEMSkel, styled-components
- HTTP & REST API
- JavaScript, TypeScript
- Algorithm
