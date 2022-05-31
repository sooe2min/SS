---
title: 프로젝트는 실패했다.
date: 2022-04-25
tags: JavaScript, Project
---

## 발단

코드스테이츠 부트 캠프를 수료했을 때 당시 내 기준 나의 개발 실력으로는 프론트엔드 개발자로 취업할 수 없었다. 뭐 얼만큼 대단한 신입이 되고 싶었는지 성장하고 싶은 마음으로 독학을 시작했고 늘 그렇듯 계획은 완벽했지만 그 마음을 적당히 갈무리 짓지 못하고 지적 호기심을 참지 못하고 하염없이 코드를 쳤다. 그냥 바보같이 새로운 스택을 가지고 새로운 무언가를 만드는 코딩이 너무 재밌었다..

다행히도 마냥 재미만 있었던 건 아니다. 개발을 혼자 하는 동안 프로젝트의 규모와 맞닥뜨리는 문제 범위의 한계가 있다 보니 실무에서의 쓸모가 불확실한 지식 학습에 대하여 의문이 있었다. 거기다 기획과 디자인처럼 시간을 많이 써봤자 만족스러운 결과를 얻기 힘든 파트 덕분에 각 분야의 전문가들과 함께 일하고 싶은 마음이 생겼다. 마음 같아선 당장이라도 일하고 싶었지만 이력서에 넣을 수 있는 포트폴리오가 없었다. 결국 효율적이고 생산적인 경험을 위해 코드스테이츠 사이드 프로젝트에 참여하게 되었다.

## 전개 - 1

프로젝트의 시작은 팀 빌딩이다. 지원할 수 있는 세 개의 팀이 있었다.

- T: 회원 관리, 수업 일정 관리 등 헬스 트레이너를 위한 업무 지원 서비스
- A: 풋살팀 인원 관리 서비스
- S: 사용자의 큐레이팅을 기반으로 하는 카페 탐색 서비스

그런데 워낙 오랜만에 프로젝트에 참여하다 보니 프로젝트를 보는 기준이 없었다. 그래서 우선 공감할 수 있는 콘텐츠라면 몰입해서 코드를 칠 수 있을 거라고 생각했다.

난 꾸준히 헬스에 관심이 있었고 피티를 받은 적도 있는데 코치님을 잘 만나서 좋은 가르침을 받은 최고의 경험도 있지만 트레이너와 운동을 하면 할수록 몸이 망가졌던 최악의 경험도 있다. 간절한 동기를 가지고 운동을 하는 사람이라면 누구나 공감을 하겠지만 어쩔 수 없이 운동을 그만해야 하는 상황이 오면 정말 속상하다.

아무튼 나는 이 서비스로 트레이너들의 업무 프로세스가 개선되어 피티를 받는 회원들이 나처럼 맘고생 하지 않고 각자의 목표를 이뤄내는 선순환을 기대하며 T 서비스에 지원했다.

과연 이 선택이 최선의 선택이었을까? 그러니까 이 흐름은 뭐냐면 개발자로서 시야가 좁으니까 아무 기준 없이 프로젝트에 참여한 것이다. 어떤 일에 아무 기준 없이 나의 자원을 투자하는 건 감수해야 할 리스크가 클 수밖에 없다. 시간 낭비하지 않고 내가 원하는 걸 얻기 위해선 기준이 있어야 한다. 예를 들어 직장에서 성장하고 싶다면 내가 일하고 싶은 직장의 기준을 알고 있어야 한다.

내가 원하는 기업의 기준은 무엇인가? 먼저 문제 정의와 솔루션, 미션과 비전, 비즈니스 모델 등 서비스 기획의 전반적인 내용을 짚고 넘어가야 하는 건 맞다. 이 내용에 대한 이해와 공감이 스스로에겐 동기부여가 될 것이고 올바른 개발로 이어질 것이다. 그러나 더 중요한 건 프론트엔드 개발자로서 출근하고 퇴근할 때까지 몇 시간씩 코드를 치는 동안 직접적으로 나에게 영향을 미치는 근무 환경, 즉 개발 문화이다. 그럼 내가 원하는 환경은 무엇인가?..

## 전개 - 2

우선 개발 과정 ㅡ 내가 처한 환경과 그때의 나의 감정, 생각 ㅡ 을 회고한다. 그리고 괴로움보다 즐거움을 느낄 수 있는 환경은 무엇인지, 그 새로운 기준을 정한다. 프론트엔드 개발 과정에는 다음 내용이 포함되어 있었다.

