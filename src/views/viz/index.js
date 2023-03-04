import {useSelector} from "react-redux";
import {
    selectDatas
} from "../../store/actions/dataProcess";
import {gridSpacing} from "../../store/constant";
import {
    Card,
    Grid,
    Typography,
    Box,
    Autocomplete,
    TextField,
    Stack,
    MenuItem,
    ToggleButton,
    FormControlLabel, Checkbox
} from "@mui/material";
import {lazy, useEffect, useRef, useState} from "react";
import {groups,extent as d3extent,min as d3min, max as d3max} from "d3";

// dashboard routing
// const LineChart = Loadable(lazy(() => import('../../components/viz/lineChart')));
// const RibbonChart = Loadable(lazy(() => import('../../components/viz/Ribbon')));
import LineChart from "../../components/viz/lineChart";
import LineCharts from "../../components/viz/lineChart/index_combine";
import LineChartGap from "../../components/viz/lineChart/index_min_max";
import LineChartAggregate from "../../components/viz/lineChart/index_aggregate";
import RibbonChart from "../../components/viz/Ribbon";
import SplomChart from "../../components/viz/Splom";
import PCAChart from "../../components/viz/PCA";
import PCAChart2 from "../../components/viz/PCA/index_reverse";
import SimChart from "../../components/viz/similarity";
import * as PropTypes from "prop-types";
import ViolinChart from "../../components/viz/violinChart";

const mapName={"power_usage":"Power Usage (W)",
    index: "Sample",
    voltage: "Voltage (mV)",
    "edge_temperature": "Edge Temp ('C)",
    "memory_temperature": "Mem Temp ('C)",
    "juntion_temperature":"Junction Temp ('C)",
    "sclk":"GPU Frequency (MHz)",
    "gpu_usage":"GPU Usage (%)",
    "memory_usage":"Mem Usage (%)"}


