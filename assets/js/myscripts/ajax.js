$.when(ajax1(), ajax2(), ajax3(), ajax4(), ajax5(), ajax6()).done(function(a1, a2, a3, a4, a5, a6){

	var mainArray_raw = a1[0].statewise;
	var district = a2[0];
	var hospital = a3[0].data.regional;
	var medical = a4[0].data.medicalColleges;
	var contact = a5[0].data.contacts.regional;
    var population = Object.values(a6[0]);

	var mainArray = mainArray_raw.slice(1, mainArray_raw.length - 2)
    mainArray.splice(30,30);
	district.splice(0, 1);

	for (row of mainArray) {
		for (prop in row) {
			if (["state", "statecode", "statenotes", "hospital", "districtData", "contact"].includes(prop))
				continue;
			row[prop] = Number(row[prop]);
		}
	}
	

	for(var e1 of mainArray){
		for(var e2 of district) {
			if(e1.state == e2.state) {
				e1.districtData = e2.districtData;
			}
		} 
	}	
	

	for(var e1 of mainArray) {
		for( var e2 of hospital){
            if((e1.state == "Dadra and Nagar Haveli and Daman and Diu" && e2.state == "Daman & Diu") || (e1.state == "Andaman and Nicobar Islands" && e2.state == "Andaman & Nicobar Islands") || (e1.state == "Jammu and Kashmir" && e2.state == "Jammu & Kashmir")  ){
                e1.hospital = e2;
            }
			else if (e1.state == e2.state && e2.totalHospitals>=0 && e2.totalBeds>=0) {
				e1.hospital = e2;
			}
		}
		if(e1.statecode =="LA" ){
			e1.hospital = {
                "state": "Ladakh",
                "totalHospitals": 0,
                "totalBeds": 0,}
		}
	}	
	

	for(var e1 of district){
		for(var e12 of e1.districtData){
			for(var e2 of medical){
				if(e12.district == e2.city){
					e12.medical = e2;
				}
			}
		}
		
	}
	

	for(var e1 of mainArray){
		for(var e2 of contact){
			if(e1.state == e2.loc){
				e1.contact = e2;   
			}
            "TG" != e1.statecode && "DN" != e1.statecode || (e1.contact = "104")
		}
	}
    

    for(var e1 of mainArray){
        var ob=removeWhiteSpace(population[31].districts)
        delete population[31].districts.Other_State;
        for(var e2 of population){
            if(e2.districts != null){
                var g = Object.values(e2.districts)
                for(var e3 of g){
                    for(var e4 of e1.districtData){
                        if(e3.total.confirmed == e4.confirmed){
                            e4.tested = e3.total.tested;
                            if(e3.meta != null){
                                e4.population = e3.meta.population;
                            }
                        }
                    }
                }
            }
            if(e1.confirmed == e2.total.confirmed){
                e1.tested = e2.total.tested;
                e1.population = e2.meta.population;
            }
        }
    }
    
    function removeWhiteSpace(obj) {
        if (typeof obj !== "object") return obj;
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                obj[prop.replace(" ", "_")] =  removeWhiteSpace(obj[prop]); 
                if (prop.indexOf(" ") > -1) { 
                    delete obj[prop];  
                } 
            }
        }
        return obj;
    }

    buildTable(mainArray)
    
    console.log(mainArray);
	
	
	
