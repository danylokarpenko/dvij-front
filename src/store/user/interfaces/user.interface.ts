export interface UserI {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  role: string;
  jobTitle?: string;
  birthDayDate?: Date;
  contacts?: string;
  payRate: number;
  nextPayRateIncrease?: number;
  password: string;
  updatedAt?: Date;
}
