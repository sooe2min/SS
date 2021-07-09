---
title: Custom Video Player
date: 2021-03-02
description: JavaScript
---

## Custom Video Player

![Custom Video Player](static/Custom Video Player.png)

### Logic


1. 비디오 플레이어 또는 토글 버튼을 클릭하면 재생 또는 정지한다.
2. 비디오가 재생 또는 정지하면 토글 아이콘이 변경된다.
3. 스킵 버튼을 클릭하면 재생 위치가 변경된다.
4. 범위 슬라이더를 클릭하고 마우스를 이동시켜 재생 속도 또는 볼륨을 조절한다.
5. 스킵 버튼을 클릭하면 진행 표시줄이 업데이트된다.
6. 진행 표시줄을 클릭하고 마우스를 이동시켜 재생 위치를 변경한다.

```javascript
// get elements
const player = document.querySelector('.player')
const video = document.querySelector('.viewer')
const toggle = document.querySelector('.toggle')
const skipButtons = document.querySelectorAll('[data-skip]')
const ranges = document.querySelectorAll('.player__slider')
const progress = document.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')

// functions
function togglePlay() {
  const method = video.paused ? 'play' : 'pause'
  video[method]()
}

function updateButton() {
  const icon = this.paused ? '►' : '❚❚'
  toggle.textContent = icon
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
  video[this.name] = this.value
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

// listeners
video.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay)

video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

skipButtons.forEach(button => button.addEventListener('click', skip))
video.addEventListener('timeupdate', handleProgress)

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
```

### JavaScript

- Event type: `click`, `play`, `pause`, `timeupdate`, `change`, `mousemove`, `mousedown`, `mouseup`
- `HTMLMediaElement.paused`
- `Node.textContent`
- `HTMLMediaElement.volume`
- `HTMLMediaElement.playbackRate`
- `HTMLMediaElement.duration`
- `HTMLElement.offsetWidth`

### HTML

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>HTML Video Player</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div class="player">
    <video class="player__video viewer" src="652333414.mp4"></video>

    <div class="player__controls">
      <div class="progress">
        <div class="progress__filled"></div>
      </div>
      <button class="player__button toggle" title="Toggle Play">►</button>
      <input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
      <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
      <button data-skip="-10" class="player__button">« 10s</button>
      <button data-skip="25" class="player__button">25s »</button>
    </div>
  </div>

  <script src="scripts.js"></script>
</body>

</html>
```

