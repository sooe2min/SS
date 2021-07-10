---
title: Webcam Fun
date: 2021-03-28
description: JavaScript
---

## Webcam Fun

![Webcam Fun](static/Webcam Fun.png)

### Logic

1. `getVideo`: 미디어 입력 장치 사용 권한을 요청하고 비디오 요소와 연결된 미디어 객체를 설정한다.
2. `paintToCanvas`: 픽셀 데이터를 직접 수정하고 캔버스에 그린다.
3. `takePhoto`: 이미지의 데이터 URI를 가져와서 다운로드할 수 있는 링크 엘리먼트를 생성한다. 

```javascript
const video = document.querySelector('.player')
const canvas = document.querySelector('.photo')
const ctx = canvas.getContext('2d')
const strip = document.querySelector('.strip')
const snap = document.querySelector('.snap')

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream)
    
//  DEPRECIATION : 
//       The following has been depreceated by major browsers as of Chrome and Firefox.
//       video.src = window.URL.createObjectURL(localMediaStream);
//       Please refer to these:
//       Deprecated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
//       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
      
      video.srcObject = localMediaStream
      video.play()
    })
    .catch(err => {
      console.error(`OH NO!!!`, err)
    })
}

function paintToCanvas() {
  const width = video.videoWidth
  const height = video.videoHeight
  canvas.width = width
  canvas.height = height

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height)
    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height)
      
    // mess with them
    // pixels = redEffect(pixels)
    pixels = rgbSplit(pixels)
    // ctx.globalAlpha = 0.8

    // put them back
    ctx.putImageData(pixels, 0, 0)
  }, 16)
}

function takePhoto() {
  // played the sound
  snap.currentTime = 0
  snap.play()

  // take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg')
  const link = document.createElement('a')
  link.href = data
  link.setAttribute('download', 'handsome')
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`
  strip.insertBefore(link, strip.firstChild)
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200 // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50 // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5 // Blue
  }
  return pixels
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0] // RED
    pixels.data[i + 500] = pixels.data[i + 1] // GREEN
    pixels.data[i - 550] = pixels.data[i + 2] // Blue
  }
  return pixels
}

getVideo()

video.addEventListener('canplay', paintToCanvas)
```

### JavaScript

- `Navigator.mediaDevices` 속성은 현재 연결된 미디어 입력 장치에 접근할 수 있는 `MediaDevices` 객체를 반환한다.
- `MediaDevices` 인터페이스의 `getUserMedia()` 메소드는 사용자에게 미디어 입력 장치 사용 권한을 요청하고 사용자가 수락하면 요청한 미디어 종류의 트랙을 포함한 `MediaStream`을 반환한다.
- `MediaStream` 인터페이스는 미디어 콘텐츠의 스트림을 나타낸다. 스트림은 비디오 또는 오디오 트랙과 같은 여러 트랙으로 구성된다.
- `HTMLMediaElement` 인터페이스의 `srcObject` 속성은 `HTMLMediaElement`와 연결된 미디어 객체를 설정한다.
- `canplay` 이벤트는 미디어를 재생할 수 있을 때 발생한다.
- `ctx.drawImage(image, dx, dy, dWidth, dHeight)`: Canvas 2D API의 `CanvasRenderingContext2D.drawImage()` 메소드는 캔버스에 이미지를 그리는 다양한  방법을 제공한다. 
- `ctx.getImageData(sx, sy, sw, sh)`: 캔버스의 지정된 부분에 대한 픽셀 데이터를 나타내는 `ImageData` 객체를 반환한다.
- `ctx.putImageData(imageData, dx, dy)`: 지정된 `ImageData` 객체의 데이터를 캔버스에 그린다.
- `canvas.toDataURL(type, encoderOptions)`: 이미지의 데이터 URI를 반환한다.
- `<a>` 요소의 전역 특성 `download`: 링크로 이동하는 대신 URL을 저장한다.
- `<a>` 요소의 전역 특성 `href`: 하이퍼링크가 가리키는 URL.
- `Element.setAttribute(name, value)`
- `parentNode.insertBefore(newNode, referenceNode)`: 참조 노드 앞에 부모 노드의 자식 노드를 삽입한다.

## Reperences

[Browsersync](https://browsersync.io/)

