import { RecursivePartial } from '@/storage/types'

export type TUpdateScaningData = Omit<
	RecursivePartial<IScanningCoefficients>,
	'_id'
>

export interface IScaningStore {
	coefficients: IScanningCoefficients | null
	getCurrent(): Promise<IScanningCoefficients | undefined>
	update(
		id: string,
		target: TUpdateScaningData,
	): Promise<IScanningCoefficients | undefined>
}

export interface IScanningCoefficients {
	_id: string
	geometry_complexity: {
		easy: number
		normal: number
		hard: number
	}
	surface: {
		matte: number
		brilliant: number
	}
	scanning_accuracy: {
		'0.1': number
		'0.063': number
	}
}
