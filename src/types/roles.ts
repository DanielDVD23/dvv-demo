export type Role = "staffelleitung" | "clubadmin" | "verbandsadmin" | "benutzer" | "socialmedia";

export interface NavItem {
  id: string;
  label: string;
  badge?: number;
  icon: string;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export interface NewModalItem {
  icon: string;
  name: string;
  desc: string;
  border: string;
  nav: string;
  action?: string;
}

export interface RoleConfig {
  id: Role;
  label: string;
  subtitle: string;
  userName: string;
  initials: string;
  gradient: string;
  navSections: NavSection[];
  breadcrumbs: Record<string, string[]>;
  defaultScreen: string;
  newModalItems: NewModalItem[];
}
