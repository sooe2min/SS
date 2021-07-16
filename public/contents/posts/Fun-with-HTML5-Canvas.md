---
title: Fun with HTML5 Canvas
date: 2021-02-28
tags: JavaScript
---

## Fun with HTML5 Canvas

![Fun with HTML5 Canvas](static/Fun with HTML5 Canvas.png)

### Logic

캔버스 위에 선을 그린다.

1. `canvas` HTML을 만들고 드로잉 콘텍스트를 얻는다.
2. `mousemove` 이벤트가 `canvas`에 전달되면 `drawLine` 리스너를 호출한다.
3. 마우스를 클릭하고 움직일 때만 그림이 그려진다.
   - `mousedown` 이벤트가 `canvas`에 전달되면 `isDrawing`은 true가 된다.
   - `mouseup`, `mouseout` 이벤트가 `canvas`에 전달되면 `isDrawing`은 false가 된다.
4. `drawLine`:
   - 2D 렌더링 콘텍스트와 그리기 함수를 이용해서 선을 그린다.

### JavaScript

- Event type: `mousedown`, `mousemove`, `mouseup`, `mousedout`
- `Window.innerWidth`, `Window.innerHeight`
- 구조 분해 할당

### Canvas API

- `<canvas>`는 `width`와 `height` 속성만 있다.

- `canvas.getContext(contextType)`: 드로잉 콘텍스트를 반환한다.

**Colors, Styles, and Shadows**

- `strokeStyle`: 획의 스타일을 설정한다.

**Line Styles**

- `lineCap`: 선의 끝을 설정한다.
- `lineJoin`: 선의 모서리를 설정한다.
- `lineWidth`: 선의 너비를 설정한다.

**Paths**

- `beginPath()`: 경로를 시작하거나 리셋한다.
- `moveTo(x, y)`: 지정 좌표로 경로를 이동한다.
- `lineTo(x, y)`: 마지막 경로부터 지정 포인트까지 선을 만든다.
- `stroke()`: 정의한 경로를 실제로 그린다.

```javascript
<script>
  const canvas = document.querySelector('#draw')
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'pink';

  let isDrawing = false
  let lastX = 0
  let lastY = 0
  let hue = 0
  let direction = true

  function drawLine(e) {
    if (!isDrawing) return
    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY]

    ctx.strokeStyle = `hsl(${hue}, 30%, 80%)`
    hue++
    if (hue === 360) return hue = 0

    if (500 <= ctx.lineWidth || ctx.lineWidth <= 1) {
      direction = !direction
    }
    if (direction) ctx.lineWidth++
    else if (!direction) ctx.lineWidth--
  }

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]
  })
  canvas.addEventListener('mousemove', drawLine)
  canvas.addEventListener('mouseup', () => isDrawing = false)
  canvas.addEventListener('mouseout', () => isDrawing = false)
</script>
```

### HTML HSL Colors

HTML에서 색조, 채도, 명도(HSL)를 사용하여 색상을 지정할 수 있다.

- hsl(_hue_, _saturation_, _lightness_)
- 색조는 0에서 360 사이의 색상환 각도를 말한다. 0은 빨간색, 120은 녹색, 240은 파란색이다.
- 채도(색상의 강도)는 백분율 값이고 0%는 회색 음영, 100%는 풀 컬러다.
- 밝기(빛의 양)는 백분율 값이고 0%는 검은색, 100%는 흰색이다.
