import { Card, Subnav } from 'components'

const InnerLayout = ({ children, key, title, items = undefined, ...props }) => (
	<Card {...props}>
		<div className="uk-align-center" style={{ maxWidth: 800 }}>
			{title && (
				<p
					className="uk-text-center uk-text-primary uk-text-capitalize uk-text-bold uk-padding-small"
					style={{ fontSize: '2.25em' }}
				>
					{title}
				</p>
			)}
			{items && <Subnav key={key} items={items} />}
			{children}
		</div>
	</Card>
)

export default InnerLayout
