---
title: Event Capture, Propagation, Bubbling and Once
date: 2021-04-06
tags: JavaScript
---

## Event Capture, Propagation, Bubbling and Once

![Event Capture, Propagation, Bubbling and Once](static/Event Capture, Propagation, Bubbling and Once.png)

`div` 요소를 클릭하면 로그를 출력하는 코드를 작성한다. 그런데 하위 요소를 클릭하면 상위 요소까지 로그를 출력한다. 그 이유는 버블링 때문이다.

버블링은 한 요소에서 이벤트가 발생하면 그의 부모 요소부터 조상 요소까지 각 요소의 이벤트가 발생하는 이벤트 흐름이다. 그리고 처음 이벤트가 발생한 요소를 타깃 요소라 말하고 `event.taget`으로 접근할 수 있는데 핸들러가 할당된 `this` 요소와는 다를 수 있다.

이벤트 흐름에는 버블링 말고 캡처링도 있다. 이건 버블링과는 반대로 이벤트가 하위 요소로 전파된다. 타깃의 이벤트 이후의 전파를 막고 싶을 땐 `Event.stopPropagation()`을 사용하면 된다.

`target.addEventListener(type, listener[, options])`의 옵션으로 `capture`, `once` 등이 있다. `once`를 설정하면 딱 한 번 리스너가 호출된다.

```javascript
<script>
  const divs = document.querySelectorAll('div')
  const button = document.querySelector('button')

  function logText(e) {
    console.log(e.target)
    console.log(this)
    // e.stopPropagation()
  }

  divs.forEach(div => div.addEventListener('click', logText, {
    capture: false,
    once: false
  }))

  button.addEventListener('click', () => {
    console.log('click!!')
  }, {
    once: true
  })
</script>
```
