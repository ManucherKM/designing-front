import { useToast } from '@/components/ui/use-toast'
import { useScaningStore } from '@/storage'
import { IScanningCoefficients } from '@/storage/scaning/types'
import { useEffect, useState } from 'react'
import { useLoader } from './useLoader'

export const useFetchScaningCoefficients = () => {
	try {
		const savedCoefficients = useScaningStore(store => store.coefficients)

		const [coefficients, setCoefficients] = useState<IScanningCoefficients>()

		const getCurrent = useScaningStore(store => store.getCurrent)

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
						title: 'Не удалось получить коэффициенты для расчета стоимости сканирования',
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
