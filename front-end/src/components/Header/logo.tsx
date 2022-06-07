import Image from 'next/image'
import useGetRouter from '../../hooks/useGetRouter'

export default function Logo() {
	const { pathname } = useGetRouter()

	return (
		<div className="flex items-center space-x-3">
			<Image
				className="rounded-full"
				src="/profile-pic.jpg"
				width="95px"
				height="95px"
			/>
			<h2
				className={
					pathname === '/'
						? `tracking-widest underline underline-offset-[8px] decoration-[1px]`
						: 'tracking-widest '
				}>
				SooMIN JANG
			</h2>
		</div>
	)
}
