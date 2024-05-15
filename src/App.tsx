import { Tabs } from './components/tabs'
import { ThemeProvider } from './components/theme-provider'

export const App = () => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Tabs />
		</ThemeProvider>
	)
}
