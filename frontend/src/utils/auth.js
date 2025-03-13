export const BASE_URL = "https://tripleten-around-full.onrender.com";

export const signin = (email, password) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Content-Security-Policy": "default-src 'self' *.tripleten-service.com",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

export const signup = (email, password) => {
  return fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Content-Security-Policy": "default-src 'self' *.tripleten-service.com",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};
