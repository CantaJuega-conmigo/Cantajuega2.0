export interface responses<parameter> {
  succes: boolean;
  message?: string;
  data?: parameter[];
}
export interface errorResponses {
  succes: false;
  message: string;
  error: string;
  errors?: any[];
}
