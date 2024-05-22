import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { ERoutes } from '@/config/routes'
import { useLoader } from '@/hooks'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/storage'
import { LogOut, Menu } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DesktopView } from './desktop-view'
import { MobileView } from './mobile-view'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'

export function AdminNavbar() {
	const [open, setOpen] = useState(false)

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
		<>
			<DesktopView>
				<NavigationMenu className="max-w-[1250px] px-4 my-5 mx-auto flex justify-end">
					<NavigationMenuList className="ml-auto">
						<NavigationMenuItem>
							<Link
								to={ERoutes.scaning}
								className={navigationMenuTriggerStyle()}
							>
								Сканирование
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link
								to={ERoutes.designing}
								className={navigationMenuTriggerStyle()}
							>
								3D печать
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link
								to={ERoutes.modeling}
								className={navigationMenuTriggerStyle()}
							>
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
								className={cn(navigationMenuTriggerStyle(), 'cursor-pointer')}
								onClick={logoutHandler}
							>
								<LogOut className="w-5 " />
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</DesktopView>
			<MobileView>
				<div className="relative">
					<div className="flex justify-end px-4 my-5">
						<Button
							variant={'ghost'}
							className="p-2"
							onClick={() => setOpen(prev => !prev)}
						>
							<Menu className="w-7 h-7" />
						</Button>
					</div>
					{open && (
						<div className="absolute w-full bg-background flex flex-col justify-center items-center">
							<NavigationMenu className="w-full px-4 my-5 flex flex-col">
								<NavigationMenuList className="flex flex-col gap-2">
									<NavigationMenuItem>
										<Link
											to={ERoutes.scaning}
											className={navigationMenuTriggerStyle()}
										>
											Сканирование
										</Link>
									</NavigationMenuItem>
									<NavigationMenuItem>
										<Link
											to={ERoutes.designing}
											className={navigationMenuTriggerStyle()}
										>
											3D печать
										</Link>
									</NavigationMenuItem>
									<NavigationMenuItem>
										<Link
											to={ERoutes.modeling}
											className={navigationMenuTriggerStyle()}
										>
											Моделирование
										</Link>
									</NavigationMenuItem>
									<NavigationMenuItem>
										<Link
											to={ERoutes.home}
											className={navigationMenuTriggerStyle()}
										>
											Калькулятор
										</Link>
									</NavigationMenuItem>
									<NavigationMenuItem>
										<NavigationMenuLink
											className={cn(
												navigationMenuTriggerStyle(),
												'cursor-pointer',
											)}
											onClick={logoutHandler}
										>
											<LogOut className="w-5 " />
										</NavigationMenuLink>
									</NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>
						</div>
					)}
				</div>
			</MobileView>
		</>
	)
}
