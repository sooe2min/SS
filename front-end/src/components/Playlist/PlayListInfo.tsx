import Image from 'next/image'
import { TrackI } from '../../types'

export default function PlayListInfo({ attributes, id }: TrackI) {
	return (
		<li key={id} data-trackId={id} className="py-3">
			<div className="space-x-4 flex items-center">
				<div className="md:w-[40px] md:block md:h-[40px] w-[50px] h-[50px]">
					<Image
						src={attributes?.cover_url || '/profile-pic.jpg'}
						layout="responsive"
						width="100%"
						height="100%"
					/>
				</div>
				<div>
					<em className="text-white text-[16px] block not-italic">
						{attributes?.track_name}
					</em>
					<span className="text-[#747474] text-[14px]">
						{attributes?.artists?.split(',')[0]}
					</span>
				</div>
			</div>
		</li>
	)
}
