import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { Badge } from 'primereact/badge';
import { ToggleButton } from 'primereact/togglebutton';


import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import { CheckboxTag } from '../widgets/CheckboxTag';
import { deploymentState } from '../../utils/utils';


const DeploymentListFilter = ({ data, setFilteredData }) => {
	const [createDate, setCreateDate] = useState()
	const [realizationDate, setRealizationDate] = useState()

	const [fixedStateCount, setFixedStateCount] = useState('-')
	const [inProgressStateCount, setInProgressStateCount] = useState('-')
	const [doneStateCount, setDoneStateCount] = useState('-')

	const [fixedState, setFixedState] = useState(false)
	const [inProgressState, setInProgressState] = useState(false)
	const [doneState, setDoneState] = useState(false)

	// tag count effect
	useEffect(() => {
		const records = data?.result?.records
		if (!records) return
		const _fixedStateCount = records.reduce((acc, item) => (item.state == deploymentState.fixed.value ? acc + 1 : acc), 0)
		const _inProgressStateCount = records.reduce((acc, item) => (item.state == deploymentState.in_progress.value ? acc + 1 : acc), 0)
		const _doneStateCount = records.reduce((acc, item) => (item.state == deploymentState.done.value ? acc + 1 : acc), 0)
		setFixedStateCount(_fixedStateCount)
		setInProgressStateCount(_inProgressStateCount)
		setDoneStateCount(_doneStateCount)
	}, [data])

	// filter effect
	useEffect(() => {
		const _filteredData = data?.result?.records.filter(item => {
			const result = []
			if (fixedState) result.push(item.state == 'fixed')
			if (inProgressState) result.push(item.state == 'in_progress')
			if (doneState) result.push(item.state == 'done')
			return result.every(Boolean)
		})
		setFilteredData(_filteredData)
	}, [
		data,
		createDate,
		realizationDate,
		fixedState,
		inProgressState,
		doneState,
	])





	return (
		<div className='flex align-items-center justify-content-between flex-wrap'>
			{/* 
			<div className='flex gap-2'>
				<label htmlFor="create_date">Date de génération</label>
			</div>
			<div className='flex gap-2'>
				<Calendar id="create_date" value={createDate} onChange={(e) => setCreateDate(e.value)} selectionMode="range" readOnlyInput dateFormat="yy-mm-dd" mask="9999-99-99" showIcon />
			</div>
			<Divider layout='vertical' />
			<div className='flex gap-2'>
				<label htmlFor="achievement_horizon_date">Période de réalisation</label>
			</div>
			<div className='flex gap-2'>
				<Calendar id="achievement_horizon_date" value={realizationDate} onChange={(e) => setRealizationDate(e.value)} selectionMode="range" readOnlyInput dateFormat="yy-mm-dd" mask="9999-99-99" showIcon />
			</div> */}
			<Divider layout='vertical' />
			<CheckboxTag
				title='Statut du plan de déchargement'
				ids={['fixedState', 'inProgressState', 'doneState']}
				labels={['Planifié', 'En cours', 'Achevé']}
				states={[fixedState, inProgressState, doneState]}
				setStates={[setFixedState, setInProgressState, setDoneState]}
				counts={[fixedStateCount, inProgressStateCount, doneStateCount]}
				divider={false}
			/>

		</div>




	);
}
export default DeploymentListFilter