export interface IModelingStore {
	getCurrent(): Promise<IModelingCoefficients | undefined>
}

export interface IModelingCoefficients {
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
