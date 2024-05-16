import {
	TabsContent,
	TabsList,
	TabsTrigger,
	Tabs as UiTabs,
} from '@/components/ui/tabs'
import { ReactNode } from 'react'
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
		text: 'Проектирование',
		content: <Designing />,
	},
	{
		value: ETabListItemValues.modeling,
		text: 'Моделирование',
		content: <Modeling />,
	},
]

export const Tabs = () => {
	return (
		<div className="max-w-[1250px] mx-auto p-10 ph_lg:p-4">
			<UiTabs defaultValue="scanning">
				<TabsList
					className="grid w-full"
					style={{
						gridTemplateColumns: `repeat(${tabList.length}, minmax(0, 1fr))`,
					}}
				>
					<List
						arr={tabList}
						callback={tab => (
							<TabsTrigger key={'tab-' + tab.value} value={tab.value}>
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
