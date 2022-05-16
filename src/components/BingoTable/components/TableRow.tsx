import React, {memo} from 'react'
import TableColumn from "./TableColumn";
import {Column} from "./TableColumn";

export interface TableRowProps {
    columns: Array<Column>;
}
function TableRow({columns}: TableRowProps) {
  return (
    <tr>
        {
          columns && 
          columns.map((column: Column) => <TableColumn column={column} key={column.key} />)
        }
    </tr>
  )
}

export default memo(TableRow);