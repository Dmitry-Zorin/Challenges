import SpinnerContext from 'contexts/SpinnerContext'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import circles from './LinkCenter.animation'

const numberOfCircles = 5

const LinkCenter = () => {
	const { spinnerIsVisible } = useContext(SpinnerContext)

	return (
		<a
			href="/#"
			style={{ pointerEvents: 'none' }}
			onClick={(e) => e.preventDefault()}
		>
			{spinnerIsVisible &&
				Array.from(Array(numberOfCircles).keys()).map((i) => (
					<motion.div
						key={i}
						custom={[numberOfCircles, i]}
						initial={false}
						animate="animate"
						variants={circles}
					>
						<div
							className="uk-border-pill"
							style={{ background: 'currentColor', padding: 2, margin: 2 }}
						/>
					</motion.div>
				))}
		</a>
	)
}

export default LinkCenter
