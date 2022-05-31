import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React, { useEffect, useState } from 'react'
import rehypeHighlight from 'rehype-highlight'
import rehypeReact from 'rehype-react'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import Header from '../../components/header'
import { getAllPosts, getPostItemsByFileName } from '../../lib/api'

export default function Post({
	post
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const [btnStatus, setBtnStatus] = useState<boolean>(false)
	const [content, setContent] = useState<any>()
	const handleScroll = () => {
		sessionStorage.setItem('pageY', window.pageYOffset + '')

		if (window.pageYOffset > 900) {
			setBtnStatus(true)
		} else {
			setBtnStatus(false)
		}
	}

	useEffect(() => {
		const unifiedContent = unified()
			.use(remarkParse)
			.use(remarkRehype)
			.use(rehypeStringify)
			.use(rehypeHighlight)
			.use(rehypeReact, { createElement: React.createElement })
			// .use(rehypeMinifyWhitespace)
			.processSync(post.content).result
		setContent(unifiedContent)
	}, [])

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.addEventListener('scroll', handleScroll)
	}, [])

	return (
		<>
			<Header />

			<main className="flex justify-center">
				<article className="h-full text-black border-black max-w-[700px] w-full">
					<section className="flex justify-between mt-[48px]">
						<h1 className="text-[40px] font-bold whitespace-pre-line">
							{post?.title}
						</h1>
						<div className="text-[20px] font-extrabold min-w-[70px] self-center text-right">
							{`${post?.date[1]} ${post?.date[2].replace(/^0/gi, '')}`}
						</div>
					</section>
					<hr className="my-[48px]" />
					<section className="prose max-w-full mb-[48px]">
						{content}
					</section>
				</article>
			</main>

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

export const getStaticProps: GetStaticProps = async ctx => {
	const post = await getPostItemsByFileName(ctx.params?.slug, [
		'slug',
		'title',
		'date',
		'tags',
		'content'
	])

	return {
		props: { post } // will be passed to the page component as props
	}
}

export async function getStaticPaths() {
	const paths = getAllPosts(['slug']).map(post => {
		return {
			params: {
				slug: post!.slug
			}
		}
	})

	return { paths, fallback: false }
}
