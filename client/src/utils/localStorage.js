export const SetAccessToken = function (code) {
  if (code) {
    localStorage.setItem("access_token", JSON.stringify(code));
  } else {
    localStorage.setItem("access_token", null);
  }
};
