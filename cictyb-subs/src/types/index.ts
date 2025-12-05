export interface Subscriber {
  id: string;
  name: string;
  course: string;
  yearLevel: string;
}

export interface Solicit {
  id: string;
  name: string;
  course: string;
  solicitationAcquired: number;
  solicitationReturned: number;
  subscriptionStatus: string;
}