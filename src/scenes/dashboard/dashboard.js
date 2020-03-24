import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Flex } from 'uikit-react'
import { ChallengeGroup } from './components/challenge-group'
import { LeftColumn } from './components/left-column'
import { NewChallengeButton } from './components/new-challenge-button'
import { DataContext } from '../../services/contexts/DataContext'

export const Dashboard = () => {
  const data = useStaticQuery(graphql`{
    site {
      siteMetadata {
        ongoing
        upcoming
        completed
      }
    }
  }`).site.siteMetadata

  const context = React.useContext(DataContext)
  const challenges = context.challenges || {}

  return (
    <Flex>
      <LeftColumn/>
      <div className='uk-width-expand uk-padding-remove-left'>
        <NewChallengeButton/>
        <ChallengeGroup to='/ongoing' title={data.ongoing} group={challenges.ongoing}/>
        <ChallengeGroup to='/upcoming' title={data.upcoming} group={challenges.upcoming}/>
        <ChallengeGroup to='/completed' title={data.completed} group={challenges.completed}/>
      </div>
    </Flex>
  )
}
