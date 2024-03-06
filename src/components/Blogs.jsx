import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Blogs = () => {
  const blogs = useSelector((state) => state.blog);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    setRowData(blogs);
  }, [blogs]);

  const columnDefs = [
    { headerName: 'Title', field: 'title', sortable: true, filter: true },
  ];

  const gridOptions = {
    domLayout: 'autoHeight',
    suppressPaginationPanel: true, // Hide pagination controls
    paginationPageSize: blogs.length, // Show all rows without pagination
  };

  return (
    <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        gridOptions={gridOptions}
      />
    </div>
  );
};

export default Blogs;
