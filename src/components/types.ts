import { ReactNode } from "react";

export type SidebarItemType = {
  onBlurTab: string;
  setBlurTab: (tab: string) => void;
  isSidebarActive: boolean;
  iconActive: ReactNode;
  iconInactive: ReactNode;
  label: string;
  tabName: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}