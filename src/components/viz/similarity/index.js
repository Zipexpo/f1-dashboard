import Plot from 'react-plotly.js';
// import {range as d3range, extent as d3extent, max as d3max, min as d3min, sum as d3sum} from 'd3';

import {useEffect, useMemo, useState, useTransition} from "react";
const initData = [];
const initLayout={title:{text:'',pad:0},margin:{t:10,r:10},
    xaxis: {
        ticks: '',
        // side: 'top',
        tickfont: {
            size: 8,
        },
    },
    yaxis: {
        ticks: '',
        ticksuffix: ' ',
        tickfont: {
            size: 8,
        },
    }
};

const DIM = 2;

const Chart = ({data=initData, getArr,getName,dimensionKey})=>{
    const [plotdata,setPlotdata] = useState(initData);
    const [layout,setLayout] = useState(initLayout);
    const [isPending,startTransition] = useTransition();
    useEffect(()=>{
        startTransition(()=>{
            try {
                let segmentKeys = [];
                let p = data.map((t, ti) => {
                    segmentKeys.push(getName(t))
                    return getArr(t).map(d=>+d[dimensionKey])
                })

                let annotations= [];
                const z =segmentKeys.map(d=>segmentKeys.map(d=>null));
                z[segmentKeys.length-1][segmentKeys.length-1] = 1
                for (let i=0;i<segmentKeys.length-1;i++){
                    z[i][i] = 1
                    for (let j=i+1;j<segmentKeys.length;j++){
                        let xlen = p[i].length;
                        let ylen = p[j].length;
                        let coor = xlen<ylen?pearson(p[i],p[j]):pearson(p[j],p[i]);
                        z[i][j] = Math.abs(coor);
                        z[j][i] = z[i][j];
                        if (z[i][j]>1)
                            debugger
                        annotations.push({
                            xref: 'x1',
                            yref: 'y1',
                            x: segmentKeys[j],
                            y: segmentKeys[i],
                            text: Math.round(coor*100)/100,
                            font: {
                                color: 'white'
                            },
                            showarrow: false,
                        })
                    }
                }

                const traceData = [
                    {
                        type: 'heatmap',
                        name: dimensionKey,
                        x: segmentKeys,
                        y: segmentKeys,
                        z,
                        zauto:false,
                        zmin:0,
                        zmax:1,
                        hoverongaps: false,
                        showscale:false,
                    }
                ]

                setPlotdata(traceData)

                const layout = {...initLayout,
                    annotations
                };


                setLayout(layout)
            }catch(e){
                setPlotdata([])
            }
        });
    },[dimensionKey,data]);

    // console.log(JSON.stringify(spec.data.values))
    return (<Plot data={plotdata} style={{width: '100%',height:'100%'}} layout={layout} useResizeHandler={true}/>)

}

export default Chart;

function distance(a,b){
    return Math.sqrt((a[1]-b[1])*(a[1]-b[1])+(a[0]-b[0])*(a[0]-b[0]));
}


// https://gist.github.com/matt-west/6500993
// function pearson (x, y) {
//     const promedio = l => l.reduce((s, a) => s + a, 0) / l.length
//     const calc = (v, prom) => Math.sqrt(v.reduce((s, a) => (s + a * a), 0) - n * prom * prom)
//     let n = x.length
//     let nn = 0
//     for (let i = 0; i < n; i++, nn++) {
//         if ((!x[i] && x[i] !== 0) || (!y[i] && y[i] !== 0)) {
//             nn--
//             continue
//         }
//         x[nn] = x[i]
//         y[nn] = y[i]
//     }
//     if (n !== nn) {
//         x = x.splice(0, nn)
//         y = y.splice(0, nn)
//         n = nn
//     }
//     const prom_x = promedio(x), prom_y = promedio(y)
//     return Math.min(1,(x
//             .map((e, i) => ({ x: e, y: y[i] }))
//             .reduce((v, a) => v + a.x * a.y, 0) - n * prom_x * prom_y
//     ) / (calc(x, prom_x) * calc(y, prom_y)))
// }

/**
 * calculates pearson correlation
 * @param {number[]} d1
 * @param {number[]} d2
 */
export function pearson(d1, d2) {
    let { min, pow, sqrt } = Math
    let add = (a, b) => a + b
    let n = min(d1.length, d2.length)
    if (n === 0) {
        return 0
    }
    [d1, d2] = [d1.slice(0, n), d2.slice(0, n)]
    let [sum1, sum2] = [d1, d2].map(l => l.reduce(add))
    let [pow1, pow2] = [d1, d2].map(l => l.reduce((a, b) => a + pow(b, 2), 0))
    let mulSum = d1.map((n, i) => n * d2[i]).reduce(add)
    let dense = sqrt((pow1 - pow(sum1, 2) / n) * (pow2 - pow(sum2, 2) / n))
    if (dense === 0) {
        return 0
    }
    return (mulSum - (sum1 * sum2 / n)) / dense
}