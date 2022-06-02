import { useRouter } from 'next/router'

export default function useGetPathName() {
	const router = useRouter()

	return router.pathname
}
