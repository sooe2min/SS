---
title: Hold Shift and Check Checkboxes
date: 2021-02-28
tags: JavaScript
---

## Hold Shift and Check Checkboxes

![Hold Shift and Check Checkboxes](static/Hold Shift and Check Checkboxes.png)

### Logic

다수의 체크 박스를 시프트 키 + 클릭으로 한 번에 체크한다.

1. 처음 체크 박스는 그냥 클릭한다.
   - `click` 이벤트가 체크 박스에 전달되면 `handleCheck` 리스너를 호출한다.
   - 해당 체크 박스를 `lastChecked`로 저장한다.
2. 다음 체크 박스는 시프트 키를 누르고 클릭한다.
3. 마지막에 체크한 체크 박스(`lastChecked`)와 지금 클릭한 체크 박스(`this`) 사이에 있는 체크 박스를 체크하기 위해 우선 모든 체크 박스를 확인한다.
   - 체크 박스 요소가 `lastChecked` 또는 `this`와 일치하면 `inBetween` 변수를 변경한다.
   - `inBetween` 변수가 `true`일 때 체크 박스를 체크한다.
   - `false`일 때는 체크하지 않는다.

```javascript
<script>
  const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]')

  let lastChecked

  function handleCheck(e) {
    let inBetween = false
    if (e.shiftKey && this.checked) {
      checkboxes.forEach(checkbox => {
        if (checkbox === lastChecked || checkbox === this) {
          inBetween = !inBetween
        }
        if (inBetween) checkbox.checked = true
      })
    }

    lastChecked = this
  }

  checkboxes.forEach(input => input.addEventListener('click', handleCheck))
</script>
```

### JavaScript

- Event type: `click`
- `KeyboardEvent.shiftKey`
