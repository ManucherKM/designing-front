import type { FC } from 'react'

import { Designing, Home, Modeling, Scaning } from '@/pages'

export interface IRoute {
	path: string

	component: FC
}

export enum ERoutes {
	home = '/',
	designing = '/admin/designing',
	modeling = '/admin/modeling',
	scaning = '/admin/scaning',
}

export const publicRoutes: IRoute[] = [
	{
		path: ERoutes.home,
		component: Home,
	},
]

export const privateRoutes: IRoute[] = [
	{
		path: ERoutes.designing,
		component: Designing,
	},
	{
		path: ERoutes.modeling,
		component: Modeling,
	},
	{
		path: ERoutes.scaning,
		component: Scaning,
	},
]
