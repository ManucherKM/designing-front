import { RecursivePartial } from '@/storage/types'

export type TUpdateModelingData = Omit<
	RecursivePartial<IModelingCoefficients>,
	'_id'
>

export interface IModelingStore {
	coefficients: IModelingCoefficients | null
	getCurrent(): Promise<IModelingCoefficients | undefined>
	update(
		id: string,
		target: TUpdateModelingData,
	): Promise<IModelingCoefficients | undefined>
}

export interface IModelingCoefficients {
	_id: string
	geometry_complexity: {
		easy: number
		normal: number
		hard: number
	}
	model_type: {
		artistic: number
		engineer: number
	}
	design_documentation: number
	visualization: number
	animation: number
}
