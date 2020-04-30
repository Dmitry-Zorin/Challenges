import InnerLayout from 'components/InnerLayout'
import NoChallenges from 'components/NoChallenges'
import DataContext from 'contexts/DataContext'
import { challengeGroups, itemsPerPage } from 'data/settings.json'
import { upperFirst } from 'lodash'
import React, { useContext, useState } from 'react'
import { Accordion, Pagination, Search } from './components'

const ChallengeGroupExtended = ({ group, navigate }) => {
	const context = useContext(DataContext)
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
		onClick: () => navigate(`../${g}`),
	}))
	
	return (
		<InnerLayout title={group} {...{ items }}>
			<Search onChange={search}/>
			{!challenges.length ? <NoChallenges extended/> : (
				<Accordion key={group} {...{ challenges, group, page, navigate }}/>
			)}
			{challenges.length > itemsPerPage && (
				<Pagination {...{ page, maxPage, changePage }}/>
			)}
		</InnerLayout>
	)
}

export default ChallengeGroupExtended
