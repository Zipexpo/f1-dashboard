import Plot from "react-plotly.js";
import {useEffect, useState, useTransition} from "react";
import {min as d3min, max as d3max, scaleLinear} from 'd3';


const initData=[];
const layout={title:{text:'',pad:0},margin:{t:10,l:50,b:20,r:30}, height:150,violinmode: 'group',boxmode: 'group'}
const ViolinChart = ({data=initData,getArr,getName,dimensionKeys,domain,mode='violin'})=>{
    const [isPending,startTransition] = useTransition();
    const [plotdata,setPlotdata] = useState(initData);
    const [domainR,setDomainR] = useState([]);
    useEffect(()=> {
        startTransition(() => {
            const x = [];
            const y = {};
            dimensionKeys.forEach((k)=> {
                y[k] = [];
            });
            setDomainR([d3min(dimensionKeys,k=>domain[k][0]),d3max(dimensionKeys,k=>domain[k][1])]);
            data.map(t=> {
                const tr = getName(t);
                t[1].forEach(t=>{
                    t.data.forEach(d=>{
                        x.push(tr);
                        dimensionKeys.forEach((k,i)=>{
                            y[k].push(d[k])
                        })
                    })
                })
                // getArr(t).forEach(d=>{
                //     x.push(tr);
                //     dimensionKeys.forEach((k,i)=>{
                //         y[k].push(d[k])
                //     })
                // })
            });
            const traceData = dimensionKeys.map(k=>{
                return ({
                    type: mode,
                    x,
                    y: y[k],
                    legendgroup: k,
                    scalegroup: k,
                    name: k,
                    points: 'none',
                    box: {
                        visible: true
                    },
                    // line: {
                    //     color: 'blue',
                    // },
                    meanline: {
                        visible: true
                    }
                })
            })
            setPlotdata(traceData)
        })
    },[data,dimensionKeys,mode]);
    const _layout={...layout,
        yaxis:{
            autoscale:false,
            range:scaleLinear().domain(domainR).nice(),
        },
    }
    console.log(domainR,scaleLinear().domain(domainR).nice().domain())
    return (<Plot className={`violin_${mode}`} data={plotdata} style={{width: '100%',height:'100%'}} layout={_layout} useResizeHandler={true}/>)
}
export default ViolinChart