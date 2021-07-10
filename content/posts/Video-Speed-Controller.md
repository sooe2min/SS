---
title: Video Speed Controller
date: 2021-04-21
description: JavaScript
---

## Video Speed Controller

![Video Speed Controller](static/Video Speed Controller.png)

막대의 퍼센티지에 따라 미디어가 재생되는 속도를 설정한다. 몇 가지 속성으로 필요한 값을 구하면 된다.

- `MouseEvent.pageY`: 전체 문서를 기준으로 한 이벤트의 Y 좌표
- `HTMLElement.offsetTop`: 부모 요소의 맨 위에서부터의 픽셀 수
- `HTMLElement.offsetHeight`: 요소의 높이
- `Number.prototype.toFixed()`: 고정 소수점으로 표기한다.
- `HTMLMediaElement.playbackRate`

```javascript
<script>
  const speed = document.querySelector('.speed')
  const bar = document.querySelector('.speed-bar')
  const video = document.querySelector('.flex')

  function handleMove(e) {
    const y = e.pageY - this.offsetTop
    const percent = y / this.offsetHeight
    
    const min = 0.4
    const max = 4
    
    const height = Math.round(percent * 100) + '%'
    // 수학..
    const playbackRate = percent * (max - min) + min

    bar.style.height = height
    bar.textContent = playbackRate.toFixed(2) + 'x'
    video.playbackRate = playbackRate
  }

  speed.addEventListener('mousemove', handleMove)
</script>
```