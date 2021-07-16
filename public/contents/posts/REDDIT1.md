---
title: 레딧 클론의 시작
date: 2021-05-13
tags: JavaScript
---

---

프로젝트 시작.

---

## Setup

### Node.js / TypeScript

1. `package.json` 파일을 만든다.

   ```bash
   npm init -y
   ```

2. 백엔드를 먼저 만들 건데 Node.js 버전부터 확인한다. 난 NVS (Node Version Switcher)를 사용하고 있다.

   ```bash
   node -v
   nvs add lts
   nvs use lts
   nvs link lts
   ```

3. 타입스크립트를 셋업한다. 사용하려는 노드 패키지에 대한 유형 정의가 필요하다.

   ```bash
   npm install -D typescript types@node ts-node
   ```

   - `types@node`: Node.js에 대한 type definitions가 포함되어 있다.
   - `ts-node`: 타입스크립트 파일을 컴파일하고 실행할 수 있도록 한다.

4. `tsconfig.json` 파일은 프로젝트를 컴파일하는 데 필요한 루트 파일과 컴파일러 옵션을 지정한다.

   ```bash
   npx tsconfig.json
   ```

5. 편의를 위해 npm `scripts` 필드를 작성한다.

   - `tsc -watch(w)`: 컴파일러를 감시 모드로 실행한다. 감시하고 있는 파일이 변경될 때마다 자동으로 다시 컴파일하고 `tsconfig.json` 파일의 `outDir` 폴더를 갱신한다.
   - `nodemon`: 디렉토리 파일 변경을 감지하고 자동으로 다시 시작한다.

**`package.json`**

```json
{
	"name": "server",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"scripts": {
		"watch": "tsc -w",
		"start": "ts-node src/index.ts",
		"dev": "nodemon dist/index.js"
	},
	"keywords": [],
	"author": "",
	"license": "ISC",
	"devDependencies": {
		"@types/node": "^15.0.2",
		"ts-node": "^9.1.1",
		"typescript": "^4.2.4",
		"nodemon": "^2.0.7"
	}
}
```

### MikroORM

TypeScript ORM for Node.js based on Data Mapper, Unit of Work and Identity Map patterns.

패키지를 설치하고 데이터베이스와 mikro-orm을 연동하기 위해 `microConfig`를 작성하고 `MikroORM.init` 한다.

- **entities** 만들기: type, default
- migrations 옵션: path, `__dirname`
- `as Parameters<typeof MikroORM.init>[0]`
- `getMigrator`
- **EntityManager**: `create`, `persistAndFlush`, `nativeInsert`, `find`

```javascript
const main = async () => {
	const orm = await MikroORM.init(microConfig)
	await orm.getMigrator().up()

	// const post = orm.em.create(Post, { title: "my first post" })
	// orm.em.persistAndFlush(post)

	// 클래스를 만들 때만 엔티티의 new Date()가 호출된다.
	// 클래스를 새로 create하지 않을 땐 default가 필요하다.
	// nativeInsert는 클래스를 새로 만들지 않고 내가 원하는 데이터만 추가한다. 나머지는 dafeault를 따른다.
	// await orm.em.nativeInsert(Post, { title: "my second post" })
	// const posts = await orm.em.find(Post, {})
	// console.log(posts)
}
```

### Apollo Server Express

TypeScript와 GraphQL을 같이 배우겠다는 패기는 좋았다. 처음엔 클론 코딩의 흐름을 따라가면서 모르는 걸 찾아보면 충분할 거라고 생각했다. 하지만? 앞에 두 개의 스택도 처음인데 `TypeGraphQL`과 `apollo-server-express`까지!? 어떤 메소드를 어떤 공식 문서에서 봐야할지도 모르겠더라. 맥락을 알아야겠다.

Apollo platform이 핵심이다. GraphQL을 사용하여 데이터를 다루고 Express와 함께 Apollo Server를 사용한다. 타입스크립트가 필수적인 옵션은 맞지만 TypeGraphQL보다 Apollo Server를 먼저 보는 것이 맞다.

- [The Apollo platform](https://www.apollographql.com/docs/intro/platform/)
- [Why GraphQL?](https://www.apollographql.com/docs/intro/benefits/)

그리고 Apollo의 흐름이 익숙해지면 TypeGraphQL과 MikroORM을 함께 사용하면 된다.

- Config.schema
- BuildSchemaOptions.**resolvers**
- ApolloServerExpressConfig.**context**, **EntityManger**
- **ObjectType, Field, Resolver, Query, Mutation, Arg, Ctx**

Apollo Server.. MikroORM(entities).. TypeGraphQL(resolvers)..

## References

[Surviving the TypeScript Ecosystem — Part 4: Working with Types and Type Definitions](https://medium.com/@KevinBGreene/surviving-the-typescript-ecosystem-working-with-types-and-type-definitions-3539baf26627)
