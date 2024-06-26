import { useStore } from '@/storage'
import { LoaderCircle } from 'lucide-react'
import type { FC, ReactNode } from 'react'

export interface ILoaderProvider {
	children: ReactNode
}

export const LoaderProvider: FC<ILoaderProvider> = ({ children }) => {
	const isLoading = useStore(store => store.isLoading)

	return (
		<>
			{isLoading && (
				<div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-accent/75 z-[100]">
					<LoaderCircle className="animate-spin text-foreground" />
				</div>
			)}
			{children}
		</>
	)
}
