export default function Post({}) {
	return (
		<>
			<aside className="fixed w-full h-full max-w-xs border-2 bg-gray-50 left-20">
				<div className="flex flex-col">
					<nav>
						<a>branding, logo</a>
						<a>nav1</a>
						<a>nav2</a>
					</nav>
				</div>
				<div>
					<pre>
						<p>darkmode</p>
						<p>search</p>
						<p>tag</p>
						<p>..or albums</p>
					</pre>
				</div>
			</aside>

			<div className="flex justify-center">
				<div className="flex flex-col w-full max-w-3xl mt-10 border border-yellow-500 ">
					<main></main>
				</div>
			</div>
		</>
	)
}

export async function getStaticProps({}) {
	return {
		props: {} // will be passed to the page component as props
	}
}
