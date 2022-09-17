const Card = ({ className = '', children, ...props }) => (
	<div
		className={`
			uk-card
			uk-card-default
			uk-card-body
			${className}
		`}
		{...props}
	>
		{children}
	</div>
)

export default Card
