import Cookies from "js-cookie";

export const signout = () => {
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    Cookies.remove(cookieName);
  });
};
