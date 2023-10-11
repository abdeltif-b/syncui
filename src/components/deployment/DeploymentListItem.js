import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCircleNotch,
  faClockRotateLeft,
  faCubes,
  faMinus,
  faRetweet,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import { Skeleton } from "primereact/skeleton";
import { deploymentStateBodyTemplate } from "../../utils/utils";

export const DeploymentListItem = ({ item, toast, link }) => {
  const router = useRouter();

  const handleClick = (router, deployment_id) => {
    return router.push((link || "/deployment/") + deployment_id.id);
  };

  if (!item)
    return (
      <div className="p-component surface-0 border-round p-2 hover:bg-blue-50">
        <div className="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
          <Skeleton width="100%" height="2rem" />
        </div>
      </div>
    );
  return (
    <div>
      <div className="p-component surface-0 border-round p-2 hover:bg-blue-50">
        <div className="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
          <div onClick={() => handleClick(router, item)} className="cursor-pointer">
            <div className="flex align-items-center flex-wrap">
              <Button
                label={item.name}
                icon={<FontAwesomeIcon icon={faCubes} className="mr-2" />}
                className="p-button-text align-items-center justify-content-center"
              />
              {deploymentStateBodyTemplate(item.state)}

              <div className="ml-5 flex align-items-center text-700 flex-wrap">
                <div className="mr-5 flex align-items-center mt-1">
                  <FontAwesomeIcon icon={faRetweet} className="mr-2" />
                  <span>Plan généré le : {item.create_date}</span>
                </div>
                <div className="mr-5 flex align-items-center mt-1">
                  <FontAwesomeIcon icon={faClockRotateLeft} className="mr-2" />
                  <span>
                    {item.arrival_date ? (
                      item.arrival_date
                    ) : (
                      <span
                        title="Date de départ prévue"
                        className="text-red-600 border-none border-dotted border-bottom-1"
                      >
                        {item.expected_arrival_date}
                      </span>
                    )}
                    <FontAwesomeIcon icon={faArrowRight} className="mx-2" size="xs" />
                    {item.departure_date ? (
                      item.departure_date
                    ) : (
                      <span
                        title="Date de départ prévue"
                        className="text-red-600 border-none border-dotted border-bottom-1"
                      >
                        {item.expected_departure_date}
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex align-items-center mt-1">
                  <FontAwesomeIcon icon={faCircleNotch} className="mr-2" />
                  <span>
                    {item.nbr_container} conteneurs
                    <FontAwesomeIcon icon={faMinus} rotation={90} className="mx-2" />
                    {item.nbr_clients} clients
                    {item.completion_rate && (
                      <>
                        <FontAwesomeIcon icon={faMinus} rotation={90} className="mx-2" />
                        Réalisation : {item.completion_rate}
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
