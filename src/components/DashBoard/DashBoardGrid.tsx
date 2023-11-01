import { column } from "@/types";
import ColumnGrid from "./ColumnGrid";
import { DashboardGrid } from "@/types/dashboard";

export default function DashboardGrid({
  numberOfColumns,
  numberOfLinks,
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
      className={`min-h-[30rem] w-9/12 bg-orange grid grid-cols-${numberOfColumns} border-black border-r `}>
      {column1 && <ColumnGrid columndata={column1!} LinkColumn={false} />}
      {column2 && <ColumnGrid columndata={column2!} LinkColumn={false} />}
      {column3 && <ColumnGrid columndata={column3!} LinkColumn={false} />}
      {column4 && <ColumnGrid columndata={column4!} LinkColumn={false} />}
      {column5 && <ColumnGrid columndata={column5!} LinkColumn={false} />}
      {column6 && <ColumnGrid columndata={column6!} LinkColumn={false} />}
      {column7 && <ColumnGrid columndata={column7!} LinkColumn={false} />}
      {column8 && <ColumnGrid columndata={column8!} LinkColumn={false} />}
      {column1 && (
        <ColumnGrid
          columndata={column1!}
          LinkColumn={true}
          numberOfLinks={numberOfLinks}
          linksRedirectTo="cursos"
        />
      )}
    </div>
  );
}
