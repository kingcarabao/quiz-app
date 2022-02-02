import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
} from '@mui/material';
import { Column } from '../../@types/table';
import Scrollable from '../BaseUI/Scrollable';

interface Props {
  headColumns: Column[];
  columns: Column[];
  rows: any[];
  rowId: string;
}

export default function TablePrime(props: Props) {
  const { headColumns, columns, rows, rowId } = props;
  const [isLoading, setIsLoading] = useState(false);

  function ShowTableHead() {
    const headCols = headColumns.map((col: Column, idx: number) => (
      <TableCell key={`head-cell-${idx}`} align={col.align}>
        {col.data}
      </TableCell>
    ));

    return (
      <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        {headCols}
      </TableRow>
    );
  }

  const ShowTableBody = () => {
    let bodyCols = null;
    if (rows) {
      bodyCols = rows.map((row) => (
        <TableRow hover key={`row-${row[rowId]}`}>
          {columns.map((col: Column) => (
            <TableCell key={`body-cell-${col.data}-${row[rowId]}-`} align={col.align}>
              {typeof col.data === 'function' ? col.data(row) : row[col.data]}
            </TableCell>
          ))}
        </TableRow>
      ));
    }
    return bodyCols;
  };

  function ShowTable() {
    return (
      <Scrollable direction="both" value="auto">
        <TableContainer>
          <Table size="small" aria-label="simple table">
            <TableHead>{ShowTableHead()}</TableHead>
            <TableBody>{ShowTableBody()}</TableBody>
          </Table>
        </TableContainer>
      </Scrollable>
    );
  }

  return ShowTable();
}
