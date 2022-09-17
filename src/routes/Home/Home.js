import Authorization from 'components/Authorization'
import { Features, ScrollDown, Slideshow } from './components'
import styles from './Home.module.scss'

const slideshowId = 'slideshow'

const Home = () => (
	<>
		<Features />
		<ScrollDown target={slideshowId} />
		<Slideshow id={slideshowId} />
		<div className={styles.registration}>
			<Authorization />
		</div>
	</>
)

export default Home
