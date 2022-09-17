import Card from 'components/Card'
import features from 'routes/Home/features'
import style from './Features.module.scss'

const Features = () => (
	<Card className={`${style.container} uk-padding`}>
		<div
			data-uk-grid
			className="uk-grid-divider uk-child-width-expand@m"
			style={{ height: '100%' }}
		>
			{features.map(({ Component }, i) => (
				<Component key={i} />
			))}
		</div>
	</Card>
)

export default Features
