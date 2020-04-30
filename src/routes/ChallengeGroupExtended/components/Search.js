import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Search = (props) => (
	<div className='uk-search uk-search-default uk-margin-medium-top uk-margin-small-bottom uk-width-1-1'>
		<span className='uk-search-icon'>
			<FontAwesomeIcon icon='search' transform='right-4'/>
		</span>
		<input
			type='search'
			className='uk-search-input'
			placeholder='Search...'
			{...props}
		/>
	</div>
)

export default Search
