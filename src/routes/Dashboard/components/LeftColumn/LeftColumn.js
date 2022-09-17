import Card from 'components/Card'
import Info from './Info'

const LeftColumn = () => (
	<>
		<Card className="uk-visible@m uk-width-1-3">
			<Info />
		</Card>
		<div id="info" data-uk-offcanvas="overlay: true">
			<div className="uk-offcanvas-bar">
				<Info />
			</div>
		</div>
	</>
)

export default LeftColumn
