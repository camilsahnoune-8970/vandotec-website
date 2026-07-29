export function isAuthenticated(cookies: Astro.Cookies): boolean {
  const session = cookies.get('admin_session');
  if (!session) return false;
  return session.value === '1';
}

export function setSessionCookie(cookies: Astro.Cookies) {
  cookies.set('admin_session', '1', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: Astro.url.protocol === 'https:'
  });
}

export function clearSessionCookie(cookies: Astro.Cookies) {
  cookies.delete('admin_session', { path: '/' });
}
