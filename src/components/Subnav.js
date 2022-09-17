import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonGroup, HStack } from 'components'
import { motion } from 'framer-motion'
import { gentleSpringConfig } from 'scripts/animations'

const Subnav = ({ items, ...props }) => {
	const key = JSON.stringify(items.map((e) => e.value))

	return (
		<ButtonGroup subnav className="uk-border-pill subnav" {...props}>
			{items.map(({ active, type = 'primary', icon, value, onClick }) => (
				<div
					key={value}
					className="uk-position-relative"
					style={{ cursor: 'pointer' }}
					onMouseDown={onClick}
				>
					<div className="button" />
					{active && (
						<motion.div
							layoutId={active ? `${key} active` : undefined}
							className={`button uk-position-cover ${active ? type : ''}`}
							transition={gentleSpringConfig}
						/>
					)}
					<div
						className={`uk-position-cover ${active ? 'active' : ''}`}
						style={{ zIndex: 1, pointerEvents: 'none' }}
					>
						<HStack className="uk-position-center uk-text-uppercase uk-text-small">
							{icon && <FontAwesomeIcon icon={icon} />}
							<p>{value}</p>
						</HStack>
					</div>
				</div>
			))}
		</ButtonGroup>
	)
}

export default Subnav
