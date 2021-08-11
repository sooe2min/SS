import Link from 'next/link'
import NextImage from 'next/image'

export const MdxComponents = {
	a: ({ href = '', ...props }: any) => (
		<Link href={href} passHref>
			<a
				className="underline hover:bg-red-100"
				target="_blank"
				{...props}
			/>
		</Link>
	),

	blockquote: (props: any) => (
		<blockquote
			className="w-full px-[16px] py-[8px] mb-[8px] border-l-4 border-blue-200"
			{...props}
		/>
	),

	code: (props: any) => (
		<code className="p-1 text-sm bg-gray-100 rounded-sm" {...props} />
	),

	h1: (props: any) => (
		<h1 className="mb-0 text-[40px] font-bold text-center" {...props} />
	),

	h2: (props: any) => (
		<h2 className="relative mt-[48px] mb-[8px] text-[32px] font-medium pl-[28px] -ml-7 group">
			{props.children}
			<a
				className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:text-yellow-200"
				id={`${props.children}`}>
				#
			</a>
		</h2>
	),

	h3: (props: any) => (
		<h3
			className="mt-[20px] mb-[8px] text-[24px] font-medium"
			{...props}
		/>
	),

	h4: (props: any) => <h4 className="my-[8px] text-[20px]" {...props} />,

	h5: (props: any) => (
		<h5 className="my-[8px] text-[16px] italic font-medium" {...props} />
	),

	p: (props: any) => (
		<p className="mt-0 mb-[20px] text-[16px] leading-[26px]" {...props} />
	),

	pre: (props: any) => <pre className="text-[14px]" {...props} />,

	hr: (props: any) => <hr className="my-[44px]" {...props} />,

	Image: ({ children, ...props }: { children: React.ReactNode }) => (
		<div className="relative w-full h-screen mb-[20px] ">
			<NextImage className="" {...(props as any)} />
		</div>
	),

	li: (props: any) => (
		<li
			className="relative mt-[1px] mb-[4px] marker:text-gray-400 marker:!mr-[8px]"
			{...props}
		/>
	),

	ol: (props: any) => (
		<ol
			className="mb-[8px] leading-[28px] list-decimal list-inside"
			{...props}
		/>
	),

	strong: (props: any) => <strong className="font-medium" {...props} />,

	table: (props: any) => <table className="w-full border" {...props} />,

	thead: (props: any) => <thead className="border" {...props} />,

	tr: (props: any) => <tr className="border" {...props} />,

	th: (props: any) => (
		<th className="p-[4px] font-medium text-left border" {...props} />
	),

	td: (props: any) => (
		<td className="p-[4px] text-left border" {...props} />
	),

	ul: ({ ...props }: any) => (
		<ul
			className="mb-[8px] leading-[28px] list-disc list-inside"
			{...props}
		/>
	)
}
