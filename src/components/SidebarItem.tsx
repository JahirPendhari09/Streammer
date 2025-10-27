import React from 'react'
import { SidebarItemType } from './types';

export const SidebarItem: React.FC<SidebarItemType> = ({
  onBlurTab,
  setBlurTab,
  isSidebarActive,
  iconActive,
  iconInactive,
  label,
  tabName,
  activeTab,
  setActiveTab
}) => (
  <div
    onMouseEnter={() => setBlurTab(tabName)}
    onMouseLeave={() => setBlurTab('')}
    className='flex h-[60px] justify-center items-center cursor-pointer relative'
    onClick={() => setActiveTab(tabName)}
  >
    <div className='relative flex justify-center'>
      {(activeTab === tabName || onBlurTab === tabName) ? iconActive : iconInactive}
      {isSidebarActive && (
        <span
          className={`absolute left-[32px] text-xl transition-opacity duration-300
          ${(activeTab === tabName || onBlurTab === tabName) ? 'font-bold' : ''} `}
        > {label} </span>
      )}
    </div>
  </div>
);

