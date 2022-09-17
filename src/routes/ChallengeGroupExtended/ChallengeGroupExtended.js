import { InnerLayout, NoChallenges } from 'components'
import UserContext from 'contexts/UserContext'
import settings from 'data/settings.json'
import { AnimatePresence } from 'framer-motion'
import { upperFirst } from 'lodash'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Accordion, Pagination, Search } from './components'

const ChallengeGroupExtended = () => {
	const context = useContext(UserContext)
	const navigate = useNavigate()
	const { group } = useParams()

	const [pattern, setPattern] = useState(/.*/)
	const [page, setPage] = useState(1)

	const search = (e) => {
		const value = e.target.value || ' '
		setPattern(new RegExp(value.split(' ').join('.*'), 'i'))
		setPage(1)
	}

	const changePage = (e, page = +e.target.text) => {
		e.preventDefault()
		if (page > 0 && page <= maxPage) setPage(page)
	}

	const challengeGroup = context.challenges?.[group] || []
	const challenges = challengeGroup.filter((c) => pattern.test(c.name))
	const maxPage = Math.ceil(challenges.length / settings.itemsPerPage)

	const items = settings.challengeGroups.map((g) => ({
		value: upperFirst(g),
		active: g === group,
		onClick: () => {
			setPage(1)
			navigate(`/groups/${g}`)
		},
	}))

	return (
		<InnerLayout items={items}>
			<Search onChange={search} />
			<div className="text-medium">
				<AnimatePresence>
					{!challenges.length ? (
						<NoChallenges extended />
					) : (
						<Accordion key={group + page} {...{ challenges, group, page }} />
					)}
				</AnimatePresence>
			</div>
			{challenges.length > settings.itemsPerPage && (
				<Pagination {...{ page, maxPage, changePage }} />
			)}
		</InnerLayout>
	)
}

export default ChallengeGroupExtended
