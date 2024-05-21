export type Token = string | null

export interface ILoginTarget {
	email: string

	password: string
}

export interface IRegistrationTarget {
	email: string

	password: string
}

export interface IAuthStore {
	token: Token

	login: (loginDto: ILoginTarget) => Promise<boolean>

	registration: (registrationDto: IRegistrationTarget) => Promise<boolean>

	getNewAccessToken: () => Promise<boolean>

	setToken: (token: Token) => void

	logout: () => Promise<boolean>

	reset: () => void
}
