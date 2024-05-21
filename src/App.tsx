import { Toaster } from '@/components/ui/toaster'
import { AppRouter } from './components/app-router'
import { CustomRouter } from './components/custom-router'
import { LoaderProvider } from './components/loader-provider'
import { LoginDialogProvider } from './components/login-dialog-provider'
import { ThemeProvider } from './components/theme-provider'
import { history } from './config/history'

export const App = () => {
	return (
		<CustomRouter history={history}>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<LoaderProvider>
					<LoginDialogProvider>
						<Toaster />
						<AppRouter />
					</LoginDialogProvider>
				</LoaderProvider>
			</ThemeProvider>
		</CustomRouter>
	)
}
