import React from "react"
import { Flex } from "uikit-react"
import { ChallengeGroup } from "./challenge-group"
import { LeftColumn } from "./left-column"
import { NewChallengeButton } from "./new-challenge-button"
import { DataContext } from "../context/DataContext"

export const Dashboard = () => {
  const context = React.useContext(DataContext)
  const challenges = context.challenges || {}

  return (
    <Flex>
      <LeftColumn/>
      <div className='uk-width-expand uk-padding-remove-left'>
        <NewChallengeButton/>
        <ChallengeGroup to='/ongoing' title='Ongoing' group={challenges.ongoing}/>
        <ChallengeGroup to='/upcoming' title='Upcoming' group={challenges.upcoming}/>
        <ChallengeGroup to='/completed' title='Completed' group={challenges.completed}/>
      </div>
    </Flex>
  )
}
