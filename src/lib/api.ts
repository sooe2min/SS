import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

// process.cwd() 워크스페이스의 절대 경로
const postsDirectory = join(process.cwd(), '/public/contents/posts')

export const getPostSlugs = () => {
	return fs.readdirSync(postsDirectory)
}

export const getPostBySlug: (slug: string, fields: string[]) => any = (
	slug,
	fields = []
) => {
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

export const getAllPosts = (fields: string[] = []) => {
	const slugs = getPostSlugs()
	const posts = slugs
		.map(slug => getPostBySlug(slug, fields))
		.sort((post1: { date: string }, post2: { date: string }): number => {
			return (
				new Date(post2.date).valueOf() - new Date(post1.date).valueOf()
			)
		})
	return posts
}
