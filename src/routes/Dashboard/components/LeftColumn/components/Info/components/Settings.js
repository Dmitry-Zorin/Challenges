import AnimatedButton from 'components/animated/AnimatedButton'
import AnimatedSwitch from 'components/animated/AnimatedSwitch'
import DataContext from 'contexts/DataContext'
import React, { useContext } from 'react'

const Settings = () => {
	const {
		userInfo: { settings: { theme, ...settings } },
		changeSetting,
		saveSettings,
	} = useContext(DataContext)
	
	return (
		<>
			<p className='uk-text-muted uk-text-center'>
				Settings
			</p>
			<ul className='uk-list'>
				<li className='uk-flex uk-flex-middle uk-grid-small'>
					<p className='uk-width-expand'>Theme:</p>
					<p>{theme}</p>
					<AnimatedSwitch
						isOn={theme === 'light'}
						onClick={() => {
							changeSetting({
								theme: theme === 'light' ? 'dark' : 'light',
							})
						}}
					/>
				</li>
			</ul>
			{settings.areChanged && (
				<AnimatedButton
					className='uk-margin-small uk-margin-small-top'
					icon='save'
					value='save'
					onClick={saveSettings}
				/>
			)}
		</>
	)
}

export default Settings
