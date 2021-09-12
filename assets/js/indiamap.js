import '../topojson/topojson-client.js'
const state_code = { "Total": "TT", "Maharashtra": "MH", "Tamil Nadu": "TN", "Andhra Pradesh": "AP", "Karnataka": "KA", "Delhi": "DL", "Uttar Pradesh": "UP", "West Bengal": "WB", "Bihar": "BR", "Telangana": "TG", "Gujarat": "GJ", "Assam": "AS", "Rajasthan": "RJ", "Odisha": "OR", "Haryana": "HR", "Madhya Pradesh": "MP", "Kerala": "KL", "Punjab": "PB", "Jammu and Kashmir": "JK", "Jharkhand": "JH", "Chhattisgarh": "CT", "Uttarakhand": "UT", "Goa": "GA", "Tripura": "TR", "Puducherry": "PY", "Manipur": "MN", "Himachal Pradesh": "HP", "Nagaland": "NL", "Arunachal Pradesh": "AR", "Andaman and Nicobar Islands": "AN", "Ladakh": "LA", "Chandigarh": "CH", "Dadra and Nagar Haveli and Daman and Diu": "DN", "Meghalaya": "ML", "Sikkim": "SK", "Mizoram": "MZ", "State Unassigned": "UN", "Lakshadweep": "LD" }
export async function indiamapdataprocessed() {
    //const indiamapdatares = await fetch('./mapdata/india.json')
    const indiamapdatares = await fetch('https://raw.githubusercontent.com/Viren-Gajera/india-topojson/main/mapdata/india.json')
    const indiamapdata = await indiamapdatares.json();

    //const statedatares = await fetch("../apidata/latest_state.json")
    //const statedatares = await fetch(https://raw.githubusercontent.com/Viren-Gajera/india-topojson/main/apidata/latest_state.json")
    const statedatares = await fetch("https://data.covid19india.org/v4/data.json")
    const statecasedata = await statedatares.json()

    
    const nocasedata = {
        confirmcase: 0,
        deathcase: 0,
        recovercase: 0,
        testcase: 0,
        activecase: 0,
        st_data:0
    }

    indiamapdata.objects.states.geometries.forEach(el => {
        el.properties.st_code = + el.properties.st_code
        let statecode = state_code[el.id];
        if (statecasedata[statecode]) {
            let state_case_data = statecasedata[statecode]
            let cf = state_case_data.total.confirmed ? state_case_data.total.confirmed : 0
            let dth = state_case_data.total.deceased ? state_case_data.total.deceased : 0
            let rc = state_case_data.total.recovered ? state_case_data.total.recovered : 0
            let test = state_case_data.total.tested ? state_case_data.total.tested : 0

            let ac; if ((cf - dth - rc) < 0) { ac = 0 } else { ac = cf - dth - rc }

            el.properties['totalcasedata'] = {
                confirmcase: cf,
                deathcase: dth,
                recovercase: rc,
                testcase: test,
                activecase: ac

            }
        }

        else {
            el.properties['totalcasedata'] = nocasedata
        }

    })

    indiamapdata.objects.districts.geometries.forEach(el => {
        el.properties.dt_code = + el.properties.dt_code
        el.properties.st_code = + el.properties.st_code

        let districtname = el.properties.district
        let statename = el.properties.st_nm
        let statecode = state_code[statename];
        if (statecasedata[statecode]) {

            let state_case_data = statecasedata[statecode]
            let district_data = state_case_data.districts

            let cf = state_case_data.total.confirmed ? state_case_data.total.confirmed : 0
            let dth = state_case_data.total.deceased ? state_case_data.total.deceased : 0
            let rc = state_case_data.total.recovered ? state_case_data.total.recovered : 0
            let test = state_case_data.total.tested ? state_case_data.total.tested : 0

            let ac; if ((cf - dth - rc) < 0) { ac = 0 } else { ac = cf - dth - rc }
            const state_inside_district_obj= {
                confirmcase: cf,
                deathcase: dth,
                recovercase: rc,
                testcase: test,
                activecase: ac

            }
            if (district_data[districtname]) {

                let each_district_data = district_data[districtname]
                if (each_district_data.total) {
                    let cf2 = each_district_data.total.confirmed ? each_district_data.total.confirmed : 0
                    let dth2 = each_district_data.total.deceased ? each_district_data.total.deceased : 0
                    let rc2 = each_district_data.total.recovered ? each_district_data.total.recovered : 0
                    let test2 = each_district_data.total.tested ? each_district_data.total.tested : 0
                    let ac2;
                    if ((cf2 - dth2 - rc2) < 0) { ac2 = 0 } else { ac2 = cf2 - dth2 - rc2 }
                    el.properties['totalcasedata'] = {
                        confirmcase: cf2,
                        deathcase: dth2,
                        recovercase: rc2,
                        testcase: test2,
                        activecase: ac2,
                        st_data:state_inside_district_obj
                    }

                }
                else {
                    el.properties['totalcasedata'] = nocasedata
                }
            }
            else {
                el.properties['totalcasedata'] = nocasedata
            }

        }
        else {
            el.properties['totalcasedata'] = nocasedata
        }

    })
 

    return indiamapdata

}