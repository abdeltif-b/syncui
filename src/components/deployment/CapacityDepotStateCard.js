import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCoins, faDolly, faHashtag, faPallet, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { useApi } from '../../pages/../hooks/services';
import { toDecimal } from '../../utils/utils';
import { Divider } from 'primereact/divider';
import { SubTitle } from '../widgets/SubTitle';


export const CapacityDepotStateCard = ({ deploymentRecord }) => {
	const config = {
		endpoint: 'search_read',
		body: {
			params: {
				model: "aps.deployment.depot.storage.line",
				domain: [["deployment_depot_storage_id", "=", deploymentRecord?.deployment_depot_storage_id[0]]],
			}
		}
	}
	const { data, error } = useApi(config)

	if (error) return 'erreur..'
	if (!data) return 'Chargement...'
	return (
		<>
			<SubTitle title={`Capacités des agence (${deploymentRecord?.deployment_depot_storage_id[1]})`} />
			<div className="grid flex justify-content-between my-1">
				{
					data?.result?.records?.map(item => (
						<div className="p-component w-12rem mb-3">
							<div className="card surface-0 shadow-1 p-3 border-1 border-50 border-round">
								<div className="flex justify-content-between">
									<div className="text-primary pb-3">{item.depot_id[1]}</div>
								</div>
								<div className="mr-5 pb-1 flex align-items-center gap-2">
									<FontAwesomeIcon icon={faDolly} fixedWidth />
									<b>{toDecimal(item.capacity_pallet)} </b>palettes
								</div>
							</div>
						</div>
					))
				}
			</div >
			{/* <Divider /> */}

		</>
	)
}