export function compareObj(objA: object, objB: object) {
	return JSON.stringify(objA) === JSON.stringify(objB)
}
