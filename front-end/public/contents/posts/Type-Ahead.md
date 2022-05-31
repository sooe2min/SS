---
title: Type Ahead
date: 2021-02-24
tags: JavaScript
---

## Type Ahead

![Type Ahead](static/Type Ahead.png)

### Logic

도시 또는 주를 검색하면 데이터를 찾고 렌더링 한다.

1. endpoint에서 데이터를 가져온다.
2. `change`, `keyup` 이벤트가 input에 전달되면 `displayMatches` 리스너를 호출한다.
3. `displayMatches`:
   - 검색어를 정규 표현식으로 만든다.
   - 데이터에서 정규식과 일치하는 요소를 찾고 `HTML`로 만든다.
   - `HTML`을 `innderHTML` 값으로 설정한다.

```javascript
<script>
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

const cities = []
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data))

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi')
    return place.city.match(regex) || place.state.match(regex)
  })
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities)
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi')
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `
  }).join('')
  suggestions.innerHTML = html
}

const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)

</script>
```

### JavaScript

- Event type: `change`, `keyup`
- `new RegExp(pattern[, flags])`: `RegExp` 객체의 생성자를 호출해서 정규 표현식을 만든다. 정규 표현식은 패턴과 플래그로 구성된다.
- flag `g`: 패턴과 일치하는 모든 문자열을 찾는다.
- flag `i`: 대소문자를 무시한다.
- `str.match(regexp)`: 문자열에서 정규식과 일치하는 결과를 검색한다.
- `str.replace(regexp|substr, newSubstr|function)`: 문자열 또는 정규식을 새로운 문자열로 교체한다. 첫 번째 인수가 정규식이 아닌 문자열이면 첫 번째 일치되는 문자열만 교체된다.
- `element.innerHTML`: 요소 내의 `HTML`을 문자열로 가져온다.
