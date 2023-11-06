export interface column {
  title: string;
  data: object[];
  dataProperty: keyof object;
}
export interface dataOfTotalColumn{
  title:string;
  data:object[]
  dataProperty:keyof object
}
export interface ColumnGrid {
  columndata?: column;
  normalColumn: boolean;
  LinkColumn?: boolean;
  numberOfLinks?: number;
  linksRedirectTo?: string;
  TotalDataColumn?: boolean;
  dataOfTotalColumn?:dataOfTotalColumn
}
export interface DashboardGrid {
  numberOfColumns: number;
  numberOfLinks?: number;
  totaldatacolumn?: boolean;
  columnOfTotal:dataOfTotalColumn
  column1?: column;
  column2?: column;
  column3?: column;
  column4?: column;
  column5?: column;
  column6?: column;
  column7?: column;
  column8?: column;
}
