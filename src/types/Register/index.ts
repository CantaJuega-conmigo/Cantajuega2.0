export interface registerBody {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  child?: {
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: string;
  };
}
