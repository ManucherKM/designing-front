import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useResultDialogStore } from '@/storage'
import { FC, ReactNode } from 'react'
import { UserAuthForm } from './user-auth-form'

export interface IResultDialog {
	children: ReactNode
}

export const ResultDialogProvider: FC<IResultDialog> = ({ children }) => {
	const open = useResultDialogStore(store => store.isShow)
	const setShow = useResultDialogStore(store => store.setShow)

	return (
		<>
			<Dialog open={open} onOpenChange={setShow}>
				<DialogContent className="sm:max-w-[425px] rounded-lg">
					<DialogHeader>
						<DialogTitle className="text-left">Что то</DialogTitle>
						<DialogDescription className="text-justify !mt-3">
							Тото
						</DialogDescription>
					</DialogHeader>
					<UserAuthForm />
				</DialogContent>
			</Dialog>
			{children}
		</>
	)
}
