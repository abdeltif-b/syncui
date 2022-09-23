import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faDolly, faHashtag, faPallet, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { useApi } from '../../pages/../hooks/services';
import { toDecimal } from '../../utils/utils';

export const SaleOrderDepotStateCard = ({ deploymentRecord }) => {
	const config = {
		endpoint: 'sale_order_by_depot',
		body: {
			params: {
				ongoing_sale_order_id: deploymentRecord?.ongoing_sale_order_id[0]
			}
		}
	}
	const { data, error } = useApi(config)

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
								<b>{toDecimal(item.sum_remaining_undelivered_qty_kmad)} </b>kMAD
							</div>
							<div className="mr-5 pb-1 flex align-items-center gap-2">
								<FontAwesomeIcon icon={faHashtag} fixedWidth />
								<b>{toDecimal(item.count_product_id)} </b>SKUs
							</div>
							<div className="mr-5 pb-1 flex align-items-center gap-2">
								<FontAwesomeIcon icon={faDolly} fixedWidth />
								<b>{toDecimal(item.sum_remaining_undelivered_qty_pallet)} </b>palettes
							</div>
						</div>
					</div>
				))
			}
		</div >
	)
}
