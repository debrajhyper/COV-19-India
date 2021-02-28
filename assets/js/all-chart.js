const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
const DateFormatter = (dt) => {
    const formatTime = d3.timeFormat("%d %b, %Y");
    //console.log(formatTime)
    return formatTime(new Date(dt))
}

const bisect = d3.bisector(function (d) { return new Date(d[0]); }).left;
const all_scales = {};

var sp = document.createElement("br");
function updatechartinfo(selectedData, case_category, casetype, all_scales, plot_days) {
    let stxtcf, stxtac, stxtrc, stxtdth, dtxtcf, dtxtac, dtxtrc, dtxtdth
    if (case_category == "total") {
        stxtcf = `${selectedData[1].total.confirmed}`
            dtxtcf = `${DateFormatter(selectedData[0])}`
        stxtac = `${selectedData[1].total.active}`
            dtxtac = `${DateFormatter(selectedData[0])}`
        stxtrc = `${selectedData[1].total.recovered}`
            dtxtrc = `${DateFormatter(selectedData[0])}`
        stxtdth = `${selectedData[1].total.deceased}`
            dtxtdth = `${DateFormatter(selectedData[0])}`
    }
    else {
        stxtcf = `${selectedData[1].delta.confirmed}`
            dtxtcf = `${DateFormatter(selectedData[0])}`
        stxtac = `${selectedData[1].delta.active}`
            dtxtac = `${DateFormatter(selectedData[0])}`
        stxtrc = `${selectedData[1].delta.recovered}`
            dtxtrc = `${DateFormatter(selectedData[0])}`
        stxtdth = `${selectedData[1].delta.deceased}`
            dtxtdth = `${DateFormatter(selectedData[0])}`
    }


    d3.select("#info-confirmed").text(stxtcf)
            d3.select("#date-confirmed").text(dtxtcf)
    d3.select("#info-active").text(stxtac)
            d3.select("#date-active").text(dtxtac)
    d3.select("#info-recovered").text(stxtrc)
            d3.select("#date-recovered").text(dtxtrc)
    d3.select("#info-deceased").text(stxtdth)
            d3.select("#date-deceased").text(dtxtdth)

    const focus_cf = d3.select('#focus-confirmed').select('circle')
    const focus_ac = d3.select('#focus-active').select('circle')
    const focus_rc = d3.select('#focus-recovered').select('circle')
    const focus_dth = d3.select('#focus-deceased').select('circle')

    if(plot_days == "07days") {
        if (casetype == "confirmed") {
            focus_ac
                .attr('cx', all_scales.active.xscale(new Date(selectedData[0]))-17)
                .attr('cy', all_scales.active.yscale(selectedData[1][case_category].active))
            focus_rc
                .attr('cx', all_scales.recovered.xscale(new Date(selectedData[0]))-17)
                .attr('cy', all_scales.recovered.yscale(selectedData[1][case_category].recovered))
            focus_dth
                .attr('cx', all_scales.deceased.xscale(new Date(selectedData[0]))-17)
                .attr('cy', all_scales.deceased.yscale(selectedData[1][case_category].deceased))
        }
        else if (casetype == "active") {
    
            focus_cf
                .attr('cx', all_scales.confirmed.xscale(new Date(selectedData[0]))-17)
                .attr('cy', all_scales.confirmed.yscale(selectedData[1][case_category].confirmed))
            focus_rc
                .attr('cx', all_scales.recovered.xscale(new Date(selectedData[0]))-17)
                .attr('cy', all_scales.recovered.yscale(selectedData[1][case_category].recovered))
            focus_dth
                .attr('cx', all_scales.deceased.xscale(new Date(selectedData[0]))-17)
                .attr('cy', all_scales.deceased.yscale(selectedData[1][case_category].deceased))
        }
        else if (casetype == "recovered") {
            focus_cf
                .attr('cx', all_scales.confirmed.xscale(new Date(selectedData[0]))-17)
                .attr('cy', all_scales.confirmed.yscale(selectedData[1][case_category].confirmed))
            focus_ac
                .attr('cx', all_scales.active.xscale(new Date(selectedData[0]))-17)
                .attr('cy', all_scales.active.yscale(selectedData[1][case_category].active))
            focus_dth
                .attr('cx', all_scales.deceased.xscale(new Date(selectedData[0]))-17)
                .attr('cy', all_scales.deceased.yscale(selectedData[1][case_category].deceased))
        }
        else {
            focus_cf
                .attr('cx', all_scales.confirmed.xscale(new Date(selectedData[0]))-17)
                .attr('cy', all_scales.confirmed.yscale(selectedData[1][case_category].confirmed))
            focus_ac
                .attr('cx', all_scales.active.xscale(new Date(selectedData[0]))-17)
                .attr('cy', all_scales.active.yscale(selectedData[1][case_category].active))
            focus_rc
                .attr('cx', all_scales.recovered.xscale(new Date(selectedData[0]))-17)
                .attr('cy', all_scales.recovered.yscale(selectedData[1][case_category].recovered))
        }
    }
    else if(plot_days == "30days") {
        if (casetype == "confirmed") {
            focus_ac
                .attr('cx', all_scales.active.xscale(new Date(selectedData[0]))-3.5)
                .attr('cy', all_scales.active.yscale(selectedData[1][case_category].active))
            focus_rc
                .attr('cx', all_scales.recovered.xscale(new Date(selectedData[0]))-3.5)
                .attr('cy', all_scales.recovered.yscale(selectedData[1][case_category].recovered))
            focus_dth
                .attr('cx', all_scales.deceased.xscale(new Date(selectedData[0]))-3.5)
                .attr('cy', all_scales.deceased.yscale(selectedData[1][case_category].deceased))
        }
        else if (casetype == "active") {
    
            focus_cf
                .attr('cx', all_scales.confirmed.xscale(new Date(selectedData[0]))-3.5)
                .attr('cy', all_scales.confirmed.yscale(selectedData[1][case_category].confirmed))
            focus_rc
                .attr('cx', all_scales.recovered.xscale(new Date(selectedData[0]))-3.5)
                .attr('cy', all_scales.recovered.yscale(selectedData[1][case_category].recovered))
            focus_dth
                .attr('cx', all_scales.deceased.xscale(new Date(selectedData[0]))-3.5)
                .attr('cy', all_scales.deceased.yscale(selectedData[1][case_category].deceased))
        }
        else if (casetype == "recovered") {
            focus_cf
                .attr('cx', all_scales.confirmed.xscale(new Date(selectedData[0]))-3.5)
                .attr('cy', all_scales.confirmed.yscale(selectedData[1][case_category].confirmed))
            focus_ac
                .attr('cx', all_scales.active.xscale(new Date(selectedData[0]))-3.5)
                .attr('cy', all_scales.active.yscale(selectedData[1][case_category].active))
            focus_dth
                .attr('cx', all_scales.deceased.xscale(new Date(selectedData[0]))-3.5)
                .attr('cy', all_scales.deceased.yscale(selectedData[1][case_category].deceased))
        }
        else {
            focus_cf
                .attr('cx', all_scales.confirmed.xscale(new Date(selectedData[0]))-3.5)
                .attr('cy', all_scales.confirmed.yscale(selectedData[1][case_category].confirmed))
            focus_ac
                .attr('cx', all_scales.active.xscale(new Date(selectedData[0]))-3.5)
                .attr('cy', all_scales.active.yscale(selectedData[1][case_category].active))
            focus_rc
                .attr('cx', all_scales.recovered.xscale(new Date(selectedData[0]))-3.5)
                .attr('cy', all_scales.recovered.yscale(selectedData[1][case_category].recovered))
        }
    }
    else {
        if (casetype == "confirmed") {
            focus_ac
                .attr('cx', all_scales.active.xscale(new Date(selectedData[0])))
                .attr('cy', all_scales.active.yscale(selectedData[1][case_category].active))
            focus_rc
                .attr('cx', all_scales.recovered.xscale(new Date(selectedData[0])))
                .attr('cy', all_scales.recovered.yscale(selectedData[1][case_category].recovered))
            focus_dth
                .attr('cx', all_scales.deceased.xscale(new Date(selectedData[0])))
                .attr('cy', all_scales.deceased.yscale(selectedData[1][case_category].deceased))
        }
        else if (casetype == "active") {
    
            focus_cf
                .attr('cx', all_scales.confirmed.xscale(new Date(selectedData[0])))
                .attr('cy', all_scales.confirmed.yscale(selectedData[1][case_category].confirmed))
            focus_rc
                .attr('cx', all_scales.recovered.xscale(new Date(selectedData[0])))
                .attr('cy', all_scales.recovered.yscale(selectedData[1][case_category].recovered))
            focus_dth
                .attr('cx', all_scales.deceased.xscale(new Date(selectedData[0])))
                .attr('cy', all_scales.deceased.yscale(selectedData[1][case_category].deceased))
        }
        else if (casetype == "recovered") {
            focus_cf
                .attr('cx', all_scales.confirmed.xscale(new Date(selectedData[0])))
                .attr('cy', all_scales.confirmed.yscale(selectedData[1][case_category].confirmed))
            focus_ac
                .attr('cx', all_scales.active.xscale(new Date(selectedData[0])))
                .attr('cy', all_scales.active.yscale(selectedData[1][case_category].active))
            focus_dth
                .attr('cx', all_scales.deceased.xscale(new Date(selectedData[0])))
                .attr('cy', all_scales.deceased.yscale(selectedData[1][case_category].deceased))
        }
        else {
            focus_cf
                .attr('cx', all_scales.confirmed.xscale(new Date(selectedData[0])))
                .attr('cy', all_scales.confirmed.yscale(selectedData[1][case_category].confirmed))
            focus_ac
                .attr('cx', all_scales.active.xscale(new Date(selectedData[0])))
                .attr('cy', all_scales.active.yscale(selectedData[1][case_category].active))
            focus_rc
                .attr('cx', all_scales.recovered.xscale(new Date(selectedData[0])))
                .attr('cy', all_scales.recovered.yscale(selectedData[1][case_category].recovered))
        }
    }
    
}












