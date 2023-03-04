import Plot from 'react-plotly.js';

import {useEffect, useState, useTransition} from "react";
import {isArray} from "lodash";
import {min as d3min, max as d3max, mean as d3mean,
    range as d3range, scaleOrdinal,schemeCategory10,color} from "d3";

const initData=[];
const domain=[undefined,undefined];
const layout={title:{text:'',pad:0},margin:{t:10,l:50,b:30,r:30}}
const LineChart = ({data=initData,xKey,domain,yKey,getName,combile})=>{
    const [isPending,startTransition] = useTransition();
    const [plotdata,setPlotdata] = useState(initData);
    useEffect(()=>{
        startTransition(()=>{
            const d3color = scaleOrdinal().range(schemeCategory10);
                const plotdata = [];
                if (!combile) {
                    data.forEach(d => {
                        let name = getName(d);
                        let fillcolor = color(d3color(name));
                        fillcolor.opacity = 0.5;
                        let minmax = {
                            x: [],
                            y: [],
                            name,
                            legendgroup: name,
                            type: 'scatter',
                            showlegend: false,
                            fill: "tozerox",
                            fillcolor: fillcolor + "",
                            mode: "line",
                            line: {color: "transparent"}
                        };
                        fillcolor.opacity=1
                        let maxtracry = [];
                        let av = {
                            x: [],
                            y: [],
                            name,
                            legendgroup: name,
                            type: 'scatter',
                            mode: "line",
                            line: {color: fillcolor + "", width: 1}
                        };
                        if (d[1]) {
                            const len = d3max(d[1], d => d.data.length)
                            debugger
                            for (let i = 0; i < len; i++) {
                                let ymin = d3min(d[1], d => d.data[i]!==undefined ? d.data[i][yKey] : undefined);
                                let ymax = d3max(d[1], d => d.data[i]!==undefined ? d.data[i][yKey] : undefined);
                                let ymean = d3mean(d[1], d => d.data[i]!==undefined ? d.data[i][yKey] : undefined);
                                let xmean = d3mean(d[1], d => d.data[i]!==undefined ? d.data[i][xKey] : undefined);
                                minmax.x.push(xmean);
                                minmax.y.push(ymax);
                                maxtracry.push(ymin);
                                av.x.push(xmean);
                                av.y.push(ymean);
                            }
                            for (let i = len - 1; i > -1; i--) {
                                minmax.x.push(minmax.x[i]);
                                minmax.y.push(maxtracry[i]);
                            }

                            plotdata.push(minmax);
                            plotdata.push(av);
                        }
                    })
                }else {
                    let fillcolor = color('#28a69b')
                    fillcolor.opacity = 0.3;
                    let name = 'Overall';
                    let minmax = {
                        x: [],
                        y: [],
                        name,
                        legendgroup: name,
                        type: 'scatter',
                        showlegend: false,
                        fill: "tonexty",
                        fillcolor: fillcolor + "",
                        mode: "line",
                        line: {color: "transparent"}
                    };
                    fillcolor.opacity = 1;
                    let av = {
                        x: [],
                        y: [],
                        name,
                        legendgroup: name,
                        type: 'scatter',
                        mode: "line",
                        line: {color: fillcolor + "", width: 2}//,dash: 'dot'}
                    };
                    let maxlen = d3max(data,d=>d3max(d[1],d=>d.data.length));
                    let av_arrx = d3range(0,maxlen).map(()=>[]);
                    let av_arry = d3range(0,maxlen).map(()=>[]);
                    plotdata.push(minmax);
                    plotdata.push(av);
                    data.forEach(d => {
                        let name = getName(d);
                        let av = {
                            x: [],
                            y: [],
                            name,
                            type: 'scatter',
                            mode: "line",
                            line: {color: d3color(name), width: 2}
                        };
                        if (d[1]) {
                            const len = d3max(d[1], d => d.data.length)
                            for (let i = 0; i < len; i++) {
                                let arrx = [];
                                let arr = d[1].map(d=>{
                                    let it = undefined
                                    if (d.data[i]!==undefined){
                                        it = (d.data[i][yKey]);
                                        arrx.push(d.data[i][xKey]);
                                        av_arrx[i].push(d.data[i][xKey]);
                                    }
                                    av_arry[i].push(it);
                                    return it
                                })
                                let ymean = d3mean(arr);
                                let xmean = d3mean(arrx);
                                av.x.push(xmean);
                                av.y.push(ymean);
                            }
                            // for (let i = len - 1; i > -1; i--) {
                            //     minmax.x.push(minmax.x[i]);
                            //     minmax.y.push(maxtracry[i]);
                            // }
                            //
                            // plotdata.push(minmax);
                            plotdata.push(av);
                        }
                    })

                    for (let i = 0; i < maxlen; i++) {
                        let ymin = d3min(av_arry[i]);
                        let ymax = d3max(av_arry[i]);
                        let ymean = d3mean(av_arry[i]);
                        let xmean = d3mean(av_arrx[i]);
                        av.x[i]=(xmean);
                        av.y[i]=(ymean);
                        minmax.x[i]=(xmean);
                        minmax.y[i]=(ymax);
                        minmax.x[maxlen*2-1-i]=(xmean);
                        minmax.y[maxlen*2-1-i]=(ymin);
                    }
                }
                setPlotdata(plotdata)
        })
    },[xKey,yKey,data,combile]);
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