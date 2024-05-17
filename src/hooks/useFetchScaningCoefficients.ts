import { useToast } from '@/components/ui/use-toast'
import { useScaningStore } from '@/storage'
import { IScanningCoefficients } from '@/storage/scaning/types'
import { useEffect, useState } from 'react'
import { useLoader } from './useLoader'

export const useFetchScaningCoefficients = () => {
	try {
		const [coefficients, setCoefficients] = useState<
			IScanningCoefficients | undefined
		>()

		const getCurrent = useScaningStore(store => store.getCurrent)

		const { toast } = useToast()

		const loader = useLoader()

		useEffect(() => {
			const fetchCoefficients = async () => {
				try {
					const coefficients = await loader(getCurrent)

					if (!coefficients) {
						return
					}

					setCoefficients(coefficients)
				} catch (e: any) {
					toast({
						title: 'Не удалось получить коэффициенты для расчета сканирования',
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
