import React from 'react'

export const Search = ({ onChange }) => (
	<div
		className='uk-search uk-search-default uk-width-expand uk-margin-small'>
		<span data-uk-search-icon={true}/>
		<input
			type='search'
			className='uk-search-input'
			placeholder='Search...'
			onChange={onChange}
		/>
	</div>
)
