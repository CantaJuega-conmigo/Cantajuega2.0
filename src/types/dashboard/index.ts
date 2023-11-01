export interface column {
  title: string;
  data: object[];
  dataProperty: keyof object;
}
export interface ColumnGrid {
  columndata: column;
  LinkColumn?: boolean;
  numberOfLinks?: number;
  linksRedirectTo?: string;
}
export interface DashboardGrid {
  numberOfColumns: number;
  numberOfLinks?: number;
  column1?: column;
  column2?: column;
  column3?: column;
  column4?: column;
  column5?: column;
  column6?: column;
  column7?: column;
  column8?: column;
}
