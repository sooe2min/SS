import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { InferGetStaticPropsType } from 'next'
import { getAllPosts, getPostBySlug } from '../../lib/api'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MdxComponents } from '../../components/MdxComponents'

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

	return (
		<>
			{/* <div className="flex flex-col w-full"> */}
			<header>
				<div className="flex justify-between max-w-[1024px] mx-auto mt-[20px] text-[32px] font-bold border-t border-b border-black">
					<div className="p-[8px] text-black border-r border-black w-[288px]">
						<div className="p-[8px] hover:bg-black hover:text-white">
							<Link href="/" passHref>
								<a>SPACE STATION</a>
							</Link>
						</div>
					</div>
					<nav className="flex border-l border-black">
						<ul className="p-[8px] text-black">
							<li className="p-[8px] hover:bg-black hover:text-white">
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
						<div className="h-full pt-[24px] pl-[8px] border-b border-black w-[288px]">
							<div className="relative w-[96px] h-[96px]">
								<Image
									className="rounded-full"
									src="/images/soomin.png"
									layout="fill"
									objectFit="cover"
								/>
							</div>
							<div className="mt-2">
								<p className="text-[20px]">
									Soomin Jang <br />
								</p>
								<p className="text-[14px]">
									Seoul, Republic of Korea <br />
									jsmsumin2@gmail.com
								</p>
							</div>
							<hr className="w-[48px] my-[16px] border border-black" />
							<p className="break-normal w-72 text-[14px]">
								#JavsScript #프론트엔드 <br />
								#호기심 #탐구심 #언제나 왜? <br />
							</p>
							<hr className="w-[48px] my-[16px] border border-black" />
						</div>
					</aside>

					<article>
						<div className="h-full px-[16px] text-black border-r border-black max-w-[736px]">
							<section className="introduction">
								<h1 className="mb-0 text-[40px] font-bold text-center">
									{matter.title}
								</h1>
								<div className="flex flex-col items-center justify-center mt-[8px]">
									<div className="mb-[8px] text-[14px] text-gray-500">
										{matter.date}
									</div>
									<div className="flex text-[14px]">
										{matter.tags.split(',').map(tag => {
											const _tag = tag.trim()
											if (_tag === 'JavaScript') {
												return (
													<div
														className="p-[4px] mr-[8px] bg-yellow-100"
														key={_tag}>
														{_tag}
													</div>
												)
											} else if (_tag === 'Algorithm') {
												return (
													<div
														className="p-[4px] mr-[8px] bg-pink-100"
														key={_tag}>
														{_tag}
													</div>
												)
											} else {
												return (
													<div
														className="p-[4px] mr-[8px] border"
														key={_tag}>
														{_tag}
													</div>
												)
											}
										})}
									</div>
								</div>
								<hr className="my-[44px]" />
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
					className="fixed bottom-[32px] right-[40px]"
					onClick={() => {
						window.scrollTo({
							left: 0,
							top: 0,
							behavior: 'smooth'
						})
					}}>
					<img
						className="w-[48px]"
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
