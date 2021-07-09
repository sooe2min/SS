---
title: 파이널 프로젝트 4 (Q&A)
date: 2020-12-12
description: JavaScript, Project
---

---

Schema 

Association

좋아요

---

## Development

이번 프로젝트에서 가장 열심히 연구한 스택이 `Sequelize`다. ORM 없이 SQL 만으로 데이터를 조작하는 일이 얼마나 번거로운 일인지 알고 있었고 모든 질문에 답으로 향하는 스킬이었다. 이 별거 아닌 `schema` 하나를 설계하고 `MySQL` 데이터베이스를 구축하기 위해 공식 문서와 블로그를 정말 수없이 들여다봤다. 특별히 어려웠던 스키마, association, 좋아요 기능에 대해 회고한다. 전부 다인데?

![schema](static/schema.png)

### Schema

> One-To-Many associations are connecting one source with multiple targets. The targets however are again connected to exactly one specific source.

스키마를 작성할 때 고민은 테이블 간 연관을 맺는 **기준**이다. 처음에는 백엔드의 처지만 생각하고 연관을 위한 문장을 작성했다. 위 인용의 의미를 모르면 아래처럼 이상하게 작성한다. 아마 연관을 잘 몰라서 더 헤맸던 것 같다. 

- 한 명의 유저(1)가 다수의 좋아요(N)를 누르고, 다수의 댓글(N)과 글(N)을 작성한다.
- 하나의 글(1)에는 하나의 영화 정보(1)와 다수의 댓글(N)이 존재한다.
- 다수의 댓글은 다수의 유저를 가지고 있다....??
- 각 유저는 각 댓글마다 독립적인 좋아요를 누른다.…??
- ......

이렇게 하나씩 짚어가면 좋아요 기능처럼 머리가 어지러워질 때가 있지만 대부분 연관은 정리가 된다. 최대 두 개의 테이블로 하나의 문장을 짧게 끊어서 만드는 게 좋다. 그리고 역으로 프론트엔드 처지에서 페이지 또는 기능마다 필요가 **데이터**가 무엇인지 생각해 보면 API 구현까지 도움이 된다.

- 카드: 유저, 글, 영화
- 게시판: 유저, 글, 댓글
- 글: 유저, 글, 영화, 댓글, 좋아요

### Association

> Just like you use Git / SVN to manage changes in your source code, you can use migrations to keep track of changes to the database. With migrations you can transfer your existing database into another state and vice versa: Those state transitions are saved in migration files, which describe how to get to the new state and how to revert the changes in order to get back to the old state.

Sequelize를 다루면서 제일 혼란스러웠던 것은 `association`이다. 연관 구현을 못하니까 데이터를 어떻게 가져오는 건지도 모르고 데이터 모양도 모르고 앞이 깜깜했다. 난 문서를 많이 읽고 어느 순간 그림이 그려지면 코드를 작성하는 편인데 참고하는 글마다 구현 스타일이 제각각이어서 정리가 안됐다. 규칙을 파악하는 게 중요했다.

#### #1

- 연관의 기본 개념으로 **source**와 **target** 모델이 있다.

<details><summary><span style="background-color:#f5f2f0"><strong>models/user.js</strong></span></summary>

```javascript
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.comment)
      user.hasMany(models.article)
      user.hasMany(models.like)
    }
  };
  user.init({
    oauth_id: DataTypes.STRING,
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
```

</details>

위 코드와 같이 `hasMany`로 연관 맺으면 함수가 호출되는 `user` 모델이 source 모델, 인수로 패스되는 `comment`, `article`, `like` 모델이 target 모델이 된다.

#### #2

- sequelize에서 모델 간 연관을 맺으면 외래 키는 자동으로 생성된다.

