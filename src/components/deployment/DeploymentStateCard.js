import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ProgressBar } from "primereact/progressbar";
import { parseJSON, differenceInMinutes } from "date-fns";

const DeploymentStateCard = ({ record, title, icon, color }) => {
  if (!record) return "chargement...";

  const iconColor = color || "blue";
  const dateValue =
    differenceInMinutes(parseJSON(record.achievement_horizon_end_date), new Date()) /
    differenceInMinutes(
      parseJSON(record.achievement_horizon_end_date),
      parseJSON(record.achievement_horizon_start_date)
    );

  return (
    <div className="card surface-50 shadow-1 p-3 border-1 border-50 border-round">
      <div className="flex justify-content-between">
        <div>
          <span className="font-bold font-medium">{title}: </span>
          <span className="font-medium">{record.name}</span>
        </div>
        <div
          className={`flex align-items-center justify-content-center bg-${iconColor}-100 border-round`}
          style={{ width: "2.5rem", height: "2.5rem" }}
        >
          <FontAwesomeIcon icon={icon} className={`text-${iconColor}-500 text-xl`} />
        </div>
      </div>

      <div className="mr-5 flex align-items-center mt-1">
        <span className="font-bold mr-1">Généré le</span>
        <span>{record.create_date}</span>
      </div>

      <div className="mr-5 align-items-center mt-3 ">
        <span className="font-bold">
          Période de réalisation:
          <ProgressBar value={dateValue} showValue={false} style={{ height: "10px" }} />
        </span>
        <div className="flex justify-content-between flex-wrap card-container purple-container">
          <div className="flex align-items-center justify-content-center text-blue">
            {record.achievement_horizon_start_date}
          </div>
          <div className="flex align-items-center justify-content-center text-blue">
            {record.achievement_horizon_end_date}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeploymentStateCard;
