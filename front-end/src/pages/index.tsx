import { InferGetStaticPropsType } from 'next'
import Header from '../components/header'
import Playlist from '../components/playlist'
import { getAllPosts } from '../lib/api'

export default function Home({
	posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<Header />
			<Playlist />
		</>
	)
}

export async function getStaticProps({}) {
	const posts = getAllPosts(['slug', 'title', 'date', 'tags'])

	return {
		props: { posts } // will be passed to the page component as props
	}
}