import { useToast } from '@/components/ui/use-toast'
import { useModelingStore } from '@/storage'
import { TUpdateModelingData } from '@/storage/modeling/types'
import { useLoader } from './useLoader'

export function useUpdateModeling() {
	const update = useModelingStore(store => store.update)

	const loader = useLoader()

	const { toast } = useToast()

	return async function (id: string, data: TUpdateModelingData) {
		const coefficients = await loader(update, id, data)

		if (!coefficients) {
			toast({ title: 'Не удалось обновить коэфиценты моделирования' })
			return
		}

		toast({ title: 'Коэфиценты успешно обновлены' })
	}
}
