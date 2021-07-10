---
title: Adding Up Times with Reduce
date: 2021-03-25
description: JavaScript
---

## Adding Up Times with Reduce

### Logic

시, 분, 초를 구한다.

1. 속성 선택자를 이용해서 `data-time` 속성을 가진 모든 요소를 가져온다.
2. `dataset.time` 속성을 읽고 시, 분, 초를 구한다.

```javascript
<script>
  const timeNodes = Array.from(document.querySelectorAll('[data-time]'))
  // const timeNodes = [...document.querySelectorAll('[data-time]')]

  const seconds = timeNodes
    .map(node => node.dataset.time)
    .map(timeCode => {
      const [mins, secs] = timeCode.split(':').map(parseFloat)
      return (mins * 60) + secs
    })
    .reduce((total, vidSeconds) => total + vidSeconds)

  let secondsLeft = seconds
  const hours = Math.floor(secondsLeft / 3600)
  secondsLeft = secondsLeft % 3600

  const mins = Math.floor(secondsLeft / 60)
  secondsLeft = secondsLeft % 60

  console.log(hours, mins, secondsLeft)
</script>
```

### JavaScript

- `Array.from(arrayLike[, mapFn[, thisArg]])`: 새로운 `Array` 객체를 반환
- `HTMLElement.dataset`
- `str.split([separator[, limit]])`: 구분자를 이용하여 여러 개의 문자열로 나눈다.
- `parseFloat(value)`: 문자열을 분석해 부동 소수점 실수로 반환한다.
- `Math.floor(x)`: 내림
