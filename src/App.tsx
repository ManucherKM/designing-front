import { Toaster } from '@/components/ui/toaster'
import { AppRouter } from './components/app-router'
import { CustomRouter } from './components/custom-router'
import { LoaderProvider } from './components/loader-provider'
import { ThemeProvider } from './components/theme-provider'
import { history } from './config/history'

export const App = () => {
	return (
		<CustomRouter history={history}>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<LoaderProvider>
					<Toaster />
					<AppRouter />
				</LoaderProvider>
			</ThemeProvider>
		</CustomRouter>
	)
}
