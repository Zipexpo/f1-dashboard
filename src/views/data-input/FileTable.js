import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import MaterialReactTable, {
    MRT_ToggleGlobalFilterButton,
    MRT_ToggleFiltersButton,
    MRT_ShowHideColumnsButton,
    MRT_FullScreenToggleButton,
} from 'material-react-table';
import {Box} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Upload as UploadIcon} from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import Breadcrumbs from "../../components/extended/Breadcrumbs";
const FileTable = ({data,onSelectRow,onUpload,omit=[]}) => {
    const columns = useMemo(
        ()=> {
            if (data[0]) {
                const head = [];
                Object.keys(data[0]).filter(k=>!omit.find(o=>o===k)).forEach(key => {
                    head.push({
                        // numeric: false,
                        // disablePadding: true,
                        accessorKey: key,
                        header: key,
                    })
                })
                return head;
            }else
                return [];
        },[data,omit]
    );

    //optionally access the underlying virtualizer instance
    const rowVirtualizerInstanceRef = useRef(null);

    // const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sorting, setSorting] = useState([]);
    const [rowSelection, setRowSelection] = useState({});

    useEffect(() => {
    }, [data]);

    useEffect(() => {
        //scroll to the top of the table when the sorting changes
        rowVirtualizerInstanceRef.current?.scrollToIndex(0);
    }, [sorting]);
    const getSelectedRaw = useCallback(() => {
        return data.filter((d,i)=>rowSelection[i]);
    },[rowSelection]);
    return (
        <MaterialReactTable
            columns={columns}
            data={data} //10,000 rows
            // enableBottomToolbar={false}
            enableGlobalFilterModes
            selectAllMode={'all'}
            // enableDensityToggle={false}
            // enablePagination={false}
            // enableRowNumbers
            // enableRowVirtualization
            muiTableContainerProps={{ sx: { maxHeight: '100%' } }}
            initialState={{ density: 'compact' }}
            onSortingChange={setSorting}
            state={{ isLoading, sorting, rowSelection  }}
            enableRowSelection
            onRowSelectionChange={setRowSelection}

            muiTableBodyRowProps={({ row }) => ({
                onClick: ()=>{onSelectRow(row.original)},
                sx: { cursor: 'pointer' },
            })}
            enableColumnResizing
            defaultColumn={{
                minSize: 50, //allow columns to get smaller than default
                maxSize: 9001, //allow columns to get larger than default
                size: 220, //make columns wider by default
            }}
            renderTopToolbarCustomActions={({ table }) => (
                <Box sx={{ display: 'flex', gap: '1rem' }}>{(onUpload &&Object.keys(rowSelection).length)?
                    <IconButton onClick={()=>onUpload(getSelectedRaw())} size={"small"}> Use selected data
                        <UploadIcon />
                    </IconButton>:''}</Box>
            )}
            renderToolbarInternalActions={({ table }) => (
                <Box>
                    <MRT_ToggleGlobalFilterButton table={table} />
                    <MRT_ToggleFiltersButton table={table} />
                    <MRT_ShowHideColumnsButton table={table} />
                    <MRT_FullScreenToggleButton table={table} />
                </Box>
            )}
            positionToolbarAlertBanner="bottom"
        />
    );
};

//virtualizerInstanceRef was renamed to rowVirtualizerInstanceRef in v1.5.0
//virtualizerProps was renamed to rowVirtualizerProps in v1.5.0

FileTable.propTypes = {
    data: PropTypes.array,
    onSelectRow: PropTypes.func,
    onUpload: PropTypes.func
};

export default FileTable;