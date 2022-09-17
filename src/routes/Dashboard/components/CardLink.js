import Card from 'components/Card'
import { Link } from 'react-router-dom'

const CardLink = ({ to, text, children }) => {
	return (
		<Link to={to}>
			<Card className="uk-card-hover" data-uk-margin>
				{children}
			</Card>
		</Link>
	)
}

export default CardLink
