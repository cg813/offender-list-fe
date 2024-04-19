export enum EUserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export enum EFrequencyForPlan {
  MONTH = 'month',
  YEAR = 'year'
}

export interface IPrice {
  id: string;
  unit_amount: number;
  product: string;
  recurring: Record<string, any>;
}

export interface IPlan {
  id: string;
  name: string;
  price: number;
  requests: number;
  frequency: EFrequencyForPlan;
  prices: IPrice[]
}

export interface IPlanCreateDto {
  name: string;
  price: number;
  requests: number;
  frequency: EFrequencyForPlan
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company: string;
  role: EUserRole;
  plan: string;
  availableRequests: number;
  initializedAt: number;
  token?: string;
  emailVerification: boolean;
  paymentStatus: boolean;
  customerId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IUserCreateDao {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company?: string;
  role: EUserRole;
}

export interface IOffender {
  uuid: string;
  id: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  address: string;
  zip_code: string;
  other_addresses: string;
  state: string;
  gender: string;
  race: string;
  dob: string;
  height: string;
  eye_color: string;
  hair_color: string;
  weight: string;
  image: string;
  offense_details: string;
  level: null | string;
  url: null | string;
  scars_tattoos: string;
  aliases: string;
  age: number;
  lat: string;
  long: string;
  is_predator: boolean;
  is_absconder: boolean;
  photo_url: string;
  tstamp: string;
  archived: boolean;
}

export interface IEmailData {
  to: string;
  subject: string;
  text: string;
}

export interface IActivity {
  _id: string;
  userId: string;
  processed: number;
  createdAt: string;
  updatedAt: string;
}

export interface IActivityCreateDto {
  userId: string;
  processed: number;
}

export interface PaginationData {
  list: any[];
  total: number;
}

export interface ILoginResponse {
  success: boolean,
  data?: {
    token: string;
    user: IUser;
  },
  message?: string,
}

export interface ICreateSubscription {
  customerId: string;
  subscriptionType: string;
  priceId: string;
}

export interface ISubscriptionResponse {
  success: boolean;
  message?: string;
  data: {
    subscriptionId: string;
    clientSecret?: string;
  }
}

export interface ISignupResponse {
  success: boolean,
  data?: IUser,
  message?: string,
}
