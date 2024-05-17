import { cn } from '@/lib/utils'
import { FC, HTMLAttributes } from 'react'

export interface TTypographyH2 extends HTMLAttributes<HTMLHeadingElement> {}

export const TypographyH2: FC<TTypographyH2> = ({ children, className, ...props }) => {
	return (
		<h2
			className={cn('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0', className)}
			{...props}
		>
			{children}
		</h2>
	)
}
