import AnimatedButton from 'components/animated/AnimatedButton'
import AnimatedSwitch from 'components/animated/AnimatedSwitch'
import DataContext from 'contexts/DataContext'
import React, { useContext } from 'react'

const Settings = () => {
	const {
		userInfo: { settings },
		changeSetting,
		saveSettings,
	} = useContext(DataContext)
	
	return (
		<>
			<p className='uk-text-muted uk-text-center uk-margin-medium-top'>
				Settings
			</p>
			<ul className='uk-list'>
				<li className='uk-flex'>
					<p className='uk-width-expand'>Theme</p>
					<AnimatedSwitch
						isOn={settings.theme === 'light'}
						onClick={() => {
							changeSetting({
								theme: settings.theme === 'light' ? 'dark' : 'light',
							})
						}}
					/>
				</li>
			</ul>
			{settings.areChanged && (
				<AnimatedButton
					className='uk-width-1-1 uk-margin-small'
					icon='save'
					value='save'
					onClick={saveSettings}
				/>
			)}
		</>
	)
}

export default Settings
