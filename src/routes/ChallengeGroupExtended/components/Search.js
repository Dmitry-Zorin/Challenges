import React from 'react'

export const Search = (props) => (
	<div className='uk-search uk-search-default uk-width-expand uk-margin-small'>
		<span data-uk-search-icon/>
		<input
			type='search'
			className='uk-search-input'
			placeholder='Search...'
			{...props}
		/>
	</div>
)