// fix this later
const Viz = ()=>{
    const datas = useSelector(selectDatas);
    const [isSwap,setIsSwap] = useState(false);
    const [nestData,stNestData] = useState([]);
    const [dimension,setDimension] = useState([]);
    const [dimensionDetail,setDimensionDetail] = useState({});
    const [plotType,setPlotType] = useState('lines');
    const [axis,setAxis] = useState([{label:'x',key:"index"},
        {label:'y',key:"voltage"},
        {label:'z',key:null,is3D:true},
        {label:'color',key:null},
        {label:'dim',key:[],is3D:true},
    ]);
    const [resample,setResample] = useState('rolling');
    const [normalize,setNormalize] = useState(false);
    const optionContain = useRef();

        // {key:"gpu_usage"}]);
    // need to move this in the future
    const ROW = isSwap?'Profile':'AppName';
    const COL = isSwap?'AppName':'Profile';
    function handleNestData(isSwap,datas){
        const newProfile = groups(datas,d=>d[ROW]);
        const positionK = {};
        const flatdata = [];
        const newdata = newProfile.map(([p,pd])=>{
            const app = Object.keys(positionK).map(k=>[k,[]]);
            pd.forEach(d=>{
                if (positionK[d[COL]]===undefined){
                    positionK[d[COL]] = app.length;
                    app[positionK[d[COL]]]=[d[COL],[]];
                }
                app[positionK[d[COL]]][1].push(d);
                flatdata.push(d.data);
            })
            return [p,app]
        })
        stNestData(newdata);
        return {flatdata}
    }
    useEffect(()=>{
        const {flatdata} = handleNestData(isSwap,datas);
        const dimensionDetail = {};
        if (datas[0]&&datas[0].data&&datas[0].data[0]) {
            let dim = Object.keys(datas[0].data[0]);
            dim.forEach(k=>{
                dimensionDetail[k] = [+Infinity,-Infinity];
                const ex = flatdata.map(d=>d3extent(d,d=>+d[k]));
                dimensionDetail[k] = [d3min(ex,d=>d[0]),d3max(ex,d=>d[1])];
                if (mapName[k])
                    dimensionDetail[k].label = mapName[k];
            })
            setDimension(dim)
        }else
            setDimension([]);
        setDimensionDetail(dimensionDetail);
    },[isSwap,datas]);


    const onChangeAxis = (key,value)=>{
        axis[key].key = value;
        setAxis([...axis])
    }
    const largeLayout = ((plotType==='markers')||(plotType==='lines2')||(plotType==='violin')||(plotType==='errorbar')
        ||(plotType==='errorbar2')||(plotType==='aggregate')||(plotType==='lines')||(plotType==='Splom'));
    const renderAxis = ()=>{
        switch (plotType){
            case 'markers':
            case 'errorbar':
            case 'errorbar2':
            case 'lines':
                return axis.map((a,i)=><Autocomplete value={a.key} key={a.label}
                                                     getOptionLabel={d=>d}
                                                     size={"small"}
                                                     sx={{minWidth:200,display:a.is3D ?'none':undefined}}
                                                     options={dimension}
                                                     onChange={(event, newValue) => onChangeAxis(i, newValue)}
                                                     renderInput={(params) => <TextField {...params} label={a.label}/>}/>)
            case 'aggregate':
                return <>{[axis[0], axis[1]].map((a, i) => <Autocomplete value={a.key} key={a.label}
                                                                         getOptionLabel={d => d}
                                                                         size={"small"}
                                                                         sx={{
                                                                             minWidth: 200,
                                                                             display: a.is3D ? 'none' : undefined
                                                                         }}
                                                                         options={dimension}
                                                                         onChange={(event, newValue) => onChangeAxis(i, newValue)}
                                                                         renderInput={(params) => <TextField {...params}
                                                                                                             label={a.label}/>}/>)}
                    <TextField
                        select
                        label="Aggregate"
                        value={resample}
                        key={'Aggregate'}
                        size={"small"}
                        onChange={(event)=>setResample(event.target.value)}
                    >
                        <MenuItem value={'rolling'}>
                            Moving window
                        </MenuItem>
                        <MenuItem value={'resample'}>
                            Resampling
                        </MenuItem>
                    </TextField>
                    <FormControlLabel
                        key={'Aggregate_Normalize'}
                        value={normalize}
                        onChange={(event)=>setNormalize(event.target.checked)}
                        control={<Checkbox />}
                        label={`Normalize ${axis[0].key}`}
                        labelPlacement="end"
                    />
                </>
            case 'violin':
            case 'boxplot':
            case 'Splom':
            case 'pca':
            case 'pca_2':
            case 'sim':
            case 'lines2':
                return <Autocomplete value={axis[4].key}
                                     multiple
                                     getOptionLabel={d=>d}
                                     size={"small"}
                                     options={dimension}
                                     onChange={(event, newValue) => onChangeAxis(4, newValue)}
                                     renderInput={(params) => <TextField {...params} label={axis[4].label}/>}/>
            default:
                return axis.map((a,i)=><Autocomplete value={a.key} key={a.label}
                                                     size={"small"}
                                                     getOptionLabel={d=>d}
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
                                                           sx={{height: 200, mb: 3, paddingTop:2}}>
                        <Typography variant={'h5'} textAlign={'center'}>{app}</Typography>
                        {appData[0] &&
                            <LineChart data={appData[0]?.data}
                                       xKey={axis[0].key}
                                       yKey={axis[1].key}
                                       domain={dimensionDetail}
                                       cKey={axis[3].key}
                                       colorDomain={dimensionDetail[axis[3].key]}
                                       getName={([k,t])=>k}
                                       mode={plotType}
                                       showscale={i===2}
                            />}
                    </Grid>)}
                </Grid>
            case 'errorbar':
                return <Grid container>
                    <LineChartGap data={pData}
                               xKey={axis[0].key}
                               yKey={axis[1].key}
                               domain={dimensionDetail}
                               getName={([k,t])=>k}
                    />
                </Grid>
            case 'errorbar2':
                return <Grid container>
                    <LineChartGap data={pData}
                               xKey={axis[0].key}
                               yKey={axis[1].key}
                               domain={dimensionDetail}
                               getName={([k,t])=>k}
                              combile={true}
                    />
                </Grid>
            case 'aggregate':
                return <Grid container>
                    <LineChartAggregate data={pData}
                                  xKey={axis[0].key}
                                  yKey={axis[1].key}
                                  domain={dimensionDetail}
                                  getName={([k,t])=>k}
                                  combile={true}
                                resample={resample}
                                normalize={normalize}
                    />
                </Grid>
            case 'lines2':
                return <Grid container>{axis[4].key.map(k=><Grid key={k} item xs={axis[4].key.length>1?4:12}>
                        <LineCharts
                            getArr={([k, t]) => t[0] ? t[0].data : []}
                            getName={([k, t]) => k}
                            data={pData}
                            xKey={'index'}
                            yKey={k}
                            domain={dimensionDetail}
                        />
                        </Grid>)}</Grid>
            case 'violin':
                return <ViolinChart
                    getArr={([k,t])=>t[0]?t[0].data:[]}
                    getName={([k,t])=>k}
                    domain={dimensionDetail}
                    data={pData}
                    mode={'violin'}
                    dimensionKeys={axis[4].key}
                />
            case 'boxplot':
                return <ViolinChart
                    getArr={([k,t])=>t[0]?t[0].data:[]}
                    getName={([k,t])=>k}
                    domain={dimensionDetail}
                    data={pData}
                    mode={'box'}
                    dimensionKeys={axis[4].key}
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
                    {axis[4].key.map((d) => <Grid key={d} item xs={axis[4].key.length>1?6:12} sx={{height: 200, mb: 3}}>
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
                <Stack spacing={2} direction={"row"} ref={optionContain}>
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
                        <MenuItem value={'errorbar'}>
                            Line chart with bound
                        </MenuItem>
                        <MenuItem value={'errorbar2'}>
                            Line chart with bound 2
                        </MenuItem>
                        <MenuItem value={'aggregate'}>
                            Line chart with aggregate
                        </MenuItem>
                        <MenuItem value={'lines2'}>
                            Line chart (combine)
                        </MenuItem>
                        <MenuItem value={'violin'}>
                            Violin chart (combine)
                        </MenuItem>
                        <MenuItem value={'boxplot'}>
                            Box plot (combine)
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
                            PCA 2
                        </MenuItem>
                        <MenuItem value={'sim'}>
                            Similarity matrix
                        </MenuItem>
                    </TextField>
                    <ToggleButton value="app_profile" selected={isSwap} color="primary"
                                  onChange={()=>setIsSwap(!isSwap)}>Swap App and Profile</ToggleButton>
                    {renderAxis()}

                </Stack>
            </Grid>
            {
                nestData.map(([profile,pData])=>(<Grid item key={profile} xs={largeLayout?12:6} >
                    <Card>
                        <Box sx={{ p: 2, pl: 2 }}>
                            <Typography variant={'h4'} sx={{textAlign:'center'}}>{profile}</Typography>
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