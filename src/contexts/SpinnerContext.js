import React, { createContext, useState } from 'react'

const SpinnerContext = createContext()

export const SpinnerProvider = ({ children }) => {
	const [spinnerIsVisible, setSpinnerIsVisible] = useState(false)
	
	const showSpinner = (spinnerIsVisible = true) => {
		setSpinnerIsVisible(spinnerIsVisible)
	}
	
	return (
		<SpinnerContext.Provider value={{ spinnerIsVisible, showSpinner }}>
			{children}
		</SpinnerContext.Provider>
	)
}

export default SpinnerContext
