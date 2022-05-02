import { InferGetStaticPropsType } from 'next'
import Header from '../components/Header'
import Main from '../components/Main'
import { getAllPosts } from '../lib/api'

export default function Home({
	posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div className="flex flex-col pb-[72px]">
			<Header></Header>
			<Main posts={posts} />
		</div>
	)
}

export async function getStaticProps({}) {
	const posts = getAllPosts(['slug', 'title', 'date', 'tags'])

	return {
		props: { posts } // will be passed to the page component as props
	}
}
