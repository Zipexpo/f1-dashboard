import { createSlice } from "@reduxjs/toolkit";

/* Reducer */

const initialState= {files:[]};

const filesList = createSlice({
    name: "fileList",
    initialState,
    reducers: {
        setFilesList: (state,action) =>{
            state.files[action.payload.key] = action.payload.value;

        },
        setFilesLists: (state,action) => {
            debugger
            state.files = [...action.payload.files];
        }
    }
});
export const { setFilesList, setFilesLists } = filesList.actions;
export const selectDatas = (state) => state.datas.files;
export default filesList.reducer;