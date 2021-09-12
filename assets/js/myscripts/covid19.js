/*covid-19 */

async function getcovidapi(){
		
	
	const jsondata = await fetch('https://data.covid19india.org/data.json');
	const jsdata = await jsondata.json();
	
	
	const length1 = jsdata.cases_time_series.length-1;
	const casestimeseries = jsdata.cases_time_series[length1];
	const {date} = casestimeseries;
	
	const statewise = jsdata.statewise[0];
	const {confirmed} = statewise;
	const number_confirmed = new Intl.NumberFormat('en-IN').format(confirmed)
	const {deltaconfirmed} = statewise;
	const number_deltaconfirmed = new Intl.NumberFormat('en-IN').format(deltaconfirmed)
	const {active} = statewise;
	const number_active = new Intl.NumberFormat('en-IN').format(active)
	const {recovered} = statewise;
	const number_recovered = new Intl.NumberFormat('en-IN').format(recovered)
	const {deltarecovered} = statewise;
	const number_deltarecovered = new Intl.NumberFormat('en-IN').format(deltarecovered)
	const {deaths} = statewise;
	const number_deaths = new Intl.NumberFormat('en-IN').format(deaths)
	const {deltadeaths} = statewise;
	const number_deltadeaths = new Intl.NumberFormat('en-IN').format(deltadeaths)
	var {lastupdatedtime} = statewise;
	
	const length2 = jsdata.tested.length-1;
	const tested = jsdata.tested[length2];
	const {samplereportedtoday} = tested;
	const number_samplereportedtoday = new Intl.NumberFormat('en-IN').format(samplereportedtoday)
	const {totalsamplestested} = tested;
	const number_totalsamplestested = new Intl.NumberFormat('en-IN').format(totalsamplestested)
    
	var {totaldosesadministered} = tested;
    var number_total_doses_administered; 
    if(totaldosesadministered > 0){
        number_total_doses_administered = new Intl.NumberFormat('en-IN').format(totaldosesadministered);
    }
    else{
        totaldosesadministered = jsdata.tested[length2-1];
        number_total_doses_administered = new Intl.NumberFormat('en-IN').format(totaldosesadministered);
    }
    
    const {source} = tested;
    const source_link = source;
	
	
	document.getElementById('date').innerHTML = date;
	
	document.getElementById('confirmed').innerHTML = number_confirmed;
	document.getElementById('deltaconfirmed').textContent = number_deltaconfirmed;
	document.getElementById('active').innerHTML = number_active;
	document.getElementById('recovered').innerHTML = number_recovered;
	document.getElementById('deltarecovered').textContent = number_deltarecovered;
	document.getElementById('deaths').innerHTML = number_deaths;
	document.getElementById('deltadeaths').textContent = number_deltadeaths;
    moment.locale();
	document.getElementById('lastupdatedtime').innerHTML = moment(lastupdatedtime, "DD/MM/YYYY hh:mm:ss").format('lll');
	
	document.getElementById('samplereportedtoday').innerHTML = number_samplereportedtoday;
	document.getElementById('totalsamplestested').innerHTML = number_totalsamplestested;
    document.getElementById('totaldosesadministered').innerHTML = number_total_doses_administered;
	document.getElementById('source_link').href = source_link;
	//console.log(jsdata);

    
	jQuery(function ($) {
    "use strict";
    
    var counterUp = window.counterUp["default"]; // import counterUp from "counterup2"
    
    var $counters = $(".realtime-count");
    
    // Start counting, do this on DOM ready or with Waypoints.
    $counters.each(function (ignore, counter) {
        counterUp(counter, {
            duration: 800,
            delay: 2
        });
    });
    
});
}
getcovidapi();





//expand table
const button = document.querySelector("#table-expand");
const table = document.querySelector("#dashboard-table");
const dashboard_map = document.getElementById("dashboard-map");

const dashboard_map_row = document.getElementById("dashboard-map-row");
const dashboard_map_data = document.getElementById("dashboard-map-data");
const dashboard_map_india = document.getElementById("dashboard-map-india");
const dashboard_map_chart = document.getElementById("chart-container");

