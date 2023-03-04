import Plot from 'react-plotly.js';

import {useCallback, useEffect, useState, useTransition} from "react";
import {isArray,chunk} from "lodash";
import {min as d3min, max as d3max, mean as d3mean,
    range as d3range, scaleOrdinal,scaleLinear, extent as d3extent,
    schemeCategory10} from "d3";

const initData=[];
const domain=[undefined,undefined];
const layout={title:{text:'',pad:0},margin:{t:10,l:50,b:30,r:30}}
// Resampling , rolling
const LineChart = ({data=initData,xKey,domain,yKey,resample="rolling",normalize= false,getName})=>{
    const [isPending,startTransition] = useTransition();
    const [plotdata,setPlotdata] = useState(initData);
    const resampleFunc = resample==='rolling'?(arr,resolution,av)=>{
            for (let i=0;i<arr.length;i++){
                const d = arr.slice(i,i+resolution);
                const xarr = [];
                const yarr = [];
                d.forEach(d=>{
                    d[0].forEach(d=>xarr.push(d));
                    d[1].forEach(d=>yarr.push(d));
                })
                let xmean = d3mean(xarr);
                let ymean = d3mean(yarr);
                av.x.push(xmean);
                av.y.push(ymean);
            }
        }:(arr,resolution,av)=>{
            chunk(arr,resolution).forEach(d=>{
                const xarr = [];
                const yarr = [];
                d.forEach(d=>{
                    d[0].forEach(d=>xarr.push(d));
                    d[1].forEach(d=>yarr.push(d));
                })
                let xmean = d3mean(xarr);
                let ymean = d3mean(yarr);
                av.x.push(xmean);
                av.y.push(ymean);
            });
    }
    useEffect(()=>{
        startTransition(()=>{
            const d3color = scaleOrdinal().range(schemeCategory10);
            const plotdata = [];
            data.forEach(d => {
                let name = getName(d);
                let av = {
                    x: [],
                    y: [],
                    name,
                    type: 'scatter',
                    mode: "lines",
                    line: {color: d3color(name), width: 2}
                };
                if (d[1]) {
                    const len = d3max(d[1], d => d.data.length);
                    let arr = d3range(0,len).map(()=>[[],[]]);
                    for (let i = 0; i < len; i++) {
                        d[1].forEach(d=>{
                            let it = undefined
                            if (d.data[i]!==undefined){
                                it = (+d.data[i][yKey]);
                                arr[i][0].push(+d.data[i][xKey]);
                            }
                            arr[i][1].push(it);
                            return it
                        })
                        // let ymean = d3mean(arr);
                        // let xmean = d3mean(arrx);
                    }
                    resampleFunc(arr,Math.max(1,len/100),av)
                    //normalize x
                    if (normalize) {
                        const scalex = scaleLinear().domain(d3extent(av.x));
                        av.x = av.x.map(d => scalex(d));
                    }
                    plotdata.push(av);
                }
            })
        setPlotdata(plotdata)
        })
    },[xKey,yKey,data,resample,normalize]);
    const _layout={...layout,
        yaxis:{
            title: domain[yKey]?`<b>${domain[yKey].label??yKey}</b>`:'',
            autorange:false,
            range:domain[yKey]
        },
        xaxis:{
            title:domain[yKey]?`<b>${domain[xKey].label??xKey}${normalize? ' (normalize)':''}</b>`:''
        }
    }
    // console.log(JSON.stringify(spec.data.values))
    return (<Plot data={plotdata} style={{width: '100%',height:'100%'}} layout={_layout} useResizeHandler={true}/>)
}

export default LineChart