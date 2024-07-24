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
  blocked: boolean;
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
  fileUrl: string;
  status: string;
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

export interface ICreateSubscription {
  customerId: string;
  subscriptionType: string;
  priceId: string;
}

export interface IResponse {
  success: boolean;
  message?: string;
}

export interface ILoginResponse extends IResponse {
  data?: {
    token: string;
    user: IUser;
  },
}

export interface ISubscriptionResponse extends IResponse {
  data: {
    subscriptionId: string;
    clientSecret?: string;
  }
}

export interface ISignupResponse extends IResponse {
  data?: IUser,
}

export enum EStripeCheckoutMode {
  PAYMENT = 'payment',
  SUBSCRIPTION = 'subscription',
  SETUP = 'setup',
}

export interface IDetectionRequest {
  data: string,
  fileFormat: string;
  sendEmail: boolean;
}
