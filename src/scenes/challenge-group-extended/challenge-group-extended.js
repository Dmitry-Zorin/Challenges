import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { InnerLayout } from '../../components/inner-layout'
import { DataContext } from '../../services/contexts/DataContext'
import { Loading } from '../../components/loading'
import { Pagination } from './components/pagination'
import { ChallengeAccordion } from './components/challenge-accordion'
import { Search } from './components/search'

const ITEMS_PER_PAGE = 10

export const ChallengeGroupExtended = props => (
  <StaticQuery
    query={
      graphql`{
        site {
          siteMetadata {
            ongoing 
            upcoming 
            completed
          }
        }
      }`
    }
    render={
      data => <Component data={data.site.siteMetadata} {...props}/>
    }
  />
)

class Component extends React.PureComponent {
  static contextType = DataContext

  constructor(props) {
    super(props)
    this.search = this.search.bind(this)
    this.changePage = this.changePage.bind(this)

    this.state = {
      pattern: /.*/,
      page: 0
    }
    this.groupName = window.location.pathname.slice(1)
  }

  search({ target }) {
    this.setState({
      pattern: new RegExp(target.value.split(' ').join('.*'), 'i')
    })
  }

  changePage(e, diff) {
    e.preventDefault()
    const newPage = this.state.page + diff
    if (newPage >= 0 && newPage < this.maxPage)
      this.setState({ page: newPage })
  }

  render = () => {
    const { data } = this.props

    const challenges = (this.context.challenges[this.groupName] || [])
      .filter(c => this.state.pattern.test(c.name))

    this.maxPage = Math.ceil(challenges.length / ITEMS_PER_PAGE)

    return (
      <InnerLayout>
        <p className='uk-h2 uk-text-center'>
          {data[this.groupName]}
        </p>
        <Search onChange={this.search}/>
        {this.context.isAuthorized === undefined ? <Loading/>
          :
          <ChallengeAccordion
            challenges={challenges} page={this.state.page}
            groupName={this.groupName} navigate={this.props.navigate}
          />
        }
        {(this.context.challenges[this.groupName] || []).length > ITEMS_PER_PAGE &&
        <Pagination page={this.state.page} maxPage={this.maxPage} changePage={this.changePage}/>
        }
      </InnerLayout>
    )
  }
}
