import "./styles.scss";
import clsx from "clsx";
import React, { useState } from "react";

type Tab = {
   title: string;
   onClick: () => void;
};

type PropsType = {
   tabs: Tab[];
};

export function Tabs({ tabs }: PropsType) {
   const [currentTab, setCurrentTab] = useState(0);

   return (
      <div className="apartment-tabs">
         {tabs.map((tab, index) => (
            <span
               className={clsx("apartment-tabs__tab", currentTab === index && "active")}
               key={tab.title}
               onClick={() => {
                  tab.onClick();
                  setCurrentTab(index);
               }}>
               {tab.title}
            </span>
         ))}
      </div>
   );
}
