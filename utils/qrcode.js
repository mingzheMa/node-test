const QRCode = require("qrcode");
const path = require("path");
const { v4 } = require("uuid");

exports.create = async payload => {
  return await QRCode.create(payload);
};

exports.toFile = async payload => {
  const saveName = `${v4()}.png`;
  const savePath = path.resolve(__dirname, "../public/qrcode", saveName);
  await QRCode.toFile(savePath, payload);

  return saveName;
};