/**********************************************************************************************************************************/  


    $('.short').on('click', function() {
		var column = $(this).data('column')
		var order = $(this).data('order')
		$(this).addClass('active').siblings().removeClass('active')
        
		//console.log('colume was clicked : ',column,order);
		if (order == 'desc') {
            if(column == "states"){
                mainArray = mainArray.sort((a, b) => b.state.toLowerCase() < a.state.toLowerCase() ? -1 : 1 );
            }
            else if(column == "totalHospitals"){
                mainArray = mainArray.sort((a, b) => {return b.hospital.totalHospitals - a.hospital.totalHospitals });
            }
            else if(column == "totalBeds"){
                mainArray = mainArray.sort((a, b) => {console.log(b.hospital.totalBeds); return b.hospital.totalBeds - a.hospital.totalBeds });
            }
            else{
                mainArray = mainArray.sort((a, b) => a[column] < b[column] ? 1 : -1)
            }
			
            $(this).data('order', "asc")

			var arrow_icon = this.getElementsByTagName('i').length-1;
			this.getElementsByTagName('i')[arrow_icon].classList.remove('fa-sort-amount-up-alt')
			this.getElementsByTagName('i')[arrow_icon].classList.add('fa-sort-amount-down')
			
		} else if (order == 'asc') {
            if(column == "states"){
                mainArray = mainArray.sort((a, b) => a.state.toLowerCase() < b.state.toLowerCase() ? -1 : 1 );
            }
            else if(column == "totalHospitals"){
                mainArray = mainArray.sort((a, b) => {return a.hospital.totalHospitals - b.hospital.totalHospitals });
            }
            else if(column == "totalBeds"){
                mainArray = mainArray.sort((a, b) => {return a.hospital.totalBeds - b.hospital.totalBeds });
            }
            else{
                mainArray = mainArray.sort((a, b) => a[column] > b[column] ? 1 : -1)
            }
			
            $(this).data('order', "desc")

            var arrow_icon = this.getElementsByTagName('i').length-1;
			this.getElementsByTagName('i')[arrow_icon].classList.remove('fa-sort-amount-down')
			this.getElementsByTagName('i')[arrow_icon].classList.add('fa-sort-amount-up-alt')
		} else {
			return 0;
		}

		buildTable(mainArray)

        $('.row_state').on('click', function show_district() {
            var state = $(this).data('state')
            $(tr).toggleClass("active")

            buildTableDist(mainArray, table, state)
            if(tr.classList.value == "state_district active"){
                $(this).after(tr)
            }
            else{
                $(tr).remove()
            }
            
            
            $('.delta_short').on('click', function dist_sort() {
                var column = $(this).data('column')
                var order = $(this).data('order')
                $(this).addClass('active').siblings().removeClass('active')
                
                //console.log('colume was clicked : ',column,order);
                if (order == 'desc') {
                    if(column == "delta_districts"){
                        for(let i=0; i<mainArray.length ; i++){
                            if(mainArray[i].state == state){
                                mainArray[i].districtData = mainArray[i].districtData.sort((a, b) => b.district.toLowerCase() < a.district.toLowerCase() ? -1 : 1 );
                            }
                        }
                    }
                    else{
                        for(let i=0; i<mainArray.length ; i++){
                            if(mainArray[i].state == state){
                                mainArray[i].districtData = mainArray[i].districtData.sort((a, b) => a[column] < b[column] ? 1 : -1);
                            }
                        }
                    }
                    
                    $(this).data('order', "asc")
        
                    var arrow_icon = this.getElementsByTagName('i').length-1;
                    this.getElementsByTagName('i')[arrow_icon].classList.remove('fa-sort-amount-up-alt')
                    this.getElementsByTagName('i')[arrow_icon].classList.add('fa-sort-amount-down')
                    
                } else if (order == 'asc') {
                    if(column == "delta_districts"){
                        for(let i=0; i<mainArray.length ; i++){
                            if(mainArray[i].state == state){
                                mainArray[i].districtData = mainArray[i].districtData.sort((a, b) => b.district.toLowerCase() > a.district.toLowerCase()? -1 : 1 );
                            }
                        }
                    }
                    else{
                        for(let i=0; i<mainArray.length ; i++){
                            if(mainArray[i].state == state){
                                mainArray[i].districtData = mainArray[i].districtData.sort((a, b) => a[column] > b[column] ? 1 : -1);
                            }
                        }
                    }
                    
                    $(this).data('order', "desc")
        
                    var arrow_icon = this.getElementsByTagName('i').length-1;
                    this.getElementsByTagName('i')[arrow_icon].classList.remove('fa-sort-amount-down')
                    this.getElementsByTagName('i')[arrow_icon].classList.add('fa-sort-amount-up-alt')
                } else {
                    return 0;
                }
                buildTableDist(mainArray, table, state)
                
            })
        })
    
	})

	
