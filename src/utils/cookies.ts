import Cookies from 'js-cookie';

/**
 * Cookie utility functions for managing browser cookies
 * Used for storing authentication tokens securely
 */

const COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  expires: 7, // 7 days
};

export const cookieUtils = {
  /**
   * Set a cookie with the given name and value
   */
  setCookie: (name: string, value: string, options = {}) => {
    Cookies.set(name, value, { ...COOKIE_OPTIONS, ...options });
  },

  /**
   * Get a cookie value by name
   */
  getCookie: (name: string): string | undefined => {
    return Cookies.get(name);
  },

  /**
   * Remove a cookie by name
   */
  removeCookie: (name: string) => {
    Cookies.remove(name);
  },

  /**
   * Remove all authentication cookies
   */
  removeAuthCookies: () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  },
};
