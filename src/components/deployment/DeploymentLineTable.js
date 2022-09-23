import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { InputNumber } from "primereact/inputnumber";
import { updateDeploymentLineRecord, useApi } from '../../pages/../hooks/services';

import { deploymentCoverageStateBodyTemplate, numberBodyTemplate } from '../../utils/utils'
import { DeploymentLineTableHeader } from './DeploymentLineTableHeader';
import { MultiSelect } from 'primereact/multiselect';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';

const _STEP = 0.25
const DeploymentLineTable = ({ deploymentId, mutateDeploymentLineInsights, toast }) => {
	const initialDomain = [["deployment_id", "=", deploymentId]]
	const [domain, setDomain] = useState(initialDomain)
	const [filteredData, setFilteredData] = useState([])
	const [pageSize, setPageSize] = useState(10)
	const [lazyParams, setLazyParams] = useState({
		first: 0,
		rows: pageSize,
		page: 1,
		sortField: null,
		sortOrder: null,
		filters: {
			'depot_id': { value: null, matchMode: FilterMatchMode.IN },
			'product_id': { value: null, matchMode: FilterMatchMode.IN },
			'description': { value: null, matchMode: FilterMatchMode.IN },
		}
	});


	/*-----------------------
	- api calls
	----------------------- */
	const config = {
		endpoint: 'search_read',
		body: {
			params: {
				model: "aps.deployment.line",
				domain: domain,
				offset: lazyParams.first,
				limit: lazyParams.rows,
			}
		}
	}
	const { data, error, mutate } = useApi(config)

	const configTotalRecords = {
		endpoint: 'call_kw',
		body: {
			params: {
				model: "aps.deployment.line",
				method: "search_count",
				args: [
					[["deployment_id", "=", deploymentId]]
				],
				kwargs: {}
			}
		}
	}
	const { data: totalRecordsData } = useApi(configTotalRecords)

	const configDepotList = {
		endpoint: 'call_kw',
		body: {
			params: {
				model: "aps.deployment.line",
				method: "read_group",
				args: [
					[["deployment_id", "=", deploymentId]],
					["depot_id"],
					["depot_id"]
				],
				kwargs: {
					"orderby": "depot_id asc",
					"lazy": false
				}
			}
		}
	}
	const { data: dataDepotList } = useApi(configDepotList)

	const configProductList = {
		endpoint: 'call_kw',
		body: {
			params: {
				model: "aps.deployment.line",
				method: "read_group",
				args: [
					[["deployment_id", "=", deploymentId]],
					["product_id"],
					["product_id"]
				],
				kwargs: {
					"orderby": "product_id asc",
					"lazy": false
				}
			}
		}
	}
	const { data: dataProductList } = useApi(configProductList)


	const configProductDescriptionList = {
		endpoint: 'call_kw',
		body: {
			params: {
				model: "aps.deployment.line",
				method: "read_group",
				args: [
					[["deployment_id", "=", deploymentId]],
					["description"],
					["description"]
				],
				kwargs: {
					"orderby": "description asc",
					"lazy": false
				}
			}
		}
	}
	const { data: dataProductDescriptionList } = useApi(configProductDescriptionList)

	/*----------------------- 
	- editing
	----------------------- */
	const handleCellEditComplete = async (e) => {
		const params = {
			method: "call",
			params: {
				model: "aps.deployment.line",
				method: "write",
				args: [
					e.rowData.id,
					{
						[e.field]: e.newValue
					}
				]
			}
		}
		const showMessage = (error, event) => toast.current.show({ severity: 'error', summary: error.data.message, detail: `La valeur saisie (${e.newValue}) est supérieure au stock disponible (${(e.rowData.projected_central_stock / e.rowData.qty_per_pallet).toFixed(2)})`, life: 8000 })
		const { result, error } = await updateDeploymentLineRecord({ params })
		if (error) showMessage(error, e);
		if (result) {
			mutate()
			mutateDeploymentLineInsights()
		}
	}
	const handleCellEditValidator = (e) => {
		e.newValue = e.newValue - e.newValue % _STEP
		console.log(e)
		return e
	}

	const numberEditor = (options) => {
		return (
			<InputNumber
				value={options.value}
				onValueChange={(e) => options.editorCallback(e.value)}
				min={0}
				step={_STEP}
				maxFractionDigits={2}
				className='w-5rem'
			// mode="currency"
			// currency="USD"
			// locale="en-US"
			/>

		);
	};

	/*-----------------------
	- datatable methods
	----------------------- */
	const dataFields = {
		depot_id: 'Agence',
		product_id: 'Article',
		description: 'Désignation d\'article',
		qty_per_pallet: 'Qty par palette',
		sum_ongoing_sale_order: 'Commandes',
		sum_deployment_avg_sale: 'Moyenne de vente',
		coverage_target: 'Couverture cible',
		net_need: 'Besoin net',
		fair_share_need: 'Faire share',
		need_to_deploy: 'Décision',
		fair_share_need_pallet: 'Faire share',
		need_to_deploy_pallet: 'Décision',
		projected_central_stock: 'Stock central projeté',
		projected_depot_stock: 'Stock agence projeté',
		// Commandes livrables
		initial_deliverable_orders: 'Actuel',
		fair_deliverable_orders: 'Faire share',
		projected_deliverable_orders: 'Décision',
		// Statut de couverture
		initial_coverage_state: 'Actuel',
		fair_coverage_state: 'Faire share',
		projected_coverage_state: 'Décision',
		// Couverture
		initial_coverage: 'Actuel',
		fair_coverage: 'Faire share',
		projected_coverage: 'Décision',
		// CA à risque kMAD 
		initial_turnover_at_risk: 'Actuel',
		fair_turnover_at_risk: 'Faire share',
		projected_turnover_at_risk: 'Décision',
	}

	// conditional formating
	const rowClass = (data) => {
		if (!data) return
		return {
			'bg-blue-50': data.need_to_deploy_pallet != data.fair_share_need_pallet
		}
	}

	// lazy load
	const onPage = (event) => {
		setLazyParams(event);
	}
	const onSort = (event) => {
		event['first'] = 0;
		setLazyParams(event);
	}
	const onFilter = (event) => {
		event['first'] = 0;
		setLazyParams(event);
	}

	// filter
	const depotList = dataDepotList?.result?.map(item => ({ 'label': item.depot_id[1], 'value': item.depot_id[0] }))
	const productList = dataProductList?.result?.map(item => ({ 'label': item.product_id[1], 'value': item.product_id[0] }))
	const productDescriptionList = dataProductDescriptionList?.result?.map(item => ({ 'label': item.description, 'value': item.description }))


	const filterTemplate = (options, optionsList) => {
		if (!optionsList) return
		return <MultiSelect
			value={options.value}
			options={optionsList}
			onChange={(e) => options.filterCallback(e.value)}
			// itemTemplate={representativesItemTemplate} 
			optionLabel="label"
			optionValue="value"
			placeholder="Filtrer..."
			className="p-column-filter"
			maxSelectedLabels={2}
			// virtualScrollerOptions={{ itemSize: 43 }}
			filter
		/>;
	}

	const filterClearTemplate = (options) => {
		return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} className="p-button-secondary"></Button>;
	}

	const filterApplyTemplate = (options) => {
		return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} className="p-button-success"></Button>
	}

	let headerGroup = <ColumnGroup >
		<Row>
			<Column field="depot_id" header={dataFields.depot_id} rowSpan={2} className='text-center align-content-center w-7rem' filter filterElement={(options) => filterTemplate(options, depotList)} showFilterMatchModes={false} frozen />
			<Column field="product_id" header={dataFields.product_id} rowSpan={2} className='text-center align-content-center w-7rem' filter filterElement={(options) => filterTemplate(options, productList)} showFilterMatchModes={false} frozen />
			<Column field="description" header={dataFields.description} rowSpan={2} className='text-center align-content-center w-18rem' filter filterElement={(options) => filterTemplate(options, productDescriptionList)} showFilterMatchModes={false} frozen />
			<Column field="qty_per_pallet" header={dataFields.qty_per_pallet} rowSpan={2} className='text-center align-content-center w-6rem' frozen />
			<Column field="sum_ongoing_sale_order" header={dataFields.sum_ongoing_sale_order} rowSpan={2} className='text-center align-content-center w-6rem' frozen />
			<Column field="sum_deployment_avg_sale" header={dataFields.sum_deployment_avg_sale} rowSpan={2} className='text-center align-content-center w-6rem' frozen />
			<Column field="coverage_target" header={dataFields.coverage_target} rowSpan={2} className='text-center align-content-center w-6rem' frozen />
			<Column field="net_need" header={dataFields.net_need} rowSpan={2} className='text-center align-content-center w-6rem' frozen />
			<Column field="projected_central_stock" header={dataFields.projected_central_stock} rowSpan={2} className='text-center align-content-center w-6rem' frozen />
			<Column field="projected_depot_stock" header={dataFields.projected_depot_stock} rowSpan={2} className='text-center align-content-center w-6rem' frozen />
			<Column header="Déploiement en palettes" colSpan={2} className='text-center align-content-center w-12rem' />
			<Column header="Déploiement" colSpan={2} className='text-center align-content-center w-12rem' />
			<Column header="Commandes livrables" colSpan={3} className='text-center align-content-center w-18rem' />
			<Column header="Statut de couverture" colSpan={3} className='text-center align-content-center w-18rem' />
			<Column header="Couverture" colSpan={3} className='text-center align-content-center w-18rem' />
			<Column header="CA à risque kMAD" colSpan={3} className='text-center align-content-center w-18rem' />
		</Row>
		<Row>
			<Column field="fair_share_need_pallet" header={dataFields.fair_share_need_pallet} className='text-center align-content-center w-6rem' />
			<Column field="need_to_deploy_pallet" header={dataFields.need_to_deploy_pallet} className='text-center align-content-center w-6rem' />
			<Column field="fair_share_need" header={dataFields.fair_share_need} className='text-center align-content-center w-6rem' />
			<Column field="need_to_deploy" header={dataFields.need_to_deploy} className='text-center align-content-center w-6rem' />
			<Column field="initial_deliverable_orders" header={dataFields.initial_deliverable_orders} className='text-center align-content-center w-6rem' />
			<Column field="fair_deliverable_orders" header={dataFields.fair_deliverable_orders} className='text-center align-content-center w-6rem' />
			<Column field="projected_deliverable_orders" header={dataFields.projected_deliverable_orders} className='text-center align-content-center w-6rem' />
			<Column field="initial_coverage_state" header={dataFields.initial_coverage_state} className='text-center align-content-center w-6rem' />
			<Column field="fair_coverage_state" header={dataFields.fair_coverage_state} className='text-center align-content-center w-6rem' />
			<Column field="projected_coverage_state" header={dataFields.projected_coverage_state} className='text-center align-content-center w-6rem' />
			<Column field="initial_coverage" header={dataFields.initial_coverage} className='text-center align-content-center w-6rem' />
			<Column field="fair_coverage" header={dataFields.fair_coverage} className='text-center align-content-center w-6rem' />
			<Column field="projected_coverage" header={dataFields.projected_coverage} className='text-center align-content-center w-6rem' />
			<Column field="initial_turnover_at_risk" header={dataFields.initial_turnover_at_risk} className='text-center align-content-center w-6rem' />
			<Column field="fair_turnover_at_risk" header={dataFields.fair_turnover_at_risk} className='text-center align-content-center w-6rem' />
			<Column field="projected_turnover_at_risk" header={dataFields.projected_turnover_at_risk} className='text-center align-content-center w-6rem' />
		</Row>
	</ColumnGroup>;

	if (error) return 'erreur..'
	return (
		<DataTable
			dataKey="id"
			value={data?.result?.records}
			loading={!data}
			header={<DeploymentLineTableHeader
				data={data}
				totalRecords={totalRecordsData?.result}
				setFilteredData={setFilteredData}
				initialDomain={initialDomain}
				setDomain={setDomain}
				lazyParams={lazyParams}
				setLazyParams={setLazyParams}
			/>}
			headerColumnGroup={headerGroup}

			className="editable-cells-table mt-3"
			editMode="cell"
			size="small"
			rowClassName={rowClass}
			filterDisplay="menu"
			// showGridlines

			scrollable
			scrollHeight="400px"
			scrollDirection="both"
			responsiveLayout="scroll"
			rows={pageSize}
			paginator

			lazy
			totalRecords={data?.result?.length}
			onPage={onPage}
			onSort={onSort}
			onFilter={onFilter}
			first={lazyParams.first}
			sortField={lazyParams.sortField}
			sortOrder={lazyParams.sortOrder}
			filters={lazyParams.filters}


		// virtualScrollerOptions={
		// 	{
		// 		// lazy: true,
		// 		// onLazyLoad: lazyLoadData,
		// 		itemSize: 30,
		// 		// delay: 100,
		// 		// showLoader: true,
		// 		// loading: lazyLoading,
		// 		// loadingTemplate
		// 	}
		// }

		// filters={filters1}
		>

			<Column field="depot_id.1" className='text-center align-content-center w-7rem' filterMenuStyle={{ width: '14rem' }} frozen />
			<Column field="product_id.1" className='text-center align-content-center w-7rem' filterMenuStyle={{ width: '14rem' }} frozen />
			<Column field="description" className='text-center align-content-center w-18rem' filterMenuStyle={{ width: '14rem' }} frozen />
			<Column field="qty_per_pallet" className='text-center align-content-center w-6rem' body={numberBodyTemplate} frozen />
			<Column field="sum_ongoing_sale_order" className='text-center align-content-center w-6rem' body={numberBodyTemplate} frozen />
			<Column field="sum_deployment_avg_sale" className='text-center align-content-center w-6rem' body={numberBodyTemplate} frozen />
			<Column field="coverage_target" className='text-center align-content-center w-6rem' body={numberBodyTemplate} frozen />
			<Column field="net_need" className='text-center align-content-center w-6rem' body={numberBodyTemplate} frozen />
			<Column field="projected_central_stock" className='text-center align-content-center w-6rem' body={numberBodyTemplate} frozen />
			<Column field="projected_depot_stock" className='text-center align-content-center w-6rem' body={numberBodyTemplate} frozen />
			<Column field="fair_share_need_pallet" className='text-center align-content-center w-6rem' body={numberBodyTemplate} />
			<Column field="need_to_deploy_pallet" className='text-center align-content-center w-6rem' body={numberBodyTemplate} editor={(options) => numberEditor(options)} onCellEditComplete={handleCellEditComplete} cellEditValidator={handleCellEditValidator} />
			<Column field="fair_share_need" className='text-center align-content-center w-6rem' body={numberBodyTemplate} />
			<Column field="need_to_deploy" className='text-center align-content-center w-6rem' body={numberBodyTemplate} />
			<Column field="initial_deliverable_orders" className='text-center align-content-center w-6rem' body={numberBodyTemplate} />
			<Column field="fair_deliverable_orders" className='text-center align-content-center w-6rem' body={numberBodyTemplate} />
			<Column field="projected_deliverable_orders" className='text-center align-content-center w-6rem' body={numberBodyTemplate} />
			<Column field="initial_coverage_state" className='text-center align-content-center w-6rem' body={deploymentCoverageStateBodyTemplate} />
			<Column field="fair_coverage_state" className='text-center align-content-center w-6rem' body={deploymentCoverageStateBodyTemplate} />
			<Column field="projected_coverage_state" className='text-center align-content-center w-6rem' body={deploymentCoverageStateBodyTemplate} />
			<Column field="initial_coverage" className='text-center align-content-center w-6rem' body={numberBodyTemplate} />
			<Column field="fair_coverage" className='text-center align-content-center w-6rem' body={numberBodyTemplate} />
			<Column field="projected_coverage" className='text-center align-content-center w-6rem' body={numberBodyTemplate} />
			<Column field="initial_turnover_at_risk" className='text-center align-content-center w-6rem' body={numberBodyTemplate} />
			<Column field="fair_turnover_at_risk" className='text-center align-content-center w-6rem' body={numberBodyTemplate} />
			<Column field="projected_turnover_at_risk" className='text-center align-content-center w-6rem' body={numberBodyTemplate} />

		</DataTable>

	);
}

export default DeploymentLineTable