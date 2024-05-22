export function convertObjStrValsToNum(obj: any) {
	const localObj = { ...obj }

	for (const key in localObj) {
		if (typeof localObj[key] === 'string') {
			localObj[key] = +localObj[key]
		} else if (
			typeof localObj[key] === 'object' &&
			!Array.isArray(localObj[key]) &&
			localObj[key] !== null
		) {
			localObj[key] = convertObjStrValsToNum(localObj[key])
		}
	}

	return localObj
}
