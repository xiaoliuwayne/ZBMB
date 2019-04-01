/**
 * @Project: ZBMB
 * @FileName: common
 * @Author: wayne
 * @Date: 2019/3/27
 */

// /**
//  *删除数组指定下标或指定对象
//  */
// Array.prototype.remove = function (obj) {
//   for (var i = 0; i < this.length; i++) {
//     var temp = this[i]
//     if (!isNaN(obj)) {
//       temp = i
//     }
//     if (temp === obj) {
//       for (var j = i; j < this.length; j++) {
//         this[j] = this[j + 1]
//       }
//       this.length = this.length - 1
//     }
//   }
// }
var CUSTOMIZE = {0: '不接受定制', 1: '接受定制'}
var TYPE = {1: '色卡', 2: '剪版'}
var STATUS = {0: '待接单', 1: '已接单'}
var SPOTSTATUS = {0: '有现货', 1: '无现货'}
var FEEDBACK_SPOTSTATUS = {'0': '现货', '1': '定制'}
var CLOTHSTYLE = {1: '针织', 2: '梭织'}
// var formatDate = function (timestamp) {
function formatDate (timestamp) {
  let date = new Date(timestamp)
  let year = date.getFullYear()
  let month = date.getMonth() + 1 // 月份是从0开始的
  let day = date.getDate()
  let hour = date.getHours()
  let min = date.getMinutes()
  // let sec = date.getSeconds()
  let newTime = year + '-' + month + '-' + day + ' ' + hour + ':' + min
  return newTime
}

export {CUSTOMIZE, TYPE, formatDate, STATUS, SPOTSTATUS, CLOTHSTYLE, FEEDBACK_SPOTSTATUS}
