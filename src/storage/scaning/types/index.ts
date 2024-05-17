export interface IScaningStore {
	getCurrent(): Promise<IScanningCoefficients | undefined>
}

export interface IScanningCoefficients {
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
