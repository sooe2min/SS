import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { InferGetStaticPropsType } from 'next'
import { getAllPosts, getPostBySlug } from '../../lib/api'

interface PostProps {
	slug: string
	title: string
	date: string
	description: string
	content: string
}

interface Params {
	params: {
		slug: string
	}
}

export default function Post({
	matter,
	source
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<aside className="fixed z-10 w-full h-full max-w-xs border-2 bg-gray-50 left-20">
				<nav className="flex flex-col">
					<a>branding, logo</a>
					<a>nav1</a>
					<a>nav2</a>
				</nav>
				<pre>
					<p>darkmode</p>
					<p>search</p>
					<p>tag</p>
					<p>..or albums</p>
				</pre>
			</aside>

			<div className="flex justify-center">
				<div className="flex flex-col w-full max-w-3xl mt-10 border border-yellow-500 ">
					<main>
						<div className="prose-sm prose">
							<MDXRemote {...source}></MDXRemote>
						</div>
					</main>
				</div>
			</div>
		</>
	)
}

export async function getStaticProps({ params }: Params) {
	const post: PostProps = await getPostBySlug(params.slug, [
		'slug',
		'title',
		'date',
		'description',
		'content'
	])
	const { slug, title, date, description, content } = post
	const mdxSource = await serialize(content)
	return {
		props: {
			matter: { slug, title, date, description },
			source: mdxSource
		} // will be passed to the page component as props
	}
}

export async function getStaticPaths() {
	const paths = getAllPosts(['slug']).map(post => {
		return {
			params: {
				slug: post.slug
			}
		}
	})
	return {
		paths,
		fallback: true
	}
}
