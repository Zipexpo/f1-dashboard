import Plot from 'react-plotly.js';

import {useEffect, useState, useTransition} from "react";
import {isArray} from "lodash";

const initData=[];
const domain=[undefined,undefined];
const layout={title:{text:'',pad:0},margin:{t:10,l:50,b:30,r:30}}
const LineChart = ({data=initData,xKey,domain,yKey,cKey,multiple,getName,colorDomain=domain,mode='line',showscale})=>{
    const [isPending,startTransition] = useTransition();
    const [plotdata,setPlotdata] = useState(initData);
    const [colordata,setColordata] = useState([]);
    useEffect(()=>{
        startTransition(()=>{
            if (!multiple) {
                const x = [];
                const y = [];
                data.forEach(d => {
                    x.push(d[xKey]);
                    y.push(d[yKey]);
                })
                setPlotdata([{
                    name: getName(data),
                    x,
                    y,
                    type: 'scatter'
                }])
            }else {
                const plotdata = [];
                data.forEach(d => {
                    getData(d,(arr)=>{
                        debugger
                        const x = [];
                        const y = [];
                        arr.forEach(d => {
                            x.push(d[xKey]);
                            y.push(d[yKey]);
                        })
                        plotdata.push({
                            name: getName(d),
                            x,
                            y,
                            fill: "tozerox",
                            type: 'scatter',
                            "legendgroup": getName(d)
                        })
                    })
                })
                function getData(d,calback){
                    if (d.data)
                        return calback(d.data);
                    else if (d[1]&& isArray(d[1]))
                        return d[1].forEach(d=>getData(d,calback));
                    else
                        return false;
                }
                setPlotdata(plotdata)
            }
        })
    },[xKey,yKey,data,multiple]);
    useEffect(()=>{
        if (mode==='markers'){
            if (cKey) {
                setColordata([data.map(d=>d[cKey])]);
            }else {
                setColordata([[]]);
            }
        }else
            setColordata([[]]);
    },[data,cKey,mode])
    plotdata.forEach(p=>p.mode=mode);
    // console.log(colorDomain)
    if (colordata.length)
        plotdata.forEach((p,i)=>p.marker = {color:colordata[i], colorscale: "Portland",colorbarTitleText: cKey,
            colorbarThickness:5,
            showscale,
            cmin:colorDomain[0],cmax:colorDomain[1]
        });
    const _layout={...layout,
        yaxis:{
        title: domain[yKey]?`<b>${domain[yKey].label??yKey}</b>`:'',
        autorange:false,
            range:domain[yKey]
        },
        xaxis:{
            title:domain[yKey]?`<b>${domain[xKey].label??xKey}</b>`:''
        }
    }
    // console.log(JSON.stringify(spec.data.values))
    return (<Plot data={plotdata} style={{width: '100%',height:'100%'}} layout={_layout} useResizeHandler={true}/>)
}

export default LineChart