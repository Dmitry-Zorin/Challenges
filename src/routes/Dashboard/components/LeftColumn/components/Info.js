import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AnimatedListItem from 'components/animated/AnimatedListItem'
import Link from 'components/Link'
import DataContext from 'contexts/DataContext'
import { challengeGroups } from 'data/settings.json'
import { upperFirst } from 'lodash'
import React, { useContext } from 'react'
import { Flex, List } from 'uikit-react'

const Info = () => {
	const { userInfo, challenges } = useContext(DataContext)
	
	return userInfo === undefined ? null : (
		<>
			<p className='uk-text-primary text-large uk-text-center'>
				<FontAwesomeIcon icon='user' transform='shrink-5 down-0.8'/>
				{userInfo.username}
			</p>
			<Flex className='uk-margin-top'>
				<List>
					{challengeGroups.map(g => (
						<AnimatedListItem key={g}>
							<Link to={g} text={[upperFirst(g), challenges[g].length].join(': ')}/>
						</AnimatedListItem>
					))}
				</List>
			</Flex>
		</>
	)
}

export default Info
