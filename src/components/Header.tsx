import React from 'react'

export default function Header() {
	return (
		<>
			<header className="sticky flex justify-center text-[16px] top-0 z-[10]">
				<div className="max-w-[764px] w-full flex items-center justify-between py-[8px] font-extrabold bg-black/20 px-[16px]">
					<div className="p-1 bg-black">
						<div className="p-1 bg-white">
							<div className="p-2 text-white bg-black">
								{/* <Link href="" passHref> */}
								SooMIN JANG
								{/* </Link> */}
							</div>
						</div>
					</div>

					<nav>
						<ul className="flex">
							<li className="p-1 bg-black">
								<div className="p-1 bg-white">
									<div className="flex items-center p-2 text-black bg-white">
										{/* <Link href="" passHref> */}
										dEv
										<div className="pl-1">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="w-[20px] h-[20px]"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
												/>
											</svg>
										</div>
										{/* </Link> */}
									</div>
								</div>
							</li>
							<li className="p-1 ml-2 bg-black ">
								<div className="p-1 bg-white">
									<div className="flex items-center p-2 text-black bg-white">
										{/* <Link href="" passHref> */}
										inStar
										<div className="pl-1">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="w-[20px] h-[20px]"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
												/>
											</svg>
										</div>
										{/* </Link> */}
									</div>
								</div>
							</li>
							<li className="p-1 ml-2 bg-black">
								<div className="p-1 bg-white">
									<div className="flex items-center p-2 text-black bg-white">
										{/* <Link href="" passHref> */}
										playlIst
										<div className="pl-1">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="w-[20px] h-[20px]"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
												/>
											</svg>
										</div>
										{/* </Link> */}
									</div>
								</div>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		</>
	)
}
