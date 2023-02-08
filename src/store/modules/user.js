import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router/index";
import { constantRoutes } from "@/router";
import adminRoutes from "@/router/adminRoutes";
import { superRoutes } from "@/router/superRoutes";
import store from "..";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    role: "",
    avatar: "",
    username: "",
    password: "",
    userInfo: null,
    addRouters: null,
    routers: null,
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_ROLE: (state, role) => {
    state.role = role;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  SET_ROUTERS: (state, routers) => {
    state.addRouters = routers;
    state.routers = constantRoutes.concat(routers);
  },
};
import md5 from "js-md5";

const actions = {
  // user login
  login({ commit }, userInfo) {
    
    
    const username = userInfo.username;
    const password = ""+md5(userInfo.password);
    commit("SET_USERINFO", {username: username.trim(),password: password,});
    
    
    return new Promise((resolve, reject) => {
      
      
      login({
        username: username.trim(),
        password: password,
      })
        .then((response) => {
          
          const data = response.result;
          

          store.dispatch("user/addrouter", data.role);

          commit("SET_TOKEN", data.token);
          commit("SET_ROLE", data.role);

          setToken(data.token);

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  addrouter({ commit }, role) {
    if (role === "1") {
      commit("SET_ROUTERS", superRoutes);
      // router.options.push(constantRoutes.concat(adminRoutes))
      // sessionStorage.setItem('superRoutes', JSON.stringify(superRoutes));
      // sessionStorage.setItem('routers', JSON.stringify(constantRoutes.concat(superRoutes)));
    } else if (role === "2") {
      // sessionStorage.setItem('adminRoutes', JSON.stringify(adminRoutes));
      // sessionStorage.setItem('routers', JSON.stringify(constantRoutes.concat(superRoutes)));
      commit("SET_ROUTERS", adminRoutes);
    }
  },

  // get user info
  getInFo({ commit}, info) {
    return new Promise((resolve, reject) => {
      getInfo(info)
        .then((response) => {
          const data = response.result;

          commit("SET_NAME", data.username);
          commit(
            "SET_AVATAR",
            "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
          );
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
