import { useRouter } from 'next/router'

import { TabView, TabPanel } from 'primereact/tabview';
import DeploymentLineBreadCrumb from '../../components/deployment/DeploymentBreadCrumb';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faCubes, faHashtag, faPallet, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import DeploymentLineTableSync from '../../components/deployment/DeploymentLineTableSync';
import { _DEPLOYMENT_LINE } from '.';
import { VesselMap } from '../../components/vessel/VesselMap';
import { VesselListItem } from '../../components/deployment/VesselListItem';
import VesselUnload from '../../components/vessel/VesselUnload';
import ArrimagePlanVessel from '../../components/vessel/ArrimagePlanVessel';
import { VesselMapResult } from '../../components/vessel/VesselMapResult';
import { VesselGanttChart } from '../../components/vessel/VesselGanttChart';


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
      label: 'Liste des plannings des navires',
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
      <VesselListItem item={dataDeployment?.result[0]} toast={toast} />

      <TabView className='mt-2'>
        <TabPanel key='tab1' header={tabHeadertemplate('Position des navires', null)}>
          <VesselMap />
        </TabPanel>
        <TabPanel key='tab2' header={tabHeadertemplate('Navires à décharger', null)}>
          <VesselUnload />
        </TabPanel>
        <TabPanel key='tab3' header={tabHeadertemplate('Plan d\'arrimage', null)}>
          <ArrimagePlanVessel />
        </TabPanel>
        <TabPanel key='tab4' header={tabHeadertemplate('Planning des navires', null)}>
          <VesselGanttChart />
        </TabPanel>
        <TabPanel key='tab5' header={tabHeadertemplate('Résultats', null)}>
          <VesselMapResult />
        </TabPanel>

      </TabView>

    </div>

  )
}
