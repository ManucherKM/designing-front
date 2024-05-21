import { FC, ReactNode } from 'react'
import { AdminNavbar } from './admin-navbar'

export interface IAdminDashboard {
	children: ReactNode
}

export const AdminDashboard: FC<IAdminDashboard> = ({ children }) => {
	return (
		<div>
			<AdminNavbar />

			<div className="mb-5" />

			{children}
		</div>
	)
}