- 화면을 설계하는 와이어프레임을 그린다.
- 제품 백로그를 작성한다.
  - 요구사항(기능)을 리스트업하고 우선순위를 매긴다.
- 스택을 정하고 연구한다.
- 스프린트를 계획하고 실행한다.
  - 스프린트 반복 단위와 목표를 정한다.
  - 스프린트 목표를 달성하기 위한 Issue Task Card(스프린트 백로그)를 작성한다.
  - GitHub 프로젝트의 Kanban Board으로 태스크를 관리한다.
- 스프린트를 회고한다.

내용만 보면 스크럼과 칸반 보드를 활용하는 애자일 방법론을 따르는 것처럼 보인다. 하지만 무엇이든 겉보다는 속을 봐야 안다. 솔직히 이도저도 아니고 흉내만 냈다. 위험을 분석하기 위한 질문이 필요하다.

1. 채팅 기능이 꼭 필요한 기능이었는지 의심스럽다. 만약 MVP 개념을 잘못 이해하고 있었다면 백로그를 작성하는 단계부터 잘못이 있었을 것이다.
   - MVP란 무엇이며, Bare minimum의 기능은 MVP에 적합한 기능이었는가?
   - 백로그는 올바르게 작성되었는가?
2. 리액트 컴포넌트는 잦은 와이어프레임의 변경과 새로운 기능 추가에 빠르게 대응할 수 없었다. 나는 이 문제의 첫 단추가 와이어프레임에 대한 무지 때문이라고 생각한다.
   - 와이어프레임을 그리는 목적은 무엇이며, 어떤 내용을 다뤄야 하는가?
   - 리액트 컴포넌트 설계의 문제는 무엇이었는가?
3. 기술 스택을 사용하는 데 어려움이 있었다.
   - 각 기술을 사용하는 근거는 무엇이며, 팀을 위한 최선의 선택이었는가?
4. 꾸준히 프로젝트 진행 상황을 공유했는데도 불구하고 마지막까지 처리하지 못한 이슈가 있었다.
   - 애자일 방법론을 따르겠다면 회고의 목적은 무엇이며, 새로운 이슈는 어떻게 처리할 것인가?

## 위기

### Backlog

프로젝트의 핵심 용어인 Minimum Viable Product, MVP는 최소 기능 제품이라는 의미로 쓰였다. 하지만 MVP 개념을 오해하고 있었고 요구사항의 우선순위를 정하는 기준은 모호했다. 일례로 Bare minimum에 포함된 채팅 기능은 있으면 좋지만 꼭 필요한 기능은 아니었다. 오판의 과정을 돌이켜보면 먼저 제품 백로그를 작성하는 단계에서 `(1)`말이 통하니 아무 의심 없이 `(2)`MVP를 개발하는 현 상황과 무관하게 그저 개발자 입장에서 ㅡ 아무튼 있으면 좋은 기능인데 마침 구현해 본 적 있으니까? ㅡ `(3)`기능을 위한 기능을 리스트업하고 우선순위를 정했던 거다.

MVP는 2011년 에릭 리스의 린스타트업에서 등장하는 개념으로 최소한의 노력으로 최대한의 검증된 학습(validated learning)을 수집하는 제품을 의미하며, 비즈니스 가설을 검증하고 시장이 원하는 게 무엇인지 학습하는 데 쓰인다. 따라서 MVP가 목적을 달성하기 위한 수단으로서 제 역할을 다할 수 있도록 완벽하진 않지만 작동하는 제품을 빠르게 자주 만드는 것이 MVP 개발의 관건이다. MVP 기능의 우선순위를 정하는 대표적인 방법에는 Walking Skeleton이 있으며 제품이 작동하는 데 절대적으로 중요한 기능이 무엇인지 규정짓는다. 특징은 다음과 같다.

- **Key features first.** 요구사항을 특정 카테고리에 분류하지 않고 먼저 필요한 사용자 스토리에 초점을 맞추어 우선순위를 정한다.
- **The system must function.** 필수 기능이 완전하게 작동하는 제품을 구성한다.
- **Fast prioritization.** 핵심 기능을 정의하는 데 많은 시간이 걸리지 않는다.
- **Fast market validation.** 사용자로부터 우선순위 결정에 대한 피드백을 빠르게 받고 제품-시장 적합성과 전체적인 비즈니스 아이디어를 평가할 수 있다. In further releases, they can suit it up.

