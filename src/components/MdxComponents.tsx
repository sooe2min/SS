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
			className="w-full px-4 py-2 mb-2 border-l-4 border-blue-200"
			{...props}
		/>
	),

	h1: (props: any) => (
		<h1 className="mb-0 text-4xl font-bold text-center" {...props} />
	),

	h2: (props: any) => (
		<h2 className="relative mt-12 mb-2 text-3xl font-medium pl-7 -ml-7 group">
			{props.children}
			<a
				className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:text-yellow-200"
				id={`${props.children}`}>
				#
			</a>
		</h2>
	),

	h3: (props: any) => (
		<h3 className="mt-5 mb-2 text-2xl font-medium" {...props} />
	),

	h4: (props: any) => <h4 className="my-2 text-lg" {...props} />,

	h5: (props: any) => (
		<h5 className="my-2 text-base italic font-medium" {...props} />
	),

	p: (props: any) => (
		<p className="mt-0 mb-5 text-base leading-7" {...props} />
	),

	pre: (props: any) => <pre className="text-sm" {...props} />,

	hr: (props: any) => <hr className="my-11" {...props} />,

	Image: ({ children, ...props }: { children: React.ReactNode }) => (
		<div className="relative w-full h-screen mb-5 ">
			<NextImage className="" {...(props as any)} />
		</div>
	),

	li: (props: any) => (
		<li className="relative pl-5 mt-px mb-1" {...props} />
	),

	ol: (props: any) => (
		<ol className="leading-7 list-decimal list-inside" {...props} />
	),

	strong: (props: any) => <strong className="font-medium" {...props} />,

	table: (props: any) => <table className="w-full border" {...props} />,

	thead: (props: any) => <thead className="border " {...props} />,

	tr: (props: any) => <tr className="border " {...props} />,

	th: (props: any) => (
		<th className="p-1 font-medium text-left border" {...props} />
	),

	td: (props: any) => <td className="p-1 text-left border" {...props} />,

	ul: (props: any) => (
		<ul className="mb-2 leading-7 list-none" {...props} />
	)
}
