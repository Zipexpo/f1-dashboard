import Plot from 'react-plotly.js';
import {range as d3range, extent as d3extent, max as d3max, min as d3min, sum as d3sum} from 'd3';
import {PCA} from './PCA'

import {useEffect, useMemo, useState, useTransition} from "react";
const initData = [];
const initLayout={title:{text:'',pad:0},margin:{t:10,l:50,b:50,r:10},
};

const DIM = 2;

const Chart = ({data=initData, getArr,getName,dimensionKeys,mode='line'})=>{
    const [plotdata,setPlotdata] = useState(initData);
    const [layout,setLayout] = useState(initLayout);
    const [isPending,startTransition] = useTransition();
    useEffect(()=>{
        startTransition(()=>{
            try {
                let segmentKeys = data.map(t=>getName(t));
                let len = d3min(data,t=>getArr(t).length);
                // const dataIn = dimensionKeys.map(k=>d3range(0,len));
                // data.forEach((t, ti) => {
                //     let _d = getArr(t);
                //     for (let i=0; i<len;i++){
                //         let d = _d[i];
                //         dimensionKeys.forEach((k,di) => {
                //             dataIn[di][i][ti] = +d[k]
                //         });
                //     }
                // })
                const dataIn = [];
                data.forEach((t, ti) => {
                    let _d = getArr(t);
                    for (let i=0; i<len;i++){
                        let d = _d[i];
                        let item = dimensionKeys.map((k) => +d[k]);
                        dataIn.push(item);
                    }
                })

                const {solution, feature,contribute} = calculatePCA(dataIn, dimensionKeys, segmentKeys, len);
                const seg = d3range(0,len);
                const traceData = dimensionKeys.map((d, di) => {
                    return {
                        type: 'scatters',
                        mode: 'markers',
                        name: d,
                        x: seg.map(i => solution[di*len+i][0]),
                        y: seg.map(i => solution[di*len+i][1]),
                    }
                })
                debugger
                setPlotdata(traceData)

                const layout = {...initLayout,
                    xaxis: {
                        title: {text: `PC1 (${Math.round(contribute[0]*1000)/10}%)`}
                    },
                    yaxis: {
                        title: {text: `PC2 (${Math.round(contribute[1]*1000)/10}%)`}
                    }
                };
                layout.shapes = feature.map(f=>({
                    type: 'line',
                    x0: f[0][0],
                    y0: f[0][1],
                    x1: f[1][0],
                    y1: f[1][1],
                }));
                layout.annotations = feature.map(f=>({
                    x: f[1][0],
                    y: f[1][1],
                    text: f.name,
                    xanchor:'center',
                    yanchor:'bottom',
                    font:{color:(f.pc1||f.pc2)?'red':'unset'}
                }));

                setLayout(layout)
            }catch(e){
                setPlotdata([])
            }
        });
    },[dimensionKeys,data]);
    // useEffect(()=>{
    //     // const layout = {...initLayout};
    //     // dimensionKeys.forEach((k,i)=> {
    //     //     layout[`xaxis${i}`] = axis()
    //     //     layout[`yaxis${i}`] = axis()
    //     // })
    //     // setLayout(layout)
    // },[dimensionKeys])

    // console.log(JSON.stringify(spec.data.values))
    return (<Plot data={plotdata} style={{width: '100%',height:'100%'}} layout={layout} useResizeHandler={true}/>)

}

export default Chart;

function distance(a,b){
    return Math.sqrt((a[1]-b[1])*(a[1]-b[1])+(a[0]-b[0])*(a[0]-b[0]));
}
function calculatePCA(dataIn,dimensions,segment, len){

    let pca = new PCA();
    // console.log(brand_names);
    let _matrix = pca.scale(dataIn, true, true);

    // invert data hew
    let matrix = []
    for (let di=0; di<dimensions.length; di++) {
        for (let i=0; i < len; i++) {
            matrix[di*len+i] = segment.map((s,si)=>_matrix[si*len+i][di]);
        }
    }
    debugger

    // let matrix = pca.scale(dataIn, false, false);

    let pc = pca.pca(matrix,DIM);

    let A = pc[0];  // this is the U matrix from SVD
    let B = pc[1];  // this is the dV matrix from SVD
    let chosenPC = pc[2];   // this is the most value of PCA
    let S = pc[3];   // this is the most value of PCA
    console.log(B)
    let solution = matrix.map((d,i)=>{
        const dd = d3range(0,DIM).map(dim=>A[i][chosenPC[dim]]);
        return dd
    });
    let xrange = d3extent(solution, d => d[0]);
    let yrange = d3extent(solution, d => d[1]);

    const root = [0,0];
    let maxV = [[0,-Infinity],[0,-Infinity]]
    const feature = segment.map(function (key, i) {
        let brand = [root,d3range(0,DIM).map(dim=>B[i][chosenPC[dim]])];
        maxV.forEach(([index,v],maxi)=>{
            const cv = Math.abs(brand[1][maxi]-brand[0][maxi]);
            if (cv>v)
                maxV[maxi] = [i,cv]
        })
        brand.name = key;
        return brand
    });
    feature[maxV[0][0]].pc1=true;
    feature[maxV[1][0]].pc2=true;
    debugger
    let multiplyBrands = Math.sqrt(d3max([
        distance(root,[xrange[0],yrange[0]]),
        distance(root,[xrange[0],yrange[1]]),
        distance(root,[xrange[1],yrange[0]]),
        distance(root,[xrange[1],yrange[1]]),
    ])/d3max(feature,d=>distance(root,[d[1][0],d[1][1]])));
    feature.forEach(f=>{
        f[1][0] = f[1][0]*multiplyBrands;
        f[1][1] = f[1][1]*multiplyBrands;
    });

    const contributeMax = d3sum(S,(a,i)=>a[i]);
    debugger
    const contribute = d3range(0,DIM).map(d=>S[chosenPC[d]][chosenPC[d]]/contributeMax)

    return {solution,feature,contribute};
}
