import React, { useEffect, useRef, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Filter, Page, Inject, Toolbar, Edit } from '@syncfusion/ej2-react-grids';



const DeploymentLineTableSync = ({ deploymentId, toast }) => {
	const [data, setData] = useState([
		{
			"Numéro du conteneur": "TCNU8513828",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 4,
			"Rangée (ROW)": 1,
			"Niveau (TIER)": 8
		},
		{
			"Numéro du conteneur": "MSCU9127815",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 4,
			"Rangée (ROW)": 1,
			"Niveau (TIER)": 2
		},
		{
			"Numéro du conteneur": "MEDU8814069",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 5,
			"Rangée (ROW)": 14,
			"Niveau (TIER)": 3
		},
		{
			"Numéro du conteneur": "MSCU9833278",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 2,
			"Rangée (ROW)": 5,
			"Niveau (TIER)": 7
		},
		{
			"Numéro du conteneur": "MORU7621644",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 2,
			"Rangée (ROW)": 7,
			"Niveau (TIER)": 5
		},
		{
			"Numéro du conteneur": "NIDU9621643",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 5,
			"Rangée (ROW)": 15,
			"Niveau (TIER)": 2
		},
		{
			"Numéro du conteneur": "NYKU8513828",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 2,
			"Rangée (ROW)": 6,
			"Niveau (TIER)": 10
		},
		{
			"Numéro du conteneur": "OPDU8513829",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 5,
			"Rangée (ROW)": 7,
			"Niveau (TIER)": 9
		},
		{
			"Numéro du conteneur": "PCVU8814067",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 3,
			"Rangée (ROW)": 14,
			"Niveau (TIER)": 6
		},
		{
			"Numéro du conteneur": "PONU9579222",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 1,
			"Rangée (ROW)": 3,
			"Niveau (TIER)": 9
		},
		{
			"Numéro du conteneur": "RCDU1614891",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 6,
			"Rangée (ROW)": 1,
			"Niveau (TIER)": 5
		},
		{
			"Numéro du conteneur": "RWLU7598516",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 1,
			"Rangée (ROW)": 10,
			"Niveau (TIER)": 5
		},
		{
			"Numéro du conteneur": "CGMU2484149",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 3,
			"Rangée (ROW)": 10,
			"Niveau (TIER)": 9
		},
		{
			"Numéro du conteneur": "TCNU4953573",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 3,
			"Rangée (ROW)": 11,
			"Niveau (TIER)": 3
		},
		{
			"Numéro du conteneur": "MSCU3369272",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 6,
			"Rangée (ROW)": 2,
			"Niveau (TIER)": 3
		},
		{
			"Numéro du conteneur": "MEDU3226184",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 3,
			"Rangée (ROW)": 17,
			"Niveau (TIER)": 7
		},
		{
			"Numéro du conteneur": "MSCU3957756",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 2,
			"Rangée (ROW)": 9,
			"Niveau (TIER)": 10
		},
		{
			"Numéro du conteneur": "MORU8521245",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 1,
			"Rangée (ROW)": 7,
			"Niveau (TIER)": 3
		},
		{
			"Numéro du conteneur": "NIDU3396873",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 3,
			"Rangée (ROW)": 7,
			"Niveau (TIER)": 7
		},
		{
			"Numéro du conteneur": "NYKU3791318",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 5,
			"Rangée (ROW)": 1,
			"Niveau (TIER)": 9
		},
		{
			"Numéro du conteneur": "OPDU9564148",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 4,
			"Rangée (ROW)": 17,
			"Niveau (TIER)": 5
		},
		{
			"Numéro du conteneur": "PCVU2647779",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 2,
			"Rangée (ROW)": 12,
			"Niveau (TIER)": 7
		},
		{
			"Numéro du conteneur": "PONU6933669",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 5,
			"Rangée (ROW)": 11,
			"Niveau (TIER)": 7
		},
		{
			"Numéro du conteneur": "RCDU6432828",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 6,
			"Rangée (ROW)": 6,
			"Niveau (TIER)": 7
		},
		{
			"Numéro du conteneur": "RWLU8984685",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 3,
			"Rangée (ROW)": 17,
			"Niveau (TIER)": 3
		},
		{
			"Numéro du conteneur": "CGMU7499512",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 7,
			"Rangée (ROW)": 2,
			"Niveau (TIER)": 8
		},
		{
			"Numéro du conteneur": "PONU4572256",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 1,
			"Rangée (ROW)": 16,
			"Niveau (TIER)": 8
		},
		{
			"Numéro du conteneur": "RCDU2537141",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 3,
			"Rangée (ROW)": 4,
			"Niveau (TIER)": 7
		},
		{
			"Numéro du conteneur": "RWLU5272966",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 1,
			"Rangée (ROW)": 1,
			"Niveau (TIER)": 7
		},
		{
			"Numéro du conteneur": "CGMU5716847",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 5,
			"Rangée (ROW)": 18,
			"Niveau (TIER)": 5
		},
		{
			"Numéro du conteneur": "TCNU1899228",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 4,
			"Rangée (ROW)": 13,
			"Niveau (TIER)": 4
		},
		{
			"Numéro du conteneur": "MSCU7999371",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 3,
			"Rangée (ROW)": 12,
			"Niveau (TIER)": 6
		},
		{
			"Numéro du conteneur": "MEDU2957826",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 3,
			"Rangée (ROW)": 13,
			"Niveau (TIER)": 9
		},
		{
			"Numéro du conteneur": "MSCU7747471",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 2,
			"Rangée (ROW)": 11,
			"Niveau (TIER)": 10
		},
		{
			"Numéro du conteneur": "MORU1244589",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 2,
			"Rangée (ROW)": 4,
			"Niveau (TIER)": 5
		},
		{
			"Numéro du conteneur": "NIDU5266922",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 6,
			"Rangée (ROW)": 4,
			"Niveau (TIER)": 5
		},
		{
			"Numéro du conteneur": "NYKU2175815",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 1,
			"Rangée (ROW)": 6,
			"Niveau (TIER)": 8
		},
		{
			"Numéro du conteneur": "OPDU5559116",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 4,
			"Rangée (ROW)": 11,
			"Niveau (TIER)": 2
		},
		{
			"Numéro du conteneur": "PCVU8649454",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 3,
			"Rangée (ROW)": 17,
			"Niveau (TIER)": 2
		},
		{
			"Numéro du conteneur": "PONU9837911",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 4,
			"Rangée (ROW)": 2,
			"Niveau (TIER)": 9
		},
		{
			"Numéro du conteneur": "RCDU5916314",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 1,
			"Rangée (ROW)": 12,
			"Niveau (TIER)": 10
		},
		{
			"Numéro du conteneur": "RWLU8755178",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 5,
			"Rangée (ROW)": 18,
			"Niveau (TIER)": 6
		},
		{
			"Numéro du conteneur": "CGMU9887844",
			"Type du conteneur": "20 pieds",
			"Section transversale (BAY)": 4,
			"Rangée (ROW)": 14,
			"Niveau (TIER)": 6
		}
	])
	const filterSettings = { type: "Excel" };
	const toolbarOptions = ['Add', 'Edit', 'Delete', 'Cancel', 'Search'];
	const editSettings = {
		allowEditing: true,
		allowAdding: true,
		allowDeleting: true
	};
	return (
		<>
			<GridComponent
				locale='fr'
				dataSource={data}
				pageSettings={{ pageSize: 13 }}
				allowPaging
				allowSorting
				allowFiltering
				filterSettings={filterSettings}
				toolbar={toolbarOptions}
				editSettings={editSettings}
				isAutoFitColumns
			>
				<ColumnsDirective>
					<ColumnDirective field='Numéro du conteneur' width='100' textAlign='Center' isPrimaryKey></ColumnDirective>
					<ColumnDirective field='Type du conteneur' width='120' textAlign='Center' allowEditing={true}></ColumnDirective>
					<ColumnDirective field='Section transversale (BAY)' width='120' textAlign='Center' allowEditing={true}></ColumnDirective>
					<ColumnDirective field='Rangée (ROW)' width='280' textAlign='Center' allowEditing={true}></ColumnDirective>
					<ColumnDirective field='Niveau (TIER)' width='120' textAlign='Right' format='N2' allowEditing={true}></ColumnDirective>
				</ColumnsDirective>
				<Inject services={[Sort, Filter, Page, Toolbar, Edit]} />
			</GridComponent>
		</>
	);
}
export default DeploymentLineTableSync