
import { fetchdatajson } from "./fetchdatajson.js"
import { indiamapdataprocessed } from './indiamap.js'
import { state_timeseries } from './fetchstate-timeseriesjson.js'
import { plotchart, lollipopchart } from './all-chart.js'



const svg = d3.select('#indiamap')
svg.attr("preserveAspectRatio", "xMinYMin meet")

localStorage.clear()
localStorage.setItem('chart-st-code', 'TT')

let b;
let state, district;

/* TODAYs `s Date Update */
let a = new Date()
d3.select("#todaydate")
    .text(`${a.getDate()}/${a.getMonth() + 1}/${a.getFullYear()}`)


function add_select_option() {
    const statenametostatecode_2 = { "India": "TT", "Maharashtra": "MH", "Tamil Nadu": "TN", "Andhra Pradesh": "AP", "Karnataka": "KA", "Delhi": "DL", "Uttar Pradesh": "UP", "West Bengal": "WB", "Bihar": "BR", "Telangana": "TG", "Gujarat": "GJ", "Assam": "AS", "Rajasthan": "RJ", "Odisha": "OR", "Haryana": "HR", "Madhya Pradesh": "MP", "Kerala": "KL", "Punjab": "PB", "Jammu and Kashmir": "JK", "Jharkhand": "JH", "Chhattisgarh": "CT", "Uttarakhand": "UT", "Goa": "GA", "Tripura": "TR", "Puducherry": "PY", "Manipur": "MN", "Himachal Pradesh": "HP", "Nagaland": "NL", "Arunachal Pradesh": "AR", "Andaman and Nicobar Islands": "AN", "Ladakh": "LA", "Chandigarh": "CH", "Dadra and Nagar Haveli and Daman and Diu": "DN", "Meghalaya": "ML", "Sikkim": "SK", "Mizoram": "MZ" }
    const select = d3.select('#indiastateselect')
    Object.entries(statenametostatecode_2).forEach(el => {

        select.append('option').attr('value', el[1]).text(el[0])

    })
}


add_select_option()

function mapprojection(data) {
    const el = document.getElementById("indiamap")
    const height = el.clientHeight
    const width = el.clientWidth
    const projection = d3.geoMercator();
    const pathGenerator = d3.geoPath().projection(projection);

    projection.scale(1).translate([0, 0])

    const b = pathGenerator.bounds(data),
        s = 0.95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
        t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

    projection.scale(s).translate(t);

    return [projection, pathGenerator]
}


function renderdistrictmap(data) {
    const g = d3.select("#district-border")
    g.style('fill', '#2e2e44').style('stroke', 'lightblue')
    const path = g.selectAll('path')
    path
        .data(data.features)
        .enter()
        .append('path')
        .attr('d', data => pathGenerator(data))
        .attr('stroke-width', 1)
        .attr('stroke', 'white')
        .append('title')
        .text((data) => `District:${data.properties.district} and Code : ${data.properties.dt_code} 
state: ${data.properties.st_nm} and Code: ${data.properties.st_code}`)

}
function renderstatemap(data) {
    const g = d3.select("#state-border")
    const paths = g.selectAll('path')
    paths
        .data(state.features)
        .enter()
        .append('path')
        .attr('d', (data) => pathGenerator(data))
        .attr('fill', '#2e2e44')
        .attr('stroke', 'rgb(33, 139, 252)')
        .attr('stroke-width', 0.5)
        .on('mouseover', (data, i) => {

            console.log(i.properties)
        })


}
/*_________________________________________________________________________________________________________ */