/**********************************************************************************************************************************/	
	
	
function buildTable(mainArray){
    
    var table = document.getElementById('tbody')
    table.innerHTML = ''
    //console.log(statewise);
    for (var i = 0; i < mainArray.length; i++) {
		
		// // var state_active_ratio = (mainArray[i].active / mainArray[i].confirmed * 100);
		// var state_recovered_ratio = (mainArray[i].recovered / mainArray[i].confirmed * 100);
		// var state_deaths_ratio = (mainArray[i].deaths / mainArray[i].confirmed * 100);
        // var test_positivity_ratio = (mainArray[i].confirmed / mainArray[i].tested * 100);
        
        for(var e1 of mainArray) {
            e1.state_active_ratio = (e1.active / e1.confirmed * 100);
            e1.state_recovered_ratio = (e1.recovered / e1.confirmed * 100);
            e1.state_deaths_ratio = (e1.deaths / e1.confirmed * 100);
            e1.test_positivity_ratio = (e1.confirmed / e1.tested * 100);
        }
        
        var totalHospitals = mainArray[i].hospital.totalHospitals > 0 ?  new Intl.NumberFormat('en-IN').format(mainArray[i].hospital.totalHospitals) : "-";
        var totalBeds = mainArray[i].hospital.totalBeds > 0 ? new Intl.NumberFormat('en-IN').format(mainArray[i].hospital.totalBeds) : "-";

        var contact = mainArray[i].contact.number;
        if(contact == undefined){
            contact = "104";
        }
        else if(contact == "1800313444222,+91-3323412600,"){
            contact = "+91-3323412600";
        }
        else if(contact == "+91-191-2520982,+91-194-2440283"){
            contact = "+91-191-2520982";
        }
        
        var row = `<tr data-state="${mainArray[i].state}" class="row_state">
			<th scope="col" data-column="${mainArray[i].state}" data-order="desc" class="data-th-states data-short" data-toggle="tooltip" data-placement="right"  title="${mainArray[i].state}">${mainArray[i].state}</th>
			<td scope="col" data-column="${mainArray[i].confirmed}" data-order="desc" class="confirmed data-th-reports data-short" data-toggle="tooltip" data-placement="right" title="${mainArray[i].confirmed}">${new Intl.NumberFormat('en-IN').format(mainArray[i].confirmed)}</td>
			<td scope="col" data-column="${mainArray[i].active}" data-order="desc" class="data-th-reports data-short" data-toggle="tooltip" data-placement="right" title="${mainArray[i].active}">${new Intl.NumberFormat('en-IN').format(mainArray[i].active)}</td>
			<td scope="col" data-column="${mainArray[i].recovered}" data-order="desc" class="data-th-reports data-short" data-toggle="tooltip" data-placement="right" title="${mainArray[i].recovered}">${new Intl.NumberFormat('en-IN').format(mainArray[i].recovered)}</td>
			<td scope="col" data-column="${mainArray[i].deaths}" data-order="desc" class="data-th-reports data-short" data-toggle="tooltip" data-placement="right" title="${mainArray[i].deaths}">${new Intl.NumberFormat('en-IN').format(mainArray[i].deaths)}</td>

			<td scope="col" data-column="${mainArray[i].migratedother}" data-order="desc" class="data-th-reports data-short" data-toggle="tooltip" data-placement="right" title="${mainArray[i].migratedother}">${new Intl.NumberFormat('en-IN').format(mainArray[i].migratedother)}</td>            
            <td scope="col" data-column="${mainArray[i].tested}" data-order="desc" class="data-th-reports data-short" data-toggle="tooltip" data-placement="right" title="${mainArray[i].tested}">${new Intl.NumberFormat( 'en-IN', { maximumFractionDigits: 1,notation: "compact" , compactDisplay: "short" }).format(mainArray[i].tested)}</td>

			<td scope="col" data-column="${mainArray[i].state_active_ratio}" data-order="desc" class="data-th-reports data-short extend" data-toggle="tooltip" data-placement="right" title="${mainArray[i].state_active_ratio}">${mainArray[i].state_active_ratio.toFixed(1)+"%"}</td>
			<td scope="col" data-column="${mainArray[i].state_recovered_ratio}" data-order="desc" class="data-th-reports data-short extend" data-toggle="tooltip" data-placement="right" title="${mainArray[i].state_recovered_ratio}">${mainArray[i].state_recovered_ratio.toFixed(1)+"%"}</td>
			<td scope="col" data-column="${mainArray[i].state_deaths_ratio}" data-order="desc" class="data-th-reports data-short extend" data-toggle="tooltip" data-placement="right" title="${mainArray[i].state_deaths_ratio}">${mainArray[i].state_deaths_ratio.toFixed(1)+"%"}</td>
            <td scope="col" data-column="${mainArray[i].test_positivity_ratio}" data-order="desc" class="data-th-reports data-short extend" data-toggle="tooltip" data-placement="right" title="${mainArray[i].test_positivity_ratio}">${mainArray[i].test_positivity_ratio.toFixed(1)+"%"}</td>

			<td scope="col" data-column="${totalHospitals}" data-order="desc" class="data-th-reports data-short extend" data-toggle="tooltip" data-placement="right" title="${totalHospitals}">${totalHospitals}</td>
			<td scope="col" data-column="${totalBeds}" data-order="desc" class="data-th-reports data-short extend" data-toggle="tooltip" data-placement="right" title="${totalBeds}">${totalBeds}</td>
            
            <td scope="col" data-column="${mainArray[i].population}" data-order="desc" class="data-th-reports data-short extend" data-toggle="tooltip" data-placement="right" title="${mainArray[i].population}">${new Intl.NumberFormat( 'en-IN', { maximumFractionDigits: 1,notation: "compact" , compactDisplay: "short" }).format(mainArray[i].population)}</td>           
            <td scope="col" data-column="${mainArray[i].contact.number}" data-order="desc" class="data-th-reports data-short extend" data-toggle="tooltip" data-placement="right" title="${mainArray[i].contact.number}" >${contact}</td>
		</tr>`
        
        table.innerHTML += row
        
    }
    
}
//data table
	
	
/**********************************************************************************************************************************/	
	

	var dist_table = document.getElementById('delta_realtimedata')
    var table = document.getElementById('delta_tbody')
    table.innerHTML = ''
    var tr = document.createElement('tr');
    $(tr).addClass("state_district")
    var td = document.createElement('td');
    $(td).addClass("row_district")
    $(td).attr("colspan","15")
    var dashboard = document.getElementById('dashboard-table')
    
    
    
    td.append(dist_table)
    tr.append(td)
    

    function buildTableDist(mainArray, table, state){
        table.innerHTML = ''
        for (var i = 0; i < mainArray.length; i++) {
            for (var j = 0; j < mainArray[i].districtData.length; j++) {
                if ( ( mainArray[i].districtData[j].district != "Unknown") && (mainArray[i].state == state) )  {

                    for(var e1 of mainArray[i].districtData) {
                        e1.tested = Number.isInteger(e1.tested) ? e1.tested : 0
                        e1.tested_value = (e1.tested == 0) ? "-" : new Intl.NumberFormat( 'en-IN', { maximumFractionDigits: 1,notation: "compact" , compactDisplay: "short" }).format(e1.tested)
                        if(e1.confirmed != 0){
                            e1.district_active_ratio =  (e1.active/e1.confirmed * 100)
                            e1.district_recovered_ratio =  (e1.recovered/e1.confirmed * 100)
                            e1.district_deceased_ratio =  (e1.deceased/e1.confirmed * 100)

                            e1.test_positivity_ratio = (e1.tested != 0) ? (e1.confirmed/e1.tested * 100) : 0
                            e1.test_positivity_ratio_value = (e1.test_positivity_ratio == 0) ? "-" : e1.test_positivity_ratio.toFixed(1) + "%"
                        }
                        else{
                            e1.district_active_ratio =  0                          
                            e1.district_recovered_ratio =  0
                            e1.district_deceased_ratio =  0    
                                            
                        }
                        e1.population = Number.isInteger(e1.population) ? e1.population : 0
                        e1.population_value = (e1.population == 0) ? "-" : new Intl.NumberFormat( 'en-IN', { maximumFractionDigits: 1,notation: "compact" , compactDisplay: "short" }).format(e1.population)
                    }
                    
                    var row = `<tr data-state="${mainArray[i].districtData[j].district}" class="row_district">
                        <th scope="col" data-column="${mainArray[i].districtData[j].district}" data-order="desc" class="delta-th-states delta-short" data-toggle="tooltip" data-placement="right" title="${mainArray[i].districtData[j].district}" >${mainArray[i].districtData[j].district}</th>
                        <td scope="col" data-column="${mainArray[i].districtData[j].confirmed}" data-order="desc" class="delta-th-reports delta-short" data-toggle="tooltip" data-placement="right" title="${mainArray[i].districtData[j].confirmed}">${new Intl.NumberFormat('en-IN').format(mainArray[i].districtData[j].confirmed)}</td>
                        <td scope="col" data-column="${mainArray[i].districtData[j].active}" data-order="desc" class="delta-th-reports delta-short" data-toggle="tooltip" data-placement="right" title="${mainArray[i].districtData[j].active}">${new Intl.NumberFormat('en-IN').format(mainArray[i].districtData[j].active)}</td>
                        <td scope="col" data-column="${mainArray[i].districtData[j].recovered}" data-order="desc" class="delta-th-reports delta-short" data-toggle="tooltip" data-placement="right" title="${mainArray[i].districtData[j].recovered}">${new Intl.NumberFormat('en-IN').format(mainArray[i].districtData[j].recovered)}</td>
                        <td scope="col" data-column="${mainArray[i].districtData[j].deceased}" data-order="desc" class="delta-th-reports delta-short" data-toggle="tooltip" data-placement="right" title="${mainArray[i].districtData[j].deceased}">${new Intl.NumberFormat('en-IN').format(mainArray[i].districtData[j].deceased)}</td>
                        
                        <td scope="col" data-column="${mainArray[i].districtData[j].tested}" data-order="desc" class="delta-th-reports delta-short" data-toggle="tooltip" data-placement="right" title="${mainArray[i].districtData[j].tested == 0 ? "-" : "-"}">${"-"}</td>
    
                        <td scope="col" data-column="${mainArray[i].districtData[j].district_active_ratio}" data-order="desc" class="delta-th-reports delta-short extend" data-toggle="tooltip" data-placement="right" title="${mainArray[i].districtData[j].district_active_ratio}">${mainArray[i].districtData[j].district_active_ratio.toFixed(1) + "%"}</td>
                        <td scope="col" data-column="${mainArray[i].districtData[j].district_recovered_ratio}" data-order="desc" class="delta-th-reports delta-short extend" data-toggle="tooltip" data-placement="right" title="${mainArray[i].districtData[j].district_recovered_ratio}">${mainArray[i].districtData[j].district_recovered_ratio.toFixed(1) + "%"}</td>
                        <td scope="col" data-column="${mainArray[i].districtData[j].district_deceased_ratio}" data-order="desc" class="data-th-reports data-short extend" data-toggle="tooltip" data-placement="right" title="${mainArray[i].districtData[j].district_deceased_ratio}">${mainArray[i].districtData[j].district_deceased_ratio.toFixed(1) + "%"}</td>
    
                        <td scope="col" data-column="${mainArray[i].districtData[j].test_positivity_ratio}" data-order="desc" class="data-th-reports data-short extend" data-toggle="tooltip" data-placement="right" title="${"-"}">${"-"}</td>
                        <td scope="col" data-column="${mainArray[i].districtData[j].population}" data-order="desc" class="delta-th-reports delta-short extend" data-toggle="tooltip" data-placement="right" title="${mainArray[i].districtData[j].population == 0 ? "-" : mainArray[i].districtData[j].population}">${mainArray[i].districtData[j].population_value}</td>
                    </tr>`
                    table.innerHTML += row
                }
            }
        }
    }


    $('.row_state').on('click', function show_district() {
        // console.log(dashboard.classList.value)
	    var state = $(this).data('state')
        $(tr).toggleClass("active")
        
        buildTableDist(mainArray, table, state)
        if(tr.classList.value == "state_district active"){
            $(this).after(tr)
        }
        else{
            $(tr).remove()
        }
        
        
        $('.delta_short').on('click', function dist_sort() {
            var column = $(this).data('column')
            var order = $(this).data('order')
            $(this).addClass('active').siblings().removeClass('active')
            
            //console.log('colume was clicked : ',column,order);
            if (order == 'desc') {
                if(column == "delta_districts"){
                    for(let i=0; i<mainArray.length ; i++){
                        if(mainArray[i].state == state){
                            mainArray[i].districtData = mainArray[i].districtData.sort((a, b) => b.district.toLowerCase() < a.district.toLowerCase() ? -1 : 1 );
                        }
                    }
                }
                else{
                    for(let i=0; i<mainArray.length ; i++){
                        if(mainArray[i].state == state){
                            mainArray[i].districtData = mainArray[i].districtData.sort((a, b) => a[column] < b[column] ? 1 : -1);
                        }
                    }
                }
                
                $(this).data('order', "asc")
    
                var arrow_icon = this.getElementsByTagName('i').length-1;
                this.getElementsByTagName('i')[arrow_icon].classList.remove('fa-sort-amount-up-alt')
                this.getElementsByTagName('i')[arrow_icon].classList.add('fa-sort-amount-down')
                
            } else if (order == 'asc') {
                if(column == "delta_districts"){
                    for(let i=0; i<mainArray.length ; i++){
                        if(mainArray[i].state == state){
                            mainArray[i].districtData = mainArray[i].districtData.sort((a, b) => b.district.toLowerCase() > a.district.toLowerCase()? -1 : 1 );
                        }
                    }
                }
                else{
                    for(let i=0; i<mainArray.length ; i++){
                        if(mainArray[i].state == state){
                            mainArray[i].districtData = mainArray[i].districtData.sort((a, b) => a[column] > b[column] ? 1 : -1);
                        }
                    }
                }
                
                $(this).data('order', "desc")
    
                var arrow_icon = this.getElementsByTagName('i').length-1;
                this.getElementsByTagName('i')[arrow_icon].classList.remove('fa-sort-amount-down')
                this.getElementsByTagName('i')[arrow_icon].classList.add('fa-sort-amount-up-alt')
            } else {
                return 0;
            }
            buildTableDist(mainArray, table, state)
            
        })
    })
    
    
    
    
    
});





