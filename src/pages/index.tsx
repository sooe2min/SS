import { InferGetStaticPropsType } from 'next'
import { getPosts } from '../lib/api'
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
			<header className="fixed max-w-[300px] bg-[#982E16] w-full h-full py-[40px] px-[16px]">
				<div className="my-[8px] font-bold">
					<div className="bg-[#FAD272] text-black text-[48px] font-serif px-[8px]">
						{/* <Link href="" passHref> */}
						SOOMIN SPACE STATION
						{/* </Link> */}
					</div>
				</div>
				<div className="text-white my-[16px] text-[14px] font-normal font-serif">
					<div className="px-[8px]">
						호기심이라는 우주선을 타고..
						<br />
						모험을 기록하는 우주정거장
						<br />
						written by Soomin
					</div>
				</div>
				<hr className="my-[32px] opacity-20" />

				<nav className="text-[24px] text-white uppercase font-normal text-right">
					<ul className="flex flex-col">
						<li className="hover:bg-[#FAD272] hover:text-black px-[8px] my-[4px] hover:font-bold">
							{/* <Link href="" passHref> */}
							life
							{/* </Link> */}
						</li>
						<li className="hover:bg-[#FAD272] hover:text-black px-[8px] my-[4px] hover:font-bold">
							{/* <Link href="" passHref> */}
							playlist
							{/* </Link> */}
						</li>
						<li className="hover:bg-[#FAD272] hover:text-black px-[8px] my-[4px] hover:font-bold">
							{/* <Link href="" passHref> */}
							development
							{/* </Link> */}
						</li>
					</ul>
				</nav>
				<hr className="my-[32px] opacity-20" />

				<ul className="flex justify-center px-[8px]">
					<li className="border border-opacity-30 cursor-pointer p-[4px] hover:bg-[#FAD272] group mx-[4px]">
						<Link href="https://github.com/sooe2min" passHref>
							<a href="">
								<svg
									className="text-white w-[28px] h-[28px] group-hover:text-black"
									viewBox="0 0 15 15"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M5.65 12.477a.5.5 0 10-.3-.954l.3.954zm-3.648-2.96l-.484-.128-.254.968.484.127.254-.968zM9 14.5v.5h1v-.5H9zm.063-4.813l-.054-.497a.5.5 0 00-.299.852l.352-.354zM12.5 5.913h.5V5.91l-.5.002zm-.833-2.007l-.466-.18a.5.5 0 00.112.533l.354-.353zm-.05-2.017l.456-.204a.5.5 0 00-.319-.276l-.137.48zm-2.173.792l-.126.484a.5.5 0 00.398-.064l-.272-.42zm-3.888 0l-.272.42a.5.5 0 00.398.064l-.126-.484zM3.383 1.89l-.137-.48a.5.5 0 00-.32.276l.457.204zm-.05 2.017l.354.353a.5.5 0 00.112-.534l-.466.181zM2.5 5.93H3v-.002l-.5.002zm3.438 3.758l.352.355a.5.5 0 00-.293-.851l-.06.496zM5.5 11H6l-.001-.037L5.5 11zM5 14.5v.5h1v-.5H5zm.35-2.977c-.603.19-.986.169-1.24.085-.251-.083-.444-.25-.629-.49a4.8 4.8 0 01-.27-.402c-.085-.139-.182-.302-.28-.447-.191-.281-.473-.633-.929-.753l-.254.968c.08.02.184.095.355.346.082.122.16.252.258.412.094.152.202.32.327.484.253.33.598.663 1.11.832.51.168 1.116.15 1.852-.081l-.3-.954zm4.65-.585c0-.318-.014-.608-.104-.878-.096-.288-.262-.51-.481-.727l-.705.71c.155.153.208.245.237.333.035.105.053.254.053.562h1zm-.884-.753c.903-.097 1.888-.325 2.647-.982.78-.675 1.237-1.729 1.237-3.29h-1c0 1.359-.39 2.1-.892 2.534-.524.454-1.258.653-2.099.743l.107.995zM13 5.91a3.354 3.354 0 00-.98-2.358l-.707.706c.438.44.685 1.034.687 1.655l1-.003zm-.867-1.824c.15-.384.22-.794.21-1.207l-1 .025a2.12 2.12 0 01-.142.82l.932.362zm.21-1.207a3.119 3.119 0 00-.27-1.195l-.913.408c.115.256.177.532.184.812l1-.025zm-.726-.99c.137-.481.137-.482.136-.482h-.003l-.004-.002a.462.462 0 00-.03-.007 1.261 1.261 0 00-.212-.024 2.172 2.172 0 00-.51.054c-.425.091-1.024.317-1.82.832l.542.84c.719-.464 1.206-.634 1.488-.694a1.2 1.2 0 01.306-.03l-.008-.001a.278.278 0 01-.01-.002l-.006-.002h-.003l-.002-.001c-.001 0-.002 0 .136-.482zm-2.047.307a8.209 8.209 0 00-4.14 0l.252.968a7.209 7.209 0 013.636 0l.252-.968zm-3.743.064c-.797-.514-1.397-.74-1.822-.83a2.17 2.17 0 00-.51-.053 1.259 1.259 0 00-.241.03l-.004.002h-.003l.136.481.137.481h-.001l-.002.001-.003.001a.327.327 0 01-.016.004l-.008.001h.008a1.19 1.19 0 01.298.03c.282.06.769.23 1.488.694l.543-.84zm-2.9-.576a3.12 3.12 0 00-.27 1.195l1 .025a2.09 2.09 0 01.183-.812l-.913-.408zm-.27 1.195c-.01.413.06.823.21 1.207l.932-.362a2.12 2.12 0 01-.143-.82l-1-.025zm.322.673a3.354 3.354 0 00-.726 1.091l.924.38c.118-.285.292-.545.51-.765l-.708-.706zm-.726 1.091A3.354 3.354 0 002 5.93l1-.003c0-.31.06-.616.177-.902l-.924-.38zM2 5.93c0 1.553.458 2.597 1.239 3.268.757.65 1.74.88 2.64.987l.118-.993C5.15 9.09 4.416 8.89 3.89 8.438 3.388 8.007 3 7.276 3 5.928H2zm3.585 3.404c-.5.498-.629 1.09-.584 1.704L6 10.963c-.03-.408.052-.683.291-.921l-.705-.709zM5 11v3.5h1V11H5zm5 3.5V13H9v1.5h1zm0-1.5v-2.063H9V13h1z"></path>
								</svg>
							</a>
						</Link>
					</li>
					<li
						className="border border-opacity-30 cursor-pointer p-[4px] hover:bg-[#FAD272] group mx-[4px]"
						onClick={() => setModal(true)}>
						<svg
							className="text-white w-[28px] h-[28px] group-hover:text-black"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</li>
				</ul>
			</header>

			<div className="flex flex-col ml-[300px]">
				<figure>
					<div className="relative w-full h-[264px]">
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
					<div className="mt-[20px] flex flex-col items-center">
						{posts.map(post => {
							const date = post.date.split(' ')
							return (
								<article key={post.slug}>
									<div className="flex min-w-[768px] mb-[20px] border-t border-b border-black">
										<div className="flex flex-col items-center w-[96px] py-[12px] text-black border-r border-black">
											<div className="text-[14px]">{date[1]}</div>
											<div className="text-[20px] leading-[26px]">
												{date[2]}
											</div>
											<div className="text-[14px]">{date[3]}</div>
										</div>
										<div className="flex flex-col justify-center max-w-[576px] px-[20px] py-[12px] break-normal">
											<h2 className="text-[24px] cursor-pointer">
												<Link href={`/post/${post.slug}`}>
													<a>{post.title}</a>
												</Link>
											</h2>
											<div className="flex mt-[4px] text-[14px]">
												{post.tags.split(',').map(tag => {
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
									</div>
								</article>
							)
						})}
					</div>
				</main>

				{modal ? (
					<div className="fixed inset-0 flex flex-col items-center max-w-[1024px] mx-auto mt-[20px]">
						<div
							className="fixed inset-0 z-0 bg-purple-100/30"
							onClick={() => setModal(false)}></div>
						<div className="z-10 w-full shadow-lg">
							<Search />
						</div>
					</div>
				) : null}
			</div>

			<aside className="fixed max-w-[300px] bg-[#292929] w-full h-full py-[40px] px-[8px] right-0 top-0">
				<div className="px-[8px] my-[8px] font-bold">
					<div className="bg-[#FAD272] text-black text-[48px] font-serif px-[8px]">
						{/* <Link href="" passHref> */}
						SOOMIN SPACE STATION
						{/* </Link> */}
					</div>
				</div>
				<div className="text-white my-[16px] px-[8px] text-[14px] font-normal font-serif">
					<div className="px-[8px]">
						호기심이라는 우주선을 타고..
						<br />
						모험을 기록하는 우주정거장
						<br />
						written by Soomin
					</div>
				</div>
				<hr className="my-[32px] opacity-20" />

				<nav className="text-[24px] text-right text-white uppercase font-normal">
					<ul className="px-[8px]">
						<li className="hover:bg-[#FAD272] hover:text-black px-[8px] my-[4px] hover:font-bold">
							{/* <Link href="" passHref> */}
							life
							{/* </Link> */}
						</li>
						<li className="hover:bg-[#FAD272] hover:text-black px-[8px] my-[4px] hover:font-bold">
							{/* <Link href="" passHref> */}
							playlist
							{/* </Link> */}
						</li>
						<li className="hover:bg-[#FAD272] hover:text-black px-[8px] my-[4px] hover:font-bold">
							{/* <Link href="" passHref> */}
							development
							{/* </Link> */}
						</li>
					</ul>
				</nav>
				<hr className="my-[32px] opacity-20" />

				<ul className="flex justify-center px-[8px]">
					<li className="border border-opacity-30 cursor-pointer p-[4px] hover:bg-[#FAD272] group mx-[4px]">
						<Link href="https://github.com/sooe2min" passHref>
							<a href="">
								<svg
									className="text-white w-[28px] h-[28px] group-hover:text-black"
									viewBox="0 0 15 15"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M5.65 12.477a.5.5 0 10-.3-.954l.3.954zm-3.648-2.96l-.484-.128-.254.968.484.127.254-.968zM9 14.5v.5h1v-.5H9zm.063-4.813l-.054-.497a.5.5 0 00-.299.852l.352-.354zM12.5 5.913h.5V5.91l-.5.002zm-.833-2.007l-.466-.18a.5.5 0 00.112.533l.354-.353zm-.05-2.017l.456-.204a.5.5 0 00-.319-.276l-.137.48zm-2.173.792l-.126.484a.5.5 0 00.398-.064l-.272-.42zm-3.888 0l-.272.42a.5.5 0 00.398.064l-.126-.484zM3.383 1.89l-.137-.48a.5.5 0 00-.32.276l.457.204zm-.05 2.017l.354.353a.5.5 0 00.112-.534l-.466.181zM2.5 5.93H3v-.002l-.5.002zm3.438 3.758l.352.355a.5.5 0 00-.293-.851l-.06.496zM5.5 11H6l-.001-.037L5.5 11zM5 14.5v.5h1v-.5H5zm.35-2.977c-.603.19-.986.169-1.24.085-.251-.083-.444-.25-.629-.49a4.8 4.8 0 01-.27-.402c-.085-.139-.182-.302-.28-.447-.191-.281-.473-.633-.929-.753l-.254.968c.08.02.184.095.355.346.082.122.16.252.258.412.094.152.202.32.327.484.253.33.598.663 1.11.832.51.168 1.116.15 1.852-.081l-.3-.954zm4.65-.585c0-.318-.014-.608-.104-.878-.096-.288-.262-.51-.481-.727l-.705.71c.155.153.208.245.237.333.035.105.053.254.053.562h1zm-.884-.753c.903-.097 1.888-.325 2.647-.982.78-.675 1.237-1.729 1.237-3.29h-1c0 1.359-.39 2.1-.892 2.534-.524.454-1.258.653-2.099.743l.107.995zM13 5.91a3.354 3.354 0 00-.98-2.358l-.707.706c.438.44.685 1.034.687 1.655l1-.003zm-.867-1.824c.15-.384.22-.794.21-1.207l-1 .025a2.12 2.12 0 01-.142.82l.932.362zm.21-1.207a3.119 3.119 0 00-.27-1.195l-.913.408c.115.256.177.532.184.812l1-.025zm-.726-.99c.137-.481.137-.482.136-.482h-.003l-.004-.002a.462.462 0 00-.03-.007 1.261 1.261 0 00-.212-.024 2.172 2.172 0 00-.51.054c-.425.091-1.024.317-1.82.832l.542.84c.719-.464 1.206-.634 1.488-.694a1.2 1.2 0 01.306-.03l-.008-.001a.278.278 0 01-.01-.002l-.006-.002h-.003l-.002-.001c-.001 0-.002 0 .136-.482zm-2.047.307a8.209 8.209 0 00-4.14 0l.252.968a7.209 7.209 0 013.636 0l.252-.968zm-3.743.064c-.797-.514-1.397-.74-1.822-.83a2.17 2.17 0 00-.51-.053 1.259 1.259 0 00-.241.03l-.004.002h-.003l.136.481.137.481h-.001l-.002.001-.003.001a.327.327 0 01-.016.004l-.008.001h.008a1.19 1.19 0 01.298.03c.282.06.769.23 1.488.694l.543-.84zm-2.9-.576a3.12 3.12 0 00-.27 1.195l1 .025a2.09 2.09 0 01.183-.812l-.913-.408zm-.27 1.195c-.01.413.06.823.21 1.207l.932-.362a2.12 2.12 0 01-.143-.82l-1-.025zm.322.673a3.354 3.354 0 00-.726 1.091l.924.38c.118-.285.292-.545.51-.765l-.708-.706zm-.726 1.091A3.354 3.354 0 002 5.93l1-.003c0-.31.06-.616.177-.902l-.924-.38zM2 5.93c0 1.553.458 2.597 1.239 3.268.757.65 1.74.88 2.64.987l.118-.993C5.15 9.09 4.416 8.89 3.89 8.438 3.388 8.007 3 7.276 3 5.928H2zm3.585 3.404c-.5.498-.629 1.09-.584 1.704L6 10.963c-.03-.408.052-.683.291-.921l-.705-.709zM5 11v3.5h1V11H5zm5 3.5V13H9v1.5h1zm0-1.5v-2.063H9V13h1z"></path>
								</svg>
							</a>
						</Link>
					</li>
					<li
						className="border border-opacity-30 cursor-pointer p-[4px] hover:bg-[#FAD272] group mx-[4px]"
						onClick={() => setModal(true)}>
						<svg
							className="text-white w-[28px] h-[28px] group-hover:text-black"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</li>
				</ul>
			</aside>
		</>
	)
}

export async function getStaticProps({}) {
	const posts: HomeProps[] = getPosts(['slug', 'title', 'date', 'tags'])
	return {
		props: { posts } // will be passed to the page component as props
	}
}