채팅 기능은 제품이 작동하는 데 필수적인 기능은 아니었으므로 MVP에 적합한 기능은 아니었다. 나는 개발자가 요구사항 명세서(SRS)만 가지고 아무 주관 없이 코드만 치는 사람은 아니라고 생각한다. 제품 백로그를 작성하는 단계부터 관심을 가지고 스스로 판단할 줄 알아야 한다. 왜냐면 어차피 그 일정 내 일정이고 그 요구사항 내가 구현한다. 내 일에 대한 책임은 처음부터 끝까지 내가 지는 게 맞다.

### Wireframe

나는 처음부터 끝까지 와이어프레임과 함께 했다. 기획과 디자인에 시간을 쓰고싶지 않아서 프로젝트에 참여했지만 관여하지 않을 수가 없었다. 결국 프로토타입 수준까지 매달려 있었고 아무리 요즘 툴이 좋다고 하지만 와이어프레임을 작성하는 목적과 그 내용을 잘 모르고 너무 공을 들인 탓에 내 포지션에서 과하게 시간을 쓰고있는 것처럼 느껴졌다.

와이어프레임은 선으로 그리는 뼈대를 말하고 서비스의 초기 컨셉을 나타낸다. 건축의 청사진, 미술의 스케치를 떠올리면 된다. 당연히 완성된 디자인을 보여주는 프로토타입과는 역할이 다르다. 와이어프레임의 핵심은 서비스 구상을 구체화하는 그림을 적은 비용으로 빠르게 그려서 서비스 구조와 기능 누락을 점검하며 개발에 참여하는 팀원들 간 오해를 줄이는 것이다.

와이어프레임의 초안을 작성할 때 너무 많은 것을 고민하지 말고 우선 그리는 것이 가장 중요하다. 그리다가 생각나는 더 좋은 아이디어는 메모만 하고 완성부터 시킨다. 초안이 완성되면 팀원들에게 피드백을 받고 메모한 것과 함께 내용을 업데이트한다.

처음에는 문구와 디자인 등 디테일에 집착하지 않도록 주의해야 하지만 개발 단계에 따라 시각적인 세부사항(레이아웃, 구성 요소 디자인, 색, 폰트, 이미지 등)을 추가하여 완성도를 높인다. 한편에선 와이어프레임의 퀄리티를 너무 높이지 않고 구조와 기능이 정리가 되었을 때 바로 프로토타입으로 넘어가는 게 더 낫다는 의견도 있다. 와이어프레임에서 다루는 내용은 다음과 같다.

- **page structure**
- **information**: 화면에서 어떤 데이터를 보여줄 것인지
- **layout**: 화면의 구성 요소를 어떻게 정리하고 배치할 것인지
- **flow**: 사용자가 어떤 상호작용과 함께 어디로 이동하는지
- **functionality**: 화면에 필요한 기능과 의도된 동작이 무엇인지

와이어프레임이 무엇인지 들여다보니 내가 왜 지칠 수밖에 없었는지 알겠다. 서비스의 구조와 기능 변경이 잦은 개발 초기 단계에서 와이어프레임의 역할을 벗어나는 디자인 완성도에 대한 비효율적인 집착이 결국 시간과 에너지 낭비로 이어졌던 것이다. 나는 내가 잘할 수 있는 일에 집중하고 싶다.

### Stacks

웹 개발에 입문하고 처음 HTML, CSS, JavaScript를 배울 때는 각 기술의 개념을 익히고 당장 기능을 구현하는 데 급급했다. 부트 캠프를 수료하고 독학을 시작했을 때 역시 잘나가는 최신 기술을 배우고 잘 사용할 줄 아는 게 곧 성장이고 실력이라고 생각했다.

