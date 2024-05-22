import { ModelingUpdateForm } from '@/components/modeling-update-form'
import { TypographyH2 } from '@/components/typography-h2'

export const Modeling = () => {
	return (
		<div className="max-w-[1250px] px-4 mx-auto">
			<TypographyH2 className="mb-12">Моделирование</TypographyH2>
			<ModelingUpdateForm />
		</div>
	)
}
