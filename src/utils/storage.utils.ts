export function getAccessTokenFromPersist(): string | null {
  try {
    const persistRoot = localStorage.getItem('persist:root');
    if (!persistRoot) return null;

    const rootObj = JSON.parse(persistRoot);
    const authString = rootObj.auth;
    if (!authString) return null;

    const auth = JSON.parse(authString);
    return auth.token?.accessToken || null;
  } catch (e) {
    console.error('Error parsing persisted token:', e);
    return null;
  }
}
