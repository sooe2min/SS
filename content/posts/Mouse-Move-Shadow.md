---
title: Mouse Move Shadow
date: 2021-03-17
description: JavaScript
---

## Mouse Move Shadow

![Mouse Move Shadow](static/Mouse Move Shadow.png)

### Logic

마우스 커서 이동에 따라 텍스트 그림자를 추가한다.

1. `mousemove` 이벤트가 `div`에 전달되면 `shadow` 리스너를 호출한다.
2. `shadow`:
   - 마우스 커서의 위치를 먼저 찾는다. 
   - 위치를 기반으로 서로 다른 방향의 텍스트 그림자를 추가한다.

마우스 커서의 위치를 찾을 때 `div` 요소의 위치를 보다가 `h1` 요소 위에 마우스 커서를 올리면(hovering) 위치 값이 갱신된다. 요소마다 서로 다른 위치를 가지고 있는 것인데 그러므로 `div`의 위치 값에 `h1` 요소의 위치 값을 더해야 한다. 그리고 이벤트가 전달된 `this`는 `div`로 고정이지만 `event.target`은 마우스 커서의 위치에 따라 `div` 혹은 `h1`이 된다.

```javascript
<script>
  const hero = document.querySelector('.hero')
  const text = document.querySelector('h1')
  const walk = 500

  function shadow(e) {
    const { offsetWidth: width, offsetHeight: height } = hero
    let { offsetX: x, offsetY: y } = e

    if (this !== e.target) {
      x = x + e.target.offsetLeft
      y = y + e.target.offsetTop
    }

    const xWalk = Math.round((x / width * walk) - (walk / 2))
    const yWalk = Math.round((y / height * walk) - (walk / 2))

    text.style.textShadow = `
      ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
      ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
      ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
      ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
    `
  }

  hero.addEventListener('mousemove', shadow)
</script>
```

### JavaScript

- Event type: `mousemove`
- `MouseEvent.offsetX`
- `MouseEvent.offsetY`
- `HTMLElement.offsetParent`
- `HTMLElement.offsetTop`
- `HTMLElement.offsetLeft`
- `Math.round(x)`: 반올림 정수

### CSS

- `text-shadow: offset-x | offset-y | blur-radius | color`