/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
// import { getList } from "@/api/users";
// export function validUsername(str) {
//  var username_map=null
//   getList()
//     .then((response) => {
//       const username_map = response.result.map((item, index) => {
//         return item.username;
//       });
//       console.log(
//         "username_map",
//         username_map.some((item) => JSON.stringify(item) == JSON.stringify(str))
//       );

//     })
//     .catch((error) => {
//       console.log(error)
//     });
//     console.log(username_map)
//  return
// //  return username_map.some( (item) => JSON.stringify(item) == JSON.stringify(str))

// }
export function validUsername(str) {
  const valid_map = ["admin", "editor"];
  
  return valid_map.indexOf(str.trim()) >= 0;
}
export function validPassword(str) {
  const passwordText=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,10}/g
  return passwordText.test(str)
}
