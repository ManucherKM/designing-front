import { DesigningUpdateForm } from '@/components/designing-update-form'
import { TypographyH2 } from '@/components/typography-h2'

export const Designing = () => {
	return (
		<div className="max-w-[1250px] mx-auto">
			<TypographyH2 className="mb-12">3D печать</TypographyH2>
			<DesigningUpdateForm />
		</div>
	)
}
