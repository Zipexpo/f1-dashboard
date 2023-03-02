import LoadingButton from '@mui/lab/LoadingButton';
import {setFilesLists} from "../../store/actions/dataProcess";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {csvParse} from "d3";
const files = ["MI100-profile-LAMMPS-POWER SAVING-0", "MI100-profile-LAMMPS-VIDEO-0", "MI100-profile-LSTM-AUTO-0", "MI100-profile-LSTM-BOOTUP DEFAULT-0", "MI100-profile-LSTM-COMPUTE-0", "MI100-profile-LSTM-POWER SAVING-0", "MI100-profile-LSTM-VIDEO-0", "MI100-profile-NAMD-AUTO-0", "MI100-profile-NAMD-BOOTUP DEFAULT-0", "MI100-profile-NAMD-COMPUTE-0", "MI100-profile-NAMD-POWER SAVING-0", "MI100-profile-NAMD-VIDEO-0", "MI100-profile-ResNet50-AUTO-0", "MI100-profile-ResNet50-BOOTUP DEFAULT-0", "MI100-profile-ResNet50-COMPUTE-0", "MI100-profile-ResNet50-POWER SAVING-0", "MI100-profile-ResNet50-VIDEO-0", "MI100-profile-SPECFEM3D-AUTO-0", "MI100-profile-SPECFEM3D-BOOTUP DEFAULT-0", "MI100-profile-SPECFEM3D-COMPUTE-0", "MI100-profile-SPECFEM3D-POWER SAVING-0", "MI100-profile-SPECFEM3D-VIDEO-0", "MI100-profile-STREAM-AUTO-0", "MI100-profile-STREAM-BOOTUP DEFAULT-0", "MI100-profile-STREAM-COMPUTE-0", "MI100-profile-STREAM-POWER SAVING-0", "MI100-profile-STREAM-VIDEO-0", "MI100-profile-BERT-AUTO-0", "MI100-profile-BERT-BOOTUP DEFAULT-0", "MI100-profile-BERT-COMPUTE-0", "MI100-profile-BERT-POWER SAVING-0", "MI100-profile-BERT-VIDEO-0", "MI100-profile-DGEMM-AUTO-0", "MI100-profile-DGEMM-BOOTUP DEFAULT-0", "MI100-profile-DGEMM-COMPUTE-0", "MI100-profile-DGEMM-POWER SAVING-0", "MI100-profile-DGEMM-VIDEO-0", "MI100-profile-GROMACS-AUTO-0", "MI100-profile-GROMACS-BOOTUP DEFAULT-0", "MI100-profile-GROMACS-COMPUTE-0", "MI100-profile-GROMACS-POWER SAVING-0", "MI100-profile-GROMACS-VIDEO-0", "MI100-profile-LAMMPS-AUTO-0", "MI100-profile-LAMMPS-BOOTUP DEFAULT-0", "MI100-profile-LAMMPS-COMPUTE-0"]
    .map(f=>({name:f,path:`${process.env.PUBLIC_URL}/data/${f}`}));
const Dashboard = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [fileList,setFileList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    useEffect(()=>{
        setIsLoading(true)
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
            q.push(fetch(selected.path, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'content-type': 'text/csv;charset=UTF-8',
                }
            }).then(response =>{
                response.text().then((data) => {
                debugger
                try {
                    fileList[i].isLoading = false;
                    fileList[i].data = csvParse(data);
                    fileList[i]['# rows'] = fileList[i].data.length;
                    setFileList([...fileList])
                    const newregextext = 'MI100-profile-<AppName>-<Profile>-\\S+';
                    const newregexP = new RegExp(newregextext.replace(/<Profile>|<AppName>/g,'<(.*?)>'))
                    const newregex = new RegExp(newregextext.replace(/<Profile>|<AppName>/g,'(.*?)'))
                    const ProfileAppHolder = [newregextext.replace(newregexP,'$1'),newregextext.replace(newregexP,'$2')];
                    fileList.forEach(f => {
                        const s = f['File name'];
                        f[ProfileAppHolder[0]] = s.replace(newregex,'$1');
                        f[ProfileAppHolder[1]] = s.replace(newregex,'$2');
                    })
                    setFileList([...fileList]);
                    setIsLoading(false)

                }catch(e){
                    // fileList[i].isLoading = false;
                    // fileList[i].data = [];
                    // setFileList([...fileList])
                    // resolve(false);
                }
            })}));
        }
    },[])
    const setExample = ()=>{
        dispatch(setFilesLists({files: fileList}));
        navigate('/viz')
    }

    return <div> Use Data-input tab to choose data and use Viz tab to view data.
        Or click <LoadingButton loading={isLoading} variant={'contained'} onClick={setExample} >here </LoadingButton> to use example data
    </div>
}

export default Dashboard