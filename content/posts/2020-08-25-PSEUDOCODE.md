---
title: 생각은 힘 (PSEUDOCODE)
date: 2020-08-25
description: JavaScript, Recursion
---

---

글을 쓰는 것보다 생각이 먼저다. 생각을 내려놓는 순간 내게 남는 것은 없다.

---

## JavaScript
### Recursion 재귀: 어떤 함수가 자기 자신을 호출

- 작은 문제부터 쪼개서 해결한다.
- 재귀적으로 사고하기
  1. 재귀 함수의 입력값과 출력값 정의하기
  
  2. 문제를 쪼개고 경우의 수를 나누기
  
     입력값에 따라 문제를 더는 쪼갤 수 없는 경우와 그렇지 않은 경우로 나눈다.
  
  3. 단순한 문제 해결하기 (base case)
  
     재귀의 기초 = 재귀의 탈출 조건
  
  4. 복잡한 문제 해결하기 (recursive Case)
  
     ```javascript
     function recursive(input1, input2, ...) {
         // 재귀의 기초 (base case)
         if (문제를 더는 쪼갤 수 없는 경우) {
             return 단순한 문제의 해답;
         }
         // recursive Case
         // 그렇지 않은 경우
         return 더 작은 문제로 새롭게 정의된 문제
         // 예1. someValue + recursive(input1Changed, input2Changed, ...)
         // 예2. someValue * recursive(input1Changed, input2Changed, ...)
     }
     ```
  

## Issue & Keyword

1. `JSON.stringify()`

   - [JSON](https://www.json.org/json-ko.html): JavaScript Object Notation
   
   - 수도코드를 먼저 생각하자. 구현 단계에서 막히는 문법은 찾으면 된다.
   
     ```javascript
     1. JSON.stringify()가 어떤 기능을 가진 메서드인지 확인한다. 
     2. JSON 개요로 구조를 파악한다. DATA 교환
     3. value를 JSON 문자열로 변환한다.
     - string일 때
     - number, boolean, null, fucnundefined일 때
     - function일 때
     - object일 때
     - array일 때	
     ```
   
   - Implicit Coercion


2. `getElementsByClassName`
   - `Document.body`
   - `Element.classList`
   - `element.childNodes`
   - `Node.hasChildNodes()`