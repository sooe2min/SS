import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Main(props: { posts: any }) {
	return (
		<>
			<main className="flex flex-col items-center bg-white z-[5]">
				<figure className="absolute w-full h-[500px] z-[-10] top-0">
					<Image
						className=""
						src="/images/hubble2004.jpg"
						alt="hubble2004"
						layout="fill"
						objectFit="cover"
					/>
				</figure>

				<section className="max-w-[764px] w-full mt-[287px] bg-white mb-[32px]">
					<div className="h-full p-[16px] w-full">
						<header className="flex mb-3">
							<div className="relative w-[125px] h-[125px]">
								<Image
									src="/images/soomin.png"
									layout="fill"
									objectFit="cover"
								/>
							</div>
							<div className="ml-[20px] flex flex-col justify-center">
								<h1 className="text-[28px] font-bold">장수민</h1>
								<div className="text-[12px]">
									🇰🇷 Seoul, Republic of Korea <br />
									💌 jsmsumin2@gmail.com
									<div className="flex">
										<svg
											className="mr-[4px] text-black"
											viewBox="0 0 15 15"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16">
											<path
												d="M5.65 12.477a.5.5 0 10-.3-.954l.3.954zm-3.648-2.96l-.484-.128-.254.968.484.127.254-.968zM9 14.5v.5h1v-.5H9zm.063-4.813l-.054-.497a.5.5 0 00-.299.852l.352-.354zM12.5 5.913h.5V5.91l-.5.002zm-.833-2.007l-.466-.18a.5.5 0 00.112.533l.354-.353zm-.05-2.017l.456-.204a.5.5 0 00-.319-.276l-.137.48zm-2.173.792l-.126.484a.5.5 0 00.398-.064l-.272-.42zm-3.888 0l-.272.42a.5.5 0 00.398.064l-.126-.484zM3.383 1.89l-.137-.48a.5.5 0 00-.32.276l.457.204zm-.05 2.017l.354.353a.5.5 0 00.112-.534l-.466.181zM2.5 5.93H3v-.002l-.5.002zm3.438 3.758l.352.355a.5.5 0 00-.293-.851l-.06.496zM5.5 11H6l-.001-.037L5.5 11zM5 14.5v.5h1v-.5H5zm.35-2.977c-.603.19-.986.169-1.24.085-.251-.083-.444-.25-.629-.49a4.8 4.8 0 01-.27-.402c-.085-.139-.182-.302-.28-.447-.191-.281-.473-.633-.929-.753l-.254.968c.08.02.184.095.355.346.082.122.16.252.258.412.094.152.202.32.327.484.253.33.598.663 1.11.832.51.168 1.116.15 1.852-.081l-.3-.954zm4.65-.585c0-.318-.014-.608-.104-.878-.096-.288-.262-.51-.481-.727l-.705.71c.155.153.208.245.237.333.035.105.053.254.053.562h1zm-.884-.753c.903-.097 1.888-.325 2.647-.982.78-.675 1.237-1.729 1.237-3.29h-1c0 1.359-.39 2.1-.892 2.534-.524.454-1.258.653-2.099.743l.107.995zM13 5.91a3.354 3.354 0 00-.98-2.358l-.707.706c.438.44.685 1.034.687 1.655l1-.003zm-.867-1.824c.15-.384.22-.794.21-1.207l-1 .025a2.12 2.12 0 01-.142.82l.932.362zm.21-1.207a3.119 3.119 0 00-.27-1.195l-.913.408c.115.256.177.532.184.812l1-.025zm-.726-.99c.137-.481.137-.482.136-.482h-.003l-.004-.002a.462.462 0 00-.03-.007 1.261 1.261 0 00-.212-.024 2.172 2.172 0 00-.51.054c-.425.091-1.024.317-1.82.832l.542.84c.719-.464 1.206-.634 1.488-.694a1.2 1.2 0 01.306-.03l-.008-.001a.278.278 0 01-.01-.002l-.006-.002h-.003l-.002-.001c-.001 0-.002 0 .136-.482zm-2.047.307a8.209 8.209 0 00-4.14 0l.252.968a7.209 7.209 0 013.636 0l.252-.968zm-3.743.064c-.797-.514-1.397-.74-1.822-.83a2.17 2.17 0 00-.51-.053 1.259 1.259 0 00-.241.03l-.004.002h-.003l.136.481.137.481h-.001l-.002.001-.003.001a.327.327 0 01-.016.004l-.008.001h.008a1.19 1.19 0 01.298.03c.282.06.769.23 1.488.694l.543-.84zm-2.9-.576a3.12 3.12 0 00-.27 1.195l1 .025a2.09 2.09 0 01.183-.812l-.913-.408zm-.27 1.195c-.01.413.06.823.21 1.207l.932-.362a2.12 2.12 0 01-.143-.82l-1-.025zm.322.673a3.354 3.354 0 00-.726 1.091l.924.38c.118-.285.292-.545.51-.765l-.708-.706zm-.726 1.091A3.354 3.354 0 002 5.93l1-.003c0-.31.06-.616.177-.902l-.924-.38zM2 5.93c0 1.553.458 2.597 1.239 3.268.757.65 1.74.88 2.64.987l.118-.993C5.15 9.09 4.416 8.89 3.89 8.438 3.388 8.007 3 7.276 3 5.928H2zm3.585 3.404c-.5.498-.629 1.09-.584 1.704L6 10.963c-.03-.408.052-.683.291-.921l-.705-.709zM5 11v3.5h1V11H5zm5 3.5V13H9v1.5h1zm0-1.5v-2.063H9V13h1z"
												fill="currentColor"></path>
										</svg>
										<Link href="https://github.com/sooe2min" passHref>
											github.com/sooe2min
										</Link>
									</div>
								</div>
							</div>
						</header>
						<div className="flex mb-3">
							<div>예술과 개발</div>
							<div className="ml-[10px] pl-[10px] border-l">
								감성과 이성
							</div>
							<div className="ml-[10px] pl-[10px] border-l">꿈과 현실</div>
						</div>
						<div className="flex mb-3">
							<p>
								예술은 아름다움을 표현한다 <br />
								현실에서 벗어날 수 있도록 <br />
								현실을 똑바로 볼 수 있도록 만든다
							</p>
							<p className="ml-[10px] pl-[10px] border-l">
								콘텐츠를 개발한다 <br />
								문제를 해결하고 <br />더 나은 세상을 만든다
							</p>
						</div>
						<div className="mb-3">
							<p>
								나의 마음을 움직이는 가장 큰 motivation: 새로운 경험
								<br />
								호기심이라는 우주선을 타고 떠나는 여행🚀 이곳은 모험을
								기록하는 우주정거장
							</p>
						</div>

						<Link href="http://localhost:3000/post/LIFE" passHref>
							more about me →
						</Link>
					</div>
				</section>

				<section className="max-w-[764px] w-full">
					<div className="flex border-t justify-center text-[16px] items-center">
						<div
							className={
								'flex items-center justify-center w-[150px] h-[52px] hover:border-t hover:mt-[-2px] hover:border-black hover:font-semibold'
							}>
							<Link href="/" passHref>
								dEv
							</Link>
						</div>
						<div
							className={
								'flex items-center justify-center w-[150px] h-[52px] hover:border-t hover:mt-[-2px] hover:border-black'
							}>
							<Link href="/" passHref>
								InStar
							</Link>
						</div>
						<div
							className={
								'flex items-center justify-center w-[150px] h-[52px] hover:border-t hover:mt-[-2px] hover:border-black'
							}>
							<Link href="/" passHref>
								playlIst
							</Link>
						</div>
					</div>
					{props.posts.map((post: any) => {
						const date = post.date.split(' ')

						return (
							<article
								key={post.slug}
								className="border-t border-black flex mb-[20px] border-b last-of-type:mb-0">
								<div className="flex flex-col w-full justify-center px-[20px] py-[12px] break-normal">
									<h2 className="text-[24px] cursor-pointer">
										<Link href={`/dev/${post.slug}`}>
											<a>{post.title}</a>
										</Link>
									</h2>
								</div>
							</article>
						)
					})}
				</section>
			</main>
		</>
	)
}
