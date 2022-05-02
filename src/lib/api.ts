import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'

// process.cwd() 워크스페이스의 절대 경로
const postsDirectory = join(process.cwd(), '/public/contents/posts')

// 디렉토리에 있는 모든 파일 이름
const getFileNames = () => {
	return fs.readdirSync(postsDirectory)
}

const getPost = (slug: string) => {
	const fullPath = join(postsDirectory, `${slug}.md`)
	const fileContents = fs.readFileSync(fullPath, 'utf-8')
	const { data, content } = matter(fileContents)

	return { data, content }
}

export const getPostItemsByFileName = (
	fileName: string | string[] | undefined,
	fields: string[] = [],
	tag?: string
) => {
	const slug = (fileName as string).replace('.md', '')
	const { data, content } = getPost(slug)

	// index signature
	const items: { [key: string]: string } = {}

	fields.forEach(field => {
		const date = data.date.toDateString().split(' ')
		if (field === 'slug') {
			items[field] = slug
		} else if (field === 'content') {
			items[field] = content
		} else if (field === 'date') {
			items[field] = date
		} else if (data[field]) {
			items[field] = data[field]
		}
	})

	if (tag && items.tags.includes(tag)) {
		return items
	} else if (tag && !items.tags.includes(tag)) {
		return null
	} else {
		return items
	}
}

export const getAllPosts = (fields: string[] = [], tag?: string) => {
	const fileNames = getFileNames()
	const posts = fileNames
		.map(fileName => getPostItemsByFileName(fileName, fields, tag))
		.filter(post => post !== null)
		.sort(
			(post1, post2) =>
				new Date(post2!.date).valueOf() - new Date(post1!.date).valueOf()
		)
	return posts
}
