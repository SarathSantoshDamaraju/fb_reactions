import React, { useState } from "react";

import Tab from "./Tab";
import "./index.scss";

const Tabs = (props) => {
  const [activeTab, setActiveTab] = useState("Like"),
    { children } = props;

  return (
    <div className="tabs">
      {/* Tabs Menu */}
      <ul className="tab-list">
        {children.map((child) => {
          const { label, name } = child.props;

          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              name={name}
              onClick={() => setActiveTab(name)}
            />
          );
        })}
      </ul>

      {/* Tab Content */}
      <ul className="tab-content">
        {children.map((child) => {
          if (child.props.name !== activeTab) return undefined;
          return child.props.children;
        })}
      </ul>
    </div>
  );
};

export default Tabs;
