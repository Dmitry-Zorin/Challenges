import { Feature, Muted } from '.'

const CreateChallengesFeature = () => (
	<Feature title="create challenges" icon="calendar-plus">
		Choose any desired
		<Muted text=" name" />,
		<Muted text=" difficulty" />,
		<Muted text=" duration " />
		and
		<Muted text=" delay " />
		for the challenge!
	</Feature>
)

export default CreateChallengesFeature
