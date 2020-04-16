import { InnerLayout } from 'components/InnerLayout'
import { NoChallenges } from 'components/NoChallenges'
import { DataContext } from 'contexts/DataContext'
import { itemsPerPage } from 'data/settings.json'
import React, { useContext, useState } from 'react'
import { ChallengeAccordion } from './components/ChallengeAccordion'
import { Pagination } from './components/Pagination'
import { Search } from './components/Search'

export const ChallengeGroupExtended = ({ left, right, navigate }) => {
	const context = useContext(DataContext)
	const [pattern, setPattern] = useState(/.*/)
	const [page, setPage] = useState(0)
	
	const search = e => {
		const value = e.target.value || ' '
		setPattern(new RegExp(value.split(' ').join('.*'), 'i'))
		setPage(0)
	}
	
	const changePage = (e, diff) => {
		e.preventDefault()
		const newPage = page + diff
		if (newPage >= 0 && newPage < maxPage) setPage(newPage)
	}
	
	const group = window.location.pathname.slice(1)
	const challengeGroup = context.challenges?.[group] || []
	const challenges = challengeGroup.filter(c => pattern.test(c.name))
	const maxPage = Math.ceil(challenges.length / itemsPerPage)
	
	return (
		<InnerLayout title={group} {...{left, right}}>
			<Search onChange={search}/>
			{challenges.length
				? <ChallengeAccordion {...{ challenges, group, page, navigate }}/>
				: <NoChallenges extended/>
			}
			{challenges.length > itemsPerPage && (
				<Pagination {...{ page, maxPage, changePage }}/>
			)}
		</InnerLayout>
	)
}
