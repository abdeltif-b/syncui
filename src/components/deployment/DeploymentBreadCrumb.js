import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { BreadCrumb } from "primereact/breadcrumb";

const DeploymentLineBreadCrumb = ({ items }) => {
  const router = useRouter();
  const home = { icon: <FontAwesomeIcon icon={faHome} />, command: (event) => router.push("/") };
  return <BreadCrumb model={items} home={home} className="mt-1 mb-2" />;
};
export default DeploymentLineBreadCrumb;
