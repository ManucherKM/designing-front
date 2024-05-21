import type { BrowserHistory } from 'history'
import type { FC } from 'react'

import { useLayoutEffect, useState } from 'react'

import { Router, RouterProps } from 'react-router-dom'

export type TCustomRouter = Omit<
	RouterProps,
	'location' | 'navigationType' | 'navigator'
>

export interface ICustomRouter extends TCustomRouter {
	history: BrowserHistory
}

export const CustomRouter: FC<ICustomRouter> = ({ history, ...props }) => {
	const [route, setRoute] = useState({
		action: history.action,
		location: history.location,
	})

	const historyHandler = () => {
		history.listen(setRoute)
	}

	useLayoutEffect(historyHandler, [history])

	return (
		<Router
			{...props}
			location={route.location}
			navigationType={route.action}
			navigator={history}
		/>
	)
}
