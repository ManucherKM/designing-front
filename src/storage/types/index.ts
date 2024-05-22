export type RecursivePartial<T> = {
	[P in keyof T]?: RecursivePartial<T[P]>
}

// export interface IValidationError {
//     statusCode: string, error: string, message: string[]
// }
