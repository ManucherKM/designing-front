import { RecursivePartial } from '@/storage/types'

export type TUpdateDesigningData = Omit<
	RecursivePartial<IDesigningCoefficients>,
	'_id'
>

export interface IDesigningStore {
	coefficients: IDesigningCoefficients | null
	getCurrent(): Promise<IDesigningCoefficients | undefined>
	update(
		id: string,
		target: TUpdateDesigningData,
	): Promise<TUpdateDesigningData | undefined>
}

export interface IDesigningCoefficients {
	_id: string
	geometry_complexity: {
		easy: number
		normal: number
		hard: number
	}
	technology: {
		fdm: number
		photopolymer: number
	}
	assignment: {
		layout: number
		artistic: number
		technical: number
	}
	postprocessing: {
		easy: number
		normal: number
		hard: number
	}
}
