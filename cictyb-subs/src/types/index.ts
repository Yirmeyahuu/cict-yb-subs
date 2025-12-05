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
  trackingNumbers?: number[];
  solicitationAcquired: number | string;
  solicitationReturned: number | string;
  subscriptionStatus: string;
}