---
title: Follow Along Link Highlighter
date: 2021-04-02
description: JavaScript
---

## Speech Detection

![Follow Along Link Highlighter](static/Follow Along Link Highlighter.png)

### Logic

마우스 포인터가 `<a>` 요소를 가리키면 하이라이트 된다.

1. 인터페이스의 생성자를 사용하여 장치의 마이크를 통해 음성이 입력될 때 탐지할 수 있는 여러 이벤트 핸들러가 있는 새로운 `SpeechRecognition` 객체를 만든다.
2. 음성 인식 서비스가 결과를 반환하면 전사 데이터를 화면에 표시한다. `isFinal` 속성이 `true`가 되면 새로운 `p` 요소를 추가한다.
3. 음성 인식 서비스 연결이 끊기면 다시 시작한다.

```javascript
<script>
  const triggers = document.querySelectorAll('a')
  const highlight = document.createElement('span')
  highlight.classList.add('highlight')
  document.body.appendChild(highlight)

  function highlightLink() {
    const linkCoords = this.getBoundingClientRect()
    console.log(linkCoords)
    const coords = {
      width: linkCoords.width,
      height: linkCoords.height,
      top: linkCoords.top + window.scrollY,
      left: linkCoords.left + window.scrollX
    }

    highlight.style.width = `${coords.width}px`
    highlight.style.height = `${coords.height}px`
    highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`
  }

  triggers.forEach(a => a.addEventListener('mouseenter', highlightLink))
</script>
```

### JavaScript

- `mouseenter` 이벤트는 `mouseover` 이벤트와 다르게 버블링이 적용되지 않는다. 부모와 조상 요소에게 영향을 미치지 않고 이벤트가 한 번만 발생한다.
- `Element.getBoundingClientRect()`: 뷰포트를 기준으로 한 요소의 위치 및 사이즈를 설명하는 `DOMRect` 객체를 반환한다.
- `Window.scrollY`: 문서가 수직으로 얼마나 스크롤 됐는지 픽셀 단위로 반환한다. 수평 스크롤은 `scrollx` 속성으로 가져올 수 있다.

### CSS

- `transform: translate(x-coordinate, y-coordinate)`: 요소의 수직 and/or 수평 방향을 재배치한다.

