---
title: JavaScript Drum Kit
date: 2021-02-22
description: JavaScript
---

---

처음 자바스크립트를 배울 때 짧게 DOM 조작을 배운 적 있다. 그때 잘 못했는데 부트 캠프 특성상 더 파고들지 못하고 급하게 다음 단계로 넘어갔다. 그 이후 리액트에서는 컴포넌트 단위에 집중했으니 분명 엘리먼트를 직접 다루는 기초가 많이 부족하다. 프로그래머스 Dev-Matching 때문에 급하게 준비하는 감은 없지 않지만 결과와 무관하게 값진 시간이 될 것으로 기대한다. 2017년 [JavaScript30](https://javascript30.com/)을 따라간다. 스크립트 로직과 새로 알게 된 키워드를 정리한다.

---

## JavaScript Drum Kit

![JavaScript Drum Kit](static/JavaScript Drum Kit.png)

### Logic

키를 누르면 소리가 나고 엘리먼트가 transform 된다.

1. `keydown` 이벤트가 `window` 객체에 전달되면 `playSound` 리스너를 호출한다.
2. `playSound`:
   - 타겟의 `keyCode`와 일치하는 키 엘리먼트와 오디오 엘리먼트를 선택한다.
   - 키 엘리먼트에 `playing` 클래스 값을 추가한다.
   - 오디오 엘리먼트를 플레이한다.
3. 키의 transition이 끝나면 `removeTransition` 리스너를 호출한다.
4. `removeTransition`:
   - TransitionEvent의 propertyName을 확인한다.
   - 대상(`e.target` === `this`) 엘리먼트에 `playing` 클래스 값을 제거한다.

```javascript
<script>
  const playSound = function (e) {
    audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    key = document.querySelector(`div[data-key="${e.keyCode}"]`)
    if (!audio) return

    key.classList.add('playing')
    audio.currentTime = 0
    audio.play()
  }

  const removeTransition = function (e) {
    if (e.propertyName !== 'transform') return
    //
    this.classList.remove('playing')
  }

  // const keys = Array.from(document.querySelectorAll('.key'))
  const keys = document.querySelectorAll('.key')
  
  keys.forEach(key => key.addEventListener('transitionend', removeTransition))
  window.addEventListener('keydown', playSound)
</script>
```

### JavaScript

- `target.addEventListener(type, listener)`
- Event type: `transitionend`, `keydown`
- `NodeList` 객체는 `Array`가 아니다. `Array`가 가지고 있는 메소드 중 일부만 가지고 있다.
- `Array.from(arrayLike)`: 유사 배열 객체나 반복 가능한 객체를 얕게 복사해서 새로운 `Array` 객체를 만든다.
- 속성 선택자(`[]`)는 속성과 값으로 엘리먼트를 선택한다.
- `Element.classList` 프로퍼티의 메소드는 값을 추가하고 삭제하는 `add`와 `remove` 그리고 `toggle` 등이 있다.
- `HTMLMediaElement.currentTime`
