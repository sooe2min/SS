import Image from 'next/image'
import Link from 'next/link'
import { TrackI } from '../../types'

interface SlugTrackI extends TrackI {
	slug: string | undefined
}

export default function PlayListInfo({
	slug,
	attributes,
	id
}: SlugTrackI) {
	return (
		<li
			key={id}
			className={`py-3 ${
				slug && +slug === id ? 'bg-[hsla(0,0%,100%,.07)]' : ''
			}`}>
			<div className="flex items-center">
				<Link href={`/playlist/${id}/${attributes?.video_id}`}>
					<a className="pl-8 pr-6">
						<div className="md:w-[40px] md:h-[40px] w-[50px] h-[50px]">
							<Image
								src={attributes?.cover_url || '/profile-pic.jpg'}
								layout="responsive"
								width="100%"
								height="100%"
							/>
						</div>
					</a>
				</Link>
				<div>
					<em className="md:text-[14px] text-white text-[17px] block not-italic">
						{attributes?.track_name}
					</em>
					<span className="md:text-[14px] text-[#747474] text-[15px]">
						{attributes?.artists?.split(',')[0]}
					</span>
				</div>
			</div>
		</li>
	)
}
