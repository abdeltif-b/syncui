import { useRouter } from 'next/router'

import DeploymentLineTable from '../../components/deployment/DeploymentLineTable';
import DeploymentCard from '../../components/deployment/DeploymentStateCard';
import { getDeploymentFromExample, getDeploymentLineExample } from '../../utils/utils';
import { DeploymentListItem } from '../../components/deployment/DeploymentListItem';
import { TabView, TabPanel } from 'primereact/tabview';
import DeploymentLineInsights from '../../components/deployment/DeploymentLineInsights';
import DeploymentLineBreadCrumb from '../../components/deployment/DeploymentBreadCrumb';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import { useApi, usePostAuth } from '../../hooks/services';
import { Card } from 'primereact/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faCubes, faHashtag, faPallet, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { StockAndTransferDepotStateCard } from '../../components/deployment/StockAndTransferDepotStateCard';
import { SaleOrderDepotStateCard } from '../../components/deployment/SaleOrderDepotStateCard';
import DeploymentLineTableSync from '../../components/deployment/DeploymentLineTableSync';
import { AvgSaleDepotStateCard } from '../../components/deployment/AvgSaleDepotStateCard';
import { CapacityDepotStateCard } from '../../components/deployment/CapacityDepotStateCard';
import { StockAndTransferPivot } from '../../components/deployment/StockAndTransferPivot';
import { SaleOrderPivot } from '../../components/deployment/SaleOrderPivot';
import { AvgSalePivot } from '../../components/deployment/AvgSalePivot';
import { DeploymentCoveragePivot } from '../../components/deployment/DeploymentCoveragePivot';
import { _DEPLOYMENT_LINE } from '.';
import { GanttChart } from '../../components/deployment/GanttChart';
import ClientPreference from '../../components/deployment/ClientPreference';
import ArrimagePlan from '../../components/deployment/ArrimagePlan';


export default function DeploymentDetailPage({ toast }) {
  // const toast = useRef(null);
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
      command: (event) => router.push('/deployment')
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

        <TabPanel key='tab1' header={tabHeadertemplate('Conteneurs à décharger', null)}>
          <DeploymentLineTableSync deploymentId={Number(id)} toast={toast} />
        </TabPanel>
        <TabPanel key='tab2' header={tabHeadertemplate('Plan d\'arrimage', null)}>
          <ArrimagePlan deploymentId={Number(id)} toast={toast} />
        </TabPanel>
        <TabPanel key='tab3' header={tabHeadertemplate('Préférence du client', null)}>
          <ClientPreference deploymentId={Number(id)} toast={toast} />
        </TabPanel>
        <TabPanel key='tab4' header={tabHeadertemplate('Nombre de conteneur à déplacer', null)}>
          <GanttChart />
        </TabPanel>

        {/* <TabPanel key='stock' header={tabHeadertemplate('Stock et transferts en cours', dataDeployment.result[0]?.stock_id[1])}>
          <StockAndTransferDepotStateCard deploymentRecord={dataDeployment?.result[0]} />
          <StockAndTransferPivot deploymentRecord={dataDeployment?.result[0]} />
        </TabPanel> */}


      </TabView>


    </div>

  )
}


// export async function getStaticPaths() {
//   // let { data, error, status } = await supabase
//   //   .from('deployment')
//   //   .select(`*`)
//   // const data = getDeploymentFromExample
//   const params = {
//     params: {
//       model: "aps.deployment",
//       fields: ["id"]
//     }
//   }
//   const { data, error, mutate } = await useApi({ params })


//   const paths = data.map((item) => ({
//     params: { id: item.id.toString() }
//   }));
//   console.log(paths)

//   return {
//     fallback: false,
//     paths
//   };
// }


// export async function getStaticProps({ params }) {
//   // let { data: dataDeployment, error: deploymentError, status: deploymentStatus } = await supabase
//   //   .from('deployment')
//   //   .select(`*`)
//   //   .eq('id', params.id)
//   //   .single()

//   // let { data: deploymentLineData, error: deploymentLineError, status: deploymentLineStatus } = await supabase
//   //   .from('deployment_line')
//   //   .select(`*`)
//   //   .eq('deployment_id', params.id)

//   const dataDeployment = getDeploymentFromExample[0]
//   console.log('getDeploymentFromExample[0]' + getDeploymentFromExample[0])
//   const deploymentLineData = getDeploymentLineExample

//   return {
//     props: {
//       data: dataDeployment,
//       deploymentLineRecords: deploymentLineData
//     },
//     // revalidate: 10
//   };
// }