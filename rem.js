// 1倍根字体大小(默认)
const baseSize = 14
// 设计图的基准宽度
const baseScreenWidth = 375
const setRem = () => {
  // 实际宽度与设计宽度的占比
  const scale = document.documentElement.clientWidth / baseScreenWidth
  // 宽度比如果超出设计图的两倍,按照两倍进行对根字体设置。
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
setRem()
// 页面大小变化,进行刷新
window.addEventListener('resize', setRem)
