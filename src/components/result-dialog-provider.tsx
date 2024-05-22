import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useResultDialogStore } from '@/storage'
import { FC, ReactNode } from 'react'
import { Table } from './results-table'
import { Button } from './ui/button'

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
						<DialogTitle className="text-left">
							Предварительные результаты
						</DialogTitle>
						<DialogDescription className="text-justify !mt-3">
							Результаты подсчетов в данном калькуляторе носят информационный
							характер и ни при каких условиях{' '}
							<span className="underline"> не являются публичной офертой</span>,
							определяемой положениями Статьи 437(2) Гражданского кодекса РФ.
						</DialogDescription>
					</DialogHeader>
					<div>
						<Table />
						<Button className="mt-5 w-full">Отправить заявку</Button>
					</div>
				</DialogContent>
			</Dialog>
			{children}
		</>
	)
}
