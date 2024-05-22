import {
	TabsContent,
	TabsList,
	TabsTrigger,
	Tabs as UiTabs,
} from '@/components/ui/tabs'
import { FC, ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Designing } from './designing'
import { List } from './list'
import { Modeling } from './modeling'
import { Scanning } from './scanning'

export enum ETabListItemValues {
	scanning = 'scanning',
	designing = 'designing',
	modeling = 'modeling',
}

export interface ITabListItem {
	value: `${ETabListItemValues}`
	text: string
	content: ReactNode
}

export const tabList: ITabListItem[] = [
	{
		value: ETabListItemValues.scanning,
		text: 'Сканирование',
		content: <Scanning />,
	},
	{
		value: ETabListItemValues.designing,
		text: '3D-Печать',
		content: <Designing />,
	},
	{
		value: ETabListItemValues.modeling,
		text: 'Моделирование',
		content: <Modeling />,
	},
]

export interface ITabs {
	defaultTab?: `${ETabListItemValues}`
}

export const Tabs: FC<ITabs> = ({ defaultTab }) => {
	const [searchParams, setSearchParams] = useSearchParams()

	const tab = searchParams.get('tab')
	return (
		<div className="max-w-[1250px] px-4 mx-auto p-10 ph_lg:p-4">
			<UiTabs defaultValue={tab || defaultTab || ETabListItemValues.scanning}>
				<TabsList
					className="grid w-full"
					style={{
						gridTemplateColumns: `repeat(${tabList.length}, minmax(0, 1fr))`,
					}}
				>
					<List
						arr={tabList}
						callback={tab => (
							<TabsTrigger
								key={'tab-' + tab.value}
								value={tab.value}
								onClick={() => {
									setSearchParams(params => {
										params.set('tab', tab.value)
										return params
									})
								}}
							>
								{tab.text}
							</TabsTrigger>
						)}
					/>
				</TabsList>
				<List
					arr={tabList}
					callback={tab => (
						<TabsContent key={tab.value} value={tab.value}>
							{tab.content}
						</TabsContent>
					)}
				/>
			</UiTabs>
		</div>
	)
}
