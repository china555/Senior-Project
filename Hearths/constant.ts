import Cookies from "js-cookie";
// export const url = "http://192.168.252.145:3030";
// export const url = "https://159.223.47.213:3030";
// export const url = "http://localhost:3030";

export const url = "https://tptbackend.chinaapanda.com";

export const client_id =
  "C86e873336f979e7423c672022bee54e438de4984d4805b29ad711456b9222f7d";

export const client_secret =
  "144bc76e3a737bae645b7f60fa4f603b7c09f1646105672fa40fd6980a09d15d";

export const headers = {
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
};
