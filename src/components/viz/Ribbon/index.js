import Plot from 'react-plotly.js';

import {useEffect, useMemo, useState} from "react";
const initData = [];
const layout={title:{text:'',pad:0},margin:{t:10,l:50,b:20,r:10}}
const Chart = ({data=initData, getArr,getName,xKey,yKey,zKey,mode='line'})=>{
    const [plotdata,setPlotdata] = useState(initData);
    useEffect(()=>{
        debugger
        const traceData = data.map(t=>{
            const x=[];
            const y=[];
            const z=[];
            getArr(t).forEach(d=>{
                x.push(d[xKey]);
                y.push(d[yKey]);
                z.push(d[zKey]);
            })
            return{
                name:getName(t),
                x,
                y,
                z,
            }
        })
        setPlotdata(traceData)
    },[xKey,yKey,zKey,data]);
    const plotopt = useMemo(()=>{
        return plotdata.map(d=>({
            ...d,
            type: 'scatter3d',
            colorscale: "Portland",
            mode: 'markers',
            marker:{size:3}
        }))
    },[plotdata]);

    // console.log(JSON.stringify(spec.data.values))
    return (<Plot data={plotopt} style={{width: '100%',height:'100%'}} layout={{...layout,
        scene: {
            xaxis: {
                title: {text: xKey}
            },
            yaxis: {
                title: {text: yKey}
            },
            zaxis: {
                title: {text: zKey}
            }
        }
    }} useResizeHandler={true}/>)

}

export default Chart;