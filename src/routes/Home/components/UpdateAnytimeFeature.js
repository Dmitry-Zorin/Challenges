import { Feature, Muted } from '.'

const UpdateAnytimeFeature = () => (
	<Feature title="update anytime" icon="sync-alt">
		<Muted text=" Start" />,
		<Muted text=" complete" />,
		<Muted text=" edit " />
		or
		<Muted text=" delete " />
		challenges at any time!
	</Feature>
)

export default UpdateAnytimeFeature
