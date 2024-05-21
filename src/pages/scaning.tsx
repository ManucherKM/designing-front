import { ScaningUpdateForm } from '@/components/scaning-update-form'
import { TypographyH2 } from '@/components/typography-h2'

export const Scaning = () => {
	return (
		<div className="p-6">
			<TypographyH2>Сканирование</TypographyH2>
			<ScaningUpdateForm />
		</div>
	)
}
