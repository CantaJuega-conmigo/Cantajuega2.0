export interface Membership {
  id: string;
  name: string;
  text1: string;
  text2: string;
  text3: string;
  description: string;
  price: number;
  duration: number;
  therapeuticTools: boolean;
  music: boolean;
  videos: boolean;
  recurrenteId: string;
  status: string;
  checkout: string;
  Users: [];
}
