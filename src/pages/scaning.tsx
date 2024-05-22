import { ScaningUpdateForm } from '@/components/scaning-update-form'
import { TypographyH2 } from '@/components/typography-h2'

export const Scaning = () => {
	return (
		<div className="max-w-[1250px] mx-auto">
			<TypographyH2 className="mb-12">Сканирование</TypographyH2>
			<ScaningUpdateForm />
		</div>
	)
}
