import { TCategory } from "./category";
import { TAdmin, TTraveler } from "./user";

export type TPost = {
  _id: string;
  title: string;
  banner: string;
  content: string;
  author: TTraveler | TAdmin;
  authorType: string;
  category: TCategory;
  isPremium: boolean;
  upvotes: number;
  downvotes: number;
  upvotedBy: TTraveler[] | TAdmin[];
  downvotedBy: TTraveler[] | TAdmin[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
