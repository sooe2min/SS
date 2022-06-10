import Image from 'next/image'
import { AttributesI } from '../../types'

export default function MusicInfo({
	cover_url,
	track_name,
	artists
}: AttributesI) {
	return (
		<div className="md:space-x-4 flex items-center">
			<div className="md:w-[45px] md:block md:h-[45px] hidden">
				<Image
					src={cover_url || '/profile-pic.jpg'}
					layout="responsive"
					width="100%"
					height="100%"
				/>
			</div>
			<div>
				<em className="md:text-[16px] text-white text-[18px] font-semibold block not-italic">
					{track_name}
				</em>
				<span className="md:text-[15px] text-[#747474] text-[16px]">
					{artists?.split(',')[0]}
				</span>
			</div>
		</div>
	)
}
