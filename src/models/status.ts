import { IUser } from './user';

export interface IStatus {
    created_at: string,
    id: number,
    id_str: string,
    text: string,
    user: IUser,
    geo: string,
    retweet_count: number,
    favorite_count: number,
    favorited: boolean,
    retweeted: boolean,
    possibly_sensitive: boolean,
    lang: string
}