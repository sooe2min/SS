---
title: Sticky Nav
date: 2021-04-06
tags: JavaScript
---

## Sticky Nav

![Sticky Nav](static/Sticky Nav.png)

수직으로 스크롤 하다가 `nav` 요소의 머리가 화면에서 사라질 때부터 화면에 고정시킨다. `HTMLElement.offsetTop` 값과 `Window.scrollY` 값을 비교하고 `position`을 `fixed`로 변경하면 된다.

- `HTMLElement.offsetTop`: 상위 요소인 `body`의 맨 위에서부터 `nav` 요소까지의 픽셀 수
- `Window.scrollY`: 문서가 수직으로 스크롤 한 픽셀 수

스크롤을 다시 위로 올렸을 때 `nav` 요소의 고정을 풀고 원래대로 돌아가기 위해선 `nav` 요소의 `offsetTop` 값을 저장하고 이용해야 한다. 그 이유는 포지션 속성이 `fixed`가 되면 컨테이닝이 블록이 뷰포트가 되고 `offsetTop` 값이 변하는데 그럼 비교하는 기준이 달라지기 때문이다.

마지막으로 뷰포트를 차지하고 있는 `nav` 요소의 높이만큼 `padding`을 추가한다.

```javascript
<script>
  const nav = document.querySelector('#main')
  let topOfNav = nav.offsetTop

  function fixNav() {
    if (window.scrollY >= topOfNav) {
      document.body.style.paddingTop = nav.offsetHeight + 'px'
      document.body.classList.add('fixed-nav')
    } else {
      document.body.classList.remove('fixed-nav')
      document.body.style.paddingTop = 0
    }
  }

  window.addEventListener('scroll', fixNav)
</script>
```
