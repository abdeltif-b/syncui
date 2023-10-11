import React, { useEffect, useState } from "react";
import { CheckboxTag } from "../widgets/CheckboxTag";
import { deploymentState } from "../../utils/utils";

const DeploymentListFilter = ({ data, setFilteredData }) => {
  const [createDate, setCreateDate] = useState();
  const [realizationDate, setRealizationDate] = useState();

  const [fixedStateCount, setFixedStateCount] = useState("-");
  const [inProgressStateCount, setInProgressStateCount] = useState("-");
  const [doneStateCount, setDoneStateCount] = useState("-");

  const [fixedState, setFixedState] = useState(false);
  const [inProgressState, setInProgressState] = useState(false);
  const [doneState, setDoneState] = useState(false);

  // tag count effect
  useEffect(() => {
    const records = data?.result?.records;
    if (!records) return;
    const _fixedStateCount = records.reduce(
      (acc, item) => (item.state == deploymentState.fixed.value ? acc + 1 : acc),
      0
    );
    const _inProgressStateCount = records.reduce(
      (acc, item) => (item.state == deploymentState.in_progress.value ? acc + 1 : acc),
      0
    );
    const _doneStateCount = records.reduce(
      (acc, item) => (item.state == deploymentState.done.value ? acc + 1 : acc),
      0
    );
    setFixedStateCount(_fixedStateCount);
    setInProgressStateCount(_inProgressStateCount);
    setDoneStateCount(_doneStateCount);
  }, [data]);

  // filter effect
  useEffect(() => {
    const _filteredData = data?.result?.records.filter((item) => {
      const result = [];
      if (fixedState) result.push(item.state == "fixed");
      if (inProgressState) result.push(item.state == "in_progress");
      if (doneState) result.push(item.state == "done");
      return result.every(Boolean);
    });
    setFilteredData(_filteredData);
  }, [data, createDate, realizationDate, fixedState, inProgressState, doneState]);

  return (
    <div className="flex align-items-center justify-content-between flex-wrap">
      <CheckboxTag
        title="Statut des plannings de déchargement"
        ids={["fixedState", "inProgressState", "doneState"]}
        labels={["Planifié", "En cours", "Déchargé"]}
        states={[fixedState, inProgressState, doneState]}
        setStates={[setFixedState, setInProgressState, setDoneState]}
        counts={[fixedStateCount, inProgressStateCount, doneStateCount]}
        divider={false}
      />
    </div>
  );
};
export default DeploymentListFilter;
