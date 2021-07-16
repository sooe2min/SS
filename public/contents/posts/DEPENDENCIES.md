---
title: 파이널 프로젝트 6 (DEPENDENCIES)
date: 2020-12-26
tags: JavaScript, Project
---

---

Search

Crawling

Upload

---

## Development

마지막은 영화 게시판에 글을 작성하는 파트다. `네이버 오픈 API`와 `Crawling`으로 유저가 영화 정보를 직접 입력하는 수고를 덜고자 했다. [Quill](https://quilljs.com/) 에디터의 `Upload` 기능을 구현했다.

### Search

유저가 글을 작성하기 전 영화를 검색한다. 네이버 영화 검색 결과를 출력해 주는 `네이버 오픈 API`를 이용했다. 이때 한글로 영화를 검색하면 에러가 발생했다.

`Request path contains unescaped characters`

[encodeURI](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) 메소드를 이용해서 `URI`의 영화 제목을 인코딩 해주어 문제를 해결했다.

<details><summary><span style="background-color:#f5f2f0"><strong>controllers/board/movies</strong></strong></span></summary>

```javascript
const axios = require('axios')

require('dotenv').config()
const CLIENT_ID = process.env.CLIENT_ID // CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET // CLIENT_Secret

module.exports = async (req, res) => {
	// 유저가 선택한 영화의 제목(params)
	const title = encodeURI(req.params.title)
	// const title = encodeURI(req.body.title)
	// 또는 display, start, genre, country, yearfrom, yearto

	try {
		// 네이버 오픈 API, 영화를 검색한다.
		const list = await axios({
			method: 'get',
			url: `https://openapi.naver.com/v1/search/movie.json?query=${title}`,
			headers: {
				'X-Naver-Client-Id': `${CLIENT_ID}`,
				'X-Naver-Client-Secret': `${CLIENT_SECRET}`
			}
		})

		// 영화 목록을 응답한다.
		res.status(200).send(list.data)
	} catch (err) {
		res.status(500).send(err)
	}
}
```

</details>

### Crawling

유저가 글을 작성하면 해당 영화 정보를 `crawling`하고 데이터를 저장한다. `cheerio` 모듈을 이용했다. `jQuery`를 필수적으로 다뤄야 했는데 [htmlcheatsheet](https://htmlcheatsheet.com/jquery/)의 도움을 크게 받았다.

<details><summary><span style="background-color:#f5f2f0"><strong>controllers/board/write</strong></strong></span></summary>

```javascript
const model = require('../../models')
const axios = require('axios')
const cheerio = require('cheerio')

module.exports = async (req, res) => {
	const { token } = req.cookies

	// 토큰을 확인한다.
	if (token) {
		try {
			// 유저, url, 제목, 본문
			const { user, url, title, text, upload_url } = req.body

			// 유저가 선택한 영화 정보의 html을 가져온다.
			const getHtml = axios.get(url)

			// 해당 html을 크롤링한다.
			const selectedMovie = await getHtml.then(html => {
				const movie = {}
				const $ = cheerio.load(html.data)
				const $info = $('div.mv_info_area')
				const $story = $('div.obj_section:first-child')

				// 영화 정보
				movie['title'] = $info.find('h3.h_movie a').text()
				movie['sub_title'] = $info.find('strong.h_movie2').text()
				movie['summary_genre'] = $info
					.find('dl.info_spec dd:nth-child(2) span:nth-child(1)')
					.text()
					.replace(/\s/g, '')
				movie['summary_nation'] = $info
					.find('dl.info_spec dd:nth-child(2) span:nth-child(2) a')
					.text()
				movie['summary_runtime'] = $info
					.find('dl.info_spec dd:nth-child(2) span:nth-child(3)')
					.text()
				movie['summary_pubdate'] = $info
					.find('dl.info_spec dd:nth-child(2) span:nth-child(4) a')
					.text()
				movie['director'] = $info
					.find('dl.info_spec dd:nth-child(4)')
					.text()
				movie['actor'] = $info
					.find('dl.info_spec dd:nth-child(6) p')
					.text()
				movie['rating'] = $info
					.find('dl.info_spec dd:nth-child(8) a')
					.text() // 이것들은 왜 짝수??
				movie['poster'] = $info.find('div.poster img').attr('src')

				// 영화 줄거리
				movie['story_h5'] = $story.find('h5.h_tx_story').text()
				movie['story_tx'] = $story.find('p.con_tx:nth-child(3)').text() // 이거 왜 세 번째??

				return movie
			})

			// 영화 데이터를 저장한다.
			const movieData = await model.movie.create({
				title: selectedMovie['title'],
				sub_title: selectedMovie['sub_title'],
				genre: selectedMovie['summary_genre'],
				nation: selectedMovie['summary_nation'],
				runtime: selectedMovie['summary_runtime'],
				pubdate: selectedMovie['summary_pubdate'],
				director: selectedMovie['director'],
				actor: selectedMovie['actor'],
				rating: selectedMovie['rating'],
				poster: selectedMovie['poster'],
				story1: selectedMovie['story_h5'],
				story2: selectedMovie['story_tx']
			})

			// 글 데이터를 저장한다.
			const article = await model.article.create({
				title: title,
				text: text,
				upload_url: upload_url ? upload_url : null,
				userId: user,
				movieId: movieData.id
			})

			// 새로운 글 정보를 응답한다.
			res.status(200).send(article)
		} catch (err) {
			res.status(500).send(err)
		}
	} else {
		res.status(404).send('유효하지 않은 토큰입니다.')
	}
}
```

</details>

### Upload

글을 쓸 때 이미지 업로드는 [multer](https://www.npmjs.com/package/multer) & [multer-s3](https://www.npmjs.com/package/multer-s3), `aws-sdk` &`IAM`를 이용했다.

먼저 `multer-s3` 코드를 작성했다.

<details><summary><span style="background-color:#f5f2f0"><strong>config/multer</strong></strong></span></summary>

```javascript
const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

