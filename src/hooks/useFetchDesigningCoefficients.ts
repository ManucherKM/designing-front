import { useToast } from '@/components/ui/use-toast'
import { useDesigningStore } from '@/storage'
import { IDesigningCoefficients } from '@/storage/designing/types'
import { useEffect, useState } from 'react'
import { useLoader } from './useLoader'

export const useFetchDesigningCoefficients = () => {
	try {
		const savedCoefficients = useDesigningStore(store => store.coefficients)

		const [coefficients, setCoefficients] = useState<IDesigningCoefficients | undefined>()

		const getCurrent = useDesigningStore(store => store.getCurrent)

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
						title: 'Не удалось получить коэффициенты для расчета стоимости 3D печати',
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