function updatemaphoverdata(d, i, maptype) {
    const a1 = d3.select('#indiamap-state-name')
    const b1 = d3.select('#indiamap-district-name')

    const a2 = d3.select('#indiamap-state-total-confirmed')
    const b2 = d3.select('#indiamap-district-total-confirmed')

    const a3 = d3.select('#indiamap-state-total-active')
    const b3 = d3.select('#indiamap-district-total-active')

    const a4 = d3.select('#indiamap-state-total-recovered')
    const b4 = d3.select('#indiamap-district-total-recovered')

    const a5 = d3.select('#indiamap-state-total-death')
    const b5 = d3.select('#indiamap-district-total-death')

    if (maptype == "state") {
        a1.text(i.properties.st_nm)
        a2.text(i.properties.totalcasedata.confirmcase)
        a3.text(i.properties.totalcasedata.activecase)
        a4.text(i.properties.totalcasedata.recovercase)
        a5.text(i.properties.totalcasedata.deathcase)


        // b1.text("District : " + "-")
        // b2.text("Total Confirmed : " + "-")
        // b3.text("Total Active : " + "-")
        // b4.text("Total Recovered : " + "-")
        // b5.text("Total Death : " + "-")
    }
    else if (maptype == "district") {
        a1.text(i.properties.st_nm)
        if (i.properties.totalcasedata.st_data) {
            a2.text(i.properties.totalcasedata.st_data.confirmcase)
            a3.text(i.properties.totalcasedata.st_data.activecase)
            a4.text(i.properties.totalcasedata.st_data.recovercase)
            a5.text(i.properties.totalcasedata.st_data.deathcase)
        }
        else {
            // a2.text("Total Confirmed : " + "-")
            // a3.text("Total Active : " + "-")
            // a4.text("Total Recovered : " + "-")
            // a5.text("Total Death : " + "-")
        }

        b1.text(i.properties.district)
        b2.text(i.properties.totalcasedata.confirmcase)
        b3.text(i.properties.totalcasedata.activecase)
        b4.text(i.properties.totalcasedata.recovercase)
        b5.text(i.properties.totalcasedata.deathcase)
    }
    else {

    }


}


// const bubblecolormapper = {
//     confirmcase: ["rgba(255,7,58,0.5)", "rgba(255,7,58,0.5)", "rgba(255,7,58,0.25)"],
//     activecase: ['rgba(0,123,255,0.5)', 'rgba(0,123,255,0.5)', "rgba(0,123,255,0.25)"],
//     recovercase: ["rgba(40,167,69,0.5)", "rgba(40,167,69,0.5)", "rgba(40,167,69,0.25)"],
//     deathcase: ["rgba(108,117,125,0.7)", "rgba(108,117,125,1)", "rgba(108,117,125,0.4)"]
// }



const bubblecolormapper = {
    confirmcase: ["rgba(255,17,16,0.5)", "rgba(255,17,16,0)", "rgba(255,17,16,0.25)"],
    activecase: ['rgba(16,114,255,0.5)', 'rgba(16,114,255,0)', 'rgba(16,114,255,0.25)'],
    recovercase: ["rgba(84,199,30,0.5)", "rgba(84,199,30,0)", "rgba(84,199,30,0.25)"],
    deathcase: ["rgba(143,143,143,0.7)", "rgba(143,143,143,0)", "rgba(143,143,143,0.4)"]
}

// function setstatename(d, i) {
//     localStorage.setItem('statename', i.properties.st_nm)
//     localStorage.setItem('statecode', statenametostatecode[i.properties.st_nm])
//     //window.location.href = "./state.html";
// }

function statebubblemap(statemap_geojson, maxdata, casetype) {
    const mapprojectionresult = mapprojection(statemap_geojson)

    const bubbleradius = d3.scaleSqrt()
        .domain([0, maxdata[casetype]])
        .range([3, 80]);

    const sorteddata = statemap_geojson.features.sort((a, b) => b.properties.totalcasedata[casetype] - a.properties.totalcasedata[casetype])
    const g = d3.select('#india-bubble')
    g.selectAll('circle')
        .data(sorteddata)
        .enter()
        .append('circle')
        .attr('cx', (el) => mapprojectionresult[0](d3.geoCentroid(el))[0])
        .attr('cy', (el) => mapprojectionresult[0](d3.geoCentroid(el))[1])
        .attr('r', (el) => bubbleradius(el.properties.totalcasedata[casetype]))
        .attr('stroke', bubblecolormapper[casetype][0])
        .attr('fill', bubblecolormapper[casetype][0])
        .attr('fill-opacity', 0.25)
        .attr('stroke-width', 2)
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut)
        //.on('click', setstatename)




    function handleMouseOver(d, i) {
        updatemaphoverdata(d, i, "state")
        d3.select(this)
            .attr("fill-opacity", 1)
            .attr('stroke', bubblecolormapper[casetype][1])


    }
    function handleMouseOut(d, i) {
        d3.select(this).attr("fill-opacity", 0.25)
            .attr('stroke', bubblecolormapper[casetype][0]);

    }

}


