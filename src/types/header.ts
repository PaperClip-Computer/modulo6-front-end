export interface TabData {
  iconName: TabIconName;
  title: TabTitle;
}

export type TabTitle = 'Procurar' | 'Histórico' | 'Meu Doutor' | 'Gráfico';
export type TabIconName = 'search' | 'restore' | 'stethoscope' | 'graph';
