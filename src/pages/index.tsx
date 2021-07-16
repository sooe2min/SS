import { InferGetStaticPropsType } from 'next'
import { getAllPosts } from '../lib/api'
import Link from 'next/link'
import Image from 'next/image'

interface HomeProps {
	slug: string
	title: string
	date: string
	tags: string
}

export default function Home({
	posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<div className="flex justify-center">
				<div className="flex flex-col w-full max-w-3xl border-yellow-500">
					<div className="flex flex-col">
						<div className="mt-5 border-t border-b border-black">
							<nav className="flex justify-between font-bold text-white bg-white na">
								<div className="p-2 text-4xl text-black border-r border-black">
									<div className="p-2 hover:bg-black hover:text-white">
										<a>SPACE STATION</a>
									</div>
								</div>

								<div className="flex">
									<div className="flex items-center text-2xl border-l border-black ">
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

						<div className="relative flex w-full h-80">
							<Image
								className=""
								src="/images/hubble2004.jpg"
								alt="hubble2004"
								layout="fill"
								objectFit="cover"
							/>
						</div>
					</div>

					<main className="mt-5">
						{posts.map(post => {
							const date = post.date.split(' ')
							return (
								<section key={post.slug} className="">
									<div className="flex mb-5 border-t border-b border-black">
										<div className="flex flex-col items-center w-24 py-3 text-black bg-white border-r border-black">
											<div className="text-xs">{date[1]}</div>
											<div className="text-2xl leading-7">{date[2]}</div>
											<div className="text-xs">{date[3]}</div>
										</div>
										<div className="flex flex-col justify-center max-w-xl px-5 py-3 break-normal">
											<div className="text-2xl font-normal cursor-pointer">
												<Link href={`/post/${post.slug}`}>
													<a>{post.title}</a>
												</Link>
											</div>
											<div className="flex mt-1">
												{post.tags.split(',').map(tag => {
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
	const posts: HomeProps[] = getAllPosts(['slug', 'title', 'date', 'tags'])
	return {
		props: { posts } // will be passed to the page component as props
	}
}