function districtbubblemap(districtmap_geojson, maxdata, casetype) {

    const mapprojectionresult = mapprojection(districtmap_geojson)

    const bubbleradius = d3.scaleSqrt()
        .domain([0, maxdata[casetype]])
        .range([2, 100]);


    const sorteddata = districtmap_geojson.features.sort((a, b) => b.properties.totalcasedata[casetype] - a.properties.totalcasedata[casetype])


    const g = d3.select('#india-bubble')
    g.selectAll('circle')
        .data(sorteddata)
        .enter()
        .append('circle')
        .attr('cx', (el) => mapprojectionresult[0](d3.geoCentroid(el))[0])
        .attr('cy', (el) => mapprojectionresult[0](d3.geoCentroid(el))[1])
        .attr('r', (el) => bubbleradius(el.properties.totalcasedata[casetype]))
        .attr('stroke', bubblecolormapper[casetype][0])
        .attr('fill', bubblecolormapper[casetype][0])
        .attr('fill-opacity', 0.15)
        .attr('stroke-width', 1)
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut)
        //.on('click', setstatename)

    function handleMouseOver(d, i) {

        updatemaphoverdata(d, i, "district")
        d3.select(this)
            .attr("fill-opacity", 1)
            .attr('stroke', bubblecolormapper[casetype][1])


    }
    function handleMouseOut(d, i) {
        d3.select(this).attr("fill-opacity", 0.25)
            .attr('stroke', bubblecolormapper[casetype][0]);

    }
}


const chloroplethcolormapper = {
    confirmcase: [d3.interpolateReds, "rgba(255,17,16,0.5)"],
    activecase: [d3.interpolateBlues, "rgba(16,114,255,0.5)"],
    recovercase: [d3.interpolateGreens, "rgba(84,199,30,0.5)"],
    deathcase: [d3.interpolateGreys, "rgba(143,143,143,0.7)"]
}

function statechloromap(statemap_geojson, maxdata, casetype) {

    const mapprojectionresult = mapprojection(statemap_geojson)

    const color = d3.scaleSequentialLog(chloroplethcolormapper[casetype][0]).domain([1, maxdata[casetype]])


    const g = d3.select('#india-chloro')

    g.selectAll('path')
        .data(statemap_geojson.features)
        .enter()
        .append('path')
        .attr('d', (data) => mapprojectionresult[1](data))
        .attr('fill', (el) => color(el.properties.totalcasedata[casetype]))
        .attr('stroke-width', 0.2)
        .attr('stroke', 'black')
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut)
        //.on('click', setstatename)

    function handleMouseOver(d, i) {

        updatemaphoverdata(d, i, "state")
        d3.select(this).attr('stroke-width', 1.5)

    }
    function handleMouseOut(d, i) {
        d3.select(this).attr('stroke-width', 0.2)

    }
}

function districtchloromap(districtmap_geojson, maxdata, casetype) {
    let mapprojectionresult = mapprojection(districtmap_geojson)

    let color = d3.scaleSequentialLog(chloroplethcolormapper[casetype][0]).domain([1, maxdata[casetype]])
    // let color = d3.scaleSequential().domain([1, maxdata[casetype]]).interpolator(d3.interpolateBlues)




    const g = d3.select('#india-chloro')

    g.selectAll('path')
        .data(districtmap_geojson.features)
        .enter()
        .append('path')
        .attr('d', (data) => mapprojectionresult[1](data))
        .attr('fill', (el) => color(el.properties.totalcasedata[casetype]))
        .attr('stroke-width', 0.1)
        .attr('stroke', 'black')
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut)
        //.on('click', setstatename)

    function handleMouseOver(d, i) {

        updatemaphoverdata(d, i, "district")
        d3.select(this).attr('stroke-width', 1.5)

    }
    function handleMouseOut(d, i) {
        d3.select(this).attr('stroke-width', 0.1)

    }

}

function renderstateborder(statemap_geojson, state_meshdata, casetype) {

    const mapprojectionresult = mapprojection(statemap_geojson)
    d3.select('#state-border')
        .append("path")
        .attr("stroke", bubblecolormapper[casetype][2])
        .attr("stroke-width", 1.5)
        .style('z-index', 5)
        .attr('fill', 'none')
        .attr("d", mapprojectionresult[1](state_meshdata));
}


function updatetable(statewise) {


    const table = d3.select('#indiatable')

    statewise.forEach(el => {
        // if (el.statecode == 'TT') {
        //     updatecard("india-total-confirmed-data", Number(el.confirmed), "india-confirmed-change", Number(el.deltaconfirmed))
        //     updatecard("india-total-active-data", Number(el.active), "india-active-change", 0)
        //     updatecard("india-total-recovered-data", Number(el.recovered), "india-recovered-change", Number(el.deltarecovered))
        //     updatecard("india-total-death-data", Number(el.deaths), "india-death-change", Number(el.deltadeaths))
        // }
        const row = table.append('tr').attr('class', 'item')
        row.append('td').text(`${el.state}`)
        row.append('td').text(`${Number(el.confirmed)}`)
        row.append('td').text(`${Number(el.active)}`)
        row.append('td').text(`${Number(el.recovered)}`)
        row.append('td').text(`${Number(el.deaths)}`)
    })

}



