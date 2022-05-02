---
title: vs 완벽주의 (MISTAKE)
date: 2020-09-10
tags: JavaScript, OOP, Prototype, Class
---

---

너무 디테일에 집착하고 있다. 뭔가 잘못됐다.

---

## Object-Oriented Programming

자바스크립트는 명령형, 함수형, 프로토타입 기반, 객체 지향 프로그래밍 언어다. OOP는 **객체**를 중심으로 프로그래밍하는 패러다임이다.

- **Encapsulation**: 객체의 프로퍼티와 메소드를 정의하고 그 정보를 은닉한다.
- **Abstraction**: 객체의 속성, 메소드를 결합하여 클래스를 정의한다.
- **Inheritance**: 하위 객체에서 상위 객체의 프로퍼티와 메소드에 접근할 수 있다.
- **Polymorphism**: 상속받은 메소드를 다시 정의(오버라이딩)하거나, 오버로딩한다.

클래스 기반 언어는 클래스로 객체를 정의하고 생성자로 인스턴스를 생성하지만, 클래스 개념이 없는 자바스크립트는 생성자 함수로 객체를 정의하고 `new` 연산자로 인스턴스를 생성한다. 그러니까 자바스크립트는 함수와 프로토타입으로 OOP를 구현한다.

### Object

- 객체는 중괄호 `{...}`를 이용해서 객체를 만들 수 있다. 하지만 알고 보면 생성자 함수 `Object`로 만든다. `Array`, `Function`도 같다.
- 중괄호 안에는 '키: 값' 쌍으로 이루어진 프로퍼티를 넣을 수 있다.
- 객체의 프로퍼티에 할당된 함수를 메소드라 말한다. 메소드의 `this`는 해당 객체를 가리킨다.

### 생성자 함수

- 생성자 함수는 객체를 정의한다.
- 생성자 함수의 이름은 대문자로 시작하고, 반드시 `new` 연산자를 붙여서 실행한다.
- 복수의 객체를 만들고 싶을 때 생성자 함수와 `new` 연산자를 사용한다.
- `new constructor[([arguments])]`
- `new` 연산자는 객체 타입의 인스턴스를 만든다.
- `new` 연산자로 함수를 실행하면 아래 알고리즘이 동작한다.
  1. 빈 객체를 만들어 `this`에 할당하고 함수 본문을 실행한다.
  2. `this`에 새로운 프로퍼티를 추가해 `this` 를 수정한다.
  3. `this`를 반환한다.

## Prototype

### 정의

- 자바스크립트의 모든 객체는 숨김 프로퍼티 `[[Prototype]]`를 가지고 있는데, 이 프로퍼티는 `null` 또는 객체를 가리킨다. `[[Prototype]]`이 참조하는 객체를 '프로토타입'이라 한다.
- 객체에서 프로퍼티나 메소드에 접근하려는데 없으면 프로토타입에서 찾는다. 이를 `프로토타입 체인`이라 한다.
- `[[Prototype]]` 프로퍼티는 숨김 프로퍼티지만 `__proto__`을 사용하면 프로토타입에 접근할 수 있다.

### prototype 프로퍼티

모든 함수 객체는 `prototype` 프로퍼티를 가지고 있다. `F.prototype`은 `new F()`를 호출할 때 만들어지는 새로운 객체의 `[[Prototype]]`을 설정한다. 그러니까 `F.prototype`는 예비 '프로토타입'이다.

- `F.prototype`의 프로퍼티 `constructor`는 함수 자신을 가리킨다.
- `F.prototype`의 프로퍼티 `__proto__`는 참조하는 객체를 가리킨다.

```javascript
function Rabbit(name) {
	// 생성자 함수
	this.name = name
}

Rabbit.prototype.move = function () {
	console.log('깡충')
} // 메소드

Rabbit.prototype // 프로토타입 객체 {constructor: f Rabbit, __proto__: Object}
Rabbit.prototype.constructor === Rabbit // true
Rabbit.__proto__ === Function.prototype // true
Rabbit.__proto__.__proto__ === Object.prototype // true

let rabbit = new Rabbit('Soomin') // 인스턴스
rabbit.constructor === Rabbit // true
rabbit.__proto__ === Rabbit.prototype // true
rabbit.__proto__.__proto__ === Object.prototype // true
```

### 프로토타입 메소드

- `__proto__`으로 `[[prototype]]`을 바꾸는 연산은 객체 프로퍼티 접근 최적화를 망친다.
- `Object.create(proto[, propertiesObject])`: 프로토타입 객체 및 프로퍼티를 가지는 새 객체를 만든다.
- `Object.getPrototypeOf(obj)`: `obj`의 프로토타입을 반환한다.
- `Object.setPrototypeOf(obj, prototype)`: `obj`의 프로토타입을 다른 객체 또는 `null`로 설정한다.

## Class

클래스 기반 언어의 상속을 프로토타입으로 흉내내는 `pseudoclassic`은 상속과 프로토타입 체인의 원리를 이해할 수 있는 좋은 레거시다. 하지만 자바스크립트는 `ES6`에서 `Class`를 도입했다.

> 클래스는 객체 지향 프로그래밍에서 특정 객체를 생성하기 위해 변수와 메소드를 정의하는 일종의 템플릿으로, 객체를 정의하기 위한 상태(멤버 변수)와 메소드(함수)로 구성된다.

### 기본 문법

```javascript
class MyClass {
  // 여러 메서드를 정의할 수 있음
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

- 이렇게 클래스를 만들고 `new Myclass()`를 호출하면 내부에서 정의한 메소드가 들어있는 객체가 생성된다.
- 생성자 메소드 `constructor()`는 `new`에 의해 자동으로 호출되고 객체를 초기화한다.

### 클래스란

클래스는 함수다. 정확히는 생성자 메소드와 동일하다.

`Class Myclass {...}` 문법 구조가 하는 일은 다음과 같다.

1. `Myclass`라는 이름의 함수를 만든다. 함수 본문은 생성자 메소드 `constructor`에서 가져온다. 생성자 메소드가 없으면 본문이 비워진 채로 함수가 만들어진다.
2. 클래스 내에서 정의한 메소드를 `Myclass.prototype`에 저장한다.
3. `new Myclass`를 호출해 객체를 만들고, 객체의 메소드를 호출하면 메소드를 프로토타입에서 가져온다. 이 과정으로 객체에서 클래스 메소드에 접근할 수 있다.

### 클래스 필드

'클래스 필드(class field)'라는 문법으로 클래스에 프로퍼티를 추가할 수 있다.

- `<프로퍼티 이름> = <값>`
- 클래스 필드는 인스턴스 객체에만 저장된다.

### 키워드

`class ChildClass extends ParentClass { ... }`: 클래스를 다른 클래스의 자식으로 만든다.

`super([arguments])`: 부모 생성자를 호출한다.

`super.functionOnParent([arguments])`: 부모 객체의 메소드를 호출한다.

```javascript
class MyClass {
  prop = value; // 프로퍼티

  constructor(...) { // 생성자 메소드
    // ...
  }

  method(...) {} // 메소드

  get something(...) {} // getter 메소드
  set something(...) {} // setter 메소드

  [Symbol.iterator]() {} // 계산된 이름(computed name)을 사용해 만드는 메소드 (심볼)
  // ...
}
```

## References

[객체: 기본](https://ko.javascript.info/object-basics)

[클래스](https://ko.javascript.info/classes)

[Classes](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)
