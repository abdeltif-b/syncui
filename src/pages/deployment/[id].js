import { useRouter } from "next/router";
import { DeploymentListItem } from "../../components/deployment/DeploymentListItem";
import { TabView, TabPanel } from "primereact/tabview";
import DeploymentLineBreadCrumb from "../../components/deployment/DeploymentBreadCrumb";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes } from "@fortawesome/free-solid-svg-icons";
import DeploymentLineTableSync from "../../components/deployment/DeploymentLineTableSync";
import { _DEPLOYMENT_LINE } from ".";
import { GanttChart } from "../../components/deployment/GanttChart";
import ClientPreference from "../../components/deployment/ClientPreference";
import ArrimagePlan from "../../components/deployment/ArrimagePlan";

export default function DeploymentDetailPage({ toast }) {
  const [dataDeployment, setDataDeployment] = useState({
    result: [_DEPLOYMENT_LINE],
  });
  const router = useRouter();
  const { id } = router.query;

  const tabHeadertemplate = (title, subtitle) => (
    <>
      <div className="flex align-items-center justify-content-center">{title}</div>
      <div className="text-xs font-light flex align-items-center justify-content-center mt-1">{subtitle}</div>
    </>
  );

  const breadCrumbItems = [
    {
      label: "Planning de déchargement des conteneurs",
      icon: <FontAwesomeIcon icon={faCubes} fixedWidth />,
      command: (event) => router.push("/deployment"),
    },
    {
      label: dataDeployment?.result && dataDeployment?.result[0]?.name,
    },
  ];

  return (
    <div>
      <DeploymentLineBreadCrumb items={breadCrumbItems} />
      <DeploymentListItem item={dataDeployment?.result[0]} toast={toast} />
      <TabView className="mt-2">
        <TabPanel key="tab1" header={tabHeadertemplate("Conteneurs à décharger", null)}>
          <DeploymentLineTableSync deploymentId={Number(id)} toast={toast} />
        </TabPanel>
        <TabPanel key="tab2" header={tabHeadertemplate("Plan d'arrimage", null)}>
          <ArrimagePlan deploymentId={Number(id)} toast={toast} />
        </TabPanel>
        <TabPanel key="tab3" header={tabHeadertemplate("Préférence du client", null)}>
          <ClientPreference deploymentId={Number(id)} toast={toast} />
        </TabPanel>
        <TabPanel key="tab4" header={tabHeadertemplate("Planning de déchargement des conteneurs", null)}>
          <GanttChart />
        </TabPanel>
      </TabView>
    </div>
  );
}
