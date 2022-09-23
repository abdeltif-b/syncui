import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faDolly, faHashtag, faPallet, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { useApi } from '../../hooks/services';
import { toDecimal } from '../../utils/utils';
import { PivotViewComponent, IDataOptions, IDataSet, Inject, FieldList, GroupingBar } from '@syncfusion/ej2-react-pivotview';
import { SubTitle } from '../widgets/SubTitle';


export const StockAndTransferPivot = ({ deploymentRecord }) => {
	const config = {
		endpoint: 'stock_and_transfer',
		body: {
			params: {
				stock_id: deploymentRecord?.stock_id[0],
				ongoing_transfer_id: deploymentRecord?.ongoing_transfer_id[0]
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
			{ name: 'sum_quantity', caption: 'Stock' },
			{ name: 'sum_ongoing_transfer_quantity', caption: 'En cours' }
		],
		formatSettings: [
			{ name: 'sum_quantity', format: 'N2' },
			{ name: 'sum_ongoing_transfer_quantity', format: 'N2' }
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
			<SubTitle title={'Stock et transferts en cours'} />

			<PivotViewComponent
				id='StockAndTransferPivot'
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
