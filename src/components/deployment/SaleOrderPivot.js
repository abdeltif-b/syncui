import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faDolly, faHashtag, faPallet, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { useApi } from '../../hooks/services';
import { toDecimal } from '../../utils/utils';
import { PivotViewComponent, IDataOptions, IDataSet, Inject, FieldList, GroupingBar } from '@syncfusion/ej2-react-pivotview';
import { SubTitle } from '../widgets/SubTitle';


export const SaleOrderPivot = ({ deploymentRecord }) => {
	const config = {
		endpoint: 'call_kw',
		body: {
			params: {
				model: "aps.ongoing.sale.order.line",
				method: "read_group",
				args: [
					[
						["ongoing_sale_order_id", "=", deploymentRecord?.ongoing_sale_order_id[0]],
						// ["remaining_undelivered_qty", ">", 0]
					],
					[
						"product_id",
						"depot_id",
						"depot_name",
						"description",
						"product_category_name",
						"total_qty_delivered:sum",
						"remaining_undelivered_qty:sum"
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
			{ name: 'total_qty_delivered', caption: 'Qté livrée' },
			{ name: 'remaining_undelivered_qty', caption: 'Reste à livrer' }
		],
		formatSettings: [
			{ name: 'total_qty_delivered', format: 'N2' },
			{ name: 'remaining_undelivered_qty', format: 'N2' }
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
			<SubTitle title={'Commandes en cours'} />
			<PivotViewComponent
				id='SaleOrderPivot'
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