- `foreignKey` 옵션으로 따로 외래 키를 지정해 줄 때는 꼭 primary key로 정의되어 있어야만 한다.

  `Can't create table (errno: 150)`[#](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html)

- 외래 키의 기본 케이스는 `camelCase`다. 만약 source 모델에서 `underscored: true`로 설정하면 외래 키는 `snake_case` 필드로 생성된다.

여기서 연관 종류마다 외래 키가 생성되는 모델이 다르다.

- `belongsTo`: Source model에 외래 키가 생성된다. 
- `hasOne`: Target model에 외래 키가 생성된다.
- `hasMany`: Target model에 외래 키가 생성된다.
- `belongsToMany`는 `through` 옵션으로 만들어지는 새로운 모델에 2개의 외래 키가 생성된다.

#### #3

정리하면 각 model 파일 init에 외래 키를 일일이 작성하지 않아도 `associate`만 잘 작성되어 있으면 자동으로 외래 키가 생성되고 데이터 조작이 가능하다. 여기에 추가로 데이터베이스의 변화를 추적하거나 workbench 등을 이용해서 시각적으로 데이터를 다루고 싶다면 **migrations**를 이용해야 한다. 아래 코드처럼 외래 키 `userId`, `commentId`를 직접 작성하면 된다. 

<details><summary><span style="background-color:#f5f2f0"><strong>migrations/like.js</strong></span></summary>

```javascript
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      commentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'comments',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('likes');
  }
};
```

</details>

### 좋아요

내가 또 무지무지 고민했던 좋아요 기능은 스키마 작성과 구현 둘 다 어려웠다. 삼각관계여서 헷갈렸던 것 같은데 좋아요만 보면 결국 유저와 댓글 사이에서 N:N 연관이다.

- 한 명의 유저(1)가 다수의 **좋아요**(N)를 누른다.
- 하나의 댓글(1)에는 다수의 **좋아요**(N)가 존재한다.

구현 로직을 이해하면 더 와닿는다. 좋아요는 중복해서 누를 수 없다. 유저가 좋아요를 누르면 숫자가 오르고 다시 누르면 내려간다. 결국 좋아요 테이블 하나의 행(row)에는 유저와 댓글, 두 개의 값이 있는 거다.

1. 클라이언트는 좋아요를 누른 유저의 id와 해당 댓글의 id를 가지고 요청한다.

2. 서버는 좋아요 테이블에서 두 개의 id 값을 가진 row가 있는지 찾는다.

   2-1. row가 없으면 좋아요를 누른 적이 없는 거다. 데이터를 생성하고 해당 댓글의 좋아요 숫자를 증가시킨다.

   2.2. row가 있으면 다시 누른 거다. 데이터를 삭제하고 해당 댓글의 좋아요 숫자를 감소시킨다.

<details><summary><span style="background-color:#f5f2f0"><strong>controllers/board/like</strong></span></summary>

```javascript
const model = require('../../models')

module.exports = async (req, res) => {
  const { token } = req.cookies

  // 토큰을 확인한다.
  if (token) {
    try {
      // 1. 유저, 댓글
      const { user, comment } = req.body 
      console.log(user, comment)
      // 2. 좋아요 테이블을 조회한다.
      const [data, created] = await model.like
        .findOrCreate({
          where: {
            userId: user,
            commentId: comment
          },
          // 2-1
          defaults: {  
            userId: user,
            commentId: comment
          }
        })

      // 2-1. 해당 행이 없으면 데이터 추가 & 좋아요 숫자 ++
      if (created) {
        await model.comment.increment('likecount', {
          where: {
            id: comment
          }
        })
        // 변경된 댓글 데이터
        res.status(200).send('좋아요 ++')
      }
      // 2-2 해당 행이 있으면 데이터 삭제 & 좋아요 숫자 --
      else {
        await model.like.destroy({
          where: {
            id: data.id
          }
        })
        await model.comment.decrement('likecount', {
          where: {
            id: comment
          }
        })
        // 변경된 댓글 데이터
        res.status(200).send('좋아요 --')
      }
    }
    catch (err) {
      res.status(500).send(err)
    }
  }
  else {
    res.status(401).send('유효하지 않은 토큰입니다.')
  }
}
```

</details>

### etc.

#### #1

다수의 모델을 함께(`join`) 불러오는 법, 그리고 include in include 하는 법

<details><summary><span style="background-color:#f5f2f0"><strong>include</strong></span></summary>

```javascript
const selectedArticle = await model.article.findOne({
  where: {
    id: id
  },
  include: [
    { model: model.user },
    { model: model.movie },
    {
      model: model.comment,
      include: [{ model: model.user }]
    }
    // include: [{ all: true }]
  ]
})
```

</details>

#### #2

`AssertionError [ERR_ASSERTION]: Missing where attribute in the options parameter`

메소드를 이용할 때는 `Params`의 `Type`을 잘 보고 맞춰서 구현해야 한다. 

## References

[References](https://sequelize.org/master/identifiers.html)

[Docs](https://sequelize.readthedocs.io/en/latest/)

[Sequelize tutorial](http://zetcode.com/javascript/sequelize/)

[Sequelize 공식 Document - (4) Associations (상)](https://velog.io/@cadenzah/sequelize-document-4)

[Include + Where Inside Include + Limit](https://github.com/sequelize/sequelize/issues/7064)

[NoSQL 에서 중복되지 않는 조회수와 좋아요 만들기](https://sub0709.tistory.com/205)