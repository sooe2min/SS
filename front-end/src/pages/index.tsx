import { InferGetStaticPropsType } from 'next'
import React from 'react'
import Header from '../components/Header'
import Masonry from '../components/Masonry'
import { getAllPosts } from '../lib/api'

export default function HomePage({
	posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<Header />
			<Masonry />
		</>
	)
}

export async function getStaticProps({}) {
	const posts = getAllPosts(['slug', 'title', 'date', 'tags'])

	return {
		props: { posts } // will be passed to the page component as props
	}
}
