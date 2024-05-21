import type { FC } from 'react'

import { Admin, Home } from '@/pages'

export interface IRoute {
	path: string

	component: FC
}

export enum ERoutes {
	home = '/',

	admin = '/admin',
}

export const publicRoutes: IRoute[] = [
	{
		path: ERoutes.home,
		component: Home,
	},
]

export const privateRoutes: IRoute[] = [
	{
		path: ERoutes.admin,
		component: Admin,
	},
]
