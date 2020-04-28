import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Margin } from 'uikit-react'

const Search = (props) => (
	<Margin
		type='small-bottom'
		className='uk-search uk-search-default uk-width-expand'
	>
		<span className='uk-search-icon'>
			<FontAwesomeIcon icon='search' transform='right-4'/>
		</span>
		<input
			type='search'
			className='uk-search-input'
			placeholder='Search...'
			{...props}
		/>
	</Margin>
)

export default Search
