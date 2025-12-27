
export interface AmharicCharMap {
  ä?: string;
  base: string;
  a?: string;
  u?: string;
  i?: string;
  e?: string;
  o?: string;
  [key: string]: string | undefined;
}

export interface DocSection {
  id: string;
  title: string;
  content: string;
}

export type NavItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
};
