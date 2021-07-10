---
title: Stripe Follow Along Nav
date: 2021-04-20
description: JavaScript
---

## Stripe Follow Along Nav

![Stripe Follow Along Nav](static/Stripe Follow Along Nav.png)

하위 메뉴가 아래로 펼쳐지는 드롭다운 메뉴를 구현한다. 드롭다운의 핵심은 `opacity`와 `display` 속성이다. 미리 준비된 콘텐츠를 보이지 않게 숨겨놓고 이벤트 발생에 따라 표시되도록 하는 것이다. 이때 `mouseenter`와 `mouseleave` 이벤트를 빠르게 변경하면 클래스가 `remove`되지 않고 남아있는 경우가 발생한다. 그 이유는 클래스가 추가되기도 전에 삭제하기 때문이고 `&&` 연산자로 해결한다.

`setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150)`

드롭다운되는 하위 메뉴에는 흰색 배경이 있다. 메뉴가 드롭되기 전에는 다른 위치에서 대기하다가 이벤트가 발생하는 순간 하위 메뉴의 배경으로 자리 잡는다.

하위 메뉴의 위치 정보를 가져올 때는 `Element.getBoundingClientRect()` 메소드를 이용한다. 이 메소드는 뷰포트의 왼쪽 상단을 기준으로 요소의 크기와 위치에 대한 정보를 가진 `DOMRect` 객체를 반환한다. 그다음 배경 요소(`dropdownBackground`)의 `left`, `top` 위치를 설정하는데 이때 `nav` 요소 위에 다른 요소가 있다면 기준을 잘 생각해야 한다.

```html
<body>
  <h2>Cool</h2>
  <nav class="top">...
  </nav>

  <style>...
  </style>

  <script>...
  </script>
</body>
```

배경 요소의 기준은 `nav` 요소다. 그러니까 메소드로 얻은 위치 정보 그대로 자리를 잡으면 배경이 밀려난다. `nav` 요소의 `DOMRect.top` 값만큼 빼주면 된다.

![Stripe Follow Along Nav Over](static/Stripe Follow Along Nav Over.png)

```javascript
<script>
  const triggers = document.querySelectorAll('.cool > li')
  const background = document.querySelector('.dropdownBackground')
  const nav = document.querySelector('.top')

  function handleEnter(e) {
    this.classList.add('trigger-enter')

    setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150)
      
    background.classList.add('open')

    const dropdown = this.querySelector('.dropdown')
    const dropdownCoords = dropdown.getBoundingClientRect()
    const navCoords = nav.getBoundingClientRect()

    const coords = {
      height: dropdownCoords.height,
      width: dropdownCoords.width,
      top: dropdownCoords.top - navCoords.top,
      left: dropdownCoords.left - navCoords.left
    }

    background.style.setProperty('height', `${coords.height}px`)
    background.style.setProperty('width', `${coords.width}px`)
    background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px`)
  }

  function handleLeave(e) {
    this.classList.remove('trigger-enter', 'trigger-enter-active')
    background.classList.remove('open')
  }

  triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter))
  triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave))
</script>
```