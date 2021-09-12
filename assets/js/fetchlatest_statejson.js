const codetostate2 = {
AN:"Andaman and Nicobar Islands",
AP:"Andhra Pradesh",
AR:"Arunachal Pradesh",
AS:"Assam",
BR:"Bihar",
CH:"Chandigarh",
CT:"Chhattisgarh",
DL:"Delhi",
DN:"Dadra and Nagar Haveli and Daman and Diu",
GA:"Goa",
GJ:"Gujarat",
HP:"Himachal Pradesh",
HR:"Haryana",
JH:"Jharkhand",
JK:"Jammu and Kashmir",
KA:"Karnataka",
KL:"Kerala",
LA:"Ladakh",
LD:"Lakshadweep",
MH:"Maharashtra",
ML:"Meghalaya",
MN:"Manipur",
MP:"Madhya Pradesh",
MZ:"Mizoram",
NL:"Nagaland",
OR:"Odisha",
PB:"Punjab",
PY:"Puducherry",
RJ:"Rajasthan",
SK:"Sikkim",
TG:"Telangana",
TN:"Tamil Nadu",
TR:"Tripura",
UP:"Uttar Pradesh",
UT:"Uttarakhand",
WB:"West Bengal",
TT:"India"

}
const codetostate3={TT:"Total",MH:"Maharashtra",TN:"Tamil Nadu",AP:"Andhra Pradesh",KA:"Karnataka",DL:"Delhi",UP:"Uttar Pradesh",WB:"West Bengal",BR:"Bihar",TG:"Telangana",GJ:"Gujarat",AS:"Assam",RJ:"Rajasthan",OR:"Odisha",HR:"Haryana",MP:"Madhya Pradesh",KL:"Kerala",PB:"Punjab",JK:"Jammu and Kashmir",JH:"Jharkhand",CT:"Chhattisgarh",UT:"Uttarakhand",GA:"Goa",TR:"Tripura",PY:"Puducherry",MN:"Manipur",HP:"Himachal Pradesh",NL:"Nagaland",AR:"Arunachal Pradesh",AN:"Andaman and Nicobar Islands",
LA:"Ladakh",CH:"Chandigarh",DN:"Dadra and Nagar Haveli and Daman and Diu",ML:"Meghalaya",SK:"Sikkim",MZ:"Mizoram",UN:"State Unassigned",LD:"Lakshadweep",UN:"State Unassigned"}


const codetostate4={TT:"Total",
MH:"Maharashtra",
TN:"Tamil Nadu",
AP:"Andhra Pradesh",
KA:"Karnataka",
DL:"Delhi",
UP:"Uttar Pradesh",
WB:"West Bengal",
BR:"Bihar",
TG:"Telangana",
GJ:"Gujarat",
AS:"Assam",
RJ:"Rajasthan",
OR:"Odisha",
HR:"Haryana",
MP:"Madhya Pradesh",
KL:"Kerala",
PB:"Punjab",
JK:"Jammu and Kashmir",
JH:"Jharkhand",
CT:"Chhattisgarh",
UT:"Uttarakhand",
GA:"Goa",
TR:"Tripura",
PY:"Puducherry",
MN:"Manipur",
HP:"Himachal Pradesh",
NL:"Nagaland",
AR:"Arunachal Pradesh",
AN:"Andaman and Nicobar Islands",
LA:"Ladakh",
CH:"Chandigarh",
DN:"Dadra and Nagar Haveli and Daman and Diu",
ML:"Meghalaya",
SK:"Sikkim",
MZ:"Mizoram",
UN:"State Unassigned",
LD:"Lakshadweep",
UN:"State Unassigned"
}
export const statenametostatecode={"Total":"TT","Maharashtra":"MH","Tamil Nadu":"TN","Andhra Pradesh":"AP","Karnataka":"KA","Delhi":"DL","Uttar Pradesh":"UP","West Bengal":"WB","Bihar":"BR","Telangana":"TG","Gujarat":"GJ","Assam":"AS","Rajasthan":"RJ","Odisha":"OR","Haryana":"HR","Madhya Pradesh":"MP","Kerala":"KL","Punjab":"PB","Jammu and Kashmir":"JK","Jharkhand":"JH","Chhattisgarh":"CT","Uttarakhand":"UT","Goa":"GA","Tripura":"TR","Puducherry":"PY","Manipur":"MN","Himachal Pradesh":"HP","Nagaland":"NL","Arunachal Pradesh":"AR","Andaman and Nicobar Islands":"AN","Ladakh":"LA","Chandigarh":"CH","Dadra and Nagar Haveli and Daman and Diu":"DN","Meghalaya":"ML","Sikkim":"SK","Mizoram":"MZ","State Unassigned":"UN","Lakshadweep":"LD"}

