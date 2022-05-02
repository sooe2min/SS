---
title: Geolocation
date: 2021-04-01
tags: JavaScript
---

## Geolocation

### Logic

사용자의 현재 위치를 가져오는 `Geolocation API`를 이용한다.

```javascript
<script>
  const arrow = document.querySelector('.arrow')
  const speed = document.querySelector('.speed-value')

  navigator.geolocation.watchPosition((data) => {
    console.log(data)
    speed.textContent = data.coords.speed
    arrow.style.transform = `rotate(${data.coords.heading}deg)`
  }, (err) => {
    console.error(err)
  })
</script>
```

### JavaScript

- `navigator.geolocation.getCurrentPosition(success[, error[, [options]])`: 장치의 현재 위치를 가져온다.
- `GeolocationPosition` 인터페이스는 주어진 시간에 장치가 위치한 지점을 나타낸다.
