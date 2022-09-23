import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { DeploymentListItem } from '../../components/deployment/DeploymentListItem';
import DeploymentListFilter from '../../components/deployment/DeploymentListFilter';
import { DataScroller } from 'primereact/datascroller';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes } from '@fortawesome/free-solid-svg-icons';
import DeploymentLineBreadCrumb from '../../components/deployment/DeploymentBreadCrumb';
import { VesselListItem } from '../../components/deployment/VesselListItem';


export const _DEPLOYMENT_LINE = {
	'id': 4,
	'name': 'Planning des navires 0025',
	'create_date': '2020-09-01',
	'expected_arrival_date': '2020-09-27',
	'expected_departure_date': '2020-09-30',
	'arrival_date': null,
	'departure_date': null,
	'nbr_container': 33,
	'nbr_clients': 17,
	'state': 'fixed',
	'active': true,
	'completion_rate': null,
}
const DATA = {
	result: {
		records: [
			_DEPLOYMENT_LINE,
			{
				'id': 3,
				'name': 'Planning des navires 0024',
				'create_date': '2020-09-01',
				'expected_arrival_date': '2020-09-22',
				'expected_departure_date': '2020-09-25',
				'arrival_date': '2020-09-21',
				'departure_date': null,
				'nbr_container': 50,
				'nbr_clients': 47,
				'state': 'in_progress',
				'active': true,
				'completion_rate': '60%',
			},
			{
				'id': 2,
				'name': 'Planning des navires 0023',
				'create_date': '2020-09-01',
				'expected_arrival_date': '2020-09-21',
				'expected_departure_date': '2020-09-23',
				'arrival_date': '2020-09-21',
				'departure_date': '2020-09-23',
				'nbr_container': 11,
				'nbr_clients': 10,
				'state': 'done',
				'active': true,
				'completion_rate': '100%',
			},
			{
				'id': 1,
				'name': 'Planning des navires 0021',
				'create_date': '2020-09-01',
				'expected_arrival_date': '2020-09-10',
				'expected_departure_date': '2020-09-13',
				'arrival_date': '2020-09-11',
				'departure_date': '2020-09-13',
				'nbr_container': 10,
				'nbr_clients': 15,
				'state': 'done',
				'active': true,
				'completion_rate': '100%',
			},
			{
				'id': 4,
				'name': 'Planning des navires 0020',
				'create_date': '2020-09-01',
				'expected_arrival_date': '2020-09-10',
				'expected_departure_date': '2020-09-13',
				'arrival_date': '2020-09-10',
				'departure_date': '2020-09-13',
				'nbr_container': 10,
				'nbr_clients': 15,
				'state': 'done',
				'active': true,
				'completion_rate': '100%',
			},
			{
				'id': 2,
				'name': 'Planning des navires 0019',
				'create_date': '2020-09-01',
				'expected_arrival_date': '2020-09-21',
				'expected_departure_date': '2020-09-23',
				'arrival_date': '2020-09-09',
				'departure_date': '2020-09-10',
				'nbr_container': 11,
				'nbr_clients': 10,
				'state': 'done',
				'active': true,
				'completion_rate': '100%',
			},
			{
				'id': 1,
				'name': 'Planning des navires 0018',
				'create_date': '2020-09-01',
				'expected_arrival_date': '2020-09-10',
				'expected_departure_date': '2020-09-13',
				'arrival_date': '2020-09-08',
				'departure_date': '2020-09-09',
				'nbr_container': 10,
				'nbr_clients': 15,
				'state': 'done',
				'active': true,
				'completion_rate': '100%',
			},
			{
				'id': 4,
				'name': 'Planning des navires 0017',
				'create_date': '2020-09-01',
				'expected_arrival_date': '2020-09-10',
				'expected_departure_date': '2020-09-13',
				'arrival_date': '2020-09-07',
				'departure_date': '2020-09-08',
				'nbr_container': 10,
				'nbr_clients': 15,
				'state': 'done',
				'active': true,
				'completion_rate': '100%',
			}, {
				'id': 2,
				'name': 'Planning des navires 0016',
				'create_date': '2020-09-01',
				'expected_arrival_date': '2020-09-21',
				'expected_departure_date': '2020-09-23',
				'arrival_date': '2020-09-05',
				'departure_date': '2020-09-07',
				'nbr_container': 11,
				'nbr_clients': 10,
				'state': 'done',
				'active': true,
				'completion_rate': '100%',
			},
			{
				'id': 1,
				'name': 'Planning des navires 0015',
				'create_date': '2020-09-01',
				'expected_arrival_date': '2020-09-10',
				'expected_departure_date': '2020-09-13',
				'arrival_date': '2020-09-04',
				'departure_date': '2020-09-05',
				'nbr_container': 10,
				'nbr_clients': 15,
				'state': 'done',
				'active': true,
				'completion_rate': '100%',
			},
			{
				'id': 4,
				'name': 'Planning des navires 0014',
				'create_date': '2020-09-01',
				'expected_arrival_date': '2020-09-10',
				'expected_departure_date': '2020-09-13',
				'arrival_date': '2020-09-03',
				'departure_date': '2020-09-04',
				'nbr_container': 10,
				'nbr_clients': 15,
				'state': 'done',
				'active': true,
				'completion_rate': '100%',
			}, {
				'id': 2,
				'name': 'Planning des navires 0013',
				'create_date': '2020-09-01',
				'expected_arrival_date': '2020-09-21',
				'expected_departure_date': '2020-09-23',
				'arrival_date': '2020-09-01',
				'departure_date': '2020-09-03',
				'nbr_container': 11,
				'nbr_clients': 10,
				'state': 'done',
				'active': true,
				'completion_rate': '100%',
			},
			{
				'id': 1,
				'name': 'Planning des navires 0012',
				'create_date': '2020-09-01',
				'expected_arrival_date': '2020-09-10',
				'expected_departure_date': '2020-09-13',
				'arrival_date': '2020-09-10',
				'departure_date': '2020-09-13',
				'nbr_container': 10,
				'nbr_clients': 15,
				'state': 'done',
				'active': true,
				'completion_rate': '100%',
			},
			{
				'id': 4,
				'name': 'Planning des navires 0010',
				'create_date': '2020-09-01',
				'expected_arrival_date': '2020-09-10',
				'expected_departure_date': '2020-09-13',
				'arrival_date': '2020-09-10',
				'departure_date': '2020-09-13',
				'nbr_container': 10,
				'nbr_clients': 15,
				'state': 'done',
				'active': true,
				'completion_rate': '100%',
			}, {
				'id': 2,
				'name': 'Planning des navires 0023',
				'create_date': '2020-09-01',
				'expected_arrival_date': '2020-09-21',
				'expected_departure_date': '2020-09-23',
				'arrival_date': '2020-09-21',
				'departure_date': '2020-09-23',
				'nbr_container': 11,
				'nbr_clients': 10,
				'state': 'done',
				'active': true,
				'completion_rate': '100%',
			},
			{
				'id': 1,
				'name': 'Planning des navires 0021',
				'create_date': '2020-09-01',
				'expected_arrival_date': '2020-09-10',
				'expected_departure_date': '2020-09-13',
				'arrival_date': '2020-09-10',
				'departure_date': '2020-09-13',
				'nbr_container': 10,
				'nbr_clients': 15,
				'state': 'done',
				'active': true,
				'completion_rate': '100%',
			},
			{
				'id': 4,
				'name': 'Planning des navires 0020',
				'create_date': '2020-09-01',
				'expected_arrival_date': '2020-09-10',
				'expected_departure_date': '2020-09-13',
				'arrival_date': '2020-09-10',
				'departure_date': '2020-09-13',
				'nbr_container': 10,
				'nbr_clients': 15,
				'state': 'done',
				'active': true,
				'completion_rate': '100%',
			},
		]
	}
}



function VesselPage({ toast }) {
	const [filteredData, setFilteredData] = useState([])
	const [data, setData] = useState(DATA)

	const breadCrumbItems = [
		{
			label: 'Liste des plannings des navires',
			icon: <FontAwesomeIcon icon={faCubes} fixedWidth />,
		},
	];

	return (
		<>
			<DeploymentLineBreadCrumb items={breadCrumbItems} />
			< DataScroller
				value={data.result.records}
				// header={<DeploymentListFilter data={data} setFilteredData={setFilteredData} />}
				rows={20}
				inline
				scrollHeight="780px"
				itemTemplate={(item) => <VesselListItem item={item} toast={toast} link='/vessel/' />}
			/>
		</>


	);
}
export default VesselPage;

