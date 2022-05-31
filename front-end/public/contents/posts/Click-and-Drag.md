---
title: Click and Drag
date: 2021-04-21
tags: JavaScript
---

## Click and Drag

![Click and Drag](static/Click and Drag.png)

좌우로 드래그하여 스크롤 할 수 있는 슬라이드를 구현한다.

1. 클릭하고 마우스를 움직였을 때만 스크롤이 가능하도록 `isDown` 변수를 활용한다.
   - Event type: `mousedown`, `mouseup`, `mouseleave`, `mousemove`
2. 마우스를 클릭한 위치를 기준으로 이동(=drag) 한 거리만큼 스크롤링 된다.
   - 마우스를 클릭한 위치 `startX`는 `MouseEvent.pageX` 값에서 `HTMLElement.offsetLeft` 값을 뺀 값이다. `MouseEvent.pageX` 속성은 전체 문서의 왼쪽 가장자리를 기준으로 마우스를 클릭한 위치의 X 좌표를 반환한다.
   - 이동한 거리 `walk`는 현재 좌표(`x`)에서 마지막 좌표(`startX`)를 뺀 값이다.
   - 스크롤링의 구현은 요소의 콘텐츠가 스크롤 되는 픽셀 수를 말하는 `Element.scrollLeft` 속성을 이용한다. `walk` 값을 할당하되 바로 앞의(**last**) `scrollLeft` 값에서 빼주거나 더해줘야 한다. 그렇지 않으면 `scrollLeft` 값이 0인 상태에서 설정하는 것이므로 제자리로 돌아간다. 이때 마이너스와 플러스의 차이는 스크롤의 방향을 결정한다.

```javascript
<script>
  const slider = document.querySelector('.items')
  let isDown = false
  let startX
  let scrollLeft

  slider.addEventListener('mousedown', function (e) {
    isDown = true
    slider.classList.add('active')
    startX = e.pageX - slider.offsetLeft
    scrollLeft = slider.scrollLeft
  })

  slider.addEventListener('mouseleave', function () {
    isDown = false
    slider.classList.remove('active')
  })

  slider.addEventListener('mouseup', function () {
    isDown = false
    slider.classList.remove('active')
  })

  slider.addEventListener('mousemove', function (e) {
    if (!isDown) return
    const x = e.pageX - slider.offsetLeft
    const walk = x - startX
    slider.scrollLeft = scrollLeft - walk
  })
</script>
```
