
export default defineStore("usr", function() {
  
  let authorization = $ref(uni.getStorageSync("authorization") || "");
  let usr_id = $ref(uni.getStorageSync("usr_id"));
  let username = $ref<string>(uni.getStorageSync("username"));
  let loginInfo = $ref(uni.getStorageSync("loginInfo"));
  
  function setAuthorization(authorization0: typeof authorization) {
    if (authorization !== authorization0) {
      authorization = authorization0;
      uni.setStorageSync("authorization", authorization0);
    }
  }
  
  function getAuthorization() {
    return authorization;
  }
  
  function setUsrId(usr_id0: typeof usr_id) {
    usr_id = usr_id0;
    uni.setStorageSync("usr_id", usr_id0);
  }
  
  function getUsrId() {
    return usr_id;
  }
  
  let showAuth = $ref(false);
  
  function setShowAuth(showAuth1: typeof showAuth) {
    showAuth = showAuth1;
  }
  
  function getShowAuth() {
    return showAuth;
  }
  
  let lang = $ref("");
  
  function setLang(lang0: typeof lang) {
    lang = lang0;
  }
  
  function getLang() {
    return lang;
  }
  
  function setLoginInfo(loginInfo0: typeof loginInfo) {
    loginInfo = loginInfo0;
    uni.setStorageSync("loginInfo", loginInfo0);
  }
  
  function getLoginInfo() {
    return loginInfo;
  }
  
  function setUsername(username0: typeof username) {
    username = username0;
    uni.setStorageSync("username", username0);
  }
  
  function getUsername() {
    return username;
  }
  
  return $$({
    getAuthorization,
    setAuthorization,
    getUsrId,
    setUsrId,
    getShowAuth,
    setShowAuth,
    getLang,
    setLang,
    getLoginInfo,
    setLoginInfo,
    getUsername,
    setUsername,
  });
});