/**********************************************************************************************************************************/

function ajax1() {
    return $.ajax({
        method: 'GET',
        url: 'https://api.covid19india.org/data.json',
        success: function(response) {
            return response;
        }
    })
}

function ajax2() {
    return $.ajax({
        method: 'GET',
        url: 'https://api.covid19india.org/v2/state_district_wise.json',
        success: function(delta_response) {
            delete delta_response[0]
            var delta_myArray = delta_response
            return delta_myArray;
        }
    }) 
}

function ajax3() {
    return $.ajax({
        method: 'GET',
        url: 'https://api.rootnet.in/covid19-in/hospitals/beds',
        success: function(hspt_response) {
            var hspt_myrawArray = hspt_response.data.regional
            var hspt_myArray = hspt_myrawArray.slice(0, hspt_myrawArray.length - 1)
            return hspt_myArray;
        }
    })
}

function ajax4() {
    return $.ajax({
        method: 'GET',
        url: 'https://api.rootnet.in/covid19-in/hospitals/medical-colleges',
        success: function(medical_response) {
            var medical_myrawArray = medical_response.data.medicalColleges
            var medical_myArray = medical_myrawArray
            return medical_myArray;
        }
    })
}

function ajax5() {
    return $.ajax({
        method: 'GET',
        url: 'https://api.rootnet.in/covid19-in/contacts',
        success: function(contact_response) {
            var contact_myrawArray = contact_response.data.contacts.regional
            var contact_myArray = contact_myrawArray	
            return contact_myArray;
        }
    })
}

function ajax6() {
    return $.ajax({
        method: "GET",
        url: "https://api.covid19india.org/v4/data.json",
        success: function(t) {
            return t
        }
    })
}

/**********************************************************************************************************************************/
