export function checkLoginCookie(req) {
  if (typeof window !== 'undefined') {
    // Client-side
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'isLoggedIn' && value === 'true') {
        return true
      }
    }
    return false;
  }
}