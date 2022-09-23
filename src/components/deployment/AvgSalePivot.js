import { useApi } from '../../hooks/services';
import { toDecimal } from '../../utils/utils';
import { PivotViewComponent, IDataOptions, IDataSet, Inject, FieldList, GroupingBar } from '@syncfusion/ej2-react-pivotview';
import { SubTitle } from '../widgets/SubTitle';


export const AvgSalePivot = ({ deploymentRecord }) => {
	const config = {
		endpoint: 'call_kw',
		body: {
			params: {
				model: "aps.deployment.avg.sale.line",
				method: "read_group",
				args: [
					[
						["deployment_avg_sale_id", "=", deploymentRecord?.deployment_avg_sale_id[0]],
					],
					[
						"product_id",
						"depot_id",
						"depot_name",
						"description",
						"product_category_name",
						"avg_sale_quantity:sum",
						"avg_sale_pallet:sum",
						"avg_sale_kmad:sum"
					],
					["product_id", "depot_id", "depot_name", "description", "product_category_name"]
				],
				kwargs: {
					orderby: "depot_id asc",
					lazy: false
				}
			}
		}
	}
	const { data: data, error: error } = useApi(config)

	const dataSourceSettings = {
		dataSource: data?.result,
		rows: [
			{ name: 'product_category_name', caption: 'Catégorie' },
			{ name: 'description', caption: 'Article' }
		],
		columns: [{ name: 'depot_name', caption: 'Agence' }],
		values: [
			{ name: 'avg_sale_quantity', caption: 'Quantité' },
			{ name: 'avg_sale_pallet', caption: 'Palettes' },
			// { name: 'avg_sale_kmad', caption: 'Par kMad' }
		],
		formatSettings: [
			{ name: 'avg_sale_quantity', format: 'N2' },
			{ name: 'avg_sale_pallet', format: 'N2' }
		],
		enableSorting: true,
		valueSortSettings: { headerDelimiter: ' - ' },
		expandAll: false,
		filters: []
	};

	if (error) return 'erreur..'
	if (!data) return 'Chargement...'
	return (
		<>
			<SubTitle title={`Moyenne quotidienne entre ${'-'} et ${'-'}`} />
			<PivotViewComponent
				id='AvgSalePivot'
				dataSourceSettings={dataSourceSettings}
				width={'100%'} height={'450'}
				groupingBarSettings={{ showFieldsPanel: false, showRemoveIcon: false, showValueTypeIcon: false, allowDragAndDrop: false }}
				gridSettings={{ columnWidth: 80 }}
				showGroupingBar={true}
				showValuesButton={false}
				allowNumberFormatting
			>
				<Inject services={[GroupingBar]} />
			</PivotViewComponent>
		</>
	)
}
