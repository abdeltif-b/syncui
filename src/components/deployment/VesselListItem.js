import React, { useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBoxesStacked, faCircleNotch, faClockRotateLeft, faCubes, faFolderPlus, faInfo, faMinus, faPowerOff, faRefresh, faRetweet, faTrashCan, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
import { Skeleton } from 'primereact/skeleton';
import { deploymentState, deploymentStateBodyTemplate } from '../../utils/utils';
import { fetcher, useApi } from '../../hooks/services';
import { DataScroller } from 'primereact/datascroller';
import Link from 'next/link';

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL


const DeploymentListItemAction = ({ item, toast, mutateDeployment }) => {
	const router = useRouter();


	const acceptRefresh = async () => {
		// setLoading(true)
		const url = BASE_API_URL + '/web/dataset/deployment'
		const config = {
			params: {}
		}
		const data = await fetcher(url, config)
		if (data?.error) return toast.current.show({ severity: 'error', summary: 'Erreur', detail: data?.error.data.arguments[0], life: 3000 })
		if (data?.result) return (mutateDeployment() && toast.current.show({ severity: 'info', summary: 'Succès', detail: 'Plan de déploiement actualisé', life: 3000 }))
		// setLoading(false)
	};
	const confirmRefresh = (event) => {
		confirmPopup({
			target: event.currentTarget,
			message: 'Êtes-vous sûr de vouloir mettre à jour le plan de déploiement?\nToutes vos modifications sur ce plan seront perdues',
			icon: <FontAwesomeIcon icon={faTriangleExclamation} />,
			// acceptClassName: 'p-button-warning',
			accept: () => acceptRefresh(),
		});
	};


	const acceptDelete = async () => {
		const url = BASE_API_URL + '/web/dataset/call_kw'
		const config = {
			params: {
				model: "aps.deployment",
				method: "unlink",
				args: [item.id],
				kwargs: {}
			}
		}
		const data = await fetcher(url, config)
		if (data?.error) return toast.current.show({ severity: 'error', summary: 'Erreur', detail: data?.error.data.arguments[0], life: 3000 })
		if (data?.result) return (
			mutateDeployment() &&
			toast.current.show({ severity: 'info', summary: 'Succès', detail: 'Plan de déploiement supprimé', life: 3000 })
			// <Link ref={'/deployment'} />
			// router.push('/deployment') && console.log('hdfhd')
		)
	};
	const confirmDelete = (event) => {
		confirmPopup({
			target: event.currentTarget,
			message: 'Êtes-vous sûr de vouloir supprimer ce plan de déploiement? Toutes informations liées à ce plan seront perdues',
			icon: <FontAwesomeIcon icon={faTriangleExclamation} />,
			acceptClassName: 'p-button-danger',
			accept: () => acceptDelete(),
		});
	};

	const acceptStop = async () => {
		const url = BASE_API_URL + '/web/dataset/call_kw'
		const config = {
			params: {
				model: "aps.deployment",
				method: "write",
				args: [[item.id], { "state": deploymentState.stopped.value }],
				kwargs: {}
			}
		}
		const data = await fetcher(url, config)
		if (data?.error) return toast.current.show({ severity: 'error', summary: 'Erreur', detail: data?.error.data.arguments[0], life: 3000 })
		if (data?.result) return (mutateDeployment() && toast.current.show({ severity: 'info', summary: 'Succès', detail: 'Plan de déploiement arrêté', life: 3000 }))
	};
	const confirmStop = async (event) => {
		confirmPopup({
			target: event.currentTarget,
			message: 'Êtes-vous sûr de vouloir arrêter le plan de déploiement?\n.....',
			icon: <FontAwesomeIcon icon={faTriangleExclamation} />,
			acceptClassName: 'p-button-warning',
			accept: () => acceptStop(),
		});
	};

	const acceptSend = async () => {
		console.log('send DAs..')
		const url = BASE_API_URL + '/web/dataset/call_kw'
		const config = {
			params: {
				model: "aps.deployment",
				method: "write",
				args: [[item.id], { "state": deploymentState.fixed.value }],
				kwargs: {}
			}
		}
		const data = await fetcher(url, config)
		if (data?.error) return toast.current.show({ severity: 'error', summary: 'Erreur', detail: data?.error.data.arguments[0], life: 3000 })
		if (data?.result) return (mutateDeployment() && toast.current.show({ severity: 'info', summary: 'Succès', detail: 'Plan de déploiement figé et DAs envoyées', life: 3000 }))

	};
	const confirmSend = (event) => {
		confirmPopup({
			target: event.currentTarget,
			message: 'Êtes-vous sûr de vouloir envoyer les DA pour ce plan de déploiement?',
			icon: <FontAwesomeIcon icon={faTriangleExclamation} />,
			acceptClassName: 'p-button-success',
			accept: () => acceptSend(),
		});
	};

	return (
		<div className="mt-3 lg:mt-0">
			<ConfirmPopup />
			{item.state === deploymentState.created.value &&
				<>
					<Button onClick={confirmRefresh} icon={<FontAwesomeIcon icon={faRefresh} />} className="p-button-raised p-button-text mr-2" tooltip='Mettre à jour' tooltipOptions={{ position: 'top' }} />
					<Button label="Sage" onClick={confirmSend} className="p-button-raised p-button-text p-button-success mr-2" tooltip='Envoyer les DA' tooltipOptions={{ position: 'top' }} />
				</>
			}
			{item.state === deploymentState.fixed.value &&
				<Button onClick={confirmDelete} icon={<FontAwesomeIcon icon={faTrashCan} />} className="p-button-raised p-button-text p-button-danger mr-2" tooltip='Supprimer' tooltipOptions={{ position: 'top' }} />
			}
			{item.state === deploymentState.in_progress.value &&
				<Button onClick={confirmStop} icon={<FontAwesomeIcon icon={faPowerOff} />} className="p-button-raised p-button-text p-button-warning mr-2" tooltip='Arrêter' tooltipOptions={{ position: 'top' }} />
			}
		</div>
	)
}

export const VesselListItem = ({ item, toast, link }) => {
	const [loading, setLoading] = useState(false)
	const router = useRouter();

	const handleClick = (router, deployment_id) => {
		return (router.push((link || '/deployment/') + deployment_id.id))
	}


	if (!item) return (
		< div className="p-component surface-0 border-round p-2 hover:bg-blue-50">
			<div className="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
				<Skeleton width="100%" height="2rem" />
			</div>
		</div>
	)
	return (
		<div>
			{/* <Toast ref={toast} /> */}

			< div className="p-component surface-0 border-round p-2 hover:bg-blue-50">
				{/* <div className="block hover:bg-blue-50"> */}
				<div className="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
					<div onClick={() => handleClick(router, item)} className='cursor-pointer'>
						<div className="flex align-items-center flex-wrap">
							<Button label={item.name} icon={<FontAwesomeIcon icon={faCubes} className="mr-2" />} className="p-button-text align-items-center justify-content-center" />
							{/* {item.stopped && <Tag id='stoped' icon={<FontAwesomeIcon icon={faPowerOff} />} severity="warning" className='align-items-center justify-content-center mr-2' />} */}
							{/* {deploymentStateBodyTemplate(item.state)} */}
							{/* <Tag value={item.state} severity='info' className='align-items-center justify-content-center mr-3' /> */}

							<div className="ml-5 flex align-items-center text-700 flex-wrap">
								<div className="mr-5 flex align-items-center mt-1">
									<FontAwesomeIcon icon={faRetweet} className="mr-2" />
									<span>Plan généré le : {item.create_date}</span>
								</div>

							</div>
						</div>
						{/* <Button label={item.state} className="p-button-outlined p-button-sm p-button-danger mx-2" disabled /> */}
					</div>

					{/* <DeploymentListItemAction item={item} toast={toast} mutateDeployment={mutateDeployment} redirect={redirect} /> */}
				</div>
			</div>
		</div>
	);
}
