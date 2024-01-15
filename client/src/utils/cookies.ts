import Cookies from "js-cookie";

export const cookies = {
  setCookie(name: string, value: any, options?: Cookies.CookieAttributes) {
    Cookies.set(name, JSON.stringify(value), options);
  },

  getCookie(name: string) {
    const cookie = Cookies.get(name)!;

    if (cookie) {
      return JSON.parse(Cookies.get(name)!);
    }

    return undefined;
  },

  removeCookie(name: string) {
    Cookies.remove(name);
  },
};
