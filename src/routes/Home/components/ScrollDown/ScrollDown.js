import { motion } from 'framer-motion'
import arrows from './ScrollDown.animation'
import styles from './ScrollDown.module.scss'

const numberOfArrows = 3

const ScrollDown = ({ target }) => (
	<>
		<br className="uk-hidden@m" />
		<a href={`#${target}`} className="uk-visible@m" data-uk-scroll="offset: 80">
			<div className={styles.container}>
				<div>
					<p>Scroll Down</p>
					<ul className="uk-list" style={{ marginTop: '0.25rem' }}>
						{Array.from(Array(numberOfArrows).keys()).map((i) => (
							<motion.li
								key={i}
								style={{ height: 5 }}
								custom={[numberOfArrows, i]}
								animate="animate"
								variants={arrows}
							>
								<i className={styles.arrowDown} />
							</motion.li>
						))}
					</ul>
				</div>
			</div>
		</a>
	</>
)

export default ScrollDown
