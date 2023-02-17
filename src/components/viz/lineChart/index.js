import Plot from 'react-plotly.js';

import {useEffect, useState, useTransition} from "react";

const initData=[];
const domain=[undefined,undefined];
const layout={title:{text:'',pad:0},margin:{t:10,l:50,b:20,r:30}}
const LineChart = ({data=initData,xKey,yKey,cKey,colorDomain=domain,mode='line',showscale})=>{
    const [isPending,startTransition] = useTransition();
    const [plotdata,setPlotdata] = useState(initData);
    const [colordata,setColordata] = useState([]);
    useEffect(()=>{
        startTransition(()=>{
            const x=[];
            const y=[];
            data.forEach(d=>{
                x.push(d[xKey]);
                y.push(d[yKey]);
            })
            setPlotdata({
                x,
                y,
            })
        })
    },[xKey,yKey,data]);
    useEffect(()=>{
        if (mode==='markers'){
            debugger
            if (cKey) {
                setColordata(data.map(d=>d[cKey]));
            }else {
                setColordata([]);
            }
        }else
            setColordata([]);
    },[data,cKey,mode])
    const plotopt = [{
        x:plotdata.x,
        y:plotdata.y,
        type: 'scatter',
        mode
        // marker: {color: 'red'},
    }];
    console.log(colorDomain)
    if (colordata.length)
        plotopt[0].marker = {color:colordata, colorscale: "Portland",colorbarTitleText: cKey,
            colorbarThickness:5,
            showscale,
            cmin:colorDomain[0],cmax:colorDomain[1]
    }

    // console.log(JSON.stringify(spec.data.values))
    return (<Plot data={plotopt} style={{width: '100%',height:'100%'}} layout={layout} useResizeHandler={true}/>)
}

export default LineChart