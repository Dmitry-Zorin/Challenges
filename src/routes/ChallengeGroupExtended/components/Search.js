import React from 'react'
import { Margin } from 'uikit-react'

const Search = (props) => (
	<Margin type='small' className='uk-search uk-search-default uk-width-expand'>
		<span data-uk-search-icon/>
		<input
			type='search'
			className='uk-search-input'
			placeholder='Search...'
			{...props}
		/>
	</Margin>
)

export default Search
