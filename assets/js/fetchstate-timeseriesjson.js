export async function state_timeseries(st_code_dropdown){
    // const res =await fetch('../apidata/state-timeseries.json')
    //const res =await fetch('https://raw.githubusercontent.com/Viren-Gajera/india-topojson/main/apidata/state-timeseries.json')
    const res =await fetch('https://data.covid19india.org/v4/timeseries.json')
    const resjson=await res.json()

    const nodata={confirmed:0,active:0,recovered:0,deceased:0,tested:0}
   
        
            for (const eachdate in resjson[st_code_dropdown].dates)
            {
                const each_state_series=resjson[st_code_dropdown].dates[eachdate]
                if(each_state_series.delta)
                {
                    const each_delta_data=each_state_series.delta

                    const delta_cf=each_delta_data.confirmed ? each_delta_data.confirmed : 0
                    const delta_rc=each_delta_data.recovered ? each_delta_data.recovered : 0
                    const delta_dth=each_delta_data.deceased ? each_delta_data.deceased : 0
                    const delta_test=each_delta_data.tested ? each_delta_data.tested : 0

                    const delta_ac = delta_cf - delta_rc - delta_dth

                    each_delta_data['confirmed']=delta_cf
                    each_delta_data['active']=delta_ac
                    each_delta_data['recovered']=delta_rc
                    each_delta_data['deceased']=delta_dth
                    each_delta_data['tested']=delta_test
                    

                }
                else{
                    each_state_series['delta']=nodata

                }

                if(each_state_series.total)
                {

                    const each_tt_data=each_state_series.total
                    const tt_cf=each_tt_data.confirmed ? each_tt_data.confirmed : 0
                    const tt_rc=each_tt_data.recovered ? each_tt_data.recovered : 0
                    const tt_dth=each_tt_data.deceased ? each_tt_data.deceased : 0
                    const tt_test=each_tt_data.tested ? each_tt_data.tested : 0

                    const tt_ac = tt_cf - tt_rc - tt_dth

                    each_tt_data['confirmed']=tt_cf
                    each_tt_data['active']=tt_ac
                    each_tt_data['recovered']=tt_rc
                    each_tt_data['deceased']=tt_dth
                    each_tt_data['tested']=tt_test
                }
                else{
                    each_state_series['total']=nodata

                }
            }
          
        
        
    return resjson[st_code_dropdown]
}