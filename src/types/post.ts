import { TCategory } from "./category";
import { TAdmin, TTraveler } from "./user";

export type TPost = {
  _id: string;
  title: string;
  banner: string;
  content: string;
  author: TTraveler | TAdmin;
  authorType: "Traveler" | "Admin";
  category: TCategory;
  isPremium: boolean;
  votes: number;
  upvotedBy: TTraveler[] | TAdmin[];
  downvotedBy: TTraveler[] | TAdmin[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
