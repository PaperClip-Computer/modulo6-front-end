import { TabData } from './header';

export interface HeaderOptions {
  hasGoBack?: boolean;
  hasOptions?: boolean;
  tabData?: TabData;
}

export type ExamSortOrder = 'asc' | 'desc';

export interface ExamListItem {
  examName: string;
  isPending: boolean;
  date: string;
}

export interface UserRouteMeta {
  hasSearch?: boolean;
  noPending?: boolean;
}
