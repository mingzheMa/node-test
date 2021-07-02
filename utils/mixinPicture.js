const Jimp = require("jimp");

module.exports = async (
  originPath,
  mixinPath,
  targetPath,
  xPosition,
  yPosition,
  proportion = 0.8,
  opacitySource = 0.5,
) => {
  // 获取原图和混入图片
  let [origin, mixin] = await Promise.all([
    Jimp.read(originPath),
    Jimp.read(mixinPath)
  ]);

  // 混入图片缩放
  if (origin.bitmap.width > origin.bitmap.hieght) {
    mixin.resize(origin.bitmap.width * proportion, Jimp.AUTO);
  } else {
    mixin.resize(Jimp.AUTO, origin.bitmap.height * proportion);
  }

  // 获取混入居中坐标
  const x = xPosition || (origin.bitmap.width - mixin.bitmap.width) / 2;
  const y = yPosition || (origin.bitmap.height - mixin.bitmap.height) / 2;

  // 混入混入
  const target = origin.composite(mixin, x, y, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacitySource,
    opacityDest: 1
  });

  // 写入处理后图片
  await target.writeAsync(targetPath);
};