async function main() {

    const datajson = await fetchdatajson()

    /* Updating Tables  */

    updatetable(datajson.statewise)


    const maxdata = {
        confirmcase: d3.max(datajson.cummulative.cf),
        activecase: d3.max(datajson.cummulative.ac),
        recovercase: d3.max(datajson.cummulative.rc),
        deathcase: d3.max(datajson.cummulative.dth)
    }
    const indiamapdata = await indiamapdataprocessed()
    const statemap_geojson = topojson.feature(indiamapdata, indiamapdata.objects.states)
    const districtmap_geojson = topojson.feature(indiamapdata, indiamapdata.objects.districts)
    const state_meshdata = topojson.mesh(indiamapdata, indiamapdata.objects.states)
    const district_meshdata = topojson.mesh(indiamapdata, indiamapdata.objects.districts)
    statebubblemap(statemap_geojson, maxdata, "confirmcase")
    renderstateborder(statemap_geojson, state_meshdata, "confirmcase")

    buttontoggle(statemap_geojson, districtmap_geojson, state_meshdata, maxdata)
}


main()


function buttonvaluecheck(btnarray, statemap_geojson, districtmap_geojson, state_meshdata, maxdata) {
    d3.select('#state-border').selectAll('path').remove()
    d3.select('#district-border').selectAll('path').remove()
    d3.select('#india-chloro').selectAll('path').remove()
    d3.select('#india-bubble').selectAll('circle').remove()

    const nwbtnarry = btnarray.filter(a => a.classed('active'))
    const nwbtnarry2 = nwbtnarry.map(a => a.attr('value'))

    if (nwbtnarry2.includes("district-border") && nwbtnarry2.includes("chloro")) {
        if (nwbtnarry2.includes("activecase")) {
            districtchloromap(districtmap_geojson, maxdata, "activecase")
        }
        else if (nwbtnarry2.includes("confirmcase")) {
            districtchloromap(districtmap_geojson, maxdata, "confirmcase")
        }
        else if (nwbtnarry2.includes("deathcase")) {
            districtchloromap(districtmap_geojson, maxdata, "deathcase")

        }
        else {
            districtchloromap(districtmap_geojson, maxdata, "recovercase")

        }
    }
    else if (nwbtnarry2.includes("district-border") && nwbtnarry2.includes("bubble")) {

        if (nwbtnarry2.includes("activecase")) {
            renderstateborder(statemap_geojson, state_meshdata, "activecase")
            districtbubblemap(districtmap_geojson, maxdata, "activecase")

        }
        else if (nwbtnarry2.includes("confirmcase")) {
            renderstateborder(statemap_geojson, state_meshdata, "confirmcase")
            districtbubblemap(districtmap_geojson, maxdata, "confirmcase")

        }
        else if (nwbtnarry2.includes("deathcase")) {
            renderstateborder(statemap_geojson, state_meshdata, "deathcase")
            districtbubblemap(districtmap_geojson, maxdata, "deathcase")


        }
        else {
            renderstateborder(statemap_geojson, state_meshdata, "recovercase")
            districtbubblemap(districtmap_geojson, maxdata, "recovercase")

        }
    }
    else if (nwbtnarry2.includes("state-border") && nwbtnarry2.includes("chloro")) {

        if (nwbtnarry2.includes("activecase")) {
            statechloromap(statemap_geojson, maxdata, "activecase")

        }
        else if (nwbtnarry2.includes("confirmcase")) {
            statechloromap(statemap_geojson, maxdata, "confirmcase")

        }
        else if (nwbtnarry2.includes("deathcase")) {
            statechloromap(statemap_geojson, maxdata, "deathcase")


        }
        else {
            statechloromap(statemap_geojson, maxdata, "recovercase")

        }

    }
    /* State Bubble */
    else {
        if (nwbtnarry2.includes("activecase")) {
            statebubblemap(statemap_geojson, maxdata, "activecase")
            renderstateborder(statemap_geojson, state_meshdata, "activecase")

        }
        else if (nwbtnarry2.includes("confirmcase")) {
            renderstateborder(statemap_geojson, state_meshdata, "confirmcase")
            statebubblemap(statemap_geojson, maxdata, "confirmcase")

        }
        else if (nwbtnarry2.includes("deathcase")) {
            renderstateborder(statemap_geojson, state_meshdata, "deathcase")
            statebubblemap(statemap_geojson, maxdata, "deathcase")


        }
        else {
            renderstateborder(statemap_geojson, state_meshdata, "recovercase")
            statebubblemap(statemap_geojson, maxdata, "recovercase")

        }
    }
}

