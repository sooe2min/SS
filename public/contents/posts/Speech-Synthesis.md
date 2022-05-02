---
title: Speech Synthesis
date: 2021-04-06
tags: JavaScript
---

## Speech Synthesis

![Speech Synthesis](static/Speech Synthesis.png)

### Logic

음성 합성을 구현한다. `Web Speech API`는 음성 데이터를 처리할 수 있도록 한다. 음성 합성은 프로그램이 텍스트 콘텐츠를 읽을 수 있도록 하는 텍스트-음성 구성 요소인 `SpeechSynthesis` 인터페이스를 통해 엑세스된다.

1. 새로운 `SpeechSynthesisUtterance`(utterance: 발화) 객체를 만든다.
2. 발화할 때 합성될 텍스트를 가져오고 설정한다.
3. 사용할 수 있는 음성 목록을 검색하고 사용자가 원하는 음성을 선택할 수 있도록 `<select>` 요소의 옵션 메뉴를 채운다.
4. 유저가 음성을 선택하면 발화하는 데 사용될 음성을 가져오고 설정한다. 그리고 발화를 큐에 추가하여 텍스트를 말하도록 한다.
5. 유저가 `input`의 range를 변경하면 pitch 또는 rate를 가져오고 설정한다.
6. Stop 버튼을 누르면 발화 큐에서 모든 발화를 제거한다.
7. Speak 버튼을 누르면 발화를 큐에 추가하여 텍스트를 말하도록 한다.

```javascript
<script>
  const msg = new SpeechSynthesisUtterance()
  let voices = []
  const voicesDropdown = document.querySelector('[name="voice"]')
  const options = document.querySelectorAll('[type="range"], [name="text"]')
  const speakButton = document.querySelector('#speak')
  const stopButton = document.querySelector('#stop')
  msg.text = document.querySelector('[name="text"]').value

  function populateVoices() {
    voices = this.getVoices()
    voicesDropdown.innerHTML = voices
      .filter(voice => voice.lang.includes('en'))
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('')
  }

  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value)
    toggle()
  }

  function toggle(startOver = true) {
    speechSynthesis.cancel()
    if (startOver) {
      speechSynthesis.speak(msg)
    }
  }

  function setOption() {
    console.log(this.name, this.value)
    msg[this.name] = this.value
    toggle()
  }

  speechSynthesis.addEventListener('voiceschanged', populateVoices)
  voicesDropdown.addEventListener('change', setVoice);
  options.forEach(option => option.addEventListener('change', setOption));
  speakButton.addEventListener('click', toggle);
  stopButton.addEventListener('click', () => toggle(false));
</script>
```

### JavaScript

- `SpeechSynthesisUtterance`는 음성 서비스가 읽어야 하는 내용과 읽는 방법에 대한 정보(e.g. language, pitch and volume.)를 포함하는 음성 요청을 나타낸다.
- `SpeechSynthesisUtterance.text`
- `speechSynthesis`는 장치에서 사용 가능한 합성 음성에 대한 정보를 검색하고 음성 시작 및 일시 중지 등 기타 명령을 수행하는 데 사용하는 음성 서비스에 대한 컨트롤러 인터페이스다.
- `voiceschanged` 이벤트는 `SpeechSynthesisVoice` 객체의 목록이 변경되면 발생한다. 크롬 브라우저는 구글 음성 리소스를 지원하므로 페이지가 처음 로드될 때 객체의 목록이 변경되고 `voiceschanged` 이벤트가 발생한다.
- `SpeechSynthesis.getVoices()` 메소드는 현재 장치에서 사용 가능한 모든 음성을 나타내는 `SpeechSynthesisVoice` 객체의 목록을 반환한다.
- `SpeechSynthesisUtterance.voice`
- `SpeechSynthesisInstance.speak(utterance)`
- `SpeechSynthesis.cancel()`
- `SpeechSynthesisUtterance.rate`
- `SpeechSynthesisUtterance.pitch`

### References

[Why is the voiceschanged event fired on page load?](https://stackoverflow.com/questions/65688030/why-is-the-voiceschanged-event-fired-on-page-load)

[chrome speech synthesis service 개발기](https://blog.embian.com/121)
