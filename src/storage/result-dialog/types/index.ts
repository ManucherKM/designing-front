import { IDesigningFormData } from '@/components/designing'
import { IModelingFormData } from '@/components/modeling'
import { IScanningFormData } from '@/components/scanning'

export interface IResultDialogStore {
	isShow: boolean

	setShow: (target: boolean) => void

	scanningData: IScanningFormData | null

	setScanning: (target: IScanningFormData | null) => void

	designingData: IDesigningFormData | null

	setDesigning: (target: IDesigningFormData | null) => void

	modelingData: IModelingFormData | null

	setModeling: (target: IModelingFormData | null) => void
}
