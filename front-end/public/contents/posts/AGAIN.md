---
title: 넘어져도 다시 (AGIAN)
date: 2020-09-06
tags: JavaScript, Data Structure, Time Complexity
---

---

다시

---

## Data Structure

인간의 언어와 컴퓨터의 언어(2진수)는 다르다. 우리는 인간의 자료를 컴퓨터가 다룰 수 있도록 데이터 타입을 정의하고, 데이터 타입으로 컴퓨터에게 명령한다. 자료구조는 데이터를 효율적으로 관리하고 구조화시키는 방법이다. 자료구조는 자료처리의 성능과 효율에 직접적인 영향을 미친다.

### 1. Stack

- 선형 구조, 후입선출 (LIFO: Last In, First Out)

- 데이터의 삽입과 삭제가 같은 방향에서 일어난다.

![Stacks](static/Visualization of basic Operations of Stacks.png)

### 2. Queue

- 선형 구조, 선입선출 (FIFO: First In, First Out)

- 데이터의 삽입과 삭제가 각각 다른 방향에서 일어난다.

![Queues](static/Visualization of Basic Operations of Queues.png)

### 3. Linked List

핵심은 노드였다. 노드를 구성하고 있는 포인터를 이해하고 접근하니 수월했다. 배열이 아닌 객체였다면 데이터를 찾기 위해 재귀를 떠올렸을 것이고, 그에 따른 복잡도를 예상할 수 있었다. 그리고 메소드, class field(멤버 변수) 등 클래스 함수에 대한 이해도가 부족했다.

- 선형 구조, 연결 리스트는 노드의 연결이고 그 크기는 동적이다.
- 노드는 데이터와 다음 노드를 가리키는 포인터로 구성된다.

![Linked Lists](static/Visualization of basic Terminology of Linked Lists.png)

- Singly linked list: 포인터의 공간은 하나(next), 포인터는 다음 노드를 가리킨다.

  Doubly linked list: 포인터의 공간은 둘(next, prev), 각각 앞의 노드와 뒤에 노드를 가리킨다.

  Circular linked list: 꼬리 노드가 머리 노드를 가리킨다.

### 4. Hash Table

첫 번째 이슈는 수도코드다. 문제 해결을 위한 아이디어를 떠올리지 못할 때는 처해있는 환경을 적는 것만으로도 정리될 수 있다. 특히 해시 테이블 같은 자료구조는 그림을 보고 순서와 내용을 작성할 수 있다. 두 번째 이슈는 `this`다. 클래스도 모르겠는데 `this`도 파악할 수 없었다. `this`는 화살표 함수와 `bind`로 해결했다.

- 해시 테이블은 데이터를 테이블의 주소(index) 값으로 변환해서 저장한다. 그래서 나중에 데이터를 찾을 때 해시값으로 빠르게 데이터에 접근할 수 있다. 그리고 자료를 저장하는 공간(`storage`)을 동적(`resizing`)으로 관리(`bucket`, `tuple`)한다.
- 해시 함수는 언제나 `storage` 크기 이내(0 to length - 1)의 값, 언제나 같은 값을 리턴해야 한다. 그리고 어떤 값도 기억하지 않는다.

![Hash Function](static/Representation of a Hash Function.png)

- 해시값(index)이 중복되어 같은 주소에 매핑되는 이슈를 해시 충돌이라 말하고, 데이터를 검색하는 시간이 길어진다.

- 해시 함수를 잘 구현해도 충돌은 반드시 발생하는데, 해시 충돌을 방지하는 방법으로 '체이닝', '개방 주소'가 있다.

### 5. Graph

- 비선형 구조, 네트워크 모델, 그래프는 정점(vertex)과 간선(edge)으로 구성된다.

- 방향(directed) 그래프와 무방향(undirected) 그래프가 있다.

- cycle 가능, self-loop 가능

- 진입 차수: 정점으로 오는 간선의 개수

- 진출 차수: 정점에서 나가는 간선의 개수

![Graphs](static/Visualization of Terminology of Graphs.png)

- 인접 리스트: 공간은 적지만 복잡하다.

  배열과 연결리스트 등으로 인접 정점을 저장한다.

  간선의 수는 빠르게 찾지만 O(N + E)

  간선 존재 여부는 느리게 찾는다. O(N)

- 인접 행렬: 공간은 크지만 간단하다.

  N(정점의 개수) x N 크기의 2차원 배열 안에서 정점의 관계를 0과 1로 표현한다.

  간선의 수와 무관하게 언제나 N^2의 메모리 공간이 필요하다.

  간선의 수는 느리게 찾지만 O(N^2)

  간선 존재 여부는 빠르게 찾는다. O(1)

### 6. Tree

- 비선형 구조, 계층 모델, 트리는 노드와 간선으로 구성되어 있는 그래프다.
- 방향(directed) 그래프만 있다. cycle 불가능, self-loop 불가능
- 자식 노드는 하나의 부모 노드만 가지고, 자식 노드는 0개 이상 가질 수 있다.
- Root: 부모 노드가 없다.
- Leaf: 자식 노드가 없다.
- 트리의 높이(height): 루트 노드부터 리프 노드까지 깊이
- 노드의 깊이(depth): 특정 노드부터 루트 노드까지 간선의 수

![Tree](static/Visualization of Basic Terminology of Trees.png)

- 이진 트리: 자식 노드는 최대 2개까지만 가질 수 있다.

  정(full) 이진 트리: 자식 노드가 0개 또는 2개

  완전(complete) 이진 트리: 마지막 레벨을 제외한 나머지 레벨에는 모든 노드가 있어야 한다.

  포화(perfect) 이진 트리: 모든 레벨에 모든 노드가 있어야 한다. full + complete

- 이진 탐색 트리(Binary Search Tree): 왼쪽 노드 <= 현재 노드 < 오른쪽 노드

- 깊이 우선 탐색(DFS): 스택

  넓이 우선 탐색(BFS): 큐

  전위 순회(Preorder Traversal): 부모 - 좌 - 우

  중위 순회(Inorder Traversal): 좌 - 부모 - 우

  후위 순회(Postorder Traversal): 좌 - 우 - 부모

## Time Complexity

- 알고리즘이 어떤 문제를 해결하는데 걸리는 시간, 효율성을 가리킨다.

- Big-O notation: 시간의 복잡도를 표현한다. 계수와 차수는 무시한다. 그 외 Big-Ω, Big-Θ

- O(1) constant time

  O(logn) logarithmic time

  O(n) linear time

  O(nlogn) log linear time

  O(n^2) quadratic time

  O(n^3) cubic time

  O(2^n) exponential time < O(3n) < ... < O(n!)

  뒤로 갈수록 느리다.

![Complexity](static/Complexity.png)

## Issue & Keyword

- `delete` 연산자로 non-configurable 속성은 삭제할 수 없다.

  `var`, `let`, `const`로 선언된 변수는 non-configurable 속성으로 구분된다.

- `tuple`: 순서쌍

- [VISUALGO](https://visualgo.net/en)

## References

[8 Common Data Structures every Programmer must know](https://towardsdatascience.com/8-common-data-structures-every-programmer-must-know-171acf6a1a42)
