import React, { PureComponent } from 'react'
import { InnerLayout } from '../../components/InnerLayout'
import { DataContext } from '../../contexts/DataContext'
import { Pagination } from './components/Pagination'
import { ChallengeAccordion } from './components/ChallengeAccordion'
import { Search } from './components/Search'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class ChallengeGroupExtended extends PureComponent {
	static contextType = DataContext
	
	constructor(props) {
		super(props)
		this.search = this.search.bind(this)
		this.changePage = this.changePage.bind(this)
		
		this.state = {
			pattern: /.*/,
			page: 0,
		}
		this.groupName = window.location.pathname.slice(1)
	}
	
	search({ target }) {
		this.setState({
			pattern: new RegExp(target.value.split(' ').join('.*'), 'i'),
		})
	}
	
	changePage(e, diff) {
		e.preventDefault()
		const newPage = this.state.page + diff
		if (newPage >= 0 && newPage < this.maxPage)
			this.setState({ page: newPage })
	}
	
	render = () => {
		const challenges = (this.context.challenges[this.groupName] || [])
			.filter(c => this.state.pattern.test(c.name))
		
		this.maxPage = Math.ceil(challenges.length / 10)
		
		return (
			<InnerLayout title={this.groupName}>
				<Search onChange={this.search}/>
				{!challenges.length ? (
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
				) : (
					<ChallengeAccordion
						challenges={challenges}
						page={this.state.page}
						groupName={this.groupName}
						navigate={this.props.navigate}
					/>
				)}
				{challenges.length > 10 && (
					<Pagination
						page={this.state.page}
						maxPage={this.maxPage}
						changePage={this.changePage}
					/>
				)}
			</InnerLayout>
		)
	}
}
