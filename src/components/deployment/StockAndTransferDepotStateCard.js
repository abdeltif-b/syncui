import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faDolly, faHashtag, faPallet, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { useApi } from '../../pages/../hooks/services';
import { toDecimal } from '../../utils/utils';


export const StockAndTransferDepotStateCard = ({ deploymentRecord }) => {
	const config = {
		endpoint: 'stock_and_transfer_by_depot',
		body: {
			params: {
				stock_id: deploymentRecord?.stock_id[0],
				ongoing_transfer_id: deploymentRecord?.ongoing_transfer_id[0]
			}
		}
	}
	const { data: data, error: error } = useApi(config)

	if (error) return 'erreur..'
	if (!data) return 'Chargement...'
	return (
		<div className="grid flex justify-content-between my-1">
			{
				data?.result?.map(item => (
					<div className="p-component w-12rem mb-3">
						<div className="card surface-0 shadow-1 p-3 border-1 border-50 border-round">
							<div className="flex justify-content-between">
								<div className="text-primary pb-3">{item.depot_name}</div>
							</div>
							<div className="mr-5 pb-1 flex align-items-center gap-2">
								<FontAwesomeIcon icon={faCoins} fixedWidth />
								<b>{toDecimal(item.sum_quantity_kmad)}</b> kMAD
							</div>
							<div className="mr-5 pb-1 flex align-items-center gap-2">
								<FontAwesomeIcon icon={faHashtag} fixedWidth />
								<b>{toDecimal(item.count_product_id)}</b> SKUs
							</div>
							<div className="mr-5 pb-1 flex align-items-center gap-2">
								<FontAwesomeIcon icon={faDolly} fixedWidth />
								<b>{toDecimal(item.sum_quantity_pallet)}</b> palettes
							</div>
							<div className="mr-5 pb-1 flex align-items-center gap-2">
								<FontAwesomeIcon icon={faWarehouse} fixedWidth />
								Saturé à <b>{toDecimal(item.sum_depot_overload)}%</b>
							</div>
						</div>
					</div>
				))
			}
		</div >



	)
}
