import Plot from 'react-plotly.js';

import {useEffect, useMemo, useState} from "react";
const initData = [];
const initLayout={title:{text:'',pad:0},margin:{t:10,l:50,b:50,r:10},
    hovermode:'closest',
    dragmode:'select',
    plot_bgcolor:'rgba(240,240,240, 0.95)',
    grid:{roworder:'bottom to top'}
};

const Chart = ({data=initData, getArr,getName,dimensionKeys,mode='line'})=>{
    const [plotdata,setPlotdata] = useState(initData);
    const [layout,setLayout] = useState(initLayout);
    useEffect(()=>{
        const traceData = data.map(t=>{
            const dimensions = dimensionKeys.map(k=> ({label:k, values:[]}));
            getArr(t).forEach(d=>{
                dimensions.forEach((k)=>{
                    k.values.push(d[k.label]);
                });
            })
            return {
                type: 'splom',
                name:getName(t),
                dimensions,
                marker: {
                    size: 5,
                    line: {
                        color: 'white',
                        width: 0.5
                    }
                }
            }
        })
        setPlotdata(traceData)
    },[dimensionKeys,data]);
    useEffect(()=>{
        const layout = {...initLayout};
        dimensionKeys.forEach((k,i)=> {
            layout[`xaxis${i}`] = axis()
            layout[`yaxis${i}`] = axis()
        })
        setLayout(layout)
    },[dimensionKeys])
    const axis = () => ({
        showline:false,
        zeroline:false,
        gridcolor:'#ffff',
        ticklen:4
    })
    // console.log(JSON.stringify(spec.data.values))
    return (<Plot data={plotdata} style={{width: '100%',height:'100%'}} layout={layout} useResizeHandler={true}/>)

}

export default Chart;