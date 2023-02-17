import Plot from 'react-plotly.js';

import {useEffect, useRef, useState, useTransition} from "react";

const initData=[];
const domain=[undefined,undefined];
const layout={title:{text:'',pad:0},margin:{t:10,l:50,b:20},grid: {
        rows: 2,
        columns: 2}}
const LineChart = ({data=initData,xKey,yKey,cKey,getName,getArr,colorDomain=domain,mode='line'})=>{
    const [isPending,startTransition] = useTransition();
    const [plotdata,setPlotdata] = useState(initData);
    // const [colordata,setColordata] = useState([]);
    useEffect(()=>{
        startTransition(()=>{
            const trace = data.map(d=>{
                const x=[];
                const y=[];
                const color=[];
                getArr(d).forEach(d=>{
                    x.push(d[xKey]);
                    y.push(d[yKey]);
                    color.push(d[cKey]);
                });
                return{
                    name:getName(d),
                    x,
                    y,
                    color
                }
            })
            setPlotdata(trace)
        })
    },[xKey,yKey,cKey,data]);
    // useEffect(()=>{
    //     if (mode==='markers'){
    //         debugger
    //         if (cKey) {
    //             setColordata(data.map(d=>d[cKey]));
    //         }else {
    //             setColordata([]);
    //         }
    //     }else
    //         setColordata([]);
    // },[data,cKey,mode])
    const plotopt = plotdata.map(t=>({
        name:t.name,
        x:t.x,
        y:t.y,
        type: 'scatter',
        mode,
        marker: cKey?{color:t.color, colorscale: "Portland",colorbarTitleText: cKey,
            showscale:true,
            cmin:colorDomain[0],cmax:colorDomain[1]
        }:undefined
    }));
    // console.log(JSON.stringify(spec.data.values))
    return (<Plot data={plotopt} style={{width: '100%',height:'100%'}} layout={layout} useResizeHandler={true}/>)
}

export default LineChart