button.addEventListener("click", (e)=>{
    e.preventDefault();
    table.classList.toggle("col-lg-12");
    table.classList.toggle("shrink");
    dashboard_map.classList.toggle("col-lg-12")
    
    
    dashboard_map_row.classList.toggle("map_grid");
    dashboard_map_data.classList.toggle("map_data_grid");
    dashboard_map_data.classList.toggle("col-lg-12");
    //dashboard_map_data.classList.toggle("col-lg-5");
    dashboard_map_india.classList.toggle("map_india_grid");
    dashboard_map_chart.classList.toggle("map_chart_grid");
});








//export table
 $("#export_table_json").on("click",function(e){
     e.preventDefault();
    $("#realtimedata").tableHTMLExport({
      type:'json',
      filename:'CovdTable.json'
    });
  });

  $("#export_table_csv").on("click",function(e){
      e.preventDefault();
    $("#realtimedata").tableHTMLExport({
      type:'csv',
      filename:'CovdTable.csv'
    });
  });

  // $("#export_table_csv").on("click",function(){
  //   $("#realtimedata").tableHTMLExport({
  //     type:'pdf',
  //     filename:'sample.pdf'
  //   });
  // });

$("#export_table_pdf").on("click",function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    html2canvas($('#realtimedata')[0], {
        onrendered: function (canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500
                }]
            };
            pdfMake.createPdf(docDefinition).download("CovdTable.pdf");
        }
    });
});





//map-data-color
const confirm_red = document.getElementById("map_data_confirm_red");
const active_blue = document.getElementById("map_data_active_blue");
const recover_green = document.getElementById("map_data_recover_green");
const dead_gray = document.getElementById("map_data_dead_gray");
const select_colour = document.getElementsByClassName("map_info_select_colour");

confirm_red.addEventListener("click",()=>{
    for(var color of select_colour){
        color.style.backgroundColor = "rgba(255,17,16,0.15)";
        color.style.color = "rgb(255,17,16)";
    }
})
active_blue.addEventListener("click",()=>{
    for(var color of select_colour){
        color.style.backgroundColor = "rgba(16,114,255,0.15)";
        color.style.color = "rgb(16,114,255)";
    }
})
recover_green.addEventListener("click",()=>{
    for(var color of select_colour){
        color.style.backgroundColor = "rgba(84,199,30,0.15)";
        color.style.color = "rgb(84,199,30)";
    }
})
dead_gray.addEventListener("click",()=>{
    for(var color of select_colour){
        color.style.backgroundColor = "rgba(143,143,143,0.15)";
        color.style.color = "rgb(143,143,143)";
    }
})








//chart-days
const days_after = document.getElementById("btn_after");

const btn_beginning = document.getElementById("beginning");
const btn_ninezero = document.getElementById("ninezero");
const btn_threezero = document.getElementById("threezero");
const btn_zeroseven = document.getElementById("zeroseven");

btn_beginning.addEventListener("click",()=>{
    btn_beginning.style.background="rgb(255 239 53)"
    btn_ninezero.style.background="transparent"
    btn_threezero.style.background="transparent"
    btn_zeroseven.style.background="transparent"
    
    days_after.style.background="rgb(253,249,161)"
})

btn_ninezero.addEventListener("click",()=>{
    btn_ninezero.style.background="rgb(255 239 53)"
    btn_beginning.style.background="transparent"
    btn_threezero.style.background="transparent"
    btn_zeroseven.style.background="transparent"
    
    days_after.style.background="rgb(253,249,161)"
})

btn_threezero.addEventListener("click",()=>{
    btn_threezero.style.background="rgb(255 239 53)"
    btn_beginning.style.background="transparent"
    btn_ninezero.style.background="transparent"
    btn_zeroseven.style.background="transparent"
    
    days_after.style.background="rgb(253,249,161)"
})

btn_zeroseven.addEventListener("click",()=>{
    btn_zeroseven.style.background="rgb(255 239 53)"
    btn_beginning.style.background="transparent"
    btn_threezero.style.background="transparent"
    btn_threezero.style.background="transparent"
    
    days_after.style.background="rgb(253,249,161)"
})




/**********************scroll_to_top**************************/

window.addEventListener('scroll',function(){
    var scroll = document.getElementById("scroll_to_top")
    scroll.classList.toggle("active", window.scrollY > 5)
})

function scrollToTop(){
    window.scrollTo({
        top:0,
        behavior: 'smooth'
    })
}