import { Subnav } from 'components'

const difficultyTypes = {
	Easy: 'success',
	Medium: 'primary',
	Hard: 'danger',
}

const DifficultyInput = ({ difficulty, setState }) => {
	const items = Object.entries(difficultyTypes).map(([d, t]) => ({
		value: d,
		type: t,
		active: d === difficulty,
		onClick: () => setState(d),
	}))

	return (
		<div className="padding-text-top">
			<p
				className="uk-text-primary"
				style={{
					marginLeft: '0.5rem',
					marginBottom: '0.25rem',
				}}
			>
				Difficulty
			</p>
			<Subnav items={items} padding={false} />
		</div>
	)
}

export default DifficultyInput
