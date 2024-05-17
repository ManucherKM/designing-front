export function getNumberWithoutZeroes(n: number) {
	return n.toFixed(2).replace(/\.?0+$/, '')
}
