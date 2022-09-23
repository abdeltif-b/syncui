import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { DeploymentListItem } from '../../components/deployment/DeploymentListItem';
import DeploymentListFilter from '../../components/deployment/DeploymentListFilter';
import { DataScroller } from 'primereact/datascroller';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes } from '@fortawesome/free-solid-svg-icons';
import DeploymentLineBreadCrumb from '../../components/deployment/DeploymentBreadCrumb';

export const _DEPLOYMENT_LINE = {
	'id': 2,
	'name': 'Navire 0022',
	'create_date': '2020-09-01',
	'expected_arrival_date': '2020-09-13',
	'expected_departure_date': '2020-09-14',
	'arrival_date': '2020-09-14',
	'departure_date': '2020-09-16',
	'nbr_container': 23,
	'nbr_clients': 20,
	'state': 'done',
	'active': true,
	'completion_rate': '100%',
}
const DATA = {
	result: {
		records: [
			{
				'id': 5,
				'name': 'Navire 0025',
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
			},
			{
				'id': 4,
				'name': 'Navire 0024',
				'create_date': '2020-09-01',
				'expected_arrival_date': '2020-09-26',
				'expected_departure_date': '2020-09-28',
				'arrival_date': null,
				'departure_date': null,
				'nbr_container': 11,
				'nbr_clients': 10,
				'state': 'fixed',
				'active': true,
				'completion_rate': null,
			},
			{
				'id': 3,
				'name': 'Navire 0023',
				'create_date': '2020-09-01',
				'expected_arrival_date': '2020-09-21',
				'expected_departure_date': '2020-09-25',
				'arrival_date': '2020-09-21',
				'departure_date': null,
				'nbr_container': 50,
				'nbr_clients': 47,
				'state': 'in_progress',
				'active': true,
				'completion_rate': '60%',
			},
			_DEPLOYMENT_LINE,
			{
				'id': 1,
				'name': 'Navire 0021',
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
			label: 'Liste des ___',
			icon: <FontAwesomeIcon icon={faCubes} fixedWidth />,
		},
	];

	return (
		<>
			<DeploymentLineBreadCrumb items={breadCrumbItems} />
			< DataScroller
				value={filteredData}
				header={<DeploymentListFilter data={data} setFilteredData={setFilteredData} />}
				rows={20}
				inline
				scrollHeight="570px"
				itemTemplate={(item) => <DeploymentListItem item={item} toast={toast} link='/vessel/' />}
			/>
		</>


	);
}
export default VesselPage;

