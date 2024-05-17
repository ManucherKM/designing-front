import { RotateCcw, UserCog } from 'lucide-react'

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { useEffect, useState } from 'react'
import { AdminDialog } from './admin-dialog'

export const Command = () => {
	const [open, setOpen] = useState(false)
	const [openAdminDialog, setOpenAdminDialog] = useState(false)

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === ' ' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen(open => !open)
			}
		}

		document.addEventListener('keydown', down)
		return () => document.removeEventListener('keydown', down)
	}, [])

	return (
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder="Введите команду для поиска..." />
			<CommandList>
				<CommandEmpty>Ничего не найдено.</CommandEmpty>
				<CommandGroup heading="Возможности">
					<CommandItem>
						<AdminDialog
							open={openAdminDialog}
							onOpenChange={open => {
								setOpenAdminDialog(open)
							}}
						>
							<div className="flex w-full">
								<UserCog className="mr-2 h-4 w-4" />
								<span>Админка</span>
							</div>
						</AdminDialog>
					</CommandItem>
					<CommandItem onSelect={() => location.reload()}>
						<RotateCcw className="mr-2 h-4 w-4" />
						<span>Перезагрузить</span>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	)
}
