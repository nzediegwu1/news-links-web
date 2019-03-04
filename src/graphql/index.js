import { createLink, signup, login } from './mutations';
import { getFeed } from './queries';

export const CREATE_LINK = createLink;
export const FEED_QUERY = getFeed;
export const SIGNUP = signup;
export const LOGIN = login;
