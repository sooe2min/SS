import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { InferGetStaticPropsType } from 'next'
import { getAllPosts, getPostBySlug } from '../../lib/api'
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import hljs from 'highlight.js'
// import 'highlight.js/styles/base16/edge-light.css'
// import 'highlight.js/styles/base16/equilibrium-gray-light.css'
// import 'highlight.js/styles/base16/harmonic16-light.css'
// import 'highlight.js/styles/base16/material-lighter.css'
import 'highlight.js/styles/base16/one-light.css'
// import 'highlight.js/styles/base16/papercolor-light.css'
import javascript from 'highlight.js/lib/languages/javascript'
import bash from 'highlight.js/lib/languages/bash'
import { mdxComponents } from '../../components/mdxComponents'
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('bash', bash)

interface PostProps {
	slug: string
	title: string
	date: string
	tags: string
	content: string
}

interface Params {
	params: {
		slug: string
	}
}

interface Matter {
	matter: {
		slug: string
		title: string
		date: string
		tags: string
	}
}

export default function Post({
	matter,
	source
}: InferGetStaticPropsType<typeof getStaticProps>) {
	useEffect(() => {
		hljs.highlightAll()
	}, [])

	return (
		<>
			<div className="flex justify-center">
				<div className="flex flex-col w-full max-w-5xl border-yellow-500">
					<div className="mt-5 border-t border-b border-black">
						<nav className="flex justify-between font-bold text-white bg-white">
							<div className="p-2 text-3xl text-black border-r border-black">
								<div className="p-2 hover:bg-black hover:text-white">
									<Link href="/" passHref>
										<a>SPACE STATION</a>
									</Link>
								</div>
							</div>

							<div className="flex">
								<div className="flex items-center text-2xl border-l border-black">
									<div className="p-2 text-black">
										<div className="p-2 hover:bg-black hover:text-white">
											<a>PLAYLIST</a>
										</div>
									</div>
								</div>

								<div className="flex items-center text-2xl border-l border-black">
									<div className="p-2 text-black">
										<div className="p-2 hover:bg-black hover:text-white">
											<a>NAV2</a>
										</div>
									</div>
								</div>
							</div>
						</nav>
					</div>

					<main className="flex justify-between border-r border-black my-11">
						<aside className="w-64 pt-6 pl-2 border-b border-black">
							<div className="relative w-24 h-24">
								<Image
									className="rounded-full"
									src="/images/soomin.png"
									layout="fill"
									objectFit="cover"
								/>
							</div>
							<div className="mt-2 w-52">
								<p className="text-lg">
									Soomin Jang <br />
								</p>
								<p className="text-xs">
									Seoul, Republic of Korea <br />
									jsmsumin2@gmail.com
								</p>
							</div>
							<hr className="w-12 my-4 border border-black" />
							<p className="break-normal w-52">
								#JavsScript #프론트엔드 <br />
								#호기심 #탐구심 #언제나 왜? <br />
							</p>
							<hr className="w-12 my-4 border border-black" />
							<div className="text-sm w-28">{matter.date}</div>
							<div className="flex flex-wrap mt-2">
								{matter.tags.split(',').map(tag => {
									const _tag = tag.trim()
									if (_tag === 'JavaScript') {
										return (
											<div
												className="p-1 mb-2 mr-2 text-sm bg-yellow-100"
												key={_tag}>
												{_tag}
											</div>
										)
									} else if (_tag === 'Algorithm') {
										return (
											<div
												className="p-1 mb-2 mr-2 text-sm bg-pink-100"
												key={_tag}>
												{_tag}
											</div>
										)
									} else {
										return (
											<div
												className="p-1 mb-2 mr-2 text-sm border"
												key={_tag}>
												{_tag}
											</div>
										)
									}
								})}
							</div>

							<button
								className="fixed top-4 left-4"
								onClick={() => {
									window.scrollTo(0, 0)
								}}>
								TOP
							</button>
						</aside>

						<article className="w-full max-w-2xl mr-10 border-yellow-500">
							<div className="max-w-2xl text-black">
								<h1 className="mb-0 text-4xl font-bold text-center">
									{matter.title}
								</h1>
								<div className="flex items-center justify-center mt-2">
									<div className="mr-4 text-sm text-gray-500">
										{matter.date}
									</div>
									<div className="flex">
										{matter.tags.split(',').map(tag => {
											const _tag = tag.trim()
											if (_tag === 'JavaScript') {
												return (
													<div
														className="p-1 mr-2 text-sm bg-yellow-100"
														key={_tag}>
														{_tag}
													</div>
												)
											} else if (_tag === 'Algorithm') {
												return (
													<div
														className="p-1 mr-2 text-sm bg-pink-100"
														key={_tag}>
														{_tag}
													</div>
												)
											} else {
												return (
													<div
														className="p-1 mr-2 text-sm border"
														key={_tag}>
														{_tag}
													</div>
												)
											}
										})}
									</div>
								</div>
								<hr className="my-11" />
								<MDXRemote {...source} components={mdxComponents} />
							</div>
						</article>
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
		'tags',
		'content'
	])
	const { slug, title, date, tags, content } = post
	const mdxSource = await serialize(content, {
		mdxOptions: {
			remarkPlugins: [],
			rehypePlugins: [],
			compilers: []
		}
	})
	return {
		props: {
			matter: { slug, title, date, tags },
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
		fallback: false
	}
}
