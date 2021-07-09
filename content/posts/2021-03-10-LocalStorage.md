---
title: LocalStorage
date: 2021-03-10
description: JavaScript
---

## LocalStorage

![LocalStorage](static/LocalStorage.png)

### Logic

로컬 저장소를 이용한 체크리스트

1. `HTML` 문서가 `load` 되면 로컬 저장소의 `items` 값을 체크리스트 `HTML`에 추가한다.
   - `items` 배열의 초기값은 로컬 저장소의 `items` 값을 JSON 객체로 변환한 값 또는 `map`의 에러를 막기 위한 빈 배열이다.
2. 체크리스트 아이템을 입력하고 버튼을 눌러 추가한다.
   - `submit` 이벤트가 폼에 전달되면 `addItem` 리스너를 호출한다.
3. `addItem`:
   - `reload`를 막기 위한 `preventDefault()`
   - 입력 값(텍스트)과 체크를 확인하는 `done`으로 구성된 `item` 객체를 만들고 `items` 배열에 추가한다.
   - `items` 배열을 JSON 문자열로 변환하여 로컬 저장소에 저장한다.
   - `items` 배열의 `item`을 체크리스트 `HTML`에 추가하는 `populateList` 메소드를 호출한다.
   - 폼을 리셋한다.
4. 아이템을 클릭하면 체크된다. 새로고침해도 체크가 유지된다.
   - `click` 이벤트가 체크리스트의 `ul` 엘리먼트에 전달되면 `toggleDone` 리스너를 호출한다.
   - `toggleDone` 메소드는 `items` 배열에서 클릭한 `item` 객체의 `done` 값을 변경한다. 
   - 변경 후엔 로컬 저장소를 업데이트하고 `populateList` 메소드를 호출한다.
   - `li` 또는 `input`에 이벤트 리스너를 설정하지 않는 이유는 실시간으로 업데이트되는 아이템 엘리먼트를 캐치하지 못하기 때문이다.

```javascript
<script>
  const addItems = document.querySelector('.add-items')
  const itemsList = document.querySelector('.plates')
  const items = JSON.parse(localStorage.getItem('items')) || []

  function addItem(e) {
    e.preventDefault()
    const text = (this.querySelector('[name=item]')).value
    const item = {
      text,
      done: false
    }

    items.push(item)
    localStorage.setItem('items', JSON.stringify(items))  
    populateList(items, itemsList)
    this.reset()
  }

  function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
      return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
        <label for="item${i}">${plate.text}</label>
      </li>
    `
    }).join('')
  }

  function toggleDone(e) {
    if (!e.target.matches('input')) return
    const el = e.target
    const index = el.dataset.index
    items[index].done = !items[index].done
    localStorage.setItem('items', JSON.stringify(items))
    populateList(items, itemsList)
  }

  addItems.addEventListener('submit', addItem)
  itemsList.addEventListener('click', toggleDone)

  populateList(items, itemsList)
</script>
```

늘 구현을 마치고 기록하다 보니 실제 기능의 작동 순서를 떠올리며 구상하는 의사코드와 코드 작성, 기록 사이의 어떤 갭을 느낀다. 위 로직에서 가장 처음 작동하는 코드는 1번이다. 하지만 가장 먼저 떠올리지도 가장 먼저 작성하지도 않았다. 계획적인 구현을 하고 싶은데 의사코드를 완벽하게 구상하는 것이 가능한 일인가? 계획의 선을 모르겠다. 그리고 어떤 단계를 기록해야 할지 고민스럽다.

### JavaScript

- Event type: `submit`, `click`
- `Shorthand property names (ES2015)`
- `event.preventDefault()`
- `HTMLFormElement.reset()`
- `Element.matches()`

### HTML

- `<input>`과 `<label>` 요소를 연관 지으려면 `<input>`에 `id` 속성을 넣고 `<label>`에 `id`와 같은 값의 `for ` 속성을 넣는다.

### CSS

```css
selector::pseudo-element {
  property: value;
  content: "♥";
}

.plates input + label::before {
  content: "⬜";
  margin-right: 10px;
}

.plates input:checked + label::before {
  content: "🌮";
}
```

위에서 `input` 엘리먼트에는 의사 요소 `::before`를 적용할 수 없었다.

- 의사 요소(가상 요소)는 선택한 엘리먼트의 일부분에 스타일을 입힐 수 있다. 선택자 뒤에 위치해야 한다. 하나의 선택자에 하나의 의사 요소만 사용할 수 있다. 이중 콜론(`::`)을 사용하여 의사 클래스와 구별 짓는다.
- `::before`, `::after`로 생성한 의사 요소는 대체 요소에 적용할 수 없다. 
- 대체 요소는 자신의 콘텐츠가 현재 문서 스타일의 영향을 받지 않는 요소를 말한다. 

![html-replaced-void-elements-venn](static/html-replaced-void-elements-venn.png)

## References

[HTML replaced and void elements](https://catalin.red/html-replaced-void-elements/)

