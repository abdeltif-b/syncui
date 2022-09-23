import React, { useEffect, useRef, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Filter, Page, Inject, Toolbar, Edit } from '@syncfusion/ej2-react-grids';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';



const ClientPreference = ({ deploymentId, toast }) => {
	const [data, setData] = useState([
		{
			"Numéro du conteneur": "TCNU8513828",
			"8h à 9h": 1,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "MSCU9127815",
			"8h à 9h": null,
			"9h à 10h": 1,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "MEDU8814069",
			"8h à 9h": null,
			"9h à 10h": 1,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "MSCU9833278",
			"8h à 9h": null,
			"9h à 10h": 1,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "MORU7621644",
			"8h à 9h": null,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": 1
		},
		{
			"Numéro du conteneur": "NIDU9621643",
			"8h à 9h": null,
			"9h à 10h": null,
			"10h à 11h": 1,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "NYKU8513828",
			"8h à 9h": null,
			"9h à 10h": 1,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "OPDU8513829",
			"8h à 9h": null,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": 1
		},
		{
			"Numéro du conteneur": "PCVU8814067",
			"8h à 9h": 1,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "PONU9579222",
			"8h à 9h": null,
			"9h à 10h": null,
			"10h à 11h": 1,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "RCDU1614891",
			"8h à 9h": null,
			"9h à 10h": 1,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "RWLU7598516",
			"8h à 9h": 1,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "CGMU2484149",
			"8h à 9h": null,
			"9h à 10h": null,
			"10h à 11h": 1,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "TCNU4953573",
			"8h à 9h": 1,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "MSCU3369272",
			"8h à 9h": null,
			"9h à 10h": 1,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "MEDU3226184",
			"8h à 9h": null,
			"9h à 10h": 1,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "MSCU3957756",
			"8h à 9h": null,
			"9h à 10h": 1,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "MORU8521245",
			"8h à 9h": null,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": 1
		},
		{
			"Numéro du conteneur": "NIDU3396873",
			"8h à 9h": null,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": 1
		},
		{
			"Numéro du conteneur": "NYKU3791318",
			"8h à 9h": 1,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "OPDU9564148",
			"8h à 9h": null,
			"9h à 10h": 1,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "PCVU2647779",
			"8h à 9h": 1,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "PONU6933669",
			"8h à 9h": null,
			"9h à 10h": 1,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "RCDU6432828",
			"8h à 9h": null,
			"9h à 10h": 1,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "RWLU8984685",
			"8h à 9h": 1,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "CGMU7499512",
			"8h à 9h": null,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": 1
		},
		{
			"Numéro du conteneur": "PONU4572256",
			"8h à 9h": null,
			"9h à 10h": null,
			"10h à 11h": 1,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "RCDU2537141",
			"8h à 9h": null,
			"9h à 10h": null,
			"10h à 11h": 1,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "RWLU5272966",
			"8h à 9h": 1,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "CGMU5716847",
			"8h à 9h": null,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": 1
		},
		{
			"Numéro du conteneur": "TCNU1899228",
			"8h à 9h": null,
			"9h à 10h": null,
			"10h à 11h": 1,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "MSCU7999371",
			"8h à 9h": null,
			"9h à 10h": 1,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "MEDU2957826",
			"8h à 9h": 1,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "MSCU7747471",
			"8h à 9h": null,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": 1
		},
		{
			"Numéro du conteneur": "MORU1244589",
			"8h à 9h": null,
			"9h à 10h": null,
			"10h à 11h": 1,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "NIDU5266922",
			"8h à 9h": 1,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "NYKU2175815",
			"8h à 9h": null,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": 1
		},
		{
			"Numéro du conteneur": "OPDU5559116",
			"8h à 9h": null,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": 1
		},
		{
			"Numéro du conteneur": "PCVU8649454",
			"8h à 9h": null,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": 1
		},
		{
			"Numéro du conteneur": "PONU9837911",
			"8h à 9h": null,
			"9h à 10h": null,
			"10h à 11h": 1,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "RCDU5916314",
			"8h à 9h": null,
			"9h à 10h": 1,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "RWLU8755178",
			"8h à 9h": null,
			"9h à 10h": 1,
			"10h à 11h": null,
			"11h à 12h": null
		},
		{
			"Numéro du conteneur": "CGMU9887844",
			"8h à 9h": 1,
			"9h à 10h": null,
			"10h à 11h": null,
			"11h à 12h": null
		}
	])
	const filterSettings = { type: "Excel" };
	const toolbarOptions = ['Add', 'Edit', 'Delete', 'Cancel', 'Search'];
	const editSettings = {
		allowEditing: true,
		allowAdding: true,
		allowDeleting: true
	};
	const template = (props) => {
		return (<div className='bg-green-100'>
			{props[props.column.field] && <FontAwesomeIcon icon={faCheck} />}
		</div>);
	}
	return (
		<>
			<GridComponent
				gridLines='Both'
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
					<ColumnDirective field='8h à 9h' width='120' textAlign='Center' allowEditing={true} template={template} allowFiltering={false}></ColumnDirective>
					<ColumnDirective field='9h à 10h' width='120' textAlign='Center' allowEditing={true} template={template} allowFiltering={false}></ColumnDirective>
					<ColumnDirective field='10h à 11h' width='120' textAlign='Center' allowEditing={true} template={template} allowFiltering={false}></ColumnDirective>
					<ColumnDirective field='11h à 12h' width='120' textAlign='Center' allowEditing={true} template={template} allowFiltering={false}></ColumnDirective>
				</ColumnsDirective>
				<Inject services={[Sort, Filter, Page, Toolbar, Edit]} />
			</GridComponent>
		</>
	);
}
export default ClientPreference