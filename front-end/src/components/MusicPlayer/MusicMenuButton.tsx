export default function MusicMenuButton({
	onClick
}: {
	onClick: () => void
}) {
	return (
		<div className="md:space-x-8 flex space-x-6 items-center">
			<svg
				className="md:w-[30px] md:h-[30px] text-white w-[25px] h-[25px] rotate-180"
				viewBox="0 0 15 15"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M1.79 2.093A.5.5 0 001 2.5v10a.5.5 0 00.79.407l7-5a.5.5 0 000-.814l-7-5zM13 13h1V2h-1v11z"
					fill="currentColor"></path>
			</svg>
			<svg
				className="md:w-[35px] md:h-[35px] text-white w-[30px] h-[30px]"
				viewBox="0 0 15 15"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M4.79 2.093A.5.5 0 004 2.5v10a.5.5 0 00.79.407l7-5a.5.5 0 000-.814l-7-5z"
					fill="currentColor"></path>
			</svg>
			<svg
				className="md:w-[30px] md:h-[30px] text-white w-[25px] h-[25px]"
				viewBox="0 0 15 15"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M1.79 2.093A.5.5 0 001 2.5v10a.5.5 0 00.79.407l7-5a.5.5 0 000-.814l-7-5zM13 13h1V2h-1v11z"
					fill="currentColor"></path>
			</svg>
			<svg
				onClick={() => onClick()}
				className="text-[#747474] w-[25px] h-[25px]"
				viewBox="0 0 15 15"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M15 2H0V1h15v1zm0 4H0V5h15v1zm0 4H0V9h15v1zm0 4H0v-1h15v1z"
					fill="currentColor"></path>
			</svg>
		</div>
	)
}
