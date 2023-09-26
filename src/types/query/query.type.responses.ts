export interface responses<parameter>{
    succes:boolean,
    message:string
    data?:parameter[],
}
export interface errorResponses{
    succes:false,
    error:string,
    errors:any[]
}