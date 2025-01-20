import {useNavigate} from 'react-router-dom';

export type Tab = {name: string; onClick: () => void};

export interface TabContext {
  navigate: ReturnType<typeof useNavigate>;
}

export interface CategoryProps {
  categoryTitle: string;
  tabList: Tab[];
}
