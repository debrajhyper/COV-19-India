export async function fetchdataall(st_cd) {

    //const res = await fetch('../apidata/data-all.json')
    //const res=await fetch('https://raw.githubusercontent.com/Viren-Gajera/india-topojson/main/apidata/data-all.json')
    const res=await fetch('https://api.covid19india.org/v4/data-all.json')
    const data_all = await res.json()


    //const  latest_state_res = await fetch("../apidata/latest_state.json")
    //const  latest_state_res = await fetch("https://raw.githubusercontent.com/Viren-Gajera/india-topojson/main/apidata/latest_state.json")
    const  latest_state_res = await fetch("https://api.covid19india.org/v4/data.json")
    const latest_state_res_json = await latest_state_res.json()


    const nodata = { confirmed: 0, active: 0, recovered: 0, deceased: 0, tested: 0 }

    const all_dates = Object.keys(data_all)

    const each_state_timeseries_data = Object.create({});
    each_state_timeseries_data[st_cd] = {dates:{}};
    each_state_timeseries_data["Unknown"] = {dates:{}};
    each_state_timeseries_data["Other State"] = {dates:{}};


    const district_list = Object.keys(latest_state_res_json[st_cd].districts)
    district_list.forEach(el => {
        each_state_timeseries_data[el] = {dates:{}}
    })

        

    for (const each_date of all_dates) {

        const all_state_code_data = data_all[each_date]

        if (all_state_code_data.hasOwnProperty(st_cd)) {

            each_state_timeseries_data[st_cd]["dates"][each_date] = {}
            const each_date_all_data = all_state_code_data[st_cd]
            if (each_date_all_data.delta) {
                const each_date_state_delta = each_date_all_data.delta
                const cf_delta = each_date_state_delta.confirmed ? each_date_state_delta.confirmed : 0
                const dth_delta = each_date_state_delta.deceased ? each_date_state_delta.deceased : 0
                const rc_delta = each_date_state_delta.recovered ? each_date_state_delta.recovered : 0
                const test_delta = each_date_state_delta.tested ? each_date_state_delta.tested : 0
                const ac_delta = cf_delta - dth_delta - rc_delta


                each_state_timeseries_data[st_cd]["dates"][each_date]["delta"] = {
                    confirmed: cf_delta,
                    active: ac_delta,
                    recovered: rc_delta,
                    deceased: dth_delta,
                    tested: test_delta
                }

            }
            else {

                each_state_timeseries_data[st_cd]["dates"][each_date]["delta"] = nodata
            }

            if (each_date_all_data.total) {
                const each_date_state_total = each_date_all_data.total
                const cf_tt = each_date_state_total.confirmed ? each_date_state_total.confirmed : 0
                const dth_tt = each_date_state_total.deceased ? each_date_state_total.deceased : 0
                const rc_tt = each_date_state_total.recovered ? each_date_state_total.recovered : 0
                const test_tt = each_date_state_total.tested ? each_date_state_total.tested : 0
                const ac_tt = cf_tt - dth_tt - rc_tt


                each_state_timeseries_data[st_cd]["dates"][each_date]["total"] = {

                    confirmed: cf_tt,
                    active: ac_tt,
                    recovered: rc_tt,
                    deceased: dth_tt,
                    tested: test_tt

                }

            }
            else {

                each_state_timeseries_data[st_cd]["dates"][each_date]["total"] = nodata
            }



            if (each_date_all_data.hasOwnProperty("districts")) {

                for (const each_district in each_date_all_data.districts) {
                    if (each_state_timeseries_data[each_district]) {
                        each_state_timeseries_data[each_district]["dates"][each_date] = { "total": {}, "delta": {} }

                        const each_district_data = each_date_all_data.districts[each_district]

                        if (each_district_data.total) {
                            const each_district_total = each_district_data.total
                            const cf_dst_tt = each_district_total.confirmed ? each_district_total.confirmed : 0
                            const rc_dst_tt = each_district_total.recovered ? each_district_total.recovered : 0
                            const dth_dst_tt = each_district_total.deceased ? each_district_total.deceased : 0
                            const test_dst_tt = each_district_total.tested ? each_district_total.tested : 0
                            const ac_dst_tt = cf_dst_tt - rc_dst_tt - dth_dst_tt
                            each_state_timeseries_data[each_district]["dates"][each_date]['total'] = {
                                confirmed: cf_dst_tt,
                                active: ac_dst_tt,
                                recovered: rc_dst_tt,
                                deceased: dth_dst_tt,
                                tested: test_dst_tt
                            }
                        }
                        else {

                            each_state_timeseries_data[each_district]["dates"][each_date]['total'] = nodata
                        }
                        if (each_district_data.delta) {
                            const each_district_delta = each_district_data.delta
                            const cf_dst_delta = each_district_delta.confirmed ? each_district_delta.confirmed : 0
                            const rc_dst_delta = each_district_delta.recovered ? each_district_delta.recovered : 0
                            const dth_dst_delta = each_district_delta.deceased ? each_district_delta.deceased : 0
                            const test_dst_delta = each_district_delta.tested ? each_district_delta.tested : 0
                            const ac_dst_delta = cf_dst_delta - rc_dst_delta - dth_dst_delta
                            each_state_timeseries_data[each_district]["dates"][each_date]['delta'] = {
                                confirmed: cf_dst_delta,
                                active: ac_dst_delta,
                                recovered: rc_dst_delta,
                                deceased: dth_dst_delta,
                                tested: test_dst_delta
                            }

                        }
                        else {
                            each_state_timeseries_data[each_district]["dates"][each_date]['delta'] = nodata
                        }


                    }
                }


            }
        }

    }

    return each_state_timeseries_data


}