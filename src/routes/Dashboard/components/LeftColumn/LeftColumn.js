import React, { useContext } from 'react'
import { Card, List, ListItem } from 'uikit-react'
import { DataContext } from 'contexts/DataContext'
import { Link } from '@reach/router'
import { challengeGroups } from 'data/settings.json'
import { capitalize } from 'lodash'
import { faUser, faUserSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const LeftColumn = () => (
	<div className='uk-width-auto uk-width-1-3@m uk-padding-remove-left'>
		<div className='uk-visible@m' style={{ height: 'calc(100% - 2.5em)' }}>
			<Card className='uk-height-1-1'>
				<Info/>
			</Card>
		</div>
		<div id='info' data-uk-offcanvas='overlay: true'>
			<div className='uk-offcanvas-bar'>
				<Info/>
			</div>
		</div>
	</div>
)

const Info = () => {
	const { userInfo, challenges } = useContext(DataContext)
	
	return userInfo === undefined ? null : userInfo.username ? (
		<div>
			<p className='font-size-large uk-text-center uk-margin-remove-bottom'>
				<FontAwesomeIcon
					icon={faUser}
					className='icon-left'
					transform='shrink-4'
				/>
				{userInfo.username}
			</p>
			<List>
				{challengeGroups.map(g => (
					<ListItem>
						<Link to={`/${g}`}>
							{`${capitalize(g)}: ${challenges[g].length}`}
						</Link>
					</ListItem>
				))}
			</List>
		</div>
	) : (
		<p className='font-size-large uk-text-center uk-text-muted'>
			<FontAwesomeIcon
				icon={faUserSlash}
				className='icon-left'
				transform='shrink-4 down-0.4'
			/>
			No info...
		</p>
	)
}
