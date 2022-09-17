import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Feature = ({ title, icon, children }) => (
	<div className="uk-flex">
		<div
			className="uk-flex uk-flex-column uk-flex-center uk-text-center uk-width-full"
			data-uk-margin
		>
			<p className="uk-text-primary text-larger uk-text-capitalize uk-text-bold">
				<FontAwesomeIcon icon={icon} transform="left-1.5" />
				{title}
			</p>
			<p>{children}</p>
		</div>
	</div>
)

export default Feature
