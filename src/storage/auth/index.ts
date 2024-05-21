import type { IAuthStore } from './types'

import axios from '@/config/axios'
import { env } from '@/config/env'
import { history } from '@/config/history'
import { ERoutes } from '@/config/routes'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useStore } from '../loader'

const CLIENT_URL = env.get('CLIENT_URL').required().asString()

const defaultStore = {
	token: null,
} as IAuthStore

export const useAuthStore = create(
	persist<IAuthStore>(
		(set, get) => ({
			...defaultStore,
			async login(loginDto) {
				try {
					const { data } = await axios.post<{ accessToken: string }>(
						'auth/login',
						loginDto,
					)

					if (!data?.accessToken) {
						return false
					}

					set({ token: data.accessToken })

					return true
				} catch (e) {
					console.error(e)

					return false
				}
			},

			async logout() {
				try {
					const { data } = await axios.get<{ success: boolean }>('auth/logout')

					if (!data?.success) {
						return false
					}

					useStore.getState().reset()

					get().reset()

					return true
				} catch (e) {
					console.error(e)
					return false
				}
			},
			async getNewAccessToken() {
				try {
					const { data } = await axios.post<{ accessToken: string }>(
						'jwt/token',
					)

					if (!data.accessToken) {
						return false
					}

					set({ token: data.accessToken })

					return true
				} catch (e) {
					console.error(e)

					get().logout()

					history.push(CLIENT_URL + ERoutes.home)

					return false
				}
			},
			setToken(token) {
				set({ token })
			},
			reset() {
				set(defaultStore)
			},
		}),
		{ name: 'auth-store' },
	),
)
