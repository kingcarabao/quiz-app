import _ from 'lodash';
import { Children, useState, useEffect, useRef } from 'react';
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
import { localHttp } from '../../utils/axios';

interface OrderBy {
  column: string;
  direction: 'ASC' | 'DESC';
}

interface Filter {
  keyword: string;
  columns: string[];
}

interface Params {
  orderBy: OrderBy;
  limit: number;
  offset: number;
  filter: Filter;
  pagination: number;
}

interface Column {
  data: any;
  align: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
}

interface Props {
  orderBy: OrderBy;
  filter: Filter;
  filterOptions?: any;
  headColumns: Column[];
  columns: Column[];
  responseKey: string;
  fetchUrl: string;
  forceReload?: boolean;
  forceReloadActionType: { reload: string; doneReload: string };
}

export default function TablePrime(props: Props) {
  const {
    orderBy,
    filter,
    filterOptions = null,
    headColumns,
    columns,
    fetchUrl,
    responseKey,
    forceReload = false,
    forceReloadActionType = {
      reload: '',
      doneReload: '',
    },
  } = props;

  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [pagination, setPagination] = useState(1);
  const [limit, setLimit] = useState(10);
  const totalPages = useRef(0);
  const offset = useRef(0);

  useEffect(() => {
    fetchRows();
  }, [pagination, limit]);

  const fetchRows = async () => {
    offset.current = pagination * limit - limit;
    setIsLoading(true);

    const params = {
      orderBy,
      limit: limit * 1,
      offset: offset.current,
      filter,
      pagination,
      options: filterOptions,
    };

    await localHttp
      .get(fetchUrl, { params })
      .then((response) => {
        offset.current = pagination * limit - limit;
        totalPages.current = Math.ceil(response.data[responseKey].totalRows / limit);
        setRows(response.data[responseKey].data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        throw new Error(error);
      });
  };

  const handlePagination = (event: any, value: number) => {
    setPagination(value);
  };

  function ShowTableHead() {
    const headCols = headColumns.map((col: Column) =>
      Children.toArray(<TableCell align={col.align}>{col.data}</TableCell>)
    );

    return (
      <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        {headCols}
      </TableRow>
    );
  }

  const ShowTableBody = () => {
    let bodyCols = null;
    if (rows) {
      bodyCols = rows.map((row) =>
        Children.toArray(
          <TableRow hover>
            {Children.toArray(
              columns.map((col: Column) => (
                <TableCell align={col.align}>
                  {typeof col.data === 'function' ? col.data(row) : row[col.data]}
                </TableCell>
              ))
            )}
          </TableRow>
        )
      );
    }

    return bodyCols;
  };

  function ShowTable() {
    return (
      <>
        <TableContainer sx={{ minWidth: 800, mt: 3 }}>
          <Table size="small" aria-label="simple table">
            <TableHead>{ShowTableHead()}</TableHead>
            <TableBody>{ShowTableBody()}</TableBody>
          </Table>
        </TableContainer>
        <Paper sx={{ p: 1, m: 2 }}>
          <Pagination
            count={totalPages.current}
            page={pagination}
            onChange={handlePagination}
            color="primary"
          />
        </Paper>
      </>
    );
  }

  return ShowTable();
}
