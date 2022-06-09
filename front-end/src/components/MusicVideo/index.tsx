export default function MusicVideo() {
	return (
		<main>
			<div className="bg-black w-[100vw] h-[100vh] relative flex-1 pb-[8vh]">
				<div className="absolute inset-0 px-10 py-5 w-full h-full flex justify-center items-center">
					<iframe
						className="w-full h-[30vh] md:h-[45vh] lg:h-[75vh]"
						src="https://www.youtube.com/embed/Z_MvkyuOJgk?controls=0"
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen></iframe>
				</div>
			</div>
		</main>
	)
}
