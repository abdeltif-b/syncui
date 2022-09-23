import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { Divider } from 'primereact/divider';
import { CheckboxTag } from '../widgets/CheckboxTag';


export const DeploymentLineTableHeader = ({ data, totalRecords, setFilteredData, initialDomain, setDomain, lazyParams, setLazyParams }) => {
	// const [length, setLength] = useState()

	const [productCount, setProductCount] = useState('-')
	const [depotCount, setDepotCount] = useState('-')

	const [avgSaleNullCount, setAvgSaleNullCount] = useState('-')
	const [avgSaleNotNullCount, setAvgSaleNotNullCount] = useState('-')
	const [palletSizeNullCount, setPalletSizeNullCount] = useState('-')
	const [palletSizeNotNullCount, setPalletSizeNotNullCount] = useState('-')
	const [netNeedNullCount, setNetNeedNullCount] = useState('-')
	const [netNeedNotNullCount, setNetNeedNotNullCount] = useState('-')
	const [fairShareNullCount, setFairShareNullCount] = useState('-')
	const [fairShareNotNullCount, setFairShareNotNullCount] = useState('-')
	const [needToDeployNullCount, setNeedToDeployNullCount] = useState('-')
	const [needToDeployNotNullCount, setNeedToDeployNotNullCount] = useState('-')
	const [editedCount, setEditedCount] = useState('-')
	const [notEditedCount, setNotEditedCount] = useState('-')
	const [projectedCentralStockNullCount, setProjectedCentralStockNullCount] = useState('-')
	const [projectedCentralStockNotNullCount, setProjectedCentralStockNotNullCount] = useState('-')

	const [avgSaleNull, setAvgSaleNull] = useState(false)
	const [avgSaleNotNull, setAvgSaleNotNull] = useState(false)
	const [palletSizeNull, setPalletSizeNull] = useState(false)
	const [palletSizeNotNull, setPalletSizeNotNull] = useState(false)
	const [netNeedNull, setNetNeedNull] = useState(false)
	const [netNeedNotNull, setNetNeedNotNull] = useState(false)
	const [fairShareNull, setFairShareNull] = useState(false)
	const [fairShareNotNull, setFairShareNotNull] = useState(false)
	const [needToDeployNull, setNeedToDeployNull] = useState(false)
	const [needToDeployNotNull, setNeedToDeployNotNull] = useState(false)
	const [edited, setEdited] = useState(false)
	const [notEdited, setNotEdited] = useState(false)
	const [projectedCentralStockNull, setProjectedCentralStockNull] = useState(false)
	const [projectedCentralStockNotNull, setProjectedCentralStockNotNull] = useState(false)

	// tag count effect
	useEffect(() => {
		const records = data?.result?.records
		if (!records) return

		const _productCount = [...new Set(records.map(item => item.product_id))].length
		const _depotCount = [...new Set(records.map(item => item.depot_id))].length
		setProductCount(_productCount)
		setDepotCount(_depotCount)

		const _avgSaleNullCount = records.reduce((acc, item) => (item.sum_deployment_avg_sale == 0 ? acc + 1 : acc), 0)
		const _avgSaleNotNullCount = records.reduce((acc, item) => (item.sum_deployment_avg_sale != 0 ? acc + 1 : acc), 0)
		const _palletSizeNullCount = records.reduce((acc, item) => (item.qty_per_pallet == 0 ? acc + 1 : acc), 0)
		const _palletSizeNotNullCount = records.reduce((acc, item) => (item.qty_per_pallet != 0 ? acc + 1 : acc), 0)
		const _netNeedNullCount = records.reduce((acc, item) => (item.net_need == 0 ? acc + 1 : acc), 0)
		const _netNeedNotNullCount = records.reduce((acc, item) => (item.net_need != 0 ? acc + 1 : acc), 0)
		const _fairShareNullCount = records.reduce((acc, item) => (item.fair_share_need == 0 ? acc + 1 : acc), 0)
		const _fairShareNotNullCount = records.reduce((acc, item) => (item.fair_share_need != 0 ? acc + 1 : acc), 0)
		const _needToDeployNullCount = records.reduce((acc, item) => (item.need_to_deploy == 0 ? acc + 1 : acc), 0)
		const _needToDeployNotNullCount = records.reduce((acc, item) => (item.need_to_deploy != 0 ? acc + 1 : acc), 0)
		const _editedCount = records.reduce((acc, item) => (item.need_to_deploy != item.fair_share_need ? acc + 1 : acc), 0)
		const _notEditedCount = records.reduce((acc, item) => (item.need_to_deploy == item.fair_share_need ? acc + 1 : acc), 0)
		const _projectedCentralStockNullCount = records.reduce((acc, item) => (item.projected_central_stock == 0 ? acc + 1 : acc), 0)
		const _projectedCentralStockNotNullCount = records.reduce((acc, item) => (item.projected_central_stock != 0 ? acc + 1 : acc), 0)
		setAvgSaleNullCount(_avgSaleNullCount)
		setAvgSaleNotNullCount(_avgSaleNotNullCount)
		setPalletSizeNullCount(_palletSizeNullCount)
		setPalletSizeNotNullCount(_palletSizeNotNullCount)
		setNetNeedNullCount(_netNeedNullCount)
		setNetNeedNotNullCount(_netNeedNotNullCount)
		setFairShareNullCount(_fairShareNullCount)
		setFairShareNotNullCount(_fairShareNotNullCount)
		setNeedToDeployNullCount(_needToDeployNullCount)
		setNeedToDeployNotNullCount(_needToDeployNotNullCount)
		setEditedCount(_editedCount)
		setNotEditedCount(_notEditedCount)
		setProjectedCentralStockNullCount(_projectedCentralStockNullCount)
		setProjectedCentralStockNotNullCount(_projectedCentralStockNotNullCount)

	}, [data])


	useEffect(() => {
		let _domain = initialDomain
		if (avgSaleNull) _domain.push(["sum_deployment_avg_sale", "=?", 0])
		if (avgSaleNotNull) _domain.push(["sum_deployment_avg_sale", ">", 0])
		if (palletSizeNull) _domain.push(["qty_per_pallet", "=?", 0])
		if (palletSizeNotNull) _domain.push(["qty_per_pallet", ">", 0])
		if (netNeedNull) _domain.push(["net_need", "=?", 0])
		if (netNeedNotNull) _domain.push(["net_need", ">", 0])
		if (fairShareNull) _domain.push(["fair_share_need", "=?", 0])
		if (fairShareNotNull) _domain.push(["fair_share_need", ">", 0])
		if (needToDeployNull) _domain.push(["need_to_deploy", "=?", 0])
		if (needToDeployNotNull) _domain.push(["need_to_deploy", ">", 0])
		if (edited) _domain.push(["edited", "=", true])
		if (notEdited) _domain.push(["edited", "=", false])
		if (projectedCentralStockNull) _domain.push(["projected_central_stock", "=?", 0])
		if (projectedCentralStockNotNull) _domain.push(["projected_central_stock", ">", 0])

		// fields filter domain
		const depotIdList = lazyParams.filters.depot_id.value
		const productIdList = lazyParams.filters.product_id.value
		const productDescriptionList = lazyParams.filters.description.value
		if (depotIdList?.length) _domain.push(["depot_id", "in", depotIdList])
		if (productIdList?.length) _domain.push(["product_id", "in", productIdList])
		if (productDescriptionList?.length) _domain.push(["description", "in", productDescriptionList])

		// reset page
		setLazyParams((prevState) => ({
			...prevState,
			first: 0
		}));

		setDomain(_domain)

	}, [
		avgSaleNull,
		avgSaleNotNull,
		palletSizeNull,
		palletSizeNotNull,
		netNeedNull,
		netNeedNotNull,
		fairShareNull,
		fairShareNotNull,
		needToDeployNull,
		needToDeployNotNull,
		edited,
		notEdited,
		projectedCentralStockNull,
		projectedCentralStockNotNull,
		lazyParams.filters
	])


	const handleResetFilter = () => {
		setAvgSaleNull(false)
		setAvgSaleNotNull(false)
		setPalletSizeNull(false)
		setPalletSizeNotNull(false)
		setNetNeedNull(false)
		setNetNeedNotNull(false)
		setFairShareNull(false)
		setFairShareNotNull(false)
		setNeedToDeployNull(false)
		setNeedToDeployNotNull(false)
		setEdited(false)
		setNotEdited(false)
		setProjectedCentralStockNull(false)
		setProjectedCentralStockNotNull(false)
	}

	const handleResetNeedToDeploy = () => {
	}

	const filteredRecords = data?.result?.length || 0

	return (
		<div className='flex justify-content-between flex-wrap bg-blue-50'>
			<div className='flex align-items-left justify-content-left gap-2'>
				<div className='flex flex-column gap-1'>
					<div className='flex gap-2'>
						<Button icon={< FontAwesomeIcon icon={faRotateLeft} />} onClick={handleResetNeedToDeploy} className="p-button-text p-button-danger p-button-sm" tooltip='Réinitialiser la quantité à déployer' style={{ height: 0 }} />
					</div>
					<div className='flex gap-2'>
						<Button icon={< FontAwesomeIcon icon={faFilter} />} onClick={handleResetFilter} className="p-button-text p-button-primary p-button-sm" tooltip='Réinitialiser le filtre' style={{ height: 0 }} />
					</div>
				</div>
			</div>
			<Divider layout='vertical' style={{ margin: 0, padding: 0 }} />
			<div className='flex align-items-left justify-content-left gap-2'>
				<div className='flex flex-column gap-1'>
					<div className='flex gap-2'>
						{totalRecords}
						<span className='font-light'> lignes en total</span>
					</div>
					<div className='flex gap-2'>
						{filteredRecords}
						<span className='font-light'> lignes sélectionnées</span>
						<span className='text-xs text-primary'> {`(${productCount} SKUs, ${depotCount} agences)`}</span>
					</div>
				</div>
			</div>
			<Divider layout='vertical' style={{ margin: 0, padding: 0 }} />
			<CheckboxTag
				title='Moyenne de vente'
				ids={['avgSaleNull', 'avgSaleNotNull']}
				labels={['nulle', 'positive']}
				states={[avgSaleNull, avgSaleNotNull]}
				setStates={[setAvgSaleNull, setAvgSaleNotNull]}
				counts={[avgSaleNullCount, avgSaleNotNullCount]}
				divider
			/>
			<CheckboxTag
				title='Palettisation disponible'
				ids={['palletSizeNotNull', 'palletSizeNull']}
				labels={['oui', 'non']}
				states={[palletSizeNotNull, palletSizeNull]}
				setStates={[setPalletSizeNotNull, setPalletSizeNull]}
				counts={[palletSizeNotNullCount, palletSizeNullCount]}
				divider
			/>
			<CheckboxTag
				title='Besoin net'
				ids={['netNeedNull', 'netNeedNotNull']}
				labels={['nulle', 'positive']}
				states={[netNeedNull, netNeedNotNull]}
				setStates={[setNetNeedNull, setNetNeedNotNull]}
				counts={[netNeedNullCount, netNeedNotNullCount]}
				divider
			/>
			<CheckboxTag
				title='Déploiement fair share'
				ids={['fairShareNull', 'fairShareNotNull']}
				labels={['nulle', 'positive']}
				states={[fairShareNull, fairShareNotNull]}
				setStates={[setFairShareNull, setFairShareNotNull]}
				counts={[fairShareNullCount, fairShareNotNullCount]}
				divider
			/>
			<CheckboxTag
				title='Décision de déploiement'
				ids={['needToDeployNotNull', 'needToDeployNull']}
				labels={['nulle', 'positive']}
				states={[needToDeployNull, needToDeployNotNull]}
				setStates={[setNeedToDeployNull, setNeedToDeployNotNull]}
				counts={[needToDeployNullCount, needToDeployNotNullCount]}
				divider
			/>
			<CheckboxTag
				title='Ligne éditée'
				ids={['edited', 'notEdited']}
				labels={['oui', 'non']}
				states={[edited, notEdited]}
				setStates={[setEdited, setNotEdited]}
				counts={[editedCount, notEditedCount]}
				divider
			/>
			<CheckboxTag
				title='Stock central projeté'
				ids={['projectedCentralStockNull', 'projectedCentralStockNotNull']}
				labels={['nulle', 'positive']}
				states={[projectedCentralStockNull, projectedCentralStockNotNull]}
				setStates={[setProjectedCentralStockNull, setProjectedCentralStockNotNull]}
				counts={[projectedCentralStockNullCount, projectedCentralStockNotNullCount]}
				divider={false}
			/>

		</div>
	)
}

