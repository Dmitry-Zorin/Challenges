import { upperFirst } from 'lodash'
import React from 'react'

const Title = ({ title, className }) => (
	<p className={`${className} font-size-xlarge uk-text-center`}>
		{upperFirst(title)}
	</p>
)

export default Title
