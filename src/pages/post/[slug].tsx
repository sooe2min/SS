import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { InferGetStaticPropsType } from 'next'
import { getAllPosts, getPostBySlug } from '../../lib/api'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import hljs from 'highlight.js'
import { MdxComponents } from '../../components/MdxComponents'
// import 'highlight.js/styles/base16/edge-light.css'
// import 'highlight.js/styles/base16/equilibrium-gray-light.css'
// import 'highlight.js/styles/base16/harmonic16-light.css'
// import 'highlight.js/styles/base16/material-lighter.css'
import 'highlight.js/styles/base16/one-light.css'
// import 'highlight.js/styles/base16/papercolor-light.css'
import javascript from 'highlight.js/lib/languages/javascript'
import bash from 'highlight.js/lib/languages/bash'
import html from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('html', html)

interface PostProps {
	slug: string
	title: string
	date: string
	tags: string
	content: string
}

export default function Post({
	matter,
	source
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const [btnStatus, setBtnStatus] = useState<boolean>(false)
	const handleScroll = () => {
		sessionStorage.setItem('pageY', window.pageYOffset + '')

		if (window.pageYOffset > 900) {
			setBtnStatus(true)
		} else {
			setBtnStatus(false)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.addEventListener('scroll', handleScroll)
	})

	useEffect(() => {
		hljs.highlightAll()
		return () => hljs.highlightAll()
	})

	return (
		<>
			{/* <div className="flex flex-col w-full"> */}
			<header>
				<div className="flex justify-between max-w-5xl mx-auto mt-5 text-3xl font-bold border-t border-b border-black">
					<div className="p-2 text-black border-r border-black w-72">
						<div className="p-2 hover:bg-black hover:text-white">
							<Link href="/" passHref>
								<a>SPACE STATION</a>
							</Link>
						</div>
					</div>
					<nav className="flex border-l border-black">
						<ul className="p-2 text-black">
							<li className="p-2 hover:bg-black hover:text-white">
								<Link href="/" passHref>
									<a>PLAYLIST</a>
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			<main>
				<div className="flex w-full max-w-5xl mx-auto my-11">
					<aside>
						<div className="h-full pt-6 pl-2 border-b border-black w-72">
							<div className="relative w-24 h-24">
								<Image
									className="rounded-full"
									src="/images/soomin.png"
									layout="fill"
									objectFit="cover"
								/>
							</div>
							<div className="mt-2">
								<p className="text-lg">
									Soomin Jang <br />
								</p>
								<p className="text-xs">
									Seoul, Republic of Korea <br />
									jsmsumin2@gmail.com
								</p>
							</div>
							<hr className="w-12 my-4 border border-black" />
							<p className="break-normal w-72">
								#JavsScript #프론트엔드 <br />
								#호기심 #탐구심 #언제나 왜? <br />
							</p>
							<hr className="w-12 my-4 border border-black" />
						</div>
					</aside>

					<article>
						<div className="h-full px-4 text-black border-r border-black max-w-736">
							<section className="introduction">
								<h1 className="mb-0 text-4xl font-bold text-center">
									{matter.title}
								</h1>
								<div className="flex flex-col items-center justify-center mt-2">
									<div className="mb-2 text-sm text-gray-500">
										{matter.date}
									</div>
									<div className="flex text-sm">
										{matter.tags.split(',').map(tag => {
											const _tag = tag.trim()
											if (_tag === 'JavaScript') {
												return (
													<div
														className="p-1 mr-2 bg-yellow-100"
														key={_tag}>
														{_tag}
													</div>
												)
											} else if (_tag === 'Algorithm') {
												return (
													<div className="p-1 mr-2 bg-pink-100" key={_tag}>
														{_tag}
													</div>
												)
											} else {
												return (
													<div className="p-1 mr-2 border" key={_tag}>
														{_tag}
													</div>
												)
											}
										})}
									</div>
								</div>
								<hr className="my-11" />
							</section>
							<section className="contents">
								<MDXRemote {...source} components={MdxComponents} />
							</section>
						</div>
					</article>
				</div>
			</main>
			{/* </div> */}

			{btnStatus && (
				<button
					className="fixed bottom-8 right-10"
					onClick={() => {
						window.scrollTo({
							left: 0,
							top: 0,
							behavior: 'smooth'
						})
					}}>
					<img
						className="w-12"
						src="/images/backtotop.png"
						alt="backtotop"
					/>
				</button>
			)}
		</>
	)
}

export async function getStaticProps(ctx) {
	const post: PostProps = await getPostBySlug(ctx.params.slug, [
		'slug',
		'title',
		'date',
		'tags',
		'content'
	])
	const { slug, title, date, tags, content } = post
	// const matter: Matter = { slug, title, date, tags, content }
	const mdxSource = await serialize(content, {
		mdxOptions: {
			remarkPlugins: [],
			rehypePlugins: [],
			compilers: []
		}
	})
	return {
		props: {
			matter: { slug, title, date, tags, content },
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
