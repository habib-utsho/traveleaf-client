import { TPost } from "./post"
import { TTraveler } from "./user"

export type TCreateComment = {
    _id?: string
    user: string
    post: string
    comment: string
    createdAt?: string;
    updatedAt?: string;
  }
export type TComment = {
    _id: string
    user: TTraveler
    post: TPost
    comment: string
    createdAt?: string;
    updatedAt?: string;
  }