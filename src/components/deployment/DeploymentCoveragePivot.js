import { useApi } from '../../hooks/services';
import { toDecimal } from '../../utils/utils';
import { PivotViewComponent, IDataOptions, IDataSet, Inject, FieldList, GroupingBar } from '@syncfusion/ej2-react-pivotview';
import { SubTitle } from '../widgets/SubTitle';


export const DeploymentCoveragePivot = ({ deploymentRecord }) => {
	const config = {
		endpoint: 'search_read',
		body: {
			params: {
				model: "aps.deployment.coverage.line",
				domain: [
					["deployment_coverage_id", "=", deploymentRecord?.deployment_coverage_id[0]]
				],
				fields: [
					"depot_name",
					"product_category_name",
					"abc_name",
					"coverage_target",
					"coverage_min",
					"coverage_max"
				]
			}
		}
	}
	const { data: data, error: error } = useApi(config)

	const dataSourceSettings = {
		dataSource: data?.result?.records,
		rows: [
			{ name: 'abc_name', caption: 'Classification ABC' },
			{ name: 'product_category_name', caption: 'Catégorie' },
		],
		columns: [{ name: 'depot_name', caption: 'Agence' }],
		values: [
			{ name: 'coverage_target', caption: 'Couverture cible' },
			{ name: 'coverage_min', caption: 'Couverture min' },
			{ name: 'coverage_max', caption: 'Couverture max' },
		],
		formatSettings: [
			{ name: 'coverage_target', format: 'N2' },
			{ name: 'coverage_min', format: 'N2' },
			{ name: 'coverage_max', format: 'N2' },
		],
		enableSorting: true,
		valueSortSettings: { headerDelimiter: ' - ' },
		expandAll: true,
		showSubTotals: false,
		showGrandTotals: false,
		filters: []
	};

	if (error) return 'erreur..'
	if (!data) return 'Chargement...'
	return (
		<>
			<SubTitle title={`Couvertures cibles, minimales et maximales (Référence: ${deploymentRecord?.deployment_coverage_id[1]})`} />
			<PivotViewComponent
				id='DeploymentCoveragePivot'
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
