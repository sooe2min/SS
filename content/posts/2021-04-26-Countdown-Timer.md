---
title: Countdown Timer
date: 2021-04-26
description: JavaScript
---

## Countdown Timer

![Countdown Timer](static/Countdown Timer.png)

1. 타이머의 시간(1분, 5분, 15분 등)은 기준 시간으로부터 미래를 가리키고 역행한다. 기준 시간은 현재 시간을 말하고 UTC를 따른다. 
   - `Date.now()`
   - `window.setTimeout(func[, delay, param1, param2, ...])`
   - `scope.clearInterval(intervalID)`
   - `Math.ceil(x)`, `Math.round(x)`, `Math.floor()` 
2. `Date` 객체를 사용할 때는 시간 단위 **millisecond**에 유의해야 한다.
   - `new Date(value: 유닉스 타임스탬프)`
   - 유닉스 타임스탬프: 1970년 1월 1일 00:00:00 UTC(유닉스 시간)부터의 시간을 밀리초 단위로 표현하되 윤초는 무시한 정숫값.
   - `Date.prototype.getHours()`
   - `Date.prototype.getMinutes()`
3. 문자열을 수로 바꿀 때
   - `parseInt(string, radix)`: 문자열을 분석해 정수로 반환한다.
   - `parseFloat(value)`: 문자열을 분석해 부동소수점 실수로 반환한다.

```javascript
let countdown
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')

function timer(seconds) {
  clearInterval(countdown)

  // 지금 시간
  const now = Date.now()
  // seconds 후 시간
  const then = now + seconds * 1000
  displayTimeLeft(seconds)
  displayEndTime(then)

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)
    // stop it
    if (secondsLeft <= 0) clearInterval(countdown)
    // display it
    displayTimeLeft(secondsLeft)
  }, 1000)
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainderSeconds = seconds % 60
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
  document.title = display
  timerDisplay.textContent = display
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp)
  const hour = end.getHours()
  // const adjustedHour = hour > 12 ? hour - 12 : hour
  const minutes = end.getMinutes()
  endTime.textContent = `Be back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`
}

buttons.forEach(button => button.addEventListener('click', function () {
  const seconds = parseInt(this.dataset.time)
  timer(seconds)
}))

document.customForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const mins = this.minutes.value
  timer(mins * 60)
  this.reset()
})
```