/*------------------------------------------------------------cumulative------------------------------------------------------------*/

export function plotchart(selection_id, casetype, seriresdata, case_category = "total", plot_days) {
    const chartcolors = {
        confirmed: ['#ff1110', 'rgb(255,102,102)', 'rgb(255,130,130)'],
        active: ['#1072ff', 'rgb(103,164,255)', 'rgb(129,181,255)'],
        recovered: ['#54c71e', 'rgb(125,216,84)', 'rgb(151,224,117)'],
        deceased: ['#8f8f8f', 'rgb(168,167,167)', 'rgb(192,192,192)']
    }

    const d2 = Object.entries(seriresdata.dates)
    const d2l = d2.length
    // set the dimensions and margins of the graph
    const margin = { top: 4, right: 32, bottom: 20, left: 0 },
        width = document.getElementById(selection_id).clientWidth - margin.left - margin.right,
        height = document.getElementById(selection_id).clientHeight - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#" + selection_id)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr('class', 'firstg')



    if(plot_days == "beginning") {
        // Initialise a X axis:
        const x = d3.scaleTime().range([width, 0]);
        const xAxis = d3.axisBottom().scale(x).ticks(5).tickFormat(d3.timeFormat("%d %b"));
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "cummulative-xaxis")

        // Initialize an Y axis
        const y = d3.scaleLinear().range([height, 0]);
        const plotTick = {
            confirmed: [4],
            active: [4],
            recovered: [4],
            deceased: [4]
        }
        const yAxis = d3.axisRight().scale(y).ticks(plotTick[casetype][0]).tickFormat((d3.format('.2s')));
        svg.append("g")
            .attr("class", "cummulative-yaxis")
            .attr("transform", `translate(${width},0)`)

        // Create the X axis:
        x.domain([new Date(d2[d2l - 1][0]), new Date(d2[d2l-d2l][0])]);
        svg.selectAll(".cummulative-xaxis").call(xAxis);

        // create the Y axis
        const minmax = d3.extent(d2, function (d) { 
            return d[1][case_category][casetype]
        })
        const plotValue = {
            confirmed: [minmax[0], minmax[1] * 1.8],
            active: [minmax[0], minmax[1] *1.17],
            recovered: [minmax[0], minmax[1] * 1.8],
            deceased: [minmax[0], minmax[1] * 1.28]
        }
        y.domain([plotValue[casetype][0], plotValue[casetype][1]]);
        svg.selectAll(".cummulative-yaxis").call(yAxis);

        // Create a function that takes a dataset as input and update the plot:
        all_scales[casetype] = { xscale: x, yscale: y }

        let cummulative_circle = svg.selectAll(".cummulative-circle").data(d2);

        // Create a update selection: bind to the new data
        let cummulative_line = svg.selectAll(".cummulative-line").data([d2]);

        // Updata the line
        cummulative_line
            .enter()
            .append("path")
            .attr("class", "cummulative-line")
            .merge(cummulative_line)
            .transition()
            .duration(1000)
            .attr("d", d3.line()
                .x(function (d) { return x(new Date(d[0])) })
                .y(function (d) { return y(d[1][case_category][casetype]); }))
            .attr("fill", "none")
            .attr("stroke", chartcolors[casetype][2])
            .attr("stroke-width", 2)
            .style("opacity", 0.5)

        // Updata the line
        cummulative_circle
            .enter()
            .append("circle")
            .attr("class", "cummulative-circle")
            .merge(cummulative_circle)
            .attr('cx', (d) => x(new Date(d[0])))
            .attr('cy', (d) => y(d[1][case_category][casetype]))
            //.attr("stroke", "inherit")
            .attr('r', 1)
            .attr('fill', chartcolors[casetype][1])
            .attr('stroke', chartcolors[casetype][1])
        svg
            .append('g')
            .attr('id', 'focus-' + casetype)
            .append('circle')
            .style("fill", chartcolors[casetype][0])
            //.attr("stroke", "white")
            .attr('stroke-width', 1.8)
            .attr('r', 4)
            .attr('cx', x(new Date(d2[d2l - 1][0])))
            .attr('cy', y(d2[d2l - 1][1][case_category][casetype]))
            .style("opacity", 1)
        svg
            .append('rect')
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr('width', width )
            .attr('height', height)
            .on('mousemove touchmove', mousemove)

        const h4sel = "#info-" + casetype
        let stxt = `${d2[d2l - 1][1][case_category][casetype]}`
        d3.select(h4sel).text(stxt)

        const h5sel = "#date-" + casetype
        let dtxt = `${DateFormatter(d2[d2l - 1][0])}`
        d3.select(h5sel).text(dtxt)


        function mousemove(event) {
            const coords = d3.pointer(event, this);
            const xcord = x.invert(coords[0])
            const i = bisect(d2, xcord, 1);
            const selectedData = d2[i]
            if (selectedData) {
            updatechartinfo(selectedData, case_category, casetype, all_scales)
            d3.select('#focus-' + casetype)
                .select('circle')
                .attr("cx", x(new Date(selectedData[0])))
                .attr("cy", y(selectedData[1][case_category][casetype]))
            }
        }
    }


    if(plot_days == "90days") {
        // Initialise a X axis:
        const x = d3.scaleTime().range([width, 0]);
        const xAxis = d3.axisBottom().scale(x).ticks(5).tickFormat(d3.timeFormat("%d %b"));
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "cummulative-xaxis")

        // Initialize an Y axis
        const y = d3.scaleLinear().range([height, 0]);
        const plotTick = {
            confirmed: [4],
            active: [4],
            recovered: [4],
            deceased: [4]
        }
        const yAxis = d3.axisRight().scale(y).ticks(plotTick[casetype][0]).tickFormat((d3.format('.2s')));
        svg.append("g")
            .attr("class", "cummulative-yaxis")
            .attr("transform", `translate(${width},0)`)

        // Create the X axis:
        x.domain([new Date(d2[d2l - 1][0]), new Date(d2[d2l-90][0])]);
        svg.selectAll(".cummulative-xaxis").call(xAxis);

        // create the Y axis
        const minmax = d3.extent(d2, function (d) { 
            return d[1][case_category][casetype]
        })
        const plotValue = {
            confirmed: [minmax[0], minmax[1] * 2.2],
            active: [minmax[0], minmax[1] * 1],
            recovered: [minmax[0], minmax[1] * 2.3],
            deceased: [minmax[0], minmax[1] * 1.28]
        }
        y.domain([plotValue[casetype][0], plotValue[casetype][1]]);
        svg.selectAll(".cummulative-yaxis").call(yAxis);

        // Create a function that takes a dataset as input and update the plot:
        all_scales[casetype] = { xscale: x, yscale: y }

        let cummulative_circle = svg.selectAll(".cummulative-circle").data(d2);

        // Create a update selection: bind to the new data
        let cummulative_line = svg.selectAll(".cummulative-line").data([d2]);

        // Updata the line
        cummulative_line
            .enter()
            .append("path")
            .attr("class", "cummulative-line")
            .merge(cummulative_line)
            .transition()
            .duration(1000)
            .attr("d", d3.line()
                .x(function (d) { return x(new Date(d[0])) })
                .y(function (d) { return y(d[1][case_category][casetype]); }))
            .attr("fill", "none")
            .attr("stroke", chartcolors[casetype][2])
            .attr("stroke-width", 3)
            .style("opacity", 0.5)

        // Updata the line
        cummulative_circle
            .enter()
            .append("circle")
            .attr("class", "cummulative-circle")
            .merge(cummulative_circle)
            .attr('cx', (d) => x(new Date(d[0])))
            .attr('cy', (d) => y(d[1][case_category][casetype]))
            //.attr("stroke", "inherit")
            .attr('r', 1.6)
            .attr('fill', chartcolors[casetype][1])
            .attr('stroke', chartcolors[casetype][1])
        svg
            .append('g')
            .attr('id', 'focus-' + casetype)
            .append('circle')
            .style("fill", chartcolors[casetype][0])
            //.attr("stroke", "white")
            .attr('stroke-width', 1.8)
            .attr('r', 4)
            .attr('cx', x(new Date(d2[d2l - 1][0])))
            .attr('cy', y(d2[d2l - 1][1][case_category][casetype]))
            .style("opacity", 1)
        svg
            .append('rect')
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr('width', width )
            .attr('height', height)
            .on('mousemove touchmove', mousemove)

        const h4sel = "#info-" + casetype
        let stxt = `${d2[d2l - 1][1][case_category][casetype]}`
        d3.select(h4sel).text(stxt)

        const h5sel = "#date-" + casetype
        let dtxt = `${DateFormatter(d2[d2l - 1][0])}`
        d3.select(h5sel).text(dtxt)

        function mousemove(event) {
            const coords = d3.pointer(event, this);
            const xcord = x.invert(coords[0])
            const i = bisect(d2, xcord, 1);
            const selectedData = d2[i]
            if (selectedData) {
            updatechartinfo(selectedData, case_category, casetype, all_scales)
            d3.select('#focus-' + casetype)
                .select('circle')
                .attr("cx", x(new Date(selectedData[0])))
                .attr("cy", y(selectedData[1][case_category][casetype]))
            }
        }
    }


    if(plot_days == "30days") {
        // Initialise a X axis:
        const x = d3.scaleTime().range([width, 0]);
        const xAxis = d3.axisBottom().scale(x).ticks(5).tickFormat(d3.timeFormat("%d %b"));
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "cummulative-xaxis")

        // Initialize an Y axis
        const y = d3.scaleLinear().range([height, 0]);
        const plotTick = {
            confirmed: [4],
            active: [4],
            recovered: [4],
            deceased: [4]
        }
        const yAxis = d3.axisRight().scale(y).ticks(plotTick[casetype][0]).tickFormat((d3.format('.2s')));
        svg.append("g")
            .attr("class", "cummulative-yaxis")
            .attr("transform", `translate(${width},0)`)
            .attr("transition", `all 0.5s ease-in-out`)

        // Create the X axis:
        x.domain([new Date(d2[d2l - 1][0]), new Date(d2[d2l-30][0])]);
        svg.selectAll(".cummulative-xaxis").call(xAxis);

        // create the Y axis
        const minmax = d3.extent(d2, function (d) { 
            return d[1][case_category][casetype]
        })
        const plotValue = {
            confirmed: [minmax[0], minmax[1] * 1.8],
            active: [minmax[0], minmax[1] / 2.8],
            recovered: [minmax[0], minmax[1] * 1.8],
            deceased: [minmax[0], minmax[1] * 2.5]
        }
        y.domain([plotValue[casetype][0], plotValue[casetype][1]]);
        svg.selectAll(".cummulative-yaxis").call(yAxis);

        // Create a function that takes a dataset as input and update the plot:
        all_scales[casetype] = { xscale: x, yscale: y }

        let cummulative_circle = svg.selectAll(".cummulative-circle").data(d2);

        // Create a update selection: bind to the new data
        let cummulative_line = svg.selectAll(".cummulative-line").data([d2]);

        // Updata the line
        cummulative_line
            .enter()
            .append("path")
            .attr("class", "cummulative-line")
            .merge(cummulative_line)
            .transition()
            .duration(1000)
            .attr("d", d3.line()
                .x(function (d) { return x(new Date(d[0])) })
                .y(function (d) { return y(d[1][case_category][casetype]); }))
            .attr("fill", "none")
            .attr("stroke", chartcolors[casetype][2])
            .attr("stroke-width", 3)
            .style("opacity", 0.5)

        // Updata the line
        cummulative_circle
            .enter()
            .append("circle")
            .attr("class", "cummulative-circle")
            .merge(cummulative_circle)
            .attr('cx', (d) => x(new Date(d[0]))-3.5)
            .attr('cy', (d) => y(d[1][case_category][casetype]))
            .attr('r', 2.5)
            .attr('fill', chartcolors[casetype][1])
            .attr('stroke', chartcolors[casetype][1])
        svg
            .append('g')
            .attr('id', 'focus-' + casetype)
            .append('circle')
            .style("fill", chartcolors[casetype][0])
            .attr('stroke-width', 1.8)
            .attr('r', 4)
            .attr('cx', x(new Date(d2[d2l - 1][0]))-3.5)
            .attr('cy', y(d2[d2l - 1][1][case_category][casetype]))
            .style("opacity", 1)
        svg
            .append('rect')
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr('width', width )
            .attr('height', height)
            .on('mousemove touchmove', mousemove)

        const h4sel = "#info-" + casetype
        let stxt = `${d2[d2l - 1][1][case_category][casetype]}`
        d3.select(h4sel).text(stxt)

        const h5sel = "#date-" + casetype
        let dtxt = `${DateFormatter(d2[d2l - 1][0])}`
        d3.select(h5sel).text(dtxt)

        function mousemove(event) {
            const coords = d3.pointer(event, this);
            const xcord = x.invert(coords[0])
            const i = bisect(d2, xcord, 1);
            const selectedData = d2[i]
            if (selectedData) {
            updatechartinfo(selectedData, case_category, casetype, all_scales, plot_days)
            d3.select('#focus-' + casetype)
                .select('circle')
                .attr("cx", x(new Date(selectedData[0]))-3.5)
                .attr("cy", y(selectedData[1][case_category][casetype]))
            }
        }
    }


    if(plot_days == "07days") {
        // Initialise a X axis:
        const x = d3.scaleTime().range([width, 0]);
        const xAxis = d3.axisBottom().scale(x).ticks(5).tickFormat(d3.timeFormat("%d %b"));
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "cummulative-xaxis")
            .attr("transition", "all 0.5s ease-in-out")

        // Initialize an Y axis
        const y = d3.scaleLinear().range([height, 0]);
        const plotTick = {
            confirmed: [4],
            active: [4],
            recovered: [4],
            deceased: [4]
        }
        const yAxis = d3.axisRight().scale(y).ticks(plotTick[casetype][0]).tickFormat((d3.format('.2s')));
        svg.append("g")
            .attr("class", "cummulative-yaxis")
            .attr("transform", `translate(${width},0)`)
            .attr("transition", "all 0.5s ease-in-out")

        // Create the X axis:
        x.domain([new Date(d2[d2l - 1][0]), new Date(d2[d2l-7][0])]);
        svg.selectAll(".cummulative-xaxis").call(xAxis);

        // create the Y axis
        const minmax = d3.extent(d2, function (d) { 
            return d[1][case_category][casetype]
        })
        const plotValue = {
            confirmed: [minmax[0], minmax[1] * 1.8],
            active: [minmax[0], minmax[1] / 5.1],
            recovered: [minmax[0], minmax[1] * 1.8],
            deceased: [minmax[0], minmax[1] * 2.5]
        }
        y.domain([plotValue[casetype][0], plotValue[casetype][1]]);
        svg.selectAll(".cummulative-yaxis").call(yAxis);

        // Create a function that takes a dataset as input and update the plot:
        all_scales[casetype] = { xscale: x, yscale: y }

        let cummulative_circle = svg.selectAll(".cummulative-circle").data(d2);

        // Create a update selection: bind to the new data
        let cummulative_line = svg.selectAll(".cummulative-line").data([d2]);

        // Updata the line
        cummulative_line
            .enter()
            .append("path")
            .attr("class", "cummulative-line")
            .merge(cummulative_line)
            .transition()
            .duration(1000)
            .attr("d", d3.line()
                .x(function (d) { return x(new Date(d[0])) })
                .y(function (d) { return y(d[1][case_category][casetype]); }))
            .attr("fill", "none")
            .attr("stroke", chartcolors[casetype][2])
            .attr("stroke-width", 3.5)
            .style("opacity", 0.5)

        // Updata the line
        cummulative_circle
            .enter()
            .append("circle")
            .attr("class", "cummulative-circle")
            .merge(cummulative_circle)
            .attr('cx', (d) => x(new Date(d[0]))-17)
            .attr('cy', (d) => y(d[1][case_category][casetype]))
            .attr('r', 2.8)
            .attr('fill', chartcolors[casetype][1])
            .attr('stroke', chartcolors[casetype][1])
        svg
            .append('g')
            .attr('id', 'focus-' + casetype)
            .append('circle')
            .style("fill", chartcolors[casetype][0])
            .attr('stroke-width', 1.8)
            .attr('r', 4)
            .attr('cx', x(new Date(d2[d2l - 1][0]))-17)
            .attr('cy', y(d2[d2l - 1][1][case_category][casetype]))
            .style("opacity", 1)
        svg
            .append('rect')
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr('width', width)
            .attr('height', height)
            .on('mousemove touchmove', mousemove)

        const h4sel = "#info-" + casetype
        let stxt = `${d2[d2l - 1][1][case_category][casetype]}`
        d3.select(h4sel).text(stxt)

        const h5sel = "#date-" + casetype
        let dtxt = `${DateFormatter(d2[d2l - 1][0])}`
        d3.select(h5sel).text(dtxt)

        function mousemove(event) {
            const coords = d3.pointer(event, this);
            const xcord = x.invert(coords[0])
            const i = bisect(d2, xcord, 1);
            const selectedData = d2[i]
            if (selectedData) {
            updatechartinfo(selectedData, case_category, casetype, all_scales, plot_days)
            d3.select('#focus-' + casetype)
                .select('circle')
                .attr("cx", x(new Date(selectedData[0]))-17)
                .attr("cy", y(selectedData[1][case_category][casetype]))
            }
        }
    }
    
    
}




