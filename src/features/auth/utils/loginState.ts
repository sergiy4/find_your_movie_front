export function setLoginState(value: boolean) {
  localStorage.setItem('FYM_login', JSON.stringify(value));
}

export function getLoginState() {
  // Get flag from local storage
  const adminPanelLogin = localStorage.getItem('FYM_login');
  console.log(adminPanelLogin);
  // If the flag exists, then we return true, if not, false
  const loginState = adminPanelLogin ? JSON.parse(adminPanelLogin) : false;
  return loginState;
}
