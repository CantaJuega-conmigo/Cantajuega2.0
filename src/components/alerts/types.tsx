import { MouseEventHandler } from "react"

export enum MiscursosAlerts{
  Default='Default',
  Alert1='Alert1',
}
export enum MembresiasAlerts{
  Alert1='Alert1',
  Alert2='Alert2',
  Alert3='Alert3'
}
export enum PagosAlerts{
  SALDOINSUFICIENTE='SALDOINSUFICIENTE',
  ERRORDEPAGO='ERRORDEPAGO',
  ERROR3='ERROR3'
}
export enum CuestionarioAlerts{
  Confirm='Confirm'
}
export enum AdminAlerts{
  Confirm='Confirm',

}

export interface Alertsprops{
    Personalizado?:{
        text1?:string,
        text2?:string,
        CancelText?:string,
        AcceptTText?:string,
    },
    Miscursos?:MiscursosAlerts,
    Membresias?:MembresiasAlerts,
    Pagos?:PagosAlerts,
    Cuestionario?:CuestionarioAlerts,
    close:MouseEventHandler<HTMLButtonElement>,
    onClick?:MouseEventHandler<HTMLButtonElement>,
    Admin?:AdminAlerts
  }

export interface alertsState{
    alert1?:boolean,
    alert2?:boolean,
    alert3?:boolean,
    alert4?:boolean,
    alert5?:boolean,
    text1?:string,
    text2?:string,
    CancelText?:string,
    AcceptTText?:string,
}
