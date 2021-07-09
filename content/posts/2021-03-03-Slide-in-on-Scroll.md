---
title: Slide in on Scroll
date: 2021-03-03
description: JavaScript
---

## Slide in on Scroll

![Slide in on Scroll](static/Slide in on Scroll.png)

### Logic

1. 페이지를 스크롤한다.
2. 이미지의 절반까지 좌표가 이미지의 시작 좌표를 넘으면 이미지가 보인다.
   - `slideInAt`: 이미지의 절반까지 좌표
   - `sliderImages.offsetTop`: 이미지의 시작 좌표
3. 스크롤 수직 크기가 이미지의 끝 좌표를 넘으면 이미지가 사라진다.
   - `window.scrollY`: 스크롤 수직 크기
   - `imageBottom`: 이미지의 끝 좌표

```javascript
<script>
  const sliderImages = document.querySelectorAll('.slide-in')

  function checkSlide() {
    sliderImages.forEach(sliderImages => {
      const slideInAt = (window.innerHeight + window.scrollY) - sliderImages.height / 2
      const imageBottom = sliderImages.offsetTop + sliderImages.height

      const isHalfShown = sliderImages.offsetTop < slideInAt
      const isNotScrolledPast = window.scrollY < imageBottom
      
      if (isHalfShown && isNotScrolledPast) {
        sliderImages.classList.add('active')
      }
      else {
        sliderImages.classList.remove('active')
      }
    })
  }

  window.addEventListener('scroll', debounce(checkSlide))
</script>
```

### JavaScript

- Event type: `scroll`
- `Window.scrollY`: 문서에서 스크롤이 얼마나 되었는지 픽셀 단위로 반환
- `HTMLElement.offsetParent`
- `HTMLElement.offsetTop`: `offsetParent`부터의 픽셀 수(거리)