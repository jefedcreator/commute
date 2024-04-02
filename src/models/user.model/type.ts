export enum Gender {
  male = 'male',
  female = 'female',
}

export enum UserType {
  user = 'user',
  rider = 'rider',
}

export interface IUser {
  email: string;
  firstname: string;
  lastname: string;
  gender: Gender;
  phone: string;
  avatar: string;
  dob: string;
  campus: string;
  walletInfo: {
    currentAmount: number;
  };
  role: UserType;
  totalPayments: number;
  totalRides: number;
}
