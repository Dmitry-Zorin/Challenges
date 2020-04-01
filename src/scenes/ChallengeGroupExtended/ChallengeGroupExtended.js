import React, { PureComponent } from 'react'
import { InnerLayout } from '../../components/InnerLayout/InnerLayout'
import { DataContext } from '../../services/contexts/DataContext'
import { Loading } from '../../components/Loading'
import { Pagination } from './components/Pagination'
import { ChallengeAccordion } from './components/ChallengeAccordion'
import { Search } from './components/Search'

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
			<InnerLayout>
				<p className='uk-h2 uk-text-center'>
					{this.groupName[0].toUpperCase() + this.groupName.slice(1)}
				</p>
				<Search onChange={this.search}/>
				{this.context.isAuthorized === undefined ? <Loading/> : (
					<ChallengeAccordion
						challenges={challenges}
						page={this.state.page}
						groupName={this.groupName}
						navigate={this.props.navigate}
					/>)
				}
				{(this.context.challenges[this.groupName] || []).length > 10 && (
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
