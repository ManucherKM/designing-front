import { useToast } from '@/components/ui/use-toast'
import { useDesigningStore } from '@/storage'
import { TUpdateDesigningData } from '@/storage/designing/types'
import { useLoader } from './useLoader'

export function useUpdateDesigning() {
	const update = useDesigningStore(store => store.update)

	const loader = useLoader()

	const { toast } = useToast()

	return async function (id: string, data: TUpdateDesigningData) {
		const coefficients = await loader(update, id, data)

		if (!coefficients) {
			toast({ title: 'Не удалось обновить коэфиценты 3D печати' })
			return
		}

		toast({ title: 'Коэфиценты успешно обновлены' })
	}
}
