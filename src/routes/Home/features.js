import Feature1 from 'routes/Home/components/Feature1'
import Feature2 from 'routes/Home/components/Feature2'
import Feature3 from 'routes/Home/components/Feature3'
import { create, monitor, update } from 'routes/Home/images'

const features = [
	{
		src: create,
		Component: Feature1,
	},
	{
		src: monitor,
		Component: Feature2,
	},
	{
		src: update,
		Component: Feature3,
	},
]

export default features
