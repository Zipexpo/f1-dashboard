import PropTypes from 'prop-types';
import {useEffect, useRef, useState, useTransition} from 'react';
import {csvParse} from 'd3'

// material-ui
import { useTheme } from '@mui/material/styles';
import {Box, Button, Card, Divider, Grid, TextField, Typography} from '@mui/material';
import { gridSpacing } from '../../store/constant';
import FileTable from "./FileTable";
import DragDropFile from "../../components/DragDropFile";
import {setFilesLists} from "../../store/actions/dataProcess";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";

const DataInput = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const buttonRef = useRef(null);
    const [fileList,setFileList] = useState([]);
    const [appprofileRegex,setAppProfileRegex] = useState('MI100-profile-<AppName>-<Profile>-\\S+');
    const [isPending, startTransition] = useTransition();

    // function
    const triggergetproperty = (newregextext)=>{
        try {
            const newregexP = new RegExp(newregextext.replace(/<Profile>|<AppName>/g,'<(.*?)>'))
            const newregex = new RegExp(newregextext.replace(/<Profile>|<AppName>/g,'(.*?)'))
            const ProfileAppHolder = [newregextext.replace(newregexP,'$1'),newregextext.replace(newregexP,'$2')];
            if (ProfileAppHolder[0]&&ProfileAppHolder[1]) {
                fileList.forEach(f => {
                    const s = f['File name'];
                    f[ProfileAppHolder[0]] = s.replace(newregex,'$1');
                    f[ProfileAppHolder[1]] = s.replace(newregex,'$2');
                })
                setFileList([...fileList]);
            }else{
                // new match
            }
        }catch(e){

        }
    }
    const onProfileRegexChange = (event) =>{
        const newregextext = event.target.value;
        setAppProfileRegex(newregextext);
        triggergetproperty(newregextext)
    }
    const handleFile = (files)=>{
        startTransition(async () => {
            let q = [];
            for (let i=0; i<files.length;i++)
            {
                let selected = files[i];
                fileList[i] = {
                    'File name':selected.name,
                    '# rows':0,
                    'Profile':null,
                    'AppName':null,
                    isLoading:true,
                    data:[]
                }
                setFileList([...fileList])
                q.push(new Promise((resolve,reject) => {
                    try {
                        let reader = new FileReader();
                        reader.readAsText(new Blob([selected], {type: selected.type}));
                        reader.onloadend = (event) => {
                            fileList[i].isLoading = false;
                            fileList[i].data = csvParse(event.target.result);
                            fileList[i]['# rows'] = fileList[i].data.length;
                            setFileList([...fileList])
                            resolve(true);
                        };
                    }catch(e){
                        fileList[i].isLoading = false;
                        fileList[i].data = [];
                        setFileList([...fileList])
                        resolve(false);
                    }
                }));
            }
            console.log(fileList.map(f=>f['File name']).join('", "'))
            try{
                await Promise.all(q);
                triggergetproperty(appprofileRegex)
            }catch(e){
                console.log(e)
            }
        });
    }
    const onStoreFile = (selected)=>{
        dispatch(setFilesLists({files: selected}));
        navigate('/viz')
    }
    return( <DragDropFile buttonRef={buttonRef} multiple={true} handleFile={handleFile}>
            <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Card>
                    <Box sx={{ p: 2, pl: 2 }}>
                        <Grid
                            container
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            spacing={1}
                        >
                            <Grid item >
                                <Typography variant={'h2'}>{fileList.length} files</Typography>
                            </Grid>
                            <Grid item >
                                <TextField size={"small"} label={'App-Profile-pattern'} value={appprofileRegex} onChange={onProfileRegexChange}></TextField>
                            </Grid>
                            <Grid item>
                                <Button ref={buttonRef} variant={'contained'} >
                                    Upload files
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={12}>
                {/*<Card>*/}
                {/*    <Box sx={{ p: 2, pl: 2 }}>*/}
                        <FileTable data={fileList} omit={['data','isLoading']} onUpload={onStoreFile}/>
                    {/*</Box>*/}
                {/*</Card>*/}
            </Grid>
            </Grid>
        </DragDropFile>)
}

export default DataInput