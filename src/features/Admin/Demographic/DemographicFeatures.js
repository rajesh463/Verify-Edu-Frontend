import React, { useState } from "react";

import { FaSchool, FaUserGraduate } from "react-icons/fa";
import styles from "./DemographicFeatures.css";
import TabSwitch from "../../../components/TabSwitch";

import Religions from "./Religions";
import CastCategories from "./CastCategories";
import Castes from "./Castes";

const DemographicFeatures = () => {
  const [activeTab, setActiveTab] = useState("Religions");

  const tabs = [
    {
      id: "Religions",
      label: "Religions",
      icon: <FaSchool />,
    },
    {
      id: "CastCategories",
      label: "CastCategories",
      icon: <FaUserGraduate />,
    },
    {
      id: "Castes",
      label: "Castes",
      icon: <FaUserGraduate />,
    },
  ];

  const components = {
    Religions: <Religions />,
    CastCategories: <CastCategories />,
    Castes: <Castes />,
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

export default DemographicFeatures;
