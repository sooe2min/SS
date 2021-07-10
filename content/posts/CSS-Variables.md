---
title: CSS Variables
date: 2021-02-23
description: JavaScript
---

## CSS Variables

![CSS Variables](static/CSS Variables.png)

### Logic

인풋을 스크롤 하여 이미지의 패딩, 블러, 컬러를 변경한다.

1. 루트 가상 클래스에 CSS 변수를 할당하고 하위 엘리먼트에서 사용한다.
2. 이벤트가 input에 전달되면 `handleUpdate` 리스너를 호출한다.
3. `handleUpdate`:
   - 대상 input의 dataset을 읽고 접미사로 할당한다.
   - 문서 루트 엘리먼트 스타일의 속성을 설정(타겟 이름, 타겟 값 + 접미사) 한다. 

루트 엘리먼트의 CSS 변수를 변경하면 해당 변수를 사용하고 있는 하위 엘리먼트의 스타일이 변경된다.

```javascript
<script>
  const inputs = document.querySelectorAll('.controls input')

  function handleUpdate() {
    const suffix = this.dataset.sizing || ''
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)
  }

  inputs.forEach(input => input.addEventListener('change', handleUpdate))
  inputs.forEach(input => input.addEventListener('mousemove', handleUpdate))
</script>
```

### JavaScript

- Event type: `change`, `mousemove`
- `HTMLElement.dataset`: 사용자 지정 데이터 특성 이름은 `data-` 접두사로 시작한다. 속성들은 `element.dataset.keyname` 또는 `element.dataset[keyname]`으로 읽을 수 있다.
- `Document.documentElement` 속성은 문서의 루트 요소를 반환한다.
- `style.setProperty(propertyName, value, priority)`

### CSS

- `:root` 가상 클래스는 문서 트리의 루트 요소를 선택한다. HTML의 루트 요소는 `<html>`이므로 `html` 선택자와 같다.
- Custom properties(CSS 변수): 사용자 지정 속성은 `--`을 붙여 선언하고 `var()` 함수로 접근한다.
- `filter`: `blur()` 블러

```css
<style>
  :root {
    --spacing: 20px;
    --blur: 5px;
    --base: yellow;
  }

  .hl {
    color: var(--base);
  }

  img {
    padding: var(--spacing);
    filter: blur(var(--blur));
    background: var(--base);
  }
</style>
```

