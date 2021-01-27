import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { users } from "./data/user";
let mock = new MockAdapter(axios);
mock.onPost("/login").reply(config => {
  let result = [200, { code: 400, message: "登陆失败" }];
  let resp = JSON.parse(config.data);
  //判断输入的用户密码是否匹配
  users.some(person => {
    if (resp.username == person.number && resp.password == person.password) {
      result = [
        200,
        { code: 200, message: "登陆成功", data: person },
        { Authorization: person.token }
      ];
    }
  });
  console.log(result);
  return result;
});
