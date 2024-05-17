import { Command } from './components/command'
import { LoaderProvider } from './components/loader-provider'
import { Tabs } from './components/tabs'
import { ThemeProvider } from './components/theme-provider'

export const App = () => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<LoaderProvider>
				<Tabs />
				<Command />
			</LoaderProvider>
		</ThemeProvider>
	)
}
