import Plot from 'react-plotly.js';

import {useEffect, useState, useTransition} from "react";

const initData=[];
const domain=[undefined,undefined];
const layout={title:{text:'',pad:0},margin:{t:10,l:50,b:20,r:30}}
const LineChart = ({data=initData,getArr,getName,xKey,yKey,domain,mode='line',showscale})=>{
    const [isPending,startTransition] = useTransition();
    const [plotdata,setPlotdata] = useState(initData);
    const [colordata,setColordata] = useState([]);
    useEffect(()=>{
        startTransition(()=>{
            const traceData = data.map(t=>{
                const x=[];
                const y=[];
                getArr(t).forEach(d=>{
                    x.push(d[xKey]);
                    y.push(d[yKey]);
                })
                return{
                    name:getName(t),
                    x,
                    y,
                    type: 'scatter',
                }
            })
            setPlotdata(traceData)
        })
    },[xKey,yKey,data]);
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
    // const plotopt = [{
    //     x:plotdata.x,
    //     y:plotdata.y,
    //     type: 'scatter',
    //     mode
    //     // marker: {color: 'red'},
    // }];
    // console.log(colorDomain)
    // if (colordata.length)
    //     plotopt[0].marker = {color:colordata, colorscale: "Portland",colorbarTitleText: cKey,
    //         colorbarThickness:5,
    //         showscale,
    //         cmin:colorDomain[0],cmax:colorDomain[1]
    // }

    // console.log(JSON.stringify(spec.data.values))
    const _layout={...layout,
        yaxis:{
            title: `<b>${domain[yKey].label??yKey}</b>`,
            autoscale: false,
            range:domain[yKey]
        },
        xaxis:{
            title:`<b>${domain[xKey].label??xKey}</b>`
        }
    }
    return (<Plot data={plotdata} style={{width: '100%',height:'100%'}} layout={_layout} useResizeHandler={true}/>)
}

export default LineChart