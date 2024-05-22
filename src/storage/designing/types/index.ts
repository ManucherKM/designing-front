export interface IDesigningStore {
	coefficients: IDesigningCoefficients | null
	getCurrent(): Promise<IDesigningCoefficients | undefined>
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
	postprocessing: number
}
