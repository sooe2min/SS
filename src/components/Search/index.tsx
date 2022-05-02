import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, Configure } from 'react-instantsearch-dom'
import CustomSearchBox from './CustomSearchBox'
import CustomStateResults from './CustomStateResults'

interface SearchProps {}

const searchClient = algoliasearch(
	process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
	process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
)

export const Search: React.FC<SearchProps> = ({}) => {
	return (
		<InstantSearch searchClient={searchClient} indexName="s2ss">
			<CustomSearchBox />
			<CustomStateResults />
			<Configure attributesToSnippet={['content']} />
		</InstantSearch>
	)
}
