import Router from 'next/router';

export function redirect(isServer, res, route) {
  if (isServer && res) {
    res.writeHead(302, {
      Location: route,
    });
    res.end();
    res.finished = true;
  } else {
    Router.replace(route);
  }
}
