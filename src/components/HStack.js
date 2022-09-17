const HStack = ({ children, className = '', ...props }) => (
	<div className={`uk-flex uk-flex-middle ${className}`} {...props}>
		{children}
	</div>
)

export default HStack
