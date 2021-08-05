import { InferGetStaticPropsType } from 'next'
import { getAllPosts } from '../lib/api'
import Link from 'next/link'
import Image from 'next/image'
import { Search } from '../components/Search'
import { useEffect, useState } from 'react'

interface HomeProps {
	slug: string
	title: string
	date: string
	tags: string
}

export default function Home({
	posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const [modal, setModal] = useState<boolean>(false)

	useEffect(() => {
		const body = document.body
		if (modal) body.style.cssText = `overflow: hidden`
		else body.style.cssText = `overflow: flow`
	}, [modal])

	return (
		<>
			{/* <div className="flex flex-col w-full"> */}
			<header>
				<div className="flex justify-between max-w-3xl mx-auto mt-5 text-3xl font-bold border-t border-b border-black">
					<div className="p-2 text-black border-r border-black w-72">
						<div className="p-2 hover:bg-black hover:text-white">
							{/* <Link href="" passHref> */}
							SPACE STATION
							{/* </Link> */}
						</div>
					</div>
					<button
						className="p-4 border-l-2 border-r-2 border-yellow-300"
						onClick={() => setModal(true)}>
						search
					</button>
					<nav className="flex border-l border-black">
						<ul className="p-2 text-black">
							<li className="p-2 hover:bg-black hover:text-white">
								{/* <Link href="" passHref> */}
								<a>PLAYLIST</a>
								{/* </Link> */}
							</li>
						</ul>
					</nav>
				</div>
			</header>

			<figure>
				<div className="relative w-full max-w-3xl mx-auto h-80">
					<Image
						className=""
						src="/images/hubble2004.jpg"
						alt="hubble2004"
						layout="fill"
						objectFit="cover"
					/>
				</div>
			</figure>

			<main>
				<div className="mt-5">
					{posts.map(post => {
						const date = post.date.split(' ')
						return (
							<article key={post.slug}>
								<div className="flex max-w-3xl mx-auto mb-5 border-t border-b border-black">
									<div className="flex flex-col items-center w-24 py-3 text-black bg-white border-r border-black">
										<div className="text-xs">{date[1]}</div>
										<div className="text-2xl leading-7">{date[2]}</div>
										<div className="text-xs">{date[3]}</div>
									</div>
									<div className="flex flex-col justify-center max-w-xl px-5 py-3 break-normal">
										<h2 className="text-2xl font-normal cursor-pointer">
											<Link href={`/post/${post.slug}`}>
												<a>{post.title}</a>
											</Link>
										</h2>
										<div className="flex mt-1 text-sm">
											{post.tags.split(',').map(tag => {
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
														<div
															className="p-1 mr-2 bg-pink-100"
															key={_tag}>
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
								</div>
							</article>
						)
					})}
				</div>
			</main>

			{modal ? (
				<div className="fixed inset-0 flex flex-col items-center max-w-5xl mx-auto mt-5">
					<div
						className="fixed inset-0 z-0 bg-purple-100 bg-opacity-30"
						onClick={() => setModal(false)}></div>
					<div className="z-10 w-full shadow-lg">
						<Search />
					</div>
				</div>
			) : null}
			{/* </div> */}
		</>
	)
}

export async function getStaticProps({}) {
	const posts: HomeProps[] = getAllPosts(['slug', 'title', 'date', 'tags'])
	return {
		props: { posts } // will be passed to the page component as props
	}
}
