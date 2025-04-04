import React, { useState } from "react";
import State from "./State";
import District from "./District";
import Talukas from "./Talukas";
import { FaSchool, FaUserGraduate } from "react-icons/fa";
import styles from "./LocationFeature.css";
import TabSwitch from "../../../components/TabSwitch";

const LocationFeature = () => {
  const [activeTab, setActiveTab] = useState("state");

  const tabs = [
    {
      id: "state",
      label: "State",
      icon: <FaSchool />,
    },
    {
      id: "district",
      label: "District",
      icon: <FaUserGraduate />,
    },
    {
      id: "talukas",
      label: "Talukas",
      icon: <FaUserGraduate />,
    },
  ];

  const components = {
    state: <State />,
    district: <District />,
    talukas: <Talukas />,
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.content}>
        <TabSwitch
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <div className={styles.componentContainer}>{components[activeTab]}</div>
      </div>
    </div>
  );
};

export default LocationFeature;
