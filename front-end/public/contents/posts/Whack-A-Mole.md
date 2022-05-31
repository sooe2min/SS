---
title: Whack A Mole
date: 2021-04-26
tags: JavaScript
---

## Whack A Mole

![Whack A Mole](static/Whack A Mole.png)

두더지가 나타나면 클릭해서 잡는다.

1. `startGame`:
   - 점수를 초기화하고 게임을 시작한다.
   - 10초가 지나면 `timeUp`이 참이 된다.
2. `peep`:
   - 두더지가 나타나고 랜덤한 시간 후에 사라진다.
   - `timeUp`이 거짓이면 다시 `peep`을 호출한다.
3. `bonk`:
   - 두더지를 클릭하면 점수가 오르고 두더지가 사라진다.

```javascript
<script>
  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');
  let lastHole
  let timeUp = false
  let score

  function randomTime(max, min) {
    return Math.round(Math.random() * (max - min) + min)
  }

  function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length)
    const hole = holes[idx]
    if (hole === lastHole) {
      return randomHole(holes)
    }
    lastHole = hole
    return hole
  }

  function peep() {
    const time = randomTime(200, 2000)
    const hole = randomHole(holes)
    hole.classList.add('up')
    setTimeout(() => {
      hole.classList.remove('up')
      if (!timeUp) peep()
    }, time)
  }

  function startGame() {
    scoreBoard.textContent = 0
    timeUp = false
    score = 0
    peep()
    setTimeout(() => timeUp = true, 10000)
  }

  function bonk(e) {
    if (!e.isTrusted) return
    score++
    scoreBoard.textContent = score
    this.parentNode.classList.remove('up')
  }

  moles.forEach(mole => mole.addEventListener('click', bonk))
</script>
```
