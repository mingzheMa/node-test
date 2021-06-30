const Jimp = require("jimp");

module.exports = async (
  originPath,
  watermarkPath,
  targetPath,
  proportion = 0.8
) => {
  // 获取原图和水印图片
  let [origin, watermark] = await Promise.all([
    Jimp.read(originPath),
    Jimp.read(watermarkPath)
  ]);

  // 水印图片缩放
  if (origin.bitmap.width > origin.bitmap.hieght) {
    watermark.resize(origin.bitmap.width * proportion, Jimp.AUTO);
  } else {
    watermark.resize(Jimp.AUTO, origin.bitmap.height * proportion);
  }

  // 获取水印居中坐标
  const x = (origin.bitmap.width - watermark.bitmap.width) / 2;
  const y = (origin.bitmap.height - watermark.bitmap.height) / 2;

  // 混入水印
  const target = origin.composite(watermark, x, y, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacitySource: 0.5,
    opacityDest: 1
  });

  // 写入处理后图片
  await target.writeAsync(targetPath);
};
