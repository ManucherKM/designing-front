import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { ERoutes } from '@/config/routes'
import { useLoader } from '@/hooks'
import { useAuthStore } from '@/storage'
import { LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from './ui/use-toast'

export function AdminNavbar() {
	const logout = useAuthStore(store => store.logout)

	const loader = useLoader()

	const navigate = useNavigate()

	const { toast } = useToast()

	async function logoutHandler() {
		const isSuccess = await loader(logout)

		if (!isSuccess) {
			toast({ title: 'Не удалось выйти из ученой записи администратора' })

			return
		}

		toast({ title: 'Вы вышли из учетной записи администратора' })

		navigate(ERoutes.home)
	}
	return (
		<NavigationMenu className="max-w-[1250px] my-5 mx-auto flex justify-end">
			<NavigationMenuList className="ml-auto">
				<NavigationMenuItem>
					<Link to={ERoutes.scaning} className={navigationMenuTriggerStyle()}>
						Сканирование
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link to={ERoutes.designing} className={navigationMenuTriggerStyle()}>
						3D печать
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link to={ERoutes.modeling} className={navigationMenuTriggerStyle()}>
						Моделирование
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link to={ERoutes.home} className={navigationMenuTriggerStyle()}>
						Калькулятор
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						className={navigationMenuTriggerStyle()}
						onClick={logoutHandler}
					>
						<LogOut className="w-5 " />
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}
