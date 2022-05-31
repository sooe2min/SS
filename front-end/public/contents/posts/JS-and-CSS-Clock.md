---
title: JS and CSS Clock
date: 2021-02-23
tags: JavaScript
---

## JS and CSS Clock

![JS and CSS Clock](static/JS and CSS Clock.png)

### Logic

1초마다 초, 분, 시 바늘을 회전시켜 시간을 표시한다.

1. 시, 분, 초 엘리먼트를 선택한다.
2. 1초마다 `setDate` 함수를 호출한다.
3. `setDate`:
   - `Date` 객체를 생성한다.
   - 로컬의 현재 시, 분, 초를 찾고 360도(`degree`)로 표현한다.
   - 시, 분, 초 엘리먼트를 `degree`만큼 회전한다.

```javascript
<script>
  const secondHand = document.querySelector('.second-hand')
  const minHand = document.querySelector('.min-hand')
  const hourHand = document.querySelector('.hour-hand')

  function setDate() {
    const now = new Date()

    const seconds = now.getSeconds()
    const secondsDegrees = ((seconds / 60) * 360) + 90
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`

    const mins = now.getMinutes()
    const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90
    minHand.style.transform = `rotate(${minsDegrees}deg)`

    const hour = now.getHours()
    const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90
    hourHand.style.transform = `rotate(${hourDegrees}deg)`
  }

  setInterval(setDate, 1000)
</script>
```

### JavaScript

- `scope.setInterval(function[, delay(milliseconds)])`: delay마다 function을 실행한다.

### CSS

- `transform-origin`: 기준점을 정한다. 기본값은 엘리먼트의 중심이다.
- `rotate(angle)` 회전
- `transition`: `property` ||`duration` || `timing-function` || `delay`
- `transition-timing-function`: `ease`, `linear`, `cubic-bezier(p1, p2, p3, p4)`, ...

```css
<style>
  .hand {
    width: 50%;
    height: 6px;
    background: black;
    position: absolute;
    top: 50%;

    transform-origin: right;
    transform: rotate(90deg);
    transition: all 0.05s;
    transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
  }
</style>
```
