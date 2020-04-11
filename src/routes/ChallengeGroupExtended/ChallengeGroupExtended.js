import React, { useContext, useState } from 'react'
import { InnerLayout } from 'components/InnerLayout'
import { DataContext } from 'contexts/DataContext'
import { Pagination } from './components/Pagination'
import { ChallengeAccordion } from './components/ChallengeAccordion'
import { Search } from './components/Search'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { itemsPerPage } from 'data/settings.json'

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
	
	const groupName = window.location.pathname.slice(1)
	const group = context.challenges?.[groupName] || []
	const challenges = group.filter(c => pattern.test(c.name))
	const maxPage = Math.ceil(challenges.length / itemsPerPage)
	
	return (
		<InnerLayout title={groupName} left={left} right={right}>
			<Search onChange={search}/>
			{challenges.length ? (
				<ChallengeAccordion
					challenges={challenges}
					page={page}
					groupName={groupName}
					navigate={navigate}
				/>
			) : (
				<p
					className='font-size-medium uk-text-center uk-text-muted'
					style={{ marginTop: '3em' }}
				>
					<FontAwesomeIcon
						icon={faBan}
						className='icon-left'
						transform='shrink-4 down-0.5'
					/>
					No challenges...
				</p>
			)}
			{challenges.length > itemsPerPage && (
				<Pagination page={page} maxPage={maxPage} changePage={changePage}/>
			)}
		</InnerLayout>
	)
}
