import TablePagination from '@mui/material/TablePagination';
import * as React from 'react';
import { PAGE_SHOW_OPTIONS } from '../../const';

const CustomPagination = ({ totalDocument, currentPage, handleChangePage, rowsPerPage, handleChangeRowsPerPage }) => {
   return (
      <TablePagination
         component="div"
         showFirstButton
         showLastButton
         count={totalDocument ?? 1}
         page={(currentPage ?? 1) - 1}
         onPageChange={handleChangePage}
         rowsPerPage={rowsPerPage}
         onRowsPerPageChange={handleChangeRowsPerPage}
         rowsPerPageOptions={PAGE_SHOW_OPTIONS}
      />
   )
}
export default CustomPagination