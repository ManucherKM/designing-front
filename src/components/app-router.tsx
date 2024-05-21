import type { FC } from 'react'

import { Route, Routes } from 'react-router'

import { privateRoutes, publicRoutes } from '@/config/routes'
import { useAuthStore } from '@/storage'
import { TypographyH1 } from './typography-h1'

export const AppRouter: FC = () => {
	const isAuth: boolean = !!useAuthStore(store => store.token)

	return (
		<Routes>
			{publicRoutes.map(route => (
				<Route
					key={route.path}
					path={route.path}
					element={<route.component />}
				/>
			))}

			{isAuth &&
				privateRoutes.map(route => (
					<Route
						key={route.path}
						path={route.path}
						element={<route.component />}
					/>
				))}

			<Route
				path="/*"
				element={
					<div className="w-full h-screen flex justify-center items-center">
						<TypographyH1>Error 404 | Страница не найдена</TypographyH1>
					</div>
				}
			/>
		</Routes>
	)
}
