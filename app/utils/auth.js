import Cookie from 'js-cookie';

export function hasToken() {
  return !!Cookie.get('token');
}

export function getToken() {
  return Cookie.get('token');
}
