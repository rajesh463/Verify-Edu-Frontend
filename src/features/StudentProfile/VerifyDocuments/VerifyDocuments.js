import React, { useState } from "react";

import { FaSchool, FaUserGraduate } from "react-icons/fa";
import styles from "./DemographicFeatures.css";
import TabSwitch from "../../../components/TabSwitch";
import VerifyPastQualificatonDocuments from "./VerifyPastQualificatonDocuments";
import VerifyCurrentCourseDocuments from "./VerifyCurrentCourseDocuments";
const VerifyDocuments = () => {
  const [activeTab, setActiveTab] = useState("PastQualification");

  const tabs = [
    {
      id: "PastQualification",
      label: "Past Qualification",
      icon: <FaSchool />,
    },
    {
      id: "CurrentCourse",
      label: "Current-Course",
      icon: <FaUserGraduate />,
    },
  ];

  const components = {
    PastQualification: <VerifyPastQualificatonDocuments />,
    CurrentCourse: <VerifyCurrentCourseDocuments />,
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

export default VerifyDocuments;
