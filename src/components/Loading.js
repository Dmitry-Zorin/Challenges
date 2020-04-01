import React, { PureComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const TIMEOUT = 250

export class Loading extends PureComponent {
	constructor(props) {
		super(props)
		this.state = { showSpinner: false }
	}

	componentDidMount() {
		this.timeout = setTimeout(
			() => this.setState({ showSpinner: true }),
			TIMEOUT,
		)
	}

	componentWillUnmount() {
		clearTimeout(this.timeout)
	}

	render = () => (
		this.state.showSpinner && (
			<p className='uk-text-center uk-width-expand uk-margin-large-top'>
				<FontAwesomeIcon icon={faSpinner} transform='grow-8' pulse/>
			</p>
		)
	)
}
