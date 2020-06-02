import { Button, Switch } from 'components'
import RequestContext from 'contexts/RequestContext'
import SettingsContext from 'contexts/SettingsContext'
import React, { useContext, useState } from 'react'

const Settings = () => {
	const { settings, changeSetting } = useContext(SettingsContext)
	const { saveSettings } = useContext(RequestContext)
	
	const [settingsDidChange, setSettingsDidChange] = useState(false)
	
	const _changeSetting = (setting) => {
		changeSetting(setting)
		setSettingsDidChange(true)
	}
	
	const _saveSettings = () => {
		saveSettings(settings)
			.then(() => {
				localStorage.setItem('settings', JSON.stringify(settings))
				setSettingsDidChange(false)
			})
			.catch(() => {})
	}
	
	const { theme } = settings
	
	return (
		<>
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
								_changeSetting({
									theme: theme === 'light' ? 'dark' : 'light',
								})
							}}
						/>
					</div>
					<p>{theme}</p>
				</li>
			</ul>
			<Button
				className='uk-margin-small-top'
				style={{ display: settingsDidChange ? 'block' : 'none' }}
				icon='save'
				value='save'
				onClick={_saveSettings}
			/>
		</>
	)
}

export default Settings
