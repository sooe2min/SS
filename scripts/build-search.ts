// build-search.js
const dotenv = require('dotenv')
const algoliasearch = require('algoliasearch')
const fs = require('fs')
const { join } = require('path')
const matter = require('gray-matter')

// write your code to fetch your data
const postsDirectory = join(process.cwd(), '/public/contents/posts')

function getPostBySlug(slug: string, fields: string[]) {
	const _slug = slug.replace('.md', '')
	const filePath = join(postsDirectory, `${_slug}.md`)
	const fileContents = fs.readFileSync(filePath, 'utf-8')
	const { data, content } = matter(fileContents)

	const items: Record<string, string> = {}
	fields.forEach((field: string) => {
		if (field === 'slug') {
			items[field] = _slug
		} else if (field === 'content') {
			items[field] = content
		} else if (field === 'date') {
			items[field] = data.date.toDateString()
		} else if (data[field]) {
			items[field] = data[field]
		}
	})
	return items
}

async function getAllPosts(fields: string[] = []) {
	const slugs = fs.readdirSync(postsDirectory)
	const posts = slugs
		.map((slug: any) => getPostBySlug(slug, fields))
		.sort((post1: { date: string }, post2: { date: string }): number => {
			return (
				new Date(post2.date).valueOf() - new Date(post1.date).valueOf()
			)
		})
	return posts
}

;(async function () {
	dotenv.config()

	try {
		const posts = await getAllPosts([
			'slug',
			'title',
			'date',
			'tags',
			'content'
		])

		// initialize the client with your environment variables
		const client = algoliasearch(
			process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
			process.env.ALGOLIA_SEARCH_ADMIN_KEY
		)

		// initialize the index with your index name
		const index: any = client.initIndex('s2ss_posts')

		await index.clearObjects()
		// save the objects!
		const algoliaResponse = await index.saveObjects(posts, {
			autoGenerateObjectIDIfNotExist: true
		})

		// check the output of the response in the console
		console.log(
			`🎉 Sucessfully added ${
				algoliaResponse.objectIDs.length
			} records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
				'\n'
			)}`
		)
	} catch (error) {
		console.log(error)
	}
})()
