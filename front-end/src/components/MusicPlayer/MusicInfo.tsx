import Image from 'next/image'
import { TrackI } from '../../types'

export default function MusicInfo({ attributes, id }: TrackI) {
	return (
		<div className="md:space-x-4 flex items-center">
			<div className="md:w-[45px] md:block hidden md:h-[45px] w-[40px] h-[40px]">
				<Image
					className="rounded-md"
					src={attributes ? attributes!.cover_url : '/profile-pic.jpg'}
					layout="responsive"
					width="100%"
					height="100%"
				/>
			</div>
			<div>
				<p className="text-white text-[16px] font-semibold">
					{attributes ? attributes!.track_name : ''}
				</p>
				<p className="text-[#747474] text-[14px]">
					{attributes ? attributes!.artists.split(',')[0] : ''}
				</p>
			</div>
		</div>
	)
}
