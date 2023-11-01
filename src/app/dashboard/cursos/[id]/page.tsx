export default function page({params}:{params:{id:string}}){
   
    return(
     <>
     <h1>La idea es que aqui se vea toda la info sobre un curso, mas detallada.</h1>
     <h1>Info del curso {params.id}</h1>
     </>
    )
 }