require('dotenv').config()
// aws.config.loadFromPath(__dirname + '/awsconfig.json');
aws.config.update({
	accessKeyId: process.env.ACCESSKEY,
	secretAccessKey: process.env.SECRET_ACCESSKEY,
	region: process.env.REGION
})

const upload = multer({
	storage: multerS3({
		s3: new aws.S3(),
		bucket: 'finalproject',
		acl: 'public-read',
		key: function (req, file, cb) {
			cb(null, file.originalname)
		}
	})
})

module.exports = upload
```

</details>

`IAM` 관련 에러가 있었다. `accessKeyId`를 변경하고 해결됐다.

`The request signature we calculated does not match the signature you provided. Check your key and signing method.`

그리고 라우팅과 함께 파일 하나를 저장하는 `single` 메소드를 작성했다. end point는 `/setting/upload`다.

<details><summary><span style="background-color:#f5f2f0"><strong>routes/setting</strong></strong></span></summary>

```javascript
const express = require('express')
const router = express.Router()
const settingController = require('../controllers/setting')
const upload = require('../config/multer')

router.post('/password', settingController.password)
router.post('/userinfo', settingController.userinfo)
router.post('/check', settingController.check)
router.post('/upload', upload.single('img'), settingController.upload)

module.exports = router
```

</details>

마지막으로 `upload` API를 작성했다.

<details><summary><span style="background-color:#f5f2f0"><strong>controllers/setting/upload</strong></strong></span></summary>

```javascript
module.exports = async (req, res) => {
	console.log(req.file) // upload file
	if (req.file) {
		res.status(200).json(req.file.location)
	} else {
		res.status(404).send('파일 첨부가 실패하였습니다.')
	}
}
```

</details>

참고로 프론트엔드에서 요청 헤더 `header: { 'content-type': 'multipart/form-data' }`는 필수다.

## References

[Error: [ERR_UNESCAPED_CHARACTERS]](https://ssangq.netlify.app/posts/err-unescaped-characters)

[Regular expressions](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/%EC%A0%95%EA%B7%9C%EC%8B%9D)

[first 셀렉터와 first-child 차이점 비교](https://superkts.com/jquery/@first_vs_first-child)

[[node.js] multer와 S3를 이용한 이미지 업로드 (multer 설치 부터 S3이미지 업로드 까지) - 1. multer](https://velog.io/@ju_h2/node.js-multer-%EC%84%A4%EC%B9%98-%EB%B6%80%ED%84%B0-S3%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EA%B9%8C%EC%A7%801-multer-%ED%86%B5%ED%95%B4-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C%ED%95%98%EA%B8%B0)

[[node.js] multer와 S3를 이용한 이미지 업로드 (multer 설치 부터 S3이미지 업로드 까지) - 2. S3](https://velog.io/@ju_h2/node.js-multer-%EC%84%A4%EC%B9%98-%EB%B6%80%ED%84%B0-S3%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EA%B9%8C%EC%A7%802-S3%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C)