//let codetostate = { "JK": "Jammu and Kashmir", "HP": "Himachal Pradesh", "PB": "Punjab", "CH": "Chandigarh", "UK": "Uttarakhand", "HR": "Haryana", "DL": "Delhi", "RJ": "Rajasthan", "UP": "Uttar Pradesh", "BR": "Bihar", "SK": "Sikkim", "AR": "Arunachal Pradesh", "NL": "Nagaland", "MN": "Manipur", "MZ": "Mizoram", "TR": "Tripura", "ML": "Meghalaya", "AS": "Assam", "WB": "West Bengal", "JH": "Jharkhand", "OD": "Odisha", "CG": "Chattisgarh", "MP": "Madhya Pradesh", "GJ": "Gujarat", "DD": "Daman and Diu", "DN": "Dadra and Nagar Haveli and Daman and Diu", "MH": "Maharashtra", "KA": "Karnataka", "GA": "Goa", "LD": "Lakshadweep Islands", "KL": "Kerala", "TN": "Tamil Nadu", "PY": "Pondicherry", "AN": "Andaman and Nicobar Islands", "TS": "Telangana", "AD": "Andhra Pradesh", "LA": "Ladakh", "OT": "Other Territory" }

export async function lateststatefetch() {
    //const res = await fetch("../apidata/latest_state.json")
    //const res = await fetch("https://raw.githubusercontent.com/Viren-Gajera/india-topojson/main/apidata/latest_state.json")
    const res = await fetch("https://data.covid19india.org/v4/data.json")
    const resjson = await res.json()
    return resjson

}
export function statetocodename(statename){
    return statenametostatecode[statename]
}


/*
const statenametostatecode={
    "Jammu nd Kir":["JK",01],
    "Himachal Pradesh":["HP",02],
    "Punjab":["PB",03],
    "Chandigarh":["CH",04],
    "Uttarakhand":["UK",05],
    "Haryana":["HR",06],
    "Delhi":["DL",07],
    "Rajasthan":["RJ",08],
    "Uttar Pradesh":["UP",09],
    "Bihar":["BR",10],
    "Sikkim":["SK",11],
    "Arunachal Pradesh":["AR",12],
    "Nagaland":["NL",13],
    "Manipur":["MN",14],
    "Mizoram":["MZ",15],
    "Tripura":["TR",16],
    "Meghalaya":["ML",17],
    "Assam":["AS",18],
    "West Bengal":["WB",19],
    "Jharkhand":["JH",20],
    "Odisha":["OD",21],
    "Chattisgarh":["CG",22],
    "Madhya Pradesh":["MP",23],
    "Gujarat":["GJ",24],
    "Daman and Diu":["DD",25],
    "Dadra and Nagar Haveli":["DN",26],
    "Dadra and Nagar Haveli and Daman and Diu":["DN",26],
    "Maharashtra":["MH",27],
    "Karnataka":["KA",29],
    "Goa":["GA",30],
    "Lakshadweep Islands":["LD",31],
    "Kerala":["KL",32],
    "Tamil Nadu":["TN",33],
    "Puducherry":["PY",34],
    "Pondicherry":["PY",34],
    "Andaman and Nicobar Islands":["AN",35],
    "Telangana":["TS",36],
    "Andhra Pradesh":["AD",37],
    "Ladakh":["LA",38],
    "Other Territory":["OT",97]

}
 */