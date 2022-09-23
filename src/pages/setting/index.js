import { TabPanel, TabView } from 'primereact/tabview';
import React from 'react';



function SettingPage() {

	return (
		<div>
			<TabView>
				<TabPanel key='coverage' header='Couvertures'>
				</TabPanel>
				<TabPanel key='storage' header='Capacités de stockage'>
				</TabPanel>
			</TabView>
		</div>


	);
}
export default SettingPage;

