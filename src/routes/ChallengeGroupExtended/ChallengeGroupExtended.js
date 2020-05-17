import { InnerLayout, NoChallenges } from 'components'
import UserContext from 'contexts/UserContext'
import { challengeGroups, itemsPerPage } from 'data/settings.json'
import { upperFirst } from 'lodash'
import React, { useContext, useState } from 'react'
import { Accordion, Pagination, Search } from './components'

const ChallengeGroupExtended = ({ group, navigate }) => {
	const context = useContext(UserContext)
	
	const [pattern, setPattern] = useState(/.*/)
	const [page, setPage] = useState(1)
	
	const search = e => {
		const value = e.target.value || ' '
		setPattern(new RegExp(value.split(' ').join('.*'), 'i'))
		setPage(1)
	}
	
	const changePage = (e, page = +e.target.text) => {
		e.preventDefault()
		if (page > 0 && page <= maxPage) setPage(page)
	}
	
	const challengeGroup = context.challenges?.[group] || []
	const challenges = challengeGroup.filter(c => pattern.test(c.name))
	const maxPage = Math.ceil(challenges.length / itemsPerPage)
	
	const items = challengeGroups.map(g => ({
		value: upperFirst(g),
		active: g === group,
		onClick: () => {
			setPage(1)
			navigate(`../${g}`)
		},
	}))
	
	return (
		<InnerLayout {...{ items }}>
			<Search onChange={search}/>
			<div className='text-large'>
				{!challenges.length ? (
					<NoChallenges extended/>
				) : (
					<Accordion
						key={group + page}
						{...{ challenges, group, page, navigate }}
					/>
				)}
			</div>
			{challenges.length > itemsPerPage && (
				<Pagination {...{ page, maxPage, changePage }}/>
			)}
		</InnerLayout>
	)
}

export default ChallengeGroupExtended
