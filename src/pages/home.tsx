import { Command } from '@/components/command'
import { Tabs } from '@/components/tabs'

export const Home = () => {
	return (
		<>
			<Tabs defaultTab="modeling" />
			<Command />
		</>
	)
}
