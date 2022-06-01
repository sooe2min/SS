import Image from 'next/image'

export default function Logo() {
	return (
		<div className="flex items-center space-x-3">
			<Image
				className="rounded-full"
				src="/profile-pic.jpg"
				width="95px"
				height="95px"
			/>
			<h2 className="tracking-widest underline underline-offset-[8px] decoration-[1px]">
				SooMIN JANG
			</h2>
		</div>
	)
}
