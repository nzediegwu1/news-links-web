import { createLink, signup, login, updateLink } from './mutations';
import { getFeed } from './queries';

export const CREATE_LINK = createLink;
export const FEED_QUERY = getFeed;
export const SIGNUP = signup;
export const LOGIN = login;
export const UPDATE_LINK = updateLink;
