import { useToast } from '@/components/ui/use-toast'
import { useScaningStore } from '@/storage'
import { TUpdateScaningData } from '@/storage/scaning/types'
import { useLoader } from './useLoader'

export function useUpdateScaning() {
	const update = useScaningStore(store => store.update)

	const loader = useLoader()

	const { toast } = useToast()

	return async function (id: string, data: TUpdateScaningData) {
		const coefficients = await loader(update, id, data)

		if (!coefficients) {
			toast({ title: 'Не удалось обновить коэфиценты сканирования' })
			return
		}

		toast({ title: 'Коэфиценты успешно обновлены' })
	}
}
