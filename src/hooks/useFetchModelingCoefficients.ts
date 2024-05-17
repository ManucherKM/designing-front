import { useToast } from '@/components/ui/use-toast'
import { useModelingStore } from '@/storage'
import { IModelingCoefficients } from '@/storage/modeling/types'
import { useEffect, useState } from 'react'
import { useLoader } from './useLoader'

export const useFetchModelingCoefficients = () => {
	try {
		const savedCoefficients = useModelingStore(store => store.coefficients)

		const [coefficients, setCoefficients] = useState<IModelingCoefficients | undefined>()

		const getCurrent = useModelingStore(store => store.getCurrent)

		const { toast } = useToast()

		const loader = useLoader()

		useEffect(() => {
			const fetchCoefficients = async () => {
				try {
					let coefficients

					if (savedCoefficients === null) {
						coefficients = await loader(getCurrent)
					} else {
						coefficients = await getCurrent()
					}

					if (!coefficients) {
						throw new Error('Unexpected server error')
					}

					setCoefficients(coefficients)
				} catch (e: any) {
					toast({
						title: 'Не удалось получить коэффициенты для расчета стоимости моделирования',
						description: e.message,
					})
				}
			}

			fetchCoefficients()
		}, [])

		return coefficients
	} catch (e) {
		console.log(e)
	}
}
