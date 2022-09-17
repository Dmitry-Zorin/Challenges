import createChallengeImg from 'images/Create-challenges.png'
import monitorProgressImg from 'images/Monitor-progress.png'
import updateAnytimeImg from 'images/Update-anytime.png'
import CreateChallengesFeature from './components/CreateChallengesFeature'
import MonitorProgressFeature from './components/MonitorProgressFeature'
import UpdateAnytimeFeature from './components/UpdateAnytimeFeature'

const features = [
	{
		src: createChallengeImg,
		Component: CreateChallengesFeature,
	},
	{
		src: monitorProgressImg,
		Component: MonitorProgressFeature,
	},
	{
		src: updateAnytimeImg,
		Component: UpdateAnytimeFeature,
	},
]

export default features
