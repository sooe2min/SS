import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React, { useEffect, useState } from 'react'
import rehypeReact from 'rehype-react'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import Header from '../../components/Header'
import { getAllPosts, getPostItemsByFileName } from '../../lib/api'

export default function Post({
	blog
}): InferGetStaticPropsType<typeof getStaticProps> {
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
		const htmlContent = unified()
			.use(remarkParse)
			.use(remarkRehype)
			.use(rehypeStringify)
			.use(rehypeReact, { createElement: React.createElement })
			.processSync(blog.content).result
		console.log(htmlContent)
		setContent(htmlContent)
	}, [])

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.addEventListener('scroll', handleScroll)
	}, [])

	return (
		<>
			<Header />

			<main className="flex justify-center">
				<article className="h-full px-[16px] text-black border-black max-w-[764px] w-full">
					<section>
						<h1 className="mt-[48px] text-[40px] font-bold text-center">
							{blog?.title}
						</h1>
						<div className="flex flex-col items-center justify-center mt-[8px]">
							<div className="mb-[8px] text-[14px] text-gray-500">
								{blog?.date}
							</div>
						</div>
						<hr className="my-[48px]" />
					</section>
					<section className="prose mx-auto">{content}</section>
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
	const post: any = await getPostItemsByFileName(ctx.params?.slug, [
		'slug',
		'title',
		'date',
		'tags',
		'content'
	])
	const { slug, title, date, tags, content } = post

	return {
		props: {
			blog: { slug, title, date, tags, content }
		} // will be passed to the page component as props
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

	return {
		paths,
		fallback: false
	}
}
