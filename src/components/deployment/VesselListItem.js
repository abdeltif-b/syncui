import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes, faRetweet } from "@fortawesome/free-solid-svg-icons";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import { Skeleton } from "primereact/skeleton";

export const VesselListItem = ({ item, toast, link }) => {
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

              <div className="ml-5 flex align-items-center text-700 flex-wrap">
                <div className="mr-5 flex align-items-center mt-1">
                  <FontAwesomeIcon icon={faRetweet} className="mr-2" />
                  <span>Plan généré le : {item.create_date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