function buttontoggle(statemap_geojson, districtmap_geojson, state_meshdata, maxdata) {
    const btn1 = d3.select('#india-district-map-btn')
    const btn2 = d3.select('#india-state-map-btn')
    const btn3 = d3.select('#chloro-viz-btn')
    const btn4 = d3.select('#bubble-viz-btn')
    const btn5 = d3.select('#active-case-btn')
    const btn6 = d3.select('#confirm-case-btn')
    const btn7 = d3.select('#death-case-btn')
    const btn8 = d3.select('#recover-case-btn')

    const btnarr = new Array(btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8);

    //d3.select('body').on('onload', buttonvaluecheck(btnarr))

    /* District Map Button  */
    btn1.on('click', (e, i) => {
        if (btn1.classed('active')) {

        }
        else {
            btn1.classed('active', true)
            btn2.classed('active', false)

        }
        buttonvaluecheck(btnarr, statemap_geojson, districtmap_geojson, state_meshdata, maxdata)


    })
    /* State Map button */
    btn2.on('click', () => {

        if (btn2.classed('active')) {

        }
        else {
            btn2.classed('active', true)
            btn1.classed('active', false)
        }
        buttonvaluecheck(btnarr, statemap_geojson, districtmap_geojson, state_meshdata, maxdata)


    })
    /* Choloplrth button */
    btn3.on('click', () => {
        if (btn3.classed('active')) {

        }
        else {
            btn3.classed('active', true)
            btn4.classed('active', false)
        }

        buttonvaluecheck(btnarr, statemap_geojson, districtmap_geojson, state_meshdata, maxdata)


    })
    /* Bubble Map button */
    btn4.on('click', () => {
        if (btn4.classed('active')) {

        }
        else {
            btn4.classed('active', true)
            btn3.classed('active', false)
        }

        buttonvaluecheck(btnarr, statemap_geojson, districtmap_geojson, state_meshdata, maxdata)
    })
    /* Active case button */
    btn5.on('click', () => {
        if (btn5.classed('active')) {

        }
        else {
            btn5.classed('active', true)
            btn6.classed('active', false)
            btn7.classed('active', false)
            btn8.classed('active', false)
        }
        buttonvaluecheck(btnarr, statemap_geojson, districtmap_geojson, state_meshdata, maxdata)
    })
    /* Confirm Button */
    btn6.on('click', () => {
        if (btn6.classed('active')) {

        }
        else {
            btn6.classed('active', true)
            btn5.classed('active', false)
            btn7.classed('active', false)
            btn8.classed('active', false)
        }
        buttonvaluecheck(btnarr, statemap_geojson, districtmap_geojson, state_meshdata, maxdata)
    })
    /* Death Button */
    btn7.on('click', () => {
        if (btn7.classed('active')) {

        }
        else {
            btn7.classed('active', true)
            btn8.classed('active', false)
            btn5.classed('active', false)
            btn6.classed('active', false)
        }
        buttonvaluecheck(btnarr, statemap_geojson, districtmap_geojson, state_meshdata, maxdata)
    })
    /* Reocverd Button */
    btn8.on('click', () => {
        if (btn8.classed('active')) {

        }
        else {
            btn8.classed('active', true)
            btn5.classed('active', false)
            btn6.classed('active', false)
            btn7.classed('active', false)
        }
        buttonvaluecheck(btnarr, statemap_geojson, districtmap_geojson, state_meshdata, maxdata)
    })



}





































async function chart_data(st_code,case_btn_cty,case_btn_days){
    const seriresdata = await state_timeseries(st_code)

    chart_plotter(seriresdata,case_btn_cty,case_btn_days)
    chart_button_toggle(seriresdata)
}

chart_data("TT")

