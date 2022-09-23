import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { numberBodyTemplate } from '../../utils/utils'
import { useApi } from '../../pages/../hooks/services';

const DeploymentLineInsights = ({ data, error, toast }) => {


	const dataFields = {
		depot_name: 'Agence',
		// #Palettes à déployer
		fair_share_need_pallet: 'Besoin',
		need_to_deploy_pallet: 'Déploiement',
		// Saturation des plateformes
		initial_depot_overload: 'Actuel',
		fair_depot_overload: 'Besoin',
		projected_depot_overload: 'Déploiement',
		// Commandes livrables kMAD
		initial_deliverable_orders_kmad: 'Actuel',
		fair_deliverable_orders_kmad: 'Besoin',
		projected_deliverable_orders_kmad: 'Déploiement',
		// #SKUs en rupture 
		initial_coverage_state_rupture: 'Actuel',
		fair_coverage_state_rupture: 'Besoin',
		projected_coverage_state_rupture: 'Déploiement',
		// #SKUs à risque de rupture
		initial_coverage_state_rupture_risk: 'Actuel',
		fair_coverage_state_rupture_risk: 'Besoin',
		projected_coverage_state_rupture_risk: 'Déploiement',
		// #SKUs en surstock
		initial_coverage_state_overstock: 'Actuel',
		fair_coverage_state_overstock: 'Besoin',
		projected_coverage_state_overstock: 'Déploiement',
		// CA à risques kMAD
		initial_turnover_at_risk: 'Actuel',
		fair_turnover_at_risk: 'Besoin',
		projected_turnover_at_risk: 'Déploiement',
	}

	const boldBodyTemplate = (rowData, fieldName) => {
		return <b>{rowData[fieldName]}</b>;
	}

	const decimalBodyTemplate = (rowData, fieldName) => {
		return rowData[fieldName].toFixed(2);
	}
	// const decimalBodyTemplate = (rowData) => {
	// 	return `${formatCurrency(rowData.lastYearProfit)}`;
	// }
	// const formatCurrency = (value) => {
	// 	return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
	// }


	let headerGroup = <ColumnGroup>
		<Row className='align-items-stretch'>
			<Column header={null} rowSpan={2} className='bg-white' frozen />
			<Column header="#Palettes à déployer" colSpan={2} style={{ borderRightWidth: '15px', borderRightColor: 'white' }} frozen />
			<Column header="Saturation des plateformes" colSpan={3} style={{ borderRightWidth: '15px', borderRightColor: 'white' }} />
			<Column header="Commandes livrables kMAD" colSpan={3} style={{ borderRightWidth: '15px', borderRightColor: 'white' }} />
			<Column header="#SKUs en rupture" colSpan={3} style={{ borderRightWidth: '15px', borderRightColor: 'white' }} />
			<Column header="#SKUs à risque de rupture" colSpan={3} style={{ borderRightWidth: '15px', borderRightColor: 'white' }} />
			<Column header="#SKUs en surstock" colSpan={3} style={{ borderRightWidth: '15px', borderRightColor: 'white' }} />
			<Column header="CA à risques kMAD" colSpan={3} />
		</Row>
		<Row>
			<Column header="Besoin" sortable field="sum_fair_share_need_pallet" frozen />
			<Column header="Déploiement" sortable field="sum_need_to_deploy_pallet" style={{ borderRightWidth: '15px', borderRightColor: 'white' }} />
			<Column header="Actuel" sortable field="initial_depot_overload" />
			<Column header="Besoin" sortable field="fair_depot_overload" />
			<Column header="Déploiement" sortable field="projected_depot_overload" style={{ borderRightWidth: '15px', borderRightColor: 'white' }} />
			<Column header="Actuel" sortable field="sum_initial_deliverable_orders_kmad" />
			<Column header="Besoin" sortable field="sum_fair_deliverable_orders_kmad" />
			<Column header="Déploiement" sortable field="sum_projected_deliverable_orders_kmad" style={{ borderRightWidth: '15px', borderRightColor: 'white' }} />
			<Column header="Actuel" sortable field="initial_coverage_state_rupture" />
			<Column header="Besoin" sortable field="fair_coverage_state_rupture" />
			<Column header="Déploiement" sortable field="projected_coverage_state_rupture" style={{ borderRightWidth: '15px', borderRightColor: 'white' }} />
			<Column header="Actuel" sortable field="initial_coverage_state_rupture_risk" />
			<Column header="Besoin" sortable field="fair_coverage_state_rupture_risk" />
			<Column header="Déploiement" sortable field="projected_coverage_state_rupture_risk" style={{ borderRightWidth: '15px', borderRightColor: 'white' }} />
			<Column header="Actuel" sortable field="initial_coverage_state_overstock" />
			<Column header="Besoin" sortable field="fair_coverage_state_overstock" />
			<Column header="Déploiement" sortable field="projected_coverage_state_overstock" style={{ borderRightWidth: '15px', borderRightColor: 'white' }} />
			<Column header="Actuel" sortable field="sum_initial_turnover_at_risk" />
			<Column header="Besoin" sortable field="sum_fair_turnover_at_risk" />
			<Column header="Déploiement" sortable field="sum_projected_turnover_at_risk" />
		</Row>
	</ColumnGroup>;

	if (error) return 'erreur..'
	return (
		<DataTable
			value={data?.result}
			loading={!data}
			headerColumnGroup={headerGroup}
			responsiveLayout="scroll"
			size="small"
		>
			<Column field="depot_name" body={(rowData) => boldBodyTemplate(rowData, 'depot_name')} className='surface-100' frozen />
			<Column field="sum_fair_share_need_pallet" body={numberBodyTemplate} className='hover:bg-blue-50' frozen />
			<Column field="sum_need_to_deploy_pallet" body={numberBodyTemplate} className='hover:bg-blue-50' style={{ borderRightWidth: '15px', borderRightColor: 'white' }} />
			<Column field="initial_depot_overload" body={numberBodyTemplate} className='hover:bg-blue-50' />
			<Column field="fair_depot_overload" body={numberBodyTemplate} className='hover:bg-blue-50' />
			<Column field="projected_depot_overload" body={numberBodyTemplate} className='hover:bg-blue-50' style={{ borderRightWidth: '15px', borderRightColor: 'white' }} />
			<Column field="sum_initial_deliverable_orders_kmad" body={numberBodyTemplate} className='hover:bg-blue-50' />
			<Column field="sum_fair_deliverable_orders_kmad" body={numberBodyTemplate} className='hover:bg-blue-50' />
			<Column field="sum_projected_deliverable_orders_kmad" body={numberBodyTemplate} className='hover:bg-blue-50' style={{ borderRightWidth: '15px', borderRightColor: 'white' }} />
			<Column field="initial_coverage_state_rupture" body={numberBodyTemplate} className='hover:bg-blue-50' />
			<Column field="fair_coverage_state_rupture" body={numberBodyTemplate} className='hover:bg-blue-50' />
			<Column field="projected_coverage_state_rupture" body={numberBodyTemplate} className='hover:bg-blue-50' style={{ borderRightWidth: '15px', borderRightColor: 'white' }} />
			<Column field="initial_coverage_state_rupture_risk" body={numberBodyTemplate} className='hover:bg-blue-50' />
			<Column field="fair_coverage_state_rupture_risk" body={numberBodyTemplate} className='hover:bg-blue-50' />
			<Column field="projected_coverage_state_rupture_risk" body={numberBodyTemplate} className='hover:bg-blue-50' style={{ borderRightWidth: '15px', borderRightColor: 'white' }} />
			<Column field="initial_coverage_state_overstock" body={numberBodyTemplate} className='hover:bg-blue-50' />
			<Column field="fair_coverage_state_overstock" body={numberBodyTemplate} className='hover:bg-blue-50' />
			<Column field="projected_coverage_state_overstock" body={numberBodyTemplate} className='hover:bg-blue-50' style={{ borderRightWidth: '15px', borderRightColor: 'white' }} />
			<Column field="sum_initial_turnover_at_risk" body={numberBodyTemplate} className='hover:bg-blue-50' />
			<Column field="sum_fair_turnover_at_risk" body={numberBodyTemplate} className='hover:bg-blue-50' />
			<Column field="sum_projected_turnover_at_risk" body={numberBodyTemplate} className='hover:bg-blue-50' />
		</DataTable>
	);
}
export default DeploymentLineInsights