import { Animation, Button, Switch } from 'components'
import DataContext from 'contexts/DataContext'
import React, { useContext } from 'react'

const Settings = () => {
	const {
		userInfo: { settings: { theme, ...settings } },
		changeSetting,
		saveSettings,
	} = useContext(DataContext)
	
	return (
		<Animation type='fade'>
			<p className='uk-text-muted uk-text-center'>
				Settings
			</p>
			<ul className='uk-list'>
				<li className='uk-flex uk-flex-middle uk-grid-small'>
					<p className='uk-width-expand'>Theme:</p>
					<div>
						<Switch
							isOn={theme === 'light'}
							onClick={() => {
								changeSetting({
									theme: theme === 'light' ? 'dark' : 'light',
								})
							}}
						/>
					</div>
					<p>{theme}</p>
				</li>
			</ul>
			{settings.areChanged && (
				<Button
					className='uk-margin-small uk-margin-small-top'
					icon='save'
					value='save'
					onClick={saveSettings}
				/>
			)}
		</Animation>
	)
}

export default Settings
