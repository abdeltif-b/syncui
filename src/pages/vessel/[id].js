import { useRouter } from 'next/router'

import { DeploymentListItem } from '../../components/deployment/DeploymentListItem';
import { TabView, TabPanel } from 'primereact/tabview';
import DeploymentLineBreadCrumb from '../../components/deployment/DeploymentBreadCrumb';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faCubes, faHashtag, faPallet, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import DeploymentLineTableSync from '../../components/deployment/DeploymentLineTableSync';
import { _DEPLOYMENT_LINE } from '.';
import { VesselMap } from '../../components/vessel/VesselMap';


export default function DeploymentDetailPage({ toast }) {

  const [dataDeployment, setDataDeployment] = useState({
    result: [_DEPLOYMENT_LINE]
  })
  const router = useRouter()
  const { id } = router.query


  const tabHeadertemplate = (title, subtitle) => (
    <>
      <div className='flex align-items-center justify-content-center'>{title}</div>
      <div className='text-xs font-light flex align-items-center justify-content-center mt-1'>{subtitle}</div>
    </>
  )
  // if (router.isFallback) {
  //   return <div>Chargement...</div>
  // }
  const breadCrumbItems = [
    {
      label: 'Liste des navires',
      icon: <FontAwesomeIcon icon={faCubes} fixedWidth />,
      command: (event) => router.push('/vessel')
    },
    {
      label: dataDeployment?.result && dataDeployment?.result[0]?.name,
    }
  ]

  return (
    <div>
      {/* <Toast ref={toast} /> */}

      <DeploymentLineBreadCrumb items={breadCrumbItems} />
      <DeploymentListItem item={dataDeployment?.result[0]} toast={toast} />

      <TabView className='mt-2'>

        <TabPanel key='tab1' header={tabHeadertemplate('Containers to unload', null)}>
          <VesselMap />
          <DeploymentLineTableSync deploymentId={Number(id)} toast={toast} />
        </TabPanel>
        <TabPanel key='tab2' header={tabHeadertemplate('tab2', null)}>
        </TabPanel>

      </TabView>

    </div>

  )
}
