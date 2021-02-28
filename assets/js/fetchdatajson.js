const months = {
    'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5, 'July': 6,
    'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
}

export async function fetchdatajson() {
    //const res = await fetch("../apidata/data.json");
    //const res = await fetch("https://raw.githubusercontent.com/Viren-Gajera/india-topojson/main/apidata/data.json");
    const res = await fetch("https://api.covid19india.org/data.json");
    const resjson = await res.json()
    
    const l = resjson.cases_time_series.length;
    const casetimeseries = resjson.cases_time_series;
    const india_tt_cf = new Array();
    const india_tt_ac = new Array();
    const india_tt_rc = new Array();
    const india_tt_dth = new Array();
    const india_daily_cf = new Array();
    const india_daily_ac = new Array();
    const india_daily_rc = new Array();
    const india_daily_dth = new Array();
    const oldformatedate = new Array();
    const newdate = new Array();
    casetimeseries.forEach(element => {
        /* Total  Data */
        const cf = element.totalconfirmed ? Number(element.totalconfirmed) : 0
        const dth = element.totaldeceased ? Number(element.totaldeceased) : 0
        const rc = element.totalrecovered ? Number(element.totalrecovered) : 0
        const ac = Number(cf - dth - rc)
        india_tt_cf.push(cf)
        india_tt_ac.push(ac)
        india_tt_rc.push(rc)
        india_tt_dth.push(dth)

        /* Daily Data */
        const dcf = element.dailyconfirmed ? Number(element.dailyconfirmed) : 0
        const ddth = element.dailydeceased ? Number(element.dailydeceased) : 0
        const drc = element.dailyrecovered ? Number(element.dailyrecovered) : 0
        const dac = Number(dcf - ddth - drc)
        india_daily_cf.push(dcf)
        india_daily_ac.push(dac)
        india_daily_rc.push(drc)
        india_daily_dth.push(ddth)

        /* Dates  */
      /*  let iterator = element.date
        let b = iterator.trim();
        let c = b.split(" ")
        let dt = parseInt(c[0])
        let mth = parseInt(months[c[1]])
        let olddt = new Date(`2020-${mth + 1}-${dt}`)
        oldformatedate.push(olddt);
        newdate.push(olddt.toISOString())*/
    });



    return {
        /*dates:{
                format1:oldformatedate,
                isoformat:newdate
        },*/
        latest: {
            latest_tt_cf: india_tt_cf[l - 1],
            latest_tt_ac: india_tt_ac[l - 1],
            latest_tt_rc: india_tt_rc[l - 1],
            latest_tt_dth:india_tt_dth[l - 1],
            latest_dly_cf: india_daily_cf[l - 1],
            latest_dly_ac: india_daily_ac[l - 1],
            latest_dly_rc: india_daily_rc[l - 1],
            latest_dly_dth:india_daily_dth[l - 1]
        },
        cummulative:{
            cf:india_tt_cf,
            ac:india_tt_ac,
            rc:india_tt_rc,
            dth:india_tt_dth
        },
        daily:{
            cf:india_daily_cf,
            ac:india_daily_ac,
            rc:india_daily_rc,
            dth:india_daily_dth
        },
        statewise:resjson.statewise

    }


}
