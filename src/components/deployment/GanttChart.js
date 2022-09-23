import { GanttComponent, Inject, Selection, ColumnsDirective, ColumnDirective, Edit, Filter, Toolbar } from '@syncfusion/ej2-react-gantt';
import { useState } from 'react';

export const GanttChart = () => {
	const [data, setData] = useState([
		{
			"id": 1,
			"task": "RWLU5272966",
			"Section transversale (BAY)": 1,
			"Rangée (ROW)": 1,
			"Niveau (TIER)": 7,
			"Nombre de mouvements": 2,
			"duration": 4,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": ""
		},
		{
			"id": 2,
			"task": "PONU9579222",
			"Section transversale (BAY)": 1,
			"Rangée (ROW)": 3,
			"Niveau (TIER)": 9,
			"Nombre de mouvements": 3,
			"duration": 6,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "1"
		},
		{
			"id": 3,
			"task": "NYKU2175815",
			"Section transversale (BAY)": 1,
			"Rangée (ROW)": 6,
			"Niveau (TIER)": 8,
			"Nombre de mouvements": 2,
			"duration": 4,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "2"
		},
		{
			"id": 4,
			"task": "MORU8521245",
			"Section transversale (BAY)": 1,
			"Rangée (ROW)": 7,
			"Niveau (TIER)": 3,
			"Nombre de mouvements": 4,
			"duration": 8,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "3"
		},
		{
			"id": 5,
			"task": "RWLU7598516",
			"Section transversale (BAY)": 1,
			"Rangée (ROW)": 10,
			"Niveau (TIER)": 5,
			"Nombre de mouvements": 1,
			"duration": 2,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "4"
		},
		{
			"id": 6,
			"task": "RCDU5916314",
			"Section transversale (BAY)": 1,
			"Rangée (ROW)": 12,
			"Niveau (TIER)": 10,
			"Nombre de mouvements": 4,
			"duration": 8,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "5"
		},
		{
			"id": 7,
			"task": "PONU4572256",
			"Section transversale (BAY)": 1,
			"Rangée (ROW)": 16,
			"Niveau (TIER)": 8,
			"Nombre de mouvements": 1,
			"duration": 2,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "6"
		},
		{
			"id": 8,
			"task": "MORU1244589",
			"Section transversale (BAY)": 2,
			"Rangée (ROW)": 4,
			"Niveau (TIER)": 5,
			"Nombre de mouvements": 5,
			"duration": 10,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "7"
		},
		{
			"id": 9,
			"task": "MSCU9833278",
			"Section transversale (BAY)": 2,
			"Rangée (ROW)": 5,
			"Niveau (TIER)": 7,
			"Nombre de mouvements": 2,
			"duration": 4,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "8"
		},
		{
			"id": 10,
			"task": "NYKU8513828",
			"Section transversale (BAY)": 2,
			"Rangée (ROW)": 6,
			"Niveau (TIER)": 10,
			"Nombre de mouvements": 3,
			"duration": 6,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "9"
		},
		{
			"id": 11,
			"task": "MORU7621644",
			"Section transversale (BAY)": 2,
			"Rangée (ROW)": 7,
			"Niveau (TIER)": 5,
			"Nombre de mouvements": 5,
			"duration": 10,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "10"
		},
		{
			"id": 12,
			"task": "MSCU3957756",
			"Section transversale (BAY)": 2,
			"Rangée (ROW)": 9,
			"Niveau (TIER)": 10,
			"Nombre de mouvements": 1,
			"duration": 2,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "11"
		},
		{
			"id": 13,
			"task": "MSCU7747471",
			"Section transversale (BAY)": 2,
			"Rangée (ROW)": 11,
			"Niveau (TIER)": 10,
			"Nombre de mouvements": 1,
			"duration": 2,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "12"
		},
		{
			"id": 14,
			"task": "PCVU2647779",
			"Section transversale (BAY)": 2,
			"Rangée (ROW)": 12,
			"Niveau (TIER)": 7,
			"Nombre de mouvements": 2,
			"duration": 4,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "13"
		},
		{
			"id": 15,
			"task": "RCDU2537141",
			"Section transversale (BAY)": 3,
			"Rangée (ROW)": 4,
			"Niveau (TIER)": 7,
			"Nombre de mouvements": 5,
			"duration": 10,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "14"
		},
		{
			"id": 16,
			"task": "NIDU3396873",
			"Section transversale (BAY)": 3,
			"Rangée (ROW)": 7,
			"Niveau (TIER)": 7,
			"Nombre de mouvements": 3,
			"duration": 6,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "15"
		},
		{
			"id": 17,
			"task": "CGMU2484149",
			"Section transversale (BAY)": 3,
			"Rangée (ROW)": 10,
			"Niveau (TIER)": 9,
			"Nombre de mouvements": 2,
			"duration": 4,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "16"
		},
		{
			"id": 18,
			"task": "TCNU4953573",
			"Section transversale (BAY)": 3,
			"Rangée (ROW)": 11,
			"Niveau (TIER)": 3,
			"Nombre de mouvements": 3,
			"duration": 6,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "17"
		},
		{
			"id": 19,
			"task": "MSCU7999371",
			"Section transversale (BAY)": 3,
			"Rangée (ROW)": 12,
			"Niveau (TIER)": 6,
			"Nombre de mouvements": 1,
			"duration": 2,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "18"
		},
		{
			"id": 20,
			"task": "MEDU2957826",
			"Section transversale (BAY)": 3,
			"Rangée (ROW)": 13,
			"Niveau (TIER)": 9,
			"Nombre de mouvements": 5,
			"duration": 10,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "19"
		},
		{
			"id": 21,
			"task": "PCVU8814067",
			"Section transversale (BAY)": 3,
			"Rangée (ROW)": 14,
			"Niveau (TIER)": 6,
			"Nombre de mouvements": 4,
			"duration": 8,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "20"
		},
		{
			"id": 22,
			"task": "MEDU3226184",
			"Section transversale (BAY)": 3,
			"Rangée (ROW)": 17,
			"Niveau (TIER)": 7,
			"Nombre de mouvements": 1,
			"duration": 2,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "21"
		},
		{
			"id": 23,
			"task": "RWLU8984685",
			"Section transversale (BAY)": 3,
			"Rangée (ROW)": 17,
			"Niveau (TIER)": 3,
			"Nombre de mouvements": 4,
			"duration": 8,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "22"
		},
		{
			"id": 24,
			"task": "PCVU8649454",
			"Section transversale (BAY)": 3,
			"Rangée (ROW)": 17,
			"Niveau (TIER)": 2,
			"Nombre de mouvements": 1,
			"duration": 2,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "23"
		},
		{
			"id": 25,
			"task": "TCNU8513828",
			"Section transversale (BAY)": 4,
			"Rangée (ROW)": 1,
			"Niveau (TIER)": 8,
			"Nombre de mouvements": 1,
			"duration": 2,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "24"
		},
		{
			"id": 26,
			"task": "MSCU9127815",
			"Section transversale (BAY)": 4,
			"Rangée (ROW)": 1,
			"Niveau (TIER)": 2,
			"Nombre de mouvements": 6,
			"duration": 12,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "25"
		},
		{
			"id": 27,
			"task": "PONU9837911",
			"Section transversale (BAY)": 4,
			"Rangée (ROW)": 2,
			"Niveau (TIER)": 9,
			"Nombre de mouvements": 3,
			"duration": 6,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "26"
		},
		{
			"id": 28,
			"task": "OPDU5559116",
			"Section transversale (BAY)": 4,
			"Rangée (ROW)": 11,
			"Niveau (TIER)": 2,
			"Nombre de mouvements": 1,
			"duration": 2,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "27"
		},
		{
			"id": 29,
			"task": "TCNU1899228",
			"Section transversale (BAY)": 4,
			"Rangée (ROW)": 13,
			"Niveau (TIER)": 4,
			"Nombre de mouvements": 4,
			"duration": 8,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "28"
		},
		{
			"id": 30,
			"task": "CGMU9887844",
			"Section transversale (BAY)": 4,
			"Rangée (ROW)": 14,
			"Niveau (TIER)": 6,
			"Nombre de mouvements": 5,
			"duration": 10,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "29"
		},
		{
			"id": 31,
			"task": "OPDU9564148",
			"Section transversale (BAY)": 4,
			"Rangée (ROW)": 17,
			"Niveau (TIER)": 5,
			"Nombre de mouvements": 4,
			"duration": 8,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "30"
		},
		{
			"id": 32,
			"task": "NYKU3791318",
			"Section transversale (BAY)": 5,
			"Rangée (ROW)": 1,
			"Niveau (TIER)": 9,
			"Nombre de mouvements": 1,
			"duration": 2,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "31"
		},
		{
			"id": 33,
			"task": "OPDU8513829",
			"Section transversale (BAY)": 5,
			"Rangée (ROW)": 7,
			"Niveau (TIER)": 9,
			"Nombre de mouvements": 1,
			"duration": 2,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "32"
		},
		{
			"id": 34,
			"task": "PONU6933669",
			"Section transversale (BAY)": 5,
			"Rangée (ROW)": 11,
			"Niveau (TIER)": 7,
			"Nombre de mouvements": 4,
			"duration": 8,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "33"
		},
		{
			"id": 35,
			"task": "MEDU8814069",
			"Section transversale (BAY)": 5,
			"Rangée (ROW)": 14,
			"Niveau (TIER)": 3,
			"Nombre de mouvements": 5,
			"duration": 10,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "34"
		},
		{
			"id": 36,
			"task": "NIDU9621643",
			"Section transversale (BAY)": 5,
			"Rangée (ROW)": 15,
			"Niveau (TIER)": 2,
			"Nombre de mouvements": 5,
			"duration": 10,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "35"
		},
		{
			"id": 37,
			"task": "RWLU8755178",
			"Section transversale (BAY)": 5,
			"Rangée (ROW)": 18,
			"Niveau (TIER)": 6,
			"Nombre de mouvements": 4,
			"duration": 8,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "36"
		},
		{
			"id": 38,
			"task": "CGMU5716847",
			"Section transversale (BAY)": 5,
			"Rangée (ROW)": 18,
			"Niveau (TIER)": 5,
			"Nombre de mouvements": 3,
			"duration": 6,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "37"
		},
		{
			"id": 39,
			"task": "RCDU1614891",
			"Section transversale (BAY)": 6,
			"Rangée (ROW)": 1,
			"Niveau (TIER)": 5,
			"Nombre de mouvements": 4,
			"duration": 8,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "38"
		},
		{
			"id": 40,
			"task": "MSCU3369272",
			"Section transversale (BAY)": 6,
			"Rangée (ROW)": 2,
			"Niveau (TIER)": 3,
			"Nombre de mouvements": 5,
			"duration": 10,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "39"
		},
		{
			"id": 41,
			"task": "NIDU5266922",
			"Section transversale (BAY)": 6,
			"Rangée (ROW)": 4,
			"Niveau (TIER)": 5,
			"Nombre de mouvements": 1,
			"duration": 2,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "40"
		},
		{
			"id": 42,
			"task": "RCDU6432828",
			"Section transversale (BAY)": 6,
			"Rangée (ROW)": 6,
			"Niveau (TIER)": 7,
			"Nombre de mouvements": 5,
			"duration": 10,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "41"
		},
		{
			"id": 43,
			"task": "CGMU7499512",
			"Section transversale (BAY)": 7,
			"Rangée (ROW)": 2,
			"Niveau (TIER)": 8,
			"Nombre de mouvements": 1,
			"duration": 2,
			"Début": new Date('09/09/2022 8:25:00 AM'),
			"Dependency": "42"
		}
	])
	const taskFields = {
		id: 'id',
		taskName: 'task',
		// startDate: 'Début',
		// endDate: 'EndDate',
		duration: 'duration',
		// progress: 'Progress',
		dependency: 'Dependency',
		// child: 'subtasks',
	};
	const labelSettings = {
		leftLabel: 'task',
		// rightLabel: '',
		// taskLabel: 'duration',
	};
	const projectStartDate = new Date('09/09/2022 7:55:00 AM');
	const projectEndDate = new Date('09/09/2022 3:00:00 PM');
	const timelineSettings = {
		timelineViewMode: 'Hour'
	}
	const splitterSettings = {
		position: "40%"
	}
	const editSettings = {
		allowAdding: false,
		allowEditing: true,
		allowDeleting: false,
		allowTaskbarEditing: true,
		showDeleteConfirmDialog: true,
	};
	const toolbar = ['ZoomIn', 'ZoomOut', 'ZoomToFit'];
	const filterSettings = { type: "Excel" };


	return (<div className='control-pane'>
		<div className='control-section'>
			<GanttComponent id='Default' dataSource={data} treeColumnIndex={1} taskFields={taskFields}
				labelSettings={labelSettings} height='625px' projectStartDate={projectStartDate}
				projectEndDate={projectEndDate} timelineSettings={timelineSettings}
				splitterSettings={splitterSettings} editSettings={editSettings}
				allowFiltering={true} dateFormat='MM/dd/yyyy hh:mm:ss' toolbar={toolbar}
				durationUnit='Minute' locale='fr' filterSettings={filterSettings}
			>
				<ColumnsDirective>
					<ColumnDirective field='id' width='35' allowFiltering={false} allowEditing={false}></ColumnDirective>
					<ColumnDirective field='task' headerText='Numéro du conteneur' allowEditing={false}></ColumnDirective>
					<ColumnDirective field='Section transversale (BAY)' width='240' allowEditing={false}></ColumnDirective>
					<ColumnDirective field='Rangée (ROW)' width='190' allowEditing={false}></ColumnDirective>
					<ColumnDirective field='Niveau (TIER)' allowEditing={false}></ColumnDirective>
					<ColumnDirective field='Nombre de mouvements' width='220' allowEditing={false}></ColumnDirective>
					<ColumnDirective field='duration' headerText='Durée de mouvement' format={{ maximumFractionDigits: 0 }}></ColumnDirective>
					{/* <ColumnDirective field='Début' ></ColumnDirective> */}
					{/* <ColumnDirective field='Dependency' headerText='Dépendance'></ColumnDirective> */}
				</ColumnsDirective>
				<Inject services={[Selection, Edit, Filter, Toolbar]} />
			</GanttComponent>
		</div>

	</div>);

}