import React, { useState } from "react";

import { FaSchool, FaUserGraduate } from "react-icons/fa";
import styles from "./EducationFeatures.css";
import TabSwitch from "../../../components/TabSwitch";

import Qualification from "./Qualification";
import Courses from "./Courses";
import LevelStreams from "./LevelStreams";
import Boards from "./Boards";

const EducationFeatures = () => {
  const [activeTab, setActiveTab] = useState("Qualification");

  const tabs = [
    {
      id: "Qualification",
      label: "Qualification",
      icon: <FaSchool />,
    },
    {
      id: "LevelStreams",
      label: "LevelStreams",
      icon: <FaUserGraduate />,
    },
    {
      id: "Courses",
      label: "Courses",
      icon: <FaUserGraduate />,
    },
    {
      id: "Boards",
      label: "Boards",
      icon: <FaUserGraduate />,
    },
  ];

  const components = {
    Qualification: <Qualification />,
    LevelStreams: <LevelStreams />,
    Courses: <Courses />,
    Boards: <Boards />,
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

export default EducationFeatures;
