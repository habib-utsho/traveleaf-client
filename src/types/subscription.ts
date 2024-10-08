import { TPackage } from "./package";
import { TTraveler } from "./user";

export interface TSubscription {
  _id: string;
  user: TTraveler;
  package: TPackage;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