/*------------------------------------------------------------daily------------------------------------------------------------*/

export function lollipopchart(selection_id, casetype, seriresdata, case_category = "delta", plot_days) {
    const lollipopcolors = {
        confirmed: ['#ff1110', 'rgb(255,102,102)', 'rgb(255,130,130)'],
        active: ['#1072ff', 'rgb(103,164,255)', 'rgb(129,181,255)'],
        recovered: ['#54c71e', 'rgb(125,216,84)', 'rgb(151,224,117)'],
        deceased: ['#8f8f8f', 'rgb(168,167,167)', 'rgb(192,192,192)']
    }

    const d2 = Object.entries(seriresdata.dates)
    const d2l = d2.length


    let margin = { top: 0, right: 32, bottom: 20, left: 0 },
        width = document.getElementById(selection_id).clientWidth - margin.left - margin.right,
        height = document.getElementById(selection_id).clientHeight - margin.top - margin.bottom;



    // append the svg object to the body of the page
    let svg = d3.select("#" + selection_id)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr('class', 'firstg');


    if(plot_days == "beginning") {
        const x = d3.scaleTime().range([width, 0]);
        const xAxis = d3.axisBottom().scale(x).ticks(5).tickFormat(d3.timeFormat("%d %b"));
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "dateaxis2")
        svg.append("g").attr("transform", "translate(0," + height + ")")

        const plotTick = {
            confirmed: [4],
            active: [4],
            recovered: [4],
            deceased: [4]
        }
        const y = d3.scaleLinear().range([height, 0]);
        const yAxis = d3.axisRight().scale(y).ticks(plotTick[casetype][0]).tickFormat((d3.format('.2s')));
        svg.append("g")
            .attr("class", "casecount2")
            .attr("transform", `translate(${width},0)`)

        // Create the X axis:
        const all_dates = d2.map((d) => new Date(d[0]))
        x.domain([new Date(d2[d2l - 1][0]), new Date(d2[d2l-d2l][0])]);
        svg.selectAll(".dateaxis2").call(xAxis);

        const minmax = d3.extent(d2, function (d) { return d[1][case_category][casetype] })
        const plotValue = {
            confirmed: [minmax[0] * 1.2, minmax[1] * 1.1],
            active: [minmax[0] * 1.2, minmax[1] * 1.1],
            recovered: [minmax[0] * 1.2, minmax[1] * 1.1],
            deceased: [minmax[0] * 1.2, minmax[1] * 1.1]
        }
        y.domain([plotValue[casetype][0], plotValue[casetype][1]]);

        svg.selectAll(".casecount2").call(yAxis);
        all_scales[casetype] = { xscale: x, yscale: y }

        // variable u: map data to existing circle
        let lollipop_lines = svg.selectAll(".myLine2").data(d2)

        // update lines
        lollipop_lines
            .enter()
            .append("line")
            .attr("class", "myLine2")
            .merge(lollipop_lines)
            .attr("x1", (d) => x(new Date(d[0])))
            .attr("y1", (d) => y(d[1][case_category][casetype]))
            .attr("x2", (d) => x(new Date(d[0])))
            .attr("y2", (d) => y(0))
            .attr("stroke", lollipopcolors[casetype][2])
            .attr('stroke-width', 0.5)

        // variable u: map data to existing circle
        let lollipop_circle = svg.selectAll("circle2").data(d2)

        // update bars or lines
        lollipop_circle
            .enter()
            .append("circle")
            .merge(lollipop_circle)
            .transition()
            .attr("cx", (d) => x(new Date(d[0])))
            .attr("cy", (d) => y(d[1][case_category][casetype]))
            .attr("r", 1.6)
            .attr("fill", lollipopcolors[casetype][1])
            .attr('stroke', lollipopcolors[casetype][2])

        const h4sel = "#info-" + casetype
        let stxt = `${d2[d2l - 1][1][case_category][casetype]}`
        d3.select(h4sel).text(stxt)

        const h5sel = "#date-" + casetype
        let dtxt = `${DateFormatter(d2[d2l - 1][0])}`
        d3.select(h5sel).text(dtxt)

        svg
            .append('rect')
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .on('mousemove', mousemove)
        svg
            .append('g')
            .attr('id', 'focus-' + casetype)
            .append('circle')
            .style("fill", lollipopcolors[casetype][0])
            .attr('stroke-width', 1.8)
            .attr('r', 4)
            .attr('cx', x(new Date(d2[d2l - 1][0])))
            .attr('cy', y(d2[d2l - 1][1][case_category][casetype]))
            .style("opacity", 1)

        function mousemove(event) {
            const coords = d3.pointer(event, this);
            const xcord = x.invert(coords[0])
            const i = bisect(d2, xcord, 1);
            const selectedData = d2[i]
            if (selectedData) {
                updatechartinfo(selectedData, case_category, casetype, all_scales)
                d3.select('#focus-' + casetype)
                    .select('circle')
                    .attr("cx", x(new Date(selectedData[0])))
                    .attr("cy", y(selectedData[1][case_category][casetype]))
            }
        }
    }


    if(plot_days == "90days") {
        const x = d3.scaleTime().range([width, 0]);
        const xAxis = d3.axisBottom().scale(x).ticks(5).tickFormat(d3.timeFormat("%d %b"));
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "dateaxis2")
        svg.append("g").attr("transform", "translate(0," + height + ")")

        const plotTick = {
            confirmed: [4],
            active: [4],
            recovered: [4],
            deceased: [4]
        }
        const y = d3.scaleLinear().range([height, 0]);
        const yAxis = d3.axisRight().scale(y).ticks(plotTick[casetype][0]).tickFormat((d3.format('.2s')));
        svg.append("g")
            .attr("class", "casecount2")
            .attr("transform", `translate(${width},0)`)

        // Create the X axis:
        const all_dates = d2.map((d) => new Date(d[0]))
        x.domain([new Date(d2[d2l - 1][0]), new Date(d2[d2l-90][0])]);
        svg.selectAll(".dateaxis2").call(xAxis);

        const minmax = d3.extent(d2, function (d) { return d[1][case_category][casetype] })
        const plotValue = {
            confirmed: [minmax[0] * 1.2, minmax[1] * 0.8],
            active: [minmax[0] * 0.9, minmax[1] * 0.8],
            recovered: [minmax[0] * 1.2, minmax[1] * 0.7],
            deceased: [minmax[0] * 1.2, minmax[1] * 0.38]
        }
        y.domain([plotValue[casetype][0], plotValue[casetype][1]]);

        svg.selectAll(".casecount2").call(yAxis);
        all_scales[casetype] = { xscale: x, yscale: y }

        // variable u: map data to existing circle
        let lollipop_lines = svg.selectAll(".myLine2").data(d2)

        // update lines
        lollipop_lines
            .enter()
            .append("line")
            .attr("class", "myLine2")
            .merge(lollipop_lines)
            .attr("x1", (d) => x(new Date(d[0])))
            .attr("y1", (d) => y(d[1][case_category][casetype]))
            .attr("x2", (d) => x(new Date(d[0])))
            .attr("y2", (d) => y(0))
            .attr("stroke", lollipopcolors[casetype][2])
            .attr('stroke-width', 2.2)
            .style("opacity", 0.5)

        // variable u: map data to existing circle
        let lollipop_circle = svg.selectAll("circle2").data(d2)

        // update bars or lines
        lollipop_circle
            .enter()
            .append("circle")
            .merge(lollipop_circle)
            .transition()
            .attr("cx", (d) => x(new Date(d[0])))
            .attr("cy", (d) => y(d[1][case_category][casetype]))
            .attr("r", 2.5)
            .attr("fill", lollipopcolors[casetype][1])
            //.attr('stroke', lollipopcolors[casetype][1])

        const h4sel = "#info-" + casetype
        let stxt = `${d2[d2l - 1][1][case_category][casetype]}`
        d3.select(h4sel).text(stxt)

        const h5sel = "#date-" + casetype
        let dtxt = `${DateFormatter(d2[d2l - 1][0])}`
        d3.select(h5sel).text(dtxt)

        svg
            .append('rect')
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .on('mousemove', mousemove)
        svg
            .append('g')
            .attr('id', 'focus-' + casetype)
            .append('circle')
            .style("fill", lollipopcolors[casetype][0])
            .attr('stroke-width', 1.8)
            .attr('r', 4)
            .attr('cx', x(new Date(d2[d2l - 1][0])))
            .attr('cy', y(d2[d2l - 1][1][case_category][casetype]))
            .style("opacity", 1)

        function mousemove(event) {
            const coords = d3.pointer(event, this);
            const xcord = x.invert(coords[0])
            const i = bisect(d2, xcord, 1);
            const selectedData = d2[i]
            if (selectedData) {
                updatechartinfo(selectedData, case_category, casetype, all_scales)
                d3.select('#focus-' + casetype)
                    .select('circle')
                    .attr("cx", x(new Date(selectedData[0])))
                    .attr("cy", y(selectedData[1][case_category][casetype]))
            }
        }
    }


    if(plot_days == "30days") {
        const x = d3.scaleTime().range([width, 0]);
        const xAxis = d3.axisBottom().scale(x).ticks(5).tickFormat(d3.timeFormat("%d %b"));
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "dateaxis2")
        svg.append("g").attr("transform", "translate(0," + height + ")")

        const plotTick = {
            confirmed: [4],
            active: [3],
            recovered: [4],
            deceased: [4]
        }
        const y = d3.scaleLinear().range([height, 0]);
        const yAxis = d3.axisRight().scale(y).ticks(plotTick[casetype][0]).tickFormat((d3.format('.2s')));
        svg.append("g")
            .attr("class", "casecount2")
            .attr("transform", `translate(${width},0)`)

        // Create the X axis:
        const all_dates = d2.map((d) => new Date(d[0]))
        x.domain([new Date(d2[d2l - 1][0]), new Date(d2[d2l-27][0])]);
        svg.selectAll(".dateaxis2").call(xAxis);

        const minmax = d3.extent(d2, function (d) { return d[1][case_category][casetype] })
        const plotValue = {
            confirmed: [minmax[0] * 1.2, minmax[1] * 0.3],
            active: [minmax[0] * 0.5, minmax[1] * 0.6],
            recovered: [minmax[0] * 1.2, minmax[1] * 0.24],
            deceased: [minmax[0] * 1.2, minmax[1] * 0.09]
        }
        y.domain([plotValue[casetype][0], plotValue[casetype][1]]);

        svg.selectAll(".casecount2").call(yAxis);
        all_scales[casetype] = { xscale: x, yscale: y }

        // variable u: map data to existing circle
        let lollipop_lines = svg.selectAll(".myLine2").data(d2)

        // update lines
        lollipop_lines
            .enter()
            .append("line")
            .attr("class", "myLine2")
            .merge(lollipop_lines)
            .attr("x1", (d) => x(new Date(d[0]))-3.5)
            .attr("y1", (d) => y(d[1][case_category][casetype]))
            .attr("x2", (d) => x(new Date(d[0]))-3.5)
            .attr("y2", (d) => y(0))
            .attr("stroke", lollipopcolors[casetype][2])
            .attr('stroke-width', 3.2)
            .style("opacity", 0.5)

        // variable u: map data to existing circle
        let lollipop_circle = svg.selectAll("circle2").data(d2)

        // update bars or lines
        lollipop_circle
            .enter()
            .append("circle")
            .merge(lollipop_circle)
            .transition()
            .attr("cx", (d) => x(new Date(d[0]))-3.5)
            .attr("cy", (d) => y(d[1][case_category][casetype]))
            .attr("r", 3)
            .attr("fill", lollipopcolors[casetype][1])
            //.attr('stroke', lollipopcolors[casetype][1])

        const h4sel = "#info-" + casetype
        let stxt = `${d2[d2l - 1][1][case_category][casetype]}`
        d3.select(h4sel).text(stxt)

        const h5sel = "#date-" + casetype
        let dtxt = `${DateFormatter(d2[d2l - 1][0])}`
        d3.select(h5sel).text(dtxt)

        svg
            .append('rect')
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .on('mousemove', mousemove)
        svg
            .append('g')
            .attr('id', 'focus-' + casetype)
            .append('circle')
            .style("fill", lollipopcolors[casetype][0])
            .attr('stroke-width', 1.8)
            .attr('r', 4)
            .attr('cx', x(new Date(d2[d2l - 1][0]))-3.5)
            .attr('cy', y(d2[d2l - 1][1][case_category][casetype]))
            .style("opacity", 1)

        function mousemove(event) {
            const coords = d3.pointer(event, this);
            const xcord = x.invert(coords[0])
            const i = bisect(d2, xcord, 1);
            const selectedData = d2[i]
            if (selectedData) {
                updatechartinfo(selectedData, case_category, casetype, all_scales, plot_days)
                d3.select('#focus-' + casetype)
                    .select('circle')
                    .attr("cx", x(new Date(selectedData[0]))-3.5)
                    .attr("cy", y(selectedData[1][case_category][casetype]))
            }
        }
    }


    if(plot_days == "07days") {
        const x = d3.scaleTime().range([width, 0]);
        const xAxis = d3.axisBottom().scale(x).ticks(5).tickFormat(d3.timeFormat("%d %b"));
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "dateaxis2")
        svg.append("g").attr("transform", "translate(0," + height + ")")

        const plotTick = {
            confirmed: [4],
            active: [3],
            recovered: [4],
            deceased: [4]
        }
        const y = d3.scaleLinear().range([height, 0]);
        const yAxis = d3.axisRight().scale(y).ticks(plotTick[casetype][0]).tickFormat((d3.format('.1s')));
        svg.append("g")
            .attr("class", "casecount2")
            .attr("transform", `translate(${width},0)`)

        // Create the X axis:
        const all_dates = d2.map((d) => new Date(d[0]))
        x.domain([new Date(d2[d2l - 1][0]), new Date(d2[d2l-7][0])]);
        svg.selectAll(".dateaxis2").call(xAxis);

        const minmax = d3.extent(d2, function (d) { return d[1][case_category][casetype] })
        const plotValue = {
            confirmed: [minmax[0] * 1.2, minmax[1] * 0.2],
            active: [minmax[0] * 0.3, minmax[1] * 0.4],
            recovered: [minmax[0] * 1.2, minmax[1] * 0.19],
            deceased: [minmax[0] * 1.2, minmax[1] * 0.07]
        }
        y.domain([plotValue[casetype][0], plotValue[casetype][1]]);

        svg.selectAll(".casecount2").call(yAxis);
        all_scales[casetype] = { xscale: x, yscale: y }

        // variable u: map data to existing circle
        let lollipop_lines = svg.selectAll(".myLine2").data(d2)

        // update lines
        lollipop_lines
            .enter()
            .append("line")
            .attr("class", "myLine2")
            .merge(lollipop_lines)
            .attr("x1", (d) => x(new Date(d[0]))-17)
            .attr("y1", (d) => y(d[1][case_category][casetype]))
            .attr("x2", (d) => x(new Date(d[0]))-17)
            .attr("y2", (d) => y(0))
            .attr("stroke", lollipopcolors[casetype][2])
            .attr('stroke-width', 3.5)
            .style("opacity", 0.5)

        // variable u: map data to existing circle
        let lollipop_circle = svg.selectAll("circle2").data(d2)

        // update bars or lines
        lollipop_circle
            .enter()
            .append("circle")
            .merge(lollipop_circle)
            .transition()
            .attr("cx", (d) => x(new Date(d[0]))-17)
            .attr("cy", (d) => y(d[1][case_category][casetype]))
            .attr("r", 3.5)
            .attr("fill", lollipopcolors[casetype][1])
            //.attr('stroke', lollipopcolors[casetype][1])

        svg
            .append('rect')
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .on('mousemove', mousemove)
        svg
            .append('g')
            .attr('id', 'focus-' + casetype)
            .append('circle')
            .style("fill", lollipopcolors[casetype][0])
            .attr('stroke-width', 1.8)
            .attr('r', 4)
            .attr('cx', x(new Date(d2[d2l - 1][0]))-17)
            .attr('cy', y(d2[d2l - 1][1][case_category][casetype]))
            .style("opacity", 1)

        const h4sel = "#info-" + casetype
        let stxt = `${d2[d2l - 1][1][case_category][casetype]}`
        d3.select(h4sel).text(stxt)

        const h5sel = "#date-" + casetype
        let dtxt = `${DateFormatter(d2[d2l - 1][0])}`
        d3.select(h5sel).text(dtxt)

        function mousemove(event) {
            const coords = d3.pointer(event, this);
            const xcord = x.invert(coords[0])
            const i = bisect(d2, xcord, 1);
            const selectedData = d2[i]
            if (selectedData) {
                updatechartinfo(selectedData, case_category, casetype, all_scales, plot_days)
                d3.select('#focus-' + casetype)
                    .select('circle')
                    .attr("cx", x(new Date(selectedData[0]))-17)
                    .attr("cy", y(selectedData[1][case_category][casetype]))
            }
        }
    }




}

