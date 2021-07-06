const socketIO = require("socket.io");
const { v4 } = require("uuid");

const error = require("../../utils/error");

// 房间内用户
const roomUsers = {};

// 发送所有用户事件
function usersEmit(socket, roomUsers) {
  socket.emit(
    "users",
    Object.values(roomUsers).map(u => ({
      info: u.info,
      login_date: u.login_date
    }))
  );
}

// 发送消息
function msgEmit(
  socket,
  msgData = {
    id: v4(), // 消息id
    from: null, // 消息来源（用户信息{}）
    to: null, // 消息目标（用户信息{}）
    content: null, // 消息内容
    isNotice: true,
    isLog: false // 是否为消息日志（预留）
  }
) {
  socket.emit("msg", msgData);
}

module.exports = function (http) {
  const io = socketIO(http);

  // 监听连接
  function connectionFunc(socket) {
    // 进入用户保存信息和socket实例
    socket.on("userin", data => {
      // 判断如果房间存在用户，则报错异地登录
      if (roomUsers[data.id]) {
        roomUsers[data.id].socket.emit("userin", error[6001]);
      } else {
        socket.emit("userin", {
          code: 200,
          message: "进入聊天室成功"
        });
      }

      // 向房间添加用户
      roomUsers[data.id] = {
        info: data,
        login_date: Date.now(),
        socket
      };

      // 发送房间用户列表 io.sockets表示默认作用域（所有人）
      usersEmit(io.sockets, roomUsers);

      // 发送用户进入房间通知，socket.broadcast表示广播（除自己之外的）
      msgEmit(socket.broadcast, {
        id: v4(),
        from: data,
        to: null,
        content: `${data.user_name} entering a room`,
        isNotice: true,
        isLog: false
      });
    });

    // 用户退出
    socket.on("userout", data => {
      delete roomUsers[data.id];

      // 发送房间用户列表
      usersEmit(io.sockets, roomUsers);

      // 发送用户退出房间通知
      msgEmit(socket.broadcast, {
        id: v4(),
        from: data,
        to: null,
        content: `${data.user_name} exit the room`,
        isNotice: true,
        isLog: false
      });
    });

    // 用户推送消息
    socket.on("msg", data => {
      // 用户发送消息通知所有人
      msgEmit(io.sockets, {
        id: v4(),
        from: data.from,
        to: null,
        content: data.content,
        isNotice: false,
        isLog: false
      });
    });
  }

  io.on("connection", connectionFunc);
};
