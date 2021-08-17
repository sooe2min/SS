import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

// process.cwd() 워크스페이스의 절대 경로
const postsDirectory = join(process.cwd(), '/public/contents/posts')

// 디렉토리에 있는 모든 파일 이름
const getFileNames = () => {
	return fs.readdirSync(postsDirectory)
}

// 아이템s
const createItems: (
	fields: string[],
	_slug: string,
	content: string,
	data: {
		[key: string]: any
	}
) => any = (fields = [], _slug, content, data) => {
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

// get post
export const getPostByFileName: (
	fileName: string,
	fields: string[],
	tag?: string
) => any = (fileName, fields = [], tag) => {
	const _slug = fileName.replace('.md', '')
	const filePath = join(postsDirectory, `${_slug}.md`)
	const fileContents = fs.readFileSync(filePath, 'utf-8')
	const { data, content } = matter(fileContents)

	const post = createItems(fields, _slug, content, data)
	if (tag && post.tags.includes(tag)) {
		return post
	} else if (tag && !post.tags.includes(tag)) {
		return null
	} else {
		return post
	}
}

// get all posts
export const getPosts: (fields: string[], tag?: string) => any[] = (
	fields = [],
	tag
) => {
	const fileNames = getFileNames()
	const posts = fileNames
		.map(fileName => getPostByFileName(fileName, fields, tag))
		.filter(post => post !== null)
		.sort((post1: { date: string }, post2: { date: string }): number => {
			return (
				new Date(post2.date).valueOf() - new Date(post1.date).valueOf()
			)
		})
	return posts
}
