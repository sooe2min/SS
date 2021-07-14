import { InferGetStaticPropsType } from 'next'
import { getAllPosts } from '../lib/api'
import Link from 'next/link'

interface HomeProps {
	slug: string
	title: string
	date: string
	description: string
}

export default function Home({
	posts
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
						{posts.map(post => {
							const date = post.date.split(' ')
							return (
								<section key={post.slug}>
									<div className="flex mb-4">
										<div className="flex flex-col items-center w-24 py-3 text-white bg-red-600">
											<div className="text-xs">{date[1]}</div>
											<div className="text-4xl leading-7">{date[2]}</div>
											<div className="text-xs">{date[3]}</div>
										</div>
										<div className="flex flex-col px-5">
											<div className="text-2xl font-semibold cursor-pointer">
												<Link href={`/post/${post.slug}`}>
													<a>{post.title}</a>
												</Link>
											</div>
											<div className="text-base">{post.description}</div>
										</div>
									</div>
								</section>
							)
						})}
					</main>
				</div>
			</div>
		</>
	)
}

export async function getStaticProps({}) {
	const posts: HomeProps[] = getAllPosts([
		'slug',
		'title',
		'date',
		'description'
	])
	return {
		props: { posts } // will be passed to the page component as props
	}
}
