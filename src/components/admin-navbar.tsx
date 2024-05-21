import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { ERoutes } from '@/config/routes'
import { Link } from 'react-router-dom'

export function AdminNavbar() {
	return (
		<NavigationMenu className="ml-auto">
			<NavigationMenuList>
				<NavigationMenuItem>
					<Link to={ERoutes.scaning}>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							Сканирование
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link to={ERoutes.designing}>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							3D печать
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link to={ERoutes.modeling}>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							Моделирование
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}
