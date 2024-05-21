import { cn } from '@/lib/utils'
import { FC, HTMLAttributes } from 'react'

export interface TTypographyH1 extends HTMLAttributes<HTMLHeadingElement> {}

export const TypographyH1: FC<TTypographyH1> = ({
	children,
	className,
	...props
}) => {
	return (
		<h1
			className={cn(
				'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
				className,
			)}
			{...props}
		>
			{children}
		</h1>
	)
}
