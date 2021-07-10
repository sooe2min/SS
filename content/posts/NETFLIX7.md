---
title: 넷플릭스 클론 7
date: 2021-02-26
description: JavaScript
---

---

브라우즈 페이지의 프로필, 로딩, 검색, 슬라이드, 플레이어 등을 구현한다.

---

## Pages

### pages/browse.js

```jsx
export default function Browse() {
  const { series } = useContent('series')
  const { films } = useContent('films')
  const slides = selectionFilter({ films, series })

  return <BrowseContainer slides={slides} />
}
```

1. 슬라이드를 위한 데이터를 `useContent` 커스텀 훅으로 가져와서 `selectionFilter`로 필터링한다.
2. `BrowseContainer`를 렌더링 한다.
   - browse 페이지에서는 기본적으로 프로필을 선택하는 `SelectProfileContainer`가 렌더링 된다.
   - 프로필을 클릭하면 `profile` 상태가 갱신된다. 이때 로딩 이미지가 등장한다.
   - 이어서 3초 후에 `loading` 상태가 갱신(false) 되고 진짜 browse 페이지가 렌더링 된다.
3. 카테고리를 클릭하면 `category` 상태가 갱신되고 이어서 `slideRows` 상태가 갱신된다.
4. 카드를 클릭하면 `itemFeature`, `showFeature` 상태가 갱신되고 feature가 나타난다.
5. play 버튼을 클릭하면 `showPlayer` 상태가 갱신되고 플레이어가 나타난다.
6. 검색어를 입력하면 `Fuse.js`를 이용하여 검색한다.

**`containers/browse.js`**

```jsx
export function BrowseContainer({ slides }) {
  const [category, setCategory] = useState('series')
  const [slideRows, setSlideRows] = useState([])
  const [searchTurm, setSearchTurm] = useState('')
  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(true)
  const { firebase } = useContext(FirebaseContext)
  const user = firebase.auth().currentUser || {}

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [profile.displayName])

  useEffect(() => {
    setSlideRows(slides[category])
  }, [slides, category])
  
  useEffect(() => {
    const fuse = new Fuse(slideRows, {
      keys: ['data.description', 'data.title', 'data.genre']
    })
    const results = fuse.search(searchTurm).map(({ item }) => item)

    if (results.length > 0 && searchTurm.length > 3 && slideRows.length > 0) {
      setSlideRows(results)
    }
    else {
      setSlideRows(slides[category])
    }
  }, [searchTurm])
  
  return profile.displayName ? (
    <>
      {loading ? (
        <Loading src={user.photoURL} />
      ) : (<Loading.ReleaseBody />)}

      <Header src="joker1">...
      
      <Card.Group>...

      <FooterContainer />
    </>
  ) : (
      <SelectProfileContainer user={user} setProfile={setProfile} />)
}
```

필터링하는 과정에서 `TypeError: Cannot read property 'filter' of undefined` 에러가 발생한다. 데이터를 가져오기 전 `undefined`인 값을 `filter`한 것인데 이를 막기 위한 두 가지 방법이 있다.

- 커스텀 훅 `useContent`의 초기값으로 빈 배열을 전달한다.
- `selectionFilter` 함수를 구현할 때 `Optional chaining (?.)`을 사용한다. 옵셔널 체이닝은 `?.` 앞의 평가 대상이 `undefined`나 `null`이면 평가를 멈추고 `undefined`를 반환한다.

**`utils/selection-filter.js`**

옵셔널 체이닝으로 에러를 막는다.

```javascript
export default function selectionFilter({ series, films } = []) {
  return {
    series: [
      { title: 'Documentaries', data: series?.filter((item) => item.genre === 'documentaries') },
      { title: 'Comedies', data: series?.filter((item) => item.genre === 'comedies') },
      { title: 'Children', data: series?.filter((item) => item.genre === 'children') },
      { title: 'Crime', data: series?.filter((item) => item.genre === 'crime') },
      { title: 'Feel Good', data: series?.filter((item) => item.genre === 'feel-good') },
    ],
    films: [...
    ]
  }
}
```

## Components

### Header

원래 CSS는 나중에 한꺼번에 다루려고 했는데 검색 구현은 신기해서 먼저 기록해놓는다. 검색 버튼을 누르면 입력 창이 나타난다.

**`coponents/header/index.js`**

```jsx
Header.Search = function HeaderSearch({ searchTurm, setSearchTurm, ...restProps }) {
  const [searchActive, setSearchActive] = useState(false)
  
  return (
    <Search {...restProps}>
      <SearchIcon onClick={() => setSearchActive(!searchActive)}>
        <img src='/images/icons/search.png' alt='search' />
      </SearchIcon>
      <SearchInput
        placeholder='Search films and series'
        value={searchTurm}
        onChange={({ target }) => setSearchTurm(target.value)}
        active={searchActive}
      />
    </Search >
  )
}
```

**`components/header/styles/header.js`**

```jsx
export const SearchInput = styled.input`
  ...
  margin-left: ${({ active }) => (active === true ? '10px' : '0')};
  opacity: ${({ active }) => (active === true ? '1' : '0')};
  width: ${({ active }) => (active === true ? '200px' : '0px')};
  padding: ${({ active }) => (active === true ? '0 10px' : '0')};
`
```

### Player

비디오 플레이어를 `react-dom` package의 `potal`로 구현했다. 포탈을 사용하면 자식 엘리먼트를 부모 엘리먼트의 내부가 아닌 DOM의 다른 위치, 즉 외부에 있는 임의의 엘리먼트의 자식으로 렌더링할 수 있다.

`ReactDOM.createPortal(child, container)`의 첫 번째 인수는 렌더링할 수 있는 React 자식을 말하고 두 번째 인수는 DOM 엘리먼트를 말한다.

`PlayerVideo` 컴포넌트는 `document.body` 엘리먼트의 자식으로 렌더링 된다.

**`components/player/index.js`**

```jsx
Player.Video = function PlayerVideo({ src, ...restProps }) {
  const { showPlayer, setShowPlayer } = useContext(PlayerContext)

  return showPlayer ?
    ReactDOM.createPortal(
      <Overlay onClick={() => setShowPlayer(false)} data-testid="player">
        <Inner>
          <video id='netflix-player' controls>
            <source src={src} type='video/mp4' />
          </video>
          <Close />
        </Inner>
      </Overlay>,
      document.body
    )
    : null
}
```

<details><summary><span style="background-color:#f5f2f0"><strong>브라우즈 페이지</strong></span></summary>

![browse](static/browse.png)

</details>