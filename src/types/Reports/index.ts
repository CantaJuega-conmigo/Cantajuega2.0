export interface IReport {
  id: string;
  Description: string;
  is_Resolved: boolean;
  Response: null | string;
  createdAt: Date;
  updatedAt: Date;
  UserId: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number | null;
  email_verified: null;
  password: string;
  image: null | string;
  deleted: boolean;
  is_Admin: boolean;
  recurrenteId: null;
  OTPcode: null;
  Otp_Code_Email: string;
  createdAt: Date;
  updatedAt: Date;
  MembershipId: string;
  Reports: Report[];
}
