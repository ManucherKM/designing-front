import { useStore } from '@/storage'
import { useCallback } from 'react'

export function useLoader() {
	const setLoading = useStore(store => store.setLoading)

	return useCallback(
		async function <T, A extends unknown[]>(
			fetch: (...args: A) => Promise<T>,
			...args: A
		) {
			try {
				setLoading(true)

				return await fetch(...args)
			} catch (e) {
				console.error(e)
			} finally {
				setLoading(false)
			}
		},
		[setLoading],
	)
}
