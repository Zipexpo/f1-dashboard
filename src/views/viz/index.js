import {useSelector} from "react-redux";
import {
    selectDatas
} from "../../store/actions/dataProcess";
import {gridSpacing} from "../../store/constant";
import {Card, Grid, Typography, Box, Autocomplete, TextField, Stack, MenuItem} from "@mui/material";
import {lazy, useEffect, useState} from "react";
import {groups,extent as d3extent,min as d3min, max as d3max} from "d3";



// dashboard routing
// const LineChart = Loadable(lazy(() => import('../../components/viz/lineChart')));
// const RibbonChart = Loadable(lazy(() => import('../../components/viz/Ribbon')));
import LineChart from "../../components/viz/lineChart";
import LineCharts from "../../components/viz/lineChart/index_combine";
// import LineChart from "../../components/viz/lineChart/subplots";
import RibbonChart from "../../components/viz/Ribbon";
import SplomChart from "../../components/viz/Splom";
import PCAChart from "../../components/viz/PCA";
import PCAChart2 from "../../components/viz/PCA/index_reverse";
import SimChart from "../../components/viz/similarity";

// fix this later
const Viz = ()=>{
    const datas = useSelector(selectDatas);
    const [nestData,stNestData] = useState([]);
    const [dimension,setDimension] = useState([]);
    const [dimensionDetail,setDimensionDetail] = useState({});
    const [plotType,setPlotType] = useState('lines');
    const [layout,setLayout] = useState([]);
    const [axis,setAxis] = useState([{label:'x',key:"index"},
        {label:'y',key:"voltage"},
        {label:'z',key:null,is3D:true},
        {label:'color',key:null},
        {label:'dim',key:[],is3D:true},
    ]);
        // {key:"gpu_usage"}]);
    // need to move this in the future
    useEffect(()=>{
        const newProfile = groups(datas,d=>d.Profile);
        const positionK = {};
        const flatdata = [];
        const newdata = newProfile.map(([p,pd])=>{
            const app = Object.keys(positionK).map(k=>[k,[]]);
            pd.forEach(d=>{
                if (positionK[d.AppName]===undefined){
                    positionK[d.AppName] = app.length;
                    app[positionK[d.AppName]]=[d.AppName,[]];
                }
                app[positionK[d.AppName]][1].push(d);
                flatdata.push(d.data);
            })
            return [p,app]
        })
        stNestData(newdata);
        const dimensionDetail = {};
        if (datas[0]&&datas[0].data&&datas[0].data[0]) {
            let dim = Object.keys(datas[0].data[0]);
            dim.forEach(k=>{
                dimensionDetail[k] = [+Infinity,-Infinity];
                const ex = flatdata.map(d=>d3extent(d,d=>+d[k]));
                dimensionDetail[k] = [d3min(ex,d=>d[0]),d3max(ex,d=>d[1])];
            })
            setDimension(dim)
        }else
            setDimension([]);
        setDimensionDetail(dimensionDetail);
    },[datas]);
    const onChangeAxis = (key,value)=>{
        axis[key].key = value;
        setAxis([...axis])
    }
    const largeLayout = ((plotType==='markers')||(plotType==='lines2')||(plotType==='lines')||(plotType==='Splom'));
    const renderAxis = ()=>{
        switch (plotType){
            case 'markers':
            case 'lines':
                return axis.map((a,i)=><Autocomplete value={a.key} key={a.label}
                                                     size={"small"}
                                                     sx={{minWidth:200,display:a.is3D ?'none':undefined}}
                                                     options={dimension}
                                                     onChange={(event, newValue) => onChangeAxis(i, newValue)}
                                                     renderInput={(params) => <TextField {...params} label={a.label}/>}/>)

            case 'Splom':
            case 'pca':
            case 'pca_2':
            case 'sim':
                return <Autocomplete value={axis[4].key}
                                     multiple
                                     size={"small"}
                                     options={dimension}
                                     onChange={(event, newValue) => onChangeAxis(4, newValue)}
                                     renderInput={(params) => <TextField {...params} label={axis[4].label}/>}/>
            default:
                return axis.map((a,i)=><Autocomplete value={a.key} key={a.label}
                                                     size={"small"}
                                                     sx={{minWidth:200,display:a.label==='color' ?'none':undefined}}
                                                     options={dimension}
                                                     onChange={(event, newValue) => onChangeAxis(i, newValue)}
                                                     renderInput={(params) => <TextField {...params} label={a.label}/>}/>)
        }
    }
    const renderPlots = ([profile,pData])=>{
        switch (plotType){
            case 'markers':
            case 'lines':
                return <Grid container>
                    {pData.map(([app, appData],i) => <Grid key={`${profile} ${app}`} item xs={4}
                                                           sx={{height: 200, mb: 3}}>
                        <Typography variant={'h5'} textAlign={'center'}>{app}</Typography>
                        {appData[0] &&
                            <LineChart data={appData[0]?.data} xKey={axis[0].key} yKey={axis[1].key}
                                       cKey={axis[3].key}
                                       colorDomain={dimensionDetail[axis[3].key]}
                                       getArr={([k,t])=>t[0]?t[0].data:[]}
                                       getName={([k,t])=>k}
                                       mode={plotType}
                                       showscale={i===2}
                            />}
                    </Grid>)}
                </Grid>
            case 'lines2':
                return <LineCharts
                    getArr={([k,t])=>t[0]?t[0].data:[]}
                    getName={([k,t])=>k}
                    data={pData}
                    xKey={axis[0].key}
                    yKey={axis[1].key}
                />
            case 'Splom':
                return <SplomChart
                    getArr={([k,t])=>t[0]?t[0].data:[]}
                    getName={([k,t])=>k}
                    data={pData}
                    dimensionKeys={axis[4].key}
                />
            case 'pca':
                return <PCAChart
                    getArr={([k,t])=>t[0]?t[0].data:[]}
                    getName={([k,t])=>k}
                    data={pData}
                    dimensionKeys={axis[4].key}
                />
            case 'pca_2':
                return <PCAChart2
                    getArr={([k,t])=>t[0]?t[0].data:[]}
                    getName={([k,t])=>k}
                    data={pData}
                    dimensionKeys={axis[4].key}
                />
            case 'sim':
                return <Grid container>
                    {axis[4].key.map((d) => <Grid key={d} item xs={6} sx={{height: 200, mb: 3}}>
                        <Typography variant={'h5'} textAlign={'center'}>{d}</Typography>
                        <SimChart getArr={([k,t])=>t[0]?t[0].data:[]}
                                       getName={([k,t])=>k}
                                       data={pData}
                                       dimensionKey={d}
                            />
                    </Grid>)}
                </Grid>
            case 'Ribbon':
                return <RibbonChart
                    getArr={([k,t])=>t[0]?t[0].data:[]}
                    getName={([k,t])=>k}
                    data={pData}
                    xKey={axis[0].key}
                    yKey={axis[1].key}
                    zKey={axis[2].key}
                    cKey={axis[3].key}
                />
            default:
                return <>Not support yet</>
        }
    }
    return(
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} >
                <Stack spacing={2} direction={"row"}>
                    <TextField
                        select
                        label="Plot type"
                        size="small"
                        sx={{minWidth:200}}
                        value={plotType}
                        onChange={(event)=>setPlotType(event.target.value)}
                    >
                        <MenuItem value={'markers'}>
                            Scatter plot
                        </MenuItem>
                        <MenuItem value={'lines'}>
                            Line chart
                        </MenuItem>
                        <MenuItem value={'lines2'}>
                            Line chart (combine)
                        </MenuItem>
                        <MenuItem value={'Ribbon'}>
                            3D scatter plot
                        </MenuItem>
                        <MenuItem value={'Splom'}>
                            Splom
                        </MenuItem>
                        <MenuItem value={'pca'}>
                            PCA
                        </MenuItem>
                        <MenuItem value={'pca_2'}>
                            PCA (revert)
                        </MenuItem>
                        <MenuItem value={'sim'}>
                            Similarity matrix
                        </MenuItem>
                    </TextField>
                {renderAxis()}
                </Stack>
            </Grid>
            {
                nestData.map(([profile,pData])=>(<Grid item key={profile} xs={largeLayout?12:6} >
                    <Card>
                        <Box sx={{ p: 2, pl: 2 }}>
                            <Typography variant={'h3'}>{profile}</Typography>
                            {
                                renderPlots([profile,pData])
                            }
                        </Box>
                    </Card>
                </Grid>))
            }
        </Grid>
    )
}

export default Viz;