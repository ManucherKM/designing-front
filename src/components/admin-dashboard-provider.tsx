import { useAuthStore } from '@/storage'
import { FC, ReactNode } from 'react'
import { AdminNavbar } from './admin-navbar'

export interface IAdminDashboard {
	children: ReactNode
}

export const AdminDashboardProvider: FC<IAdminDashboard> = ({ children }) => {
	const isAuth = !!useAuthStore(store => store.token)

	return (
		<>
			{isAuth && (
				<>
					<AdminNavbar />
				</>
			)}

			{children}
		</>
	)
}
