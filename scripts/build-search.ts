// build-search.js
require('dotenv').config()
const algoliasearch = require('algoliasearch')
const fs = require('fs')
const { join } = require('path')

// write your code to fetch your data
async function getAllBlogPosts() {
	// process.cwd() 워크스페이스의 절대 경로
	const postsDirectory = join(process.cwd(), '/public/contents/posts')
	console.log(postsDirectory)
}
getAllBlogPosts()
// function transformPostsToSearchObjects(posts: any) {
// 	const transformed = posts.map((post: any) => {
// 		return {
// 			slug: post.slug,
// 			title: post.title,
// 			date: post.date,
// 			tags: post.tags
// 		}
// 	})

// 	return transformed
// }

// ;(async function () {
// 	dotenv.config()

// 	try {
// 		const posts = await getAllBlogPosts()
// 		const transformed = transformPostsToSearchObjects(posts)

// 		// initialize the client with your environment variables
// 		const client = algoliasearch(
// 			process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
// 			process.env.ALGOLIA_SEARCH_ADMIN_KEY as string
// 		)

// 		// initialize the index with your index name
// 		const index: any = client.initIndex('my_awesome_content')

// 		// save the objects!
// 		const algoliaResponse = await index.saveObjects(transformed)

// 		// check the output of the response in the console
// 		console.log(
// 			`🎉 Sucessfully added ${
// 				algoliaResponse.objectIDs.length
// 			} records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
// 				'\n'
// 			)}`
// 		)
// 	} catch (error) {
// 		console.log(error)
// 	}
// })()
