---
title: Sort Without Articles
date: 2021-03-25
description: JavaScript
---

## Sort Without Articles

![Sort Without Articles](static/Sort Without Articles.png)

### Logic

정규식과 배열 정렬을 활용해서 DOM을 조작한다.

1. `strip` 함수를 이용해서 배열을 정렬한다.
2. `strip`: 입력 문장의 시작이 a 또는 an 또는 the라면 빈 공백으로 바꾸고 공백을 제거한다.
3. id가 bands인 요소에 배열 요소를 하나씩 추가한다.

```javascript
<script>
  const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

  function strip(bandName) {
    return bandName.replace(/^(a |an |the )/i, '').trim()
  }

  const sortedBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1)

  document.querySelector('#bands').innerHTML =
    sortedBands.map(band => `<li>${band}</li>`).join('')
</script>
```

### The Document Object Model

- 문서 객체 모델은 HTML, XML 문서의 프로그래밍 인터페이스이다.
- 웹 페이지는 문서(document)다. 이 문서는 웹 브라우저를 통해 그 내용이 해석되어 브라우저 화면에 나타나거나 HTML 소스 자체로 나타나기도 한다. 
- DOM은 구조화된 nodes, property, method를 가지고 있는 objects로 문서를 표현한다.
- DOM은 웹 페이지의 객체 지향 표현이며, 자바스크립트를 이용해 문서를 표현하고 저장하고 조작하는 방법을 제공한다.

### JavaScript

- 정규식 리터럴(`/`로 감싸는 패턴)
- character `^`: 입력의 시작에 대응된다.
- character `x|y`: x 또는 y
- `str.trim()`: 공백 제거
- `arr.sort([compareFunction])`
- `arr.join([separator])`: 배열의 모든 요소 연결
