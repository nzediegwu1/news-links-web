import { createLink, signup, login, updateLink, deleteLink } from './mutations';
import { getFeed } from './queries';

export const CREATE_LINK = createLink;
export const FEED_QUERY = getFeed;
export const SIGNUP = signup;
export const LOGIN = login;
export const UPDATE_LINK = updateLink;
export const DELETE_LINK = deleteLink;
