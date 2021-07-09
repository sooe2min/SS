---
title: Flex Panel Gallery
date: 2021-02-24
description: JavaScript
---

## Flex Panel Gallery

![Flex Panel Gallery](static/Flex Panel Gallery.png)

### Logic

패널을 클릭하면 엘리먼트가 transform 된다.

1. `click` 이벤트가 패널에 전달되면 `toggleOpen` 리스너를 호출한다.
2. `toggleOpen`:
   - 타겟 패널에 `open` 클래스 값을 토글링한다.
   - `.open` transform이 적용된다.
3. 패널의 transition이 끝나면 `toggleActive` 리스너가 호출된다.
4. `toggleActive`:
   - 타겟 패널에 `open-active` 클래스 값을 토글링한다.
   - `.open-active` transform이 적용된다.

```javascript
<script>
  const panels = document.querySelectorAll('.panel')

  const toggleOpen = function () {
    this.classList.toggle('open')
  }

  const toggleActive = function (e) {
    if (e.propertyName.includes('flex')) {
      this.classList.toggle('open-active')
    }
  }

  panels.forEach(panel => panel.addEventListener('click', toggleOpen))
  panels.forEach(panel => panel.addEventListener('transitionend', toggleActive))
</script>
```

### JavaScript

- Event type: `click`, `transitionend`
- `Element.classList`의 메소드 `toggle`은 클래스가 존재하면 제거하고 존재하지 않으면 추가한다.

### CSS

이번 과제는 flex의 연속이다. 컨테이너는 유일하지 않다. 아이템 요소도 컨테이너가 될 수 있다.

- `flex` 속성은 `flex-container` 안에서 `flex-item`의 크기를 설정한다.
- `flex-grow` 속성은 `flex-item` 요소가 `flex-container` 내부에서 차지하는 공간의 정도를 설정한다. 형제 요소들의 값이 같다면 컨테이너 내부에서 균등한 공간을 가진다. 값이 다르면 그에 따라 각자 다른 공간을 나누어 가진다.
- 자식 결합자(`>`)는 두 개의 선택자 사이에 위치한다. 뒤의 선택자 요소가 앞의 선택자 요소의 바로 밑에 있는 자식 요소일 때 선택한다.
- `:first-child` 가상 클래스는 형제 요소 중 첫 번째 요소를 선택한다.
- `:first-of-type` 가상 클래스는 형제 요소 중 자신의 유형과 일치하는 첫 번째 요소를 선택한다.
- `translateY(<length-percentage>)`: 수직 이동

```css
<style>
  .panels {
    min-height: 100vh;
    overflow: hidden;
    display: flex;
  }

  .panel {
    background: #6B0F9C;
    box-shadow: inset 0 0 0 5px rgba(255, 255, 255, 0.1);
    color: white;
    text-align: center;
    align-items: center;
    /* Safari transitionend event.propertyName === flex */
    /* Chrome + FF transitionend event.propertyName === flex-grow */
    transition:
      font-size 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11),
      flex 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11),
      background 0.2s;
    font-size: 20px;
    background-size: cover;
    background-position: center;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  /* Flex Children */
  .panel>* {
    margin: 0;
    width: 100%;
    transition: transform 0.5s;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .panel p {
    text-transform: uppercase;
    font-family: 'Amatic SC', cursive;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.72), 0 0 14px rgba(0, 0, 0, 0.45);
    font-size: 2em;
  }

  .panel p:nth-child(2) {
    font-size: 4em;
  }

  .panel>:first-child {
    transform: translateY(-100%)
  }

  .panel>:last-child {
    transform: translateY(100%)
  }

  .panel.open {
    font-size: 40px;
    flex: 5;
  }

  .panel.open-active>:first-child {
    transform: translateY(0)
  }

  .panel.open-active>:last-child {
    transform: translateY(0)
  }
</style>
```