처음부터 여태 나의 초점은 더 나은 기술 스택에 대한 호기심에 맞춰져 있었다. [Frontend Developer 로드맵](https://roadmap.sh/frontend)에서 전체적인 흐름을 확인하고 [State of JavaScript](https://2021.stateofjs.com/en-US/), [State of CSS](https://2021.stateofcss.com/en-US/)에서 관심도와 만족도가 높은 기술을 가지고 웹을 개발했다. 그런데 개발을 하면 할수록 트렌디한 기술을 지향하는 접근법으로 내가 정말 성장하고 있는 건지 의구심이 들었다. 적어도 이런저런 기술을 그저 사용만 할 줄 아는 것, 공식 문서 독해와 레퍼런스 구글링이 나의 개발 실력의 전부가 아니라는 것을 차츰 깨닫게 되었다.

아무 생각 없이 사용한 기술이 나중에 어떤 나비효과를 불러일으킬지 모르는 일. 이제는 기술을 위한 기술 사용은 지양하려 한다. 훗날을 도모하며 전체를 보는 통찰이 곧 나의 실력이다.

이번 프로젝트에서 사용한 기술 스택이다. 특별한 이슈가 있었던 기술 스택만 자세하게 보려고 한다.

- TypeScript: 정적 타입 검사로 런타임 전에 오류를 발견하는 자바스크립트의 superset.
- React: 사용자 인터페이스를 만들기 위한 JavaScript 라이브러리
- Next.js: The React Framework for Production. Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.
- GraphQL: GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.
- Apollo Client: GraphQL을 사용하여 로컬 및 원격 데이터를 모두 관리할 수 있는 포괄적인 상태 관리 라이브러리.
- Tailwind CSS: Rapidly build modern websites without ever leaving your HTML.

#### GraphQL vs REST

API는 기술 스택 중 가장 뜨거운 토론 주제였다. 아무래도 API는 전체적인 서비스 개발의 방향성을 정하는 데 차지하는 비중이 높고 프론트엔드와 백엔드 둘 다 서비스를 개발하는 내내 주야장천 사용하는 핵심 기술이다 보니 관심도가 높았던 것 같다.

몇 달 전 클론 코딩을 하면서 경험했던 GraphQL과 Apollo Client은 여러모로 마음에 드는 기술 스택이었다. 나의 좁은 식견으로는 GraphQL을 두고 REST API를 사용해야만 하는 근거를 찾을 수 없었다. 그런데 우리 팀은 서로의 의견을 존중하고 수용할 줄 아는 분들이 모여 계셔서 의견 차이를 좁히기 어려운 팀이 아니었는데도 불구하고 나는 내 의견을 설득력 있게 주장하지 못했다.

여차저차 프로젝트는 GraphQL로 진행되었지만 기술 스택을 정하고 개발하는 과정과 결과물의 완성도 등을 봤을 때 나의 어쭙잖은 GraphQL 지식이 팀에 혼란을 야기한 부분이 있었다고 본다.

그럼 결과가 이러하니 REST API가 더 적절한 선택이었을까? 어떤 선택이었건 근거는 부족했다. 앞으로는 올바른 판단을 위한 근거를 분명하게 제시할 수 있어야 한다. 먼저 REST API가 가지고 있는 근거는 무엇일까?

##### 1. [그런 REST API로 괜찮은가](https://youtu.be/RP_f5dMoHFc)

위 영상에 힌트가 있다.

> REST was originally created to solve my problem: **how do I improve HTTP without breaking the Web?** It was an important problem to solve when I started rewriting the HTTP standard in 1994-95. - Roy T. Fielding

`how do I improve HTTP without breaking the Web?` 이 문제의 솔루션, 로이의 문제를 해결하기 위해 만들어진 아키텍처 스타일의 집합이 REST다. REST의 목적은 서버와 클라이언트의 독립적 진화라고 말할 수 있으며, Uniform Interface 아키텍처 스타일을 지키지 못하면 REST가 아니다.

웹은 REST를 아주 잘 지키는 사례 중 하나다. 웹 페이지, 웹 브라우저, HTTP 명세, HTML 명세 등 웹은 독립적으로 진화하고 있다. 하지만 오늘날 대부분의 REST API는 REST 아키텍처 스타일을 따르지 않고 있다.

> "An API that provides network-based access to resources via **uniform interface of self-descriptive messages containing hypertext to indicate potential state transition** might be part of an overall system that is a RESTful application. - Roy T. Fielding

REST API도 아키텍처 스타일을 지켜야 한다. 그럼 REST API만 사용해야 하는 건가?

> "REST emphasizes evolvability sustain on uncontrollable system. **If you think you have control over the system or aren't interested in evolvability, don't waste your time arguing about REST**. - Roy T. Fielding

시스템 전체를 통제할 수 있다고 생각하거나 진화에 관심이 없다면 REST에 대해 따지느라 시간을 쓰지말라는 건데 그럴 수는 없다. 따져가며 지킬 거 지키면서 똑바로 쓰든가, 다른 조건을 쓰든가.

나의 정리는 이렇다. REST 아키텍처 스타일을 따르지 않고 REST API를 사용하는 건 독립적 진화라는 목적을 달성할 수 없는 근거 없는 기술 사용이다. 그냥 내가 아무 생각 없이 GraphQL을 사용했던 것과 다름없다. 그런데 내가 로이의 관점에서 REST를 계속 보다 보니 상당히 과몰입해서 그렇지 사실 우리가 해결하고자 하는 문제는 로이의 문제와 다르다.

엉터리 REST API일지언정 현실의 어떤 문제를 해결할 수 있다면 결국 올바른 쓰임이 아닐까? 다만 위 영상 발표자의 말처럼 REST API가 아닌데 그렇게 말하는 건 너무 거슬리니까 HTTP API라고 똑바로 말하면서 필요한 상황에 맞게 잘 사용하면 좋겠다. 다음으로 페이스북은 왜 GraphqQL을 개발하게 되었을까?

##### 2. [Why GraphQL?](https://graphql-kr.github.io/blog/graphql-a-query-language/#why-graphql)

> 페이스북의 모바일 앱이 점점 더 복잡해지면서 성능 저하와 잦은 충돌로 어려움을 겪었다. 결국 News Feed의 API data version이 필요하다는 걸 알게 되었고 모바일 앱에 News Feed 데이터를 전달하는 옵션을 평가했다. 그런데 앱에서 사용하려는 데이터와 앱에서 요구하는 서버 쿼리 간 차이 때문에 좌절했다. 또한 데이터를 준비하는 서버와 데이터를 구문 분석하는 클라이언트 둘 다 작성해야 할 코드가 상당했다. 이러한 좌절감은 궁극적으로 GraphQL이 된 프로젝트를 시작하게 했다. GraphQL은 제품 디자이너와 개발자 관점에서 mobile app data-fetching에 대해 다시 생각해 볼 수 있는 기회였다. 개발의 초점을 디자이너와 개발자가 시간을 쏟는 클라이언트 앱으로 옮겼다.

페이스북의 배경을 보니 REST API는 급변하는 클라이언트의 요구사항을 따라잡기에 유연하지 못했던 것으로 보인다. 역시 인류는 한계를 마주할 때(?) 발전한다.

GraphQL은 정확하고 유연하며 overfetching, underfetching과 같은 REST API의 비효율적인 문제를 해결한다. GraphQL이 얼마나 잘난 기술인지는 [공식 웹사이트](https://graphql.org/) 첫 번째 페이지만 봐도 알 수 있다. 내용이 군더더기없이 너무 잘 정리되어 있어서 옮겨 적지 않을 수가 없다.

- GraphQL은 API를 위한 쿼리 언어이며 이미 존재하는 데이터로 쿼리를 실행하는 서버사이드 런타임이다.
- GraphQL은 클라이언트에서 주도적으로 필요한 데이터만 정확하게 요청할 수 있다.
- 일반적인 REST API는 여러 URL에서 데이터를 받아와야 하지만 GraphQL API은 단일 엔드포인트에서 한번의 요청으로 앱에 필요한 모든 데이터를 가져올 수 있다.
- GraphQL API는 엔드포인트가 아닌 타입과 필드로 구성된다. GraphQL은 타입 시스템을 사용하여 앱이 가능한 것을 요청하고 명확하고 유용한 오류를 제공하는 것을 보장한다. 앱은 타입을 사용하여 수동 파싱 코드 작성을 피할 수 있다.
- 기존 쿼리에 영향을 주지 않고 GraphQL API에 새로운 필드와 타입을 추가할 수 있다. 진화하는 단일 버전을 사용함으로써 GraphQL API는 새로운 기능에 대한 지속적인 엑세스를 제공하고 보다 깨끗하고 유지보수가 쉬운 서버 코드를 작성하도록 도와준다.
- GraphQL은 특정 데이터베이스에 제한받지 않고 기존 데이터 및 코드를 활용하여 GraphQL API를 작성한다.

나는 GraphQL이 가진 근거에 납득이 간다. 그리고 여전히 잠재적 가능성만 보면 GraphQL이 REST API보다 더 나은 기술이라고 생각한다. 그러나 변수가 많은 현실에서 리스크가 없는 완벽한 기술은 없다.

GraphQL을 경험해 본 적 없는 팀원들이 완성도에 대해 우려하고 있다는 걸 알고 있었지만 기본적인 CRUD를 구현하는 데 있어서 GraphQL의 허들은 그렇게 높지 않다고 판단했다. 그러나 결과적으로 GraphQL의 필수적인 학습 시간이 프로젝트의 치명적인 위험까지는 아니었지만 완성도에 어느 정도 영향을 끼친 건 사실이다.

난 도전과 모험을 선호하는 사람인데 안정을 택하는 사람들의 마음을 알 것 같기도 하다. 근거 있는 기술이 반드시 팀을 위한 최선의 선택은 아니다.

#### React

나는 그동안 클린 코드, 아키텍처, 성능 최적화, 협업 방식 등 개발자들이 빈번하게 이야기하는 문제들에 대해 깊게 고민해 본 적이 없다. 관심이 있고 없고를 떠나 혼자 개발하는 동안 당장 맞닥뜨릴 수 없고 와닿지 않는 문제였기 때문이다. 이러한 경험의 부재로 인한 허점은 UI를 만드는 리액트 활용에서 가장 크게 드러났다.

##### 1. 원칙없는 자유

작동하는 페이지가 늘어날수록 UI를 만드는 과정에 익숙해지는 것과는 별개로 UI를 수정하는데 느껴지는 피로도와 번거로움이 커져 갔다. 이는 리액트 컴포넌트에 대한 낮은 이해도 때문이었다.

무에서 유를 창조하는 애플리케이션 개발에서 리액트 컴포넌트는 수시로 변경되는 서비스의 구조와 기능에 대응할 수 있어야 한다. 잘못된 컴포넌트 설계는 생산성, 성능 최적화, 유지보수, 협업 등 여러 측면에서 문제를 일으킨다. 원칙없는 자유에는 책임이 따르는 법. 앱 설계의 현실은 다음과 같았다.

- Next.js의 페이지 개념을 리액트 컴포넌트 개념과 혼동하여 컴포넌트 단위가 아닌 페이지 단위로만 UI를 생각했다. [Next.js에서 페이지는 pages 디렉토리의 파일에서 내보낸 리액트 컴포넌트다.]
- UI를 컴포넌트 계층 구조로 나누지 않고 컴포넌트를 만들었다. 페이지 컴포넌트마다 몇 백 줄의 코드가 작성되어 있었을 때 단 하나의 하위 컴포넌트도 없었다.
- 여러 페이지에서 동일한 뷰와 책임으로 사용되는 컴포넌트를 따로 분리하지 않고 반복해서 작성했으며, 컴포넌트는 점점 커지는데 다시 사용할 수 있는 컴포넌트가 없다 보니 직접 코드를 작성한 나조차도 새로운 UI 반영이 어려웠다. ㅡ 여러 파일을 돌아다니면서 코드를 추적하는 데 한 세월.
- 관심사 분리 원칙의 존재조차 모르고 있었다. Container and Presentational 패턴, Custom Hook을 이용한 로직 추상화, useCallback과 useMemo를 이용한 메모이제이션 등 컴포넌트와 로직의 재사용성과 성능 최적화는 생각지도 못했다.

이러한 문제를 인지했을 때 일정을 쪼개 [React로 사고하기](https://ko.reactjs.org/docs/thinking-in-react.html)와 Brad Frost의 [Atomic Design](https://atomicdesign.bradfrost.com)을 참고하여 부랴부랴 리팩토링을 시도했지만 이미 작성해놓은 방대한 코드에 비해 새로운 지식에 대한 숙련도는 너무 낮아서 정해진 기간 내에 마무리 지을 수 없었다.

##### 2. 나만 몰랐던 이야기

난 보일러플레이트 코드가 방대한 Redux는 싫어했고 캐싱을 지원하는 Apollo Client는 좋아했다. 그런데 캐싱이 상태 관리 중 하나라는 건 모르고 있었다. 그러니까 나는 상태가 뭔지도 잘 모르면서 상태 관리 라이브러리의 호불호를 따지고 있었던 거다. 물론 내 딴에는 상태 관리의 필요성을 어느 정도 알고 있다는 생각으로 미리 대비를 했던 건데 터무니없는 착각이었다. 리액트에는 나만 몰랐던 많은 상태 이야기가 있었다.

리액트는 단방향 데이터 흐름을 따르는 Flux 패턴에서 View 역할을 담당한다. 리액트로 만드는 앱은 Virtual Dom 개념으로 선언적인 뷰 설계가 가능하며, 코드를 더 예측할 수 있고 디버그 하기 수월하다. 그러나 하향식 데이터 흐름으로 인해 [Prop Drilling](https://kentcdodds.com/blog/prop-drilling) 문제가 발생하기도 한다. [리액트에서 데이터는 위에서 아래로 props를 통해 전달된다.]

Prop Drilling은 데이터를 여러 자식 컴포넌트에게 공유하기 위해 단계마다 명시적으로 props를 넘겨주는 번거로운 과정을 말한다. 이러한 전역적인 상태 공유 문제에 대한 해결책으로 리액트에서는 [Context](https://ko.reactjs.org/docs/context.html)를 제안하고 외부에서는 Redux, MobX 등의 상태 관리 라이브러리가 등장한다.

MVC 패턴에서 Flux 패턴으로의 변화, 컴포넌트 기반으로 UI를 만드는 리액트, Recoil의 [Motivation](https://recoiljs.org/docs/introduction/motivation/) 등 앱 개발은 복잡성과 의존성을 낮추기 위한 관심사의 분리를 지향한다. 같은 맥락으로 전역 상태와 서버 상태는 분리해서 관리해야 한다. 최근 리액트 커뮤니티에서는 서버 상태 관리 라이브러리로 [SWR](https://swr.vercel.app)과 [React Query](https://react-query.tanstack.com/)을 주로 이용하며 데이터 가져오기, 캐싱, 업데이트 및 동기화 등의 기능을 가지고 있다.

이쯤 되니 무슨 깡으로 프론트엔드 개발을 주도했는지 당혹스럽다. 상태 관리 전략이 있었지만 어설펐다.

- REST API와 GraphQL은 생태계가 다르다. 즉, 사용할 수 있는 상태 관리 라이브러리가 다르므로 API는 상태 관리 전략까지 포함해서 고려했어야 했다.
- Apollo Client는 최선의 선택이었다. 그러나 캐싱, 업데이트, 동기화 등 여러 기능을 제대로 활용하지 못했다. 쿼리와 뮤테이션을 구현하는 정도는 누구나 다 할 수 있지만 상태 관리의 학습 곡선은 결코 가파르지 않다.
- 필요한 데이터만 정확하게 요청할 수 있는 GraphQL의 장점을 활용하지 못했다. 동일한 필드를 가지고 있는 하나의 요청을 여러 페이지에서 사용하여 overfetching이 발생했다.
- 처음부터 [GraphQL Code Generator](https://www.graphql-code-generator.com/)을 사용하지 않은 건 최악의 판단이었다. 개인의 실수가 팀의 생산성과 직결된다는 걸 깨달았다.

개발을 하면 할수록 정작 내가 하는 건 없고 기술 스택이 다 하고 있다는 찝찝한 기분이 들었는데 그 이유를 이제야 조금 알 것 같다.

##### 3. 아키텍처

##### 4. 성능 최적화

### UI / UX (작성중)

### Agile (작성중)

## 결말

프로젝트는 기간 내 모든 버그를 수정하지 못하고 실패했다. 나는 어디서부터 잘못된 건지 알고 싶었다. 제대로 짚었는지는 모르겠지만 허점을 살펴보니 나는 정말 어설프게 판을 짜고 있었으며, 나의 관심의 대상은 근무 환경과 개발 문화보다는 협업을 위한 클린 코드에 더 가깝다는 생각이 들었다. ㅡ 효율적으로 일하는 환경조차 결국 나 하기 나름이라는 깨달음. 내가 원하는 환경은 아래와 같다.

- 누구나 목소리를 낼 수 있으며 모두의 의견이 존중받는 환경.
- 일의 효율을 따지며 잘하는 일에 집중할 수 있는 환경.
- 나의 주도적인 판단으로 실패를 경험할 수 있는 환경.
- 더 나은 개발을 위해 치열하게 토론하는 환경.

솔직히 나는 실패를 경험하고 싶었지만 나의 실력이 이 정도로 엉망일 줄은 몰랐고 평가조차 받지 못한 나의 코드를 보면 정말 어처구니가 없긴 하다. 그래도 최선을 다했으니 부끄럽진 않고 글은 이렇게 적었지만 프로젝트를 진행하는 동안 정말 즐거웠다. 더 잘하고 싶은 마음과 함께 개발에 대한 열정을 다시 검증하는 시간이었다.

독학하는 시간이 장기화될수록 개발 실력, 일을 해야 하는 이유 등 바보 같은 의문과 함께 취업 전선에 뛰어들 자신이 없었다. 모든 잡념은 두려움을 극복하지 못하고 일을 미루기 위한 핑계에 불과하다. 나와 같은 기수의 수료생은 벌써 n년 차 개발자로서 경력을 쌓고 있으며, 혹자는 신입 개발자에게 기대가 없다 말한다. 그러나 남들보다 뒤처지고 아무도 나에게 기대하는 바가 없다고 해서 나조차도 나를 포기할 수는 없다. 더 나은 내가 되고 싶다면 두려움보다 실패를 더 가까이해야 한다.

## References

[애자일 방법론과 스크럼, 칸반](https://nohack.tistory.com/45)

[애자일 Scrum(스크럼) 이해하기](https://medium.com/dtevangelist/scrum-dfc6523a3604)

[UX의 기본, 와이어프레임은 어떻게 작성하는 것일까](https://brunch.co.kr/@second-space/27)

[What Exactly Is Wireframing? A Comprehensive Guide](https://careerfoundry.com/en/blog/ux-design/what-is-a-wireframe-guide/)

[Wireframes are useless](https://uxdesign.cc/wireframes-are-useless-14ac7d22c961)

[최소 기능 제품, MVP에 던지는 5가지 질문](https://www.itworld.co.kr/news/212179)

[[Lean] MVP의 5가지 함정과 탈출법](https://brunch.co.kr/@jjollae/7)

[스타업에서 Validated Learning을 어떻게 수행해야 할까?](https://blog.naver.com/donghcho777/222312583332)

[The Most Popular Prioritization Techniques and Methods: MoSCoW, RICE, KANO model, Walking Skeleton, and others](https://www.altexsoft.com/blog/business/most-popular-prioritization-techniques-and-methods-moscow-rice-kano-model-walking-skeleton-and-others/)

[React의 탄생과 Flux 패턴](https://velog.io/@huurray/React%EC%9D%98-%ED%83%84%EC%83%9D%EA%B3%BC-Flux-%ED%8C%A8%ED%84%B4%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC)

[React 앱의 데이터 흐름](http://52.78.22.201/tutorials/react/react-dataflow/#tocAnchor-1-9)

[Flux로의 카툰 안내서](https://bestalign.github.io/translation/cartoon-guide-to-flux/)

[리덕스 잘 쓰고 계시나요?](https://ridicorp.com/story/how-to-use-redux-in-ridi/)

[Redux 를 넘어 SWR 로(1)](https://min9nim.vercel.app/2020-10-03-swr-intro1/)

[Store에서 비동기 통신 분리하기 (feat. React Query)](https://techblog.woowahan.com/6339/)

[React에서 서버 데이터를 최신으로 관리하기(React Query, SWR)](https://fe-developers.kakaoent.com/2022/220224-data-fetching-libs/)

[React state management in 2022 — Return of the Redux](https://engineering.udacity.com/react-state-management-in-2022-return-of-the-redux-87218f56486b)

[Redux Toolkit (리덕스 툴킷)은 정말 천덕꾸러기일까?](http://blog.hwahae.co.kr/all/tech/tech-tech/6946/)

[[번역] GraphQL은 어떻게 Redux를 대체하는가](https://velog.io/@minsangk/%EB%B2%88%EC%97%AD-GraphQL%EC%9D%80-%EC%96%B4%EB%96%BB%EA%B2%8C-Redux%EB%A5%BC-%EB%8C%80%EC%B2%B4%ED%95%98%EB%8A%94%EA%B0%80-cijz6lfvf4)

[Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

[React Hook VS Container Component](https://yujonglee.com/socwithhooks.html)

[React 컴포넌트 렌더링 이해하기](https://yujonglee.com/reactrendering.html)
