import ColumnGrid from "./ColumnGrid";
import { DashboardGrid } from "@/types/dashboard";

export default function DashboardGrid({
  numberOfColumns,
  numberOfLinks,
  columnOfTotal,
  linksRedirectTo,
  column1,
  column2,
  column3,
  column4,
  column5,
  column6,
  column7,
  column8,
}: DashboardGrid) {
  return (
    <div
      className={`min-h-[30rem] w-9/12 bg-orange grid grid-flow-col grid-cols-${numberOfColumns} border-black border-r `}>
      {column1 && <ColumnGrid columndata={column1!} normalColumn={true} />}
      {column2 && <ColumnGrid columndata={column2!} normalColumn={true} />}
      {column3 && <ColumnGrid columndata={column3!} normalColumn={true} />}
      {column4 && <ColumnGrid columndata={column4!} normalColumn={true} />}
      {column5 && <ColumnGrid columndata={column5!} normalColumn={true} />}
      {column6 && <ColumnGrid columndata={column6!} normalColumn={true} />}
      {column7 && <ColumnGrid columndata={column7!} normalColumn={true} />}
      {column8 && <ColumnGrid columndata={column8!} normalColumn={true} />}
      {columnOfTotal&& <ColumnGrid  dataOfTotalColumn={columnOfTotal} normalColumn={false} TotalDataColumn={true}/>}
      {column1 && (
        <ColumnGrid
          columndata={column1!}
          normalColumn={false}
          LinkColumn={true}
          numberOfLinks={numberOfLinks}
          linksRedirectTo={linksRedirectTo??'/'}
        />
      )}
    </div>
  );
}
