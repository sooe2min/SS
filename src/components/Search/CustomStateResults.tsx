import React, { useEffect, useState } from 'react'
import {
	connectStateResults,
	Highlight,
	Snippet
} from 'react-instantsearch-dom'
import Link from 'next/link'

interface CustomStateResultsProps {
	searchState: any
	searchResults: any
}

interface Hit {
	slug: string
	title: string
	date: string
	tags: string
	content: string
	objectID: string
	_highlightResult: object
}

const CustomStateResults: React.FC<CustomStateResultsProps> = ({
	searchState,
	searchResults
}) => {
	const [mouseOverPostId, setMouseOverPostId] = useState<string>('')
	const [hit, setHit] = useState<Hit | object>({})
	const [headings, setHeadings] = useState<string[]>([])

	const validQuery = searchState.query?.length >= 2
	const hits: Array<Hit> = searchResults?.hits
	console.log(headings)

	useEffect(() => {
		if (hits !== undefined) {
			const hit: Hit = hits.filter(
				hit => hit.objectID === mouseOverPostId
			)[0]
			setHit(hit)

			const regexp = /^##\s/g
			const headings = hit.content.split('\n').filter((el: string) => {
				if (regexp.test(el)) {
					const test = el.replace(regexp, '')
					return test
				}
			})
			setHeadings(headings)
		}
	}, [mouseOverPostId])

	return (
		<div className="">
			{searchResults?.hits.length > 0 && validQuery && (
				<div className="flex bg-white max-h-120">
					<div className="w-1/2 overflow-y-auto">
						<div className="px-4 py-1 text-sm font-semibold uppercase bg-f5f5fa tracking-1px">
							posts
						</div>

						<ul className="flex flex-col">
							{hits.map((hit: Hit) => (
								<li
									className="border-b border-gray-100 group"
									key={hit.objectID}
									onMouseEnter={() => setMouseOverPostId(hit.objectID)}
									onClick={() => {
										const body = document.body
										body.style.cssText = `overflow: flow`
									}}>
									<Link href={`/post/${hit.slug}`} passHref>
										<a
											className="flex items-center justify-between px-4 py-1 hover:bg-yellow-200"
											target="_self">
											<div>
												<div>{hit.title}</div>
												{/* <div className="flex mt-1 text-xs">
													{hit.tags.split(',').map(tag => {
														const _tag = tag.trim()
														if (_tag === 'JavaScript') {
															return (
																<div
																	className="p-1 mr-2 border border-gray-100 group-hover:bg-white"
																	key={_tag}>
																	{_tag}
																</div>
															)
														} else if (_tag === 'Algorithm') {
															return (
																<div
																	className="p-1 mr-2 border border-gray-100 group-hover:bg-white"
																	key={_tag}>
																	{_tag}
																</div>
															)
														} else {
															return (
																<div
																	className="p-1 mr-2 border border-gray-100 group-hover:bg-white"
																	key={_tag}>
																	{_tag}
																</div>
															)
														}
													})}
												</div> */}
											</div>
											<div className="w-5 p-0.5 hidden group-hover:block">
												<svg
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2">
													<polyline points="9 10 4 15 9 20"></polyline>
													<path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
												</svg>
											</div>
										</a>
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="w-1/2 overflow-y-auto">
						<div className="flex flex-col w-full h-full py-4 text-sm text-center shadow-inner px-14 bg-f5f5fa bg-opacity-60">
							<div className="text-preview-700">
								<Highlight hit={hit} attribute={'tags'} tagName={'mark'} />
							</div>
							<div className="p-2 text-2xl font-bold text-black">
								<Highlight
									hit={hit}
									attribute={'title'}
									tagName={'mark'}
								/>
							</div>
							<div className="my-4 text-preview-800">
								<Snippet
									hit={hit}
									attribute={'content'}
									tagName={'mark'}
								/>
							</div>
							{headings.length > 0 ? (
								<div className="mt-6 text-left">
									<h2 className="tracking-1.5px text-preview-500 font-semibold ">
										ON THIS PAGE
									</h2>
									<ol className="list-decimal list-inside">
										{headings.map((heading: string) => (
											// console.log(typeof heading.slice(2))
											<li
												className="py-2 my-1 leading-relaxed border-b border-gray-600 border-solid text-preview-600 hover:text-preview-800 border-opacity-10"
												key={heading}
												onClick={() => {
													const body = document.body
													body.style.cssText = `overflow: flow`
												}}>
												<Link
													href={`/post/${
														(hit as Hit).slug
													}#${heading.slice(3)}`}
													passHref>
													<a target="_self">{heading.slice(2)}</a>
												</Link>
											</li>
										))}
									</ol>
								</div>
							) : null}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default connectStateResults(CustomStateResults)
