---
title: Speech Detection
date: 2021-03-31
tags: JavaScript
---

## Speech Detection

![Speech Detection](static/Speech Detection.png)

### Logic

웹에서 음성 인식을 구현한다. `Web Speech API`는 음성 데이터를 처리할 수 있도록 한다. 음성 인식은 오디오 입력에서 음성 컨텍스트를 인식하고 적절하게 응답하는 기능을 제공하는 `SpeechRecognition` 인터페이스를 통해 엑세스된다.

1. 인터페이스의 생성자를 사용하여 장치의 마이크를 통해 음성이 입력될 때 탐지할 수 있는 여러 이벤트 핸들러가 있는 새로운 `SpeechRecognition` 객체를 만든다.
2. 음성 인식 서비스가 결과를 반환하면 전사 데이터를 화면에 표시한다. `isFinal` 속성이 `true`가 되면 새로운 `p` 요소를 추가한다.
3. 음성 인식 서비스 연결이 끊기면 다시 시작한다.

```javascript
<script>
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  const recognition = new SpeechRecognition()
  recognition.interimResults = true
  recognition.lang = 'ko-KR'

  let p = document.createElement('p')
  const words = document.querySelector('.words')
  words.appendChild(p)

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('')

      const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩')
      p.textContent = poopScript

      if (e.results[0].isFinal) {
        p = document.createElement('p')
        words.appendChild(p)
      }
  })

  recognition.addEventListener('end', recognition.start)

  recognition.start()
</script>
```

### JavaScript

- `SpeechRecognition.interimResults`: 중간 결과를 반환할지 (`true`) 반환하지 않을지 (`false`) 제어한다. 중간 결과는 아직 최종 결과가 아니다.
- `SpeechRecognition.lang`: 현재 `SpeechRecognition`의 언어를 반환하고 설정한다.
- `SpeechRecognition.start()`: 음성 서비스를 시작한다.
- `Node.appendChild()`: 특정 부모 노드의 자식 리스트 중 마지막에 한 노드를 추가한다.
- `ParentNode.append()`: `ParentNode`의 마지막 자식 뒤에 `Node` 객체 또는 `DOMString` 객체를 추가한다. 반환하는 값이 없고 여러 개 노드와 문자를 추가할 수 있다.
- `Web Speech API`의 `result` 이벤트는 음성 인식 서비스가 결과를 반환할 때 발생한다.
- `Web Speech API`의 `end` 이벤트는 음성 인식 서비스 연결이 끊겼을 때 발생한다.
- `SpeechRecognitionResult.isFinal` 속성은 최종 결과인지 아닌지 나타낸다.