/*
 ! DEPRECATED FRONTEND FILTER
	// filter effect
	useEffect(() => {
		const newFilteredData = data?.result?.records.filter(item => {
			const f1 = []
			if (avgSaleNull) f1.push(item.sum_deployment_avg_sale == 0)
			if (avgSaleNotNull) f1.push(item.sum_deployment_avg_sale != 0)
			const f2 = []
			if (palletSizeNull) f2.push(item.qty_per_pallet == 0)
			if (palletSizeNotNull) f2.push(item.qty_per_pallet != 0)
			const f3 = []
			if (netNeedNull) f3.push(item.net_need == 0)
			if (netNeedNotNull) f3.push(item.net_need != 0)
			const f4 = []
			if (fairShareNull) f4.push(item.fair_share_need == 0)
			if (fairShareNotNull) f4.push(item.fair_share_need != 0)
			const f5 = []
			if (needToDeployNull) f5.push(item.need_to_deploy == 0)
			if (needToDeployNotNull) f5.push(item.need_to_deploy != 0)
			const f6 = []
			if (edited) f6.push(item.need_to_deploy != item.fair_share_need)
			if (notEdited) f6.push(item.need_to_deploy == item.fair_share_need)
			const f7 = []
			if (projectedCentralStockNull) f7.push(item.projected_central_stock == 0)
			if (projectedCentralStockNotNull) f7.push(item.projected_central_stock != 0)

			return (
				[f1.some(Boolean), f2.some(Boolean), f3.some(Boolean), f4.some(Boolean), f5.some(Boolean), f6.some(Boolean), f7.some(Boolean)].every(Boolean)
			)
		})
		setFilteredData(newFilteredData)
	}, [
		data,
		avgSaleNull,
		avgSaleNotNull,
		palletSizeNull,
		palletSizeNotNull,
		netNeedNull,
		netNeedNotNull,
		fairShareNull,
		fairShareNotNull,
		needToDeployNull,
		needToDeployNotNull,
		edited,
		notEdited,
		projectedCentralStockNull,
		projectedCentralStockNotNull
	])

*/