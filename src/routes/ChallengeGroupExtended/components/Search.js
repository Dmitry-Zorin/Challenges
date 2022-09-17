import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Search = (props) => (
	<div className="uk-search uk-search-default uk-width-1-1 padding">
		<span className="uk-search-icon">
			<FontAwesomeIcon icon="search" transform="right-4" />
		</span>
		<input
			type="search"
			className="uk-search-input"
			placeholder="Search..."
			{...props}
		/>
	</div>
)

export default Search