async function chart_plotter(seriresdata,case_btn_category="total",plot_btn_days="beginning") {
    if (case_btn_category == 'total') {
        plotchart('confirm-chart', 'confirmed', seriresdata, case_btn_category, plot_btn_days)
        plotchart('active-chart', 'active', seriresdata, case_btn_category, plot_btn_days)
        plotchart('recover-chart', 'recovered', seriresdata, case_btn_category, plot_btn_days)
        plotchart('death-chart', 'deceased', seriresdata, case_btn_category, plot_btn_days)
    }
    else {
        lollipopchart('confirm-chart', 'confirmed', seriresdata, case_btn_category, plot_btn_days)
        lollipopchart('active-chart', 'active', seriresdata, case_btn_category, plot_btn_days)
        lollipopchart('recover-chart', 'recovered', seriresdata, case_btn_category, plot_btn_days)
        lollipopchart('death-chart', 'deceased', seriresdata, case_btn_category, plot_btn_days)
    }
}
window.addEventListener('resize', () => console.log('resize'))




d3.select('#indiastateselect').on('change', dropdownchange)
function dropdownchange(d) {
    d3.selectAll('.firstg').remove()
    const change_cd = d3.select(this).property('value')
    const btn9 = d3.select('#cummulative-chart-btn')
    const btn10 = d3.select('#daily-chart-btn')
    localStorage.setItem('chart-st-code', change_cd)
    if (btn9.classed('active')) {
        chart_data(change_cd,"total","beginning")
    }
    else {
        chart_data(change_cd,"delta","beginning")
    }
}

function chart_button_toggle_check(a,seriresdata,b) {
    d3.selectAll('.firstg').remove()
    const nwbtnarry = a.filter(d => d.classed('active'))
    const nwbtnarry2 = nwbtnarry.map(d => d.attr('value'))
    const nwbtnplotarry = b.filter(d => d.classed('active'))
    const nwbtnplotarry2 = nwbtnplotarry.map(d => d.attr('value'))
    if (nwbtnarry2.includes('total')) {
        chart_plotter(seriresdata,"total",nwbtnplotarry2[0])
    }
    else {
        
        chart_plotter(seriresdata,"delta",nwbtnplotarry2[0])
    }
}


function chart_button_toggle(seriresdata) {
    const btn9 = d3.select('#cummulative-chart-btn')
    const btn10 = d3.select('#daily-chart-btn')

    const btnbeginning = d3.select('#beginning')
    const btn90days = d3.select('#ninezero')
    const btn30days = d3.select('#threezero')
    const btn07days = d3.select('#zeroseven')

    btn9.on('click', () => {
        if (btn9.classed('active')) { }
        else {
            btn9.classed('active', true)
            btn10.classed('active', false)
            chart_button_toggle_check(new Array(btn9, btn10),seriresdata,new Array(btnbeginning, btn90days, btn30days, btn07days))
        }
    })
    btn10.on('click', () => {
        if (btn10.classed('active')) { }
        else {
            btn10.classed('active', true)
            btn9.classed('active', false)
            chart_button_toggle_check(new Array(btn9, btn10),seriresdata,new Array(btnbeginning, btn90days, btn30days, btn07days))
        }
    })

    btnbeginning.on('click',()=>{
        if(btnbeginning.classed('active')) { }
        else {
            btnbeginning.classed('active', true)
            btn90days.classed('active', false)
            btn30days.classed('active', false)
            btn07days.classed('active', false)
            chart_button_toggle_check(new Array(btn9, btn10), seriresdata, new Array(btnbeginning, btn90days, btn30days, btn07days))
        }
    })
    btn90days.on('click',()=>{
        if(btn90days.classed('active')) { }
        else {
            btnbeginning.classed('active', false)
            btn90days.classed('active', true)
            btn30days.classed('active', false)
            btn07days.classed('active', false)
            chart_button_toggle_check(new Array(btn9, btn10), seriresdata, new Array(btnbeginning, btn90days, btn30days, btn07days))
        }
    })
    btn30days.on('click',()=>{
        if(btn30days.classed('active')) { }
        else {
            btnbeginning.classed('active', false)
            btn90days.classed('active', false)
            btn30days.classed('active', true)
            btn07days.classed('active', false)
            chart_button_toggle_check(new Array(btn9, btn10), seriresdata, new Array(btnbeginning, btn90days, btn30days, btn07days))
        }
    })
    btn07days.on('click',()=>{
        if(btn07days.classed('active')) { }
        else {
            btnbeginning.classed('active', false)
            btn90days.classed('active', false)
            btn30days.classed('active', false)
            btn07days.classed('active', true)
            chart_button_toggle_check(new Array(btn9, btn10), seriresdata, new Array(btnbeginning, btn90days, btn30days, btn07days))
        }
    })

}
chart_button_toggle()

