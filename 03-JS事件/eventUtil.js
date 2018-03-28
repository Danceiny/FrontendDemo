/** DOM2级事件处理程序  浏览器兼容
 * IE-attachEvent()  detachEvent()
 * 其他-addEventListener()  removeEventListener()
 * EventUtil: 全局对象
 * 使用：EventUtil.addHandler(ele,type,handler)
 * **/
let EventUtil = {
    addHandler: (element, type, handler) => {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false)
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler)
        } else {
            element['on' + type] = handler;
        }
    },
    removeHandler: (element, type, handler) => {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false)
        } else if (element.detachEvent()) {
            element.detachEvent('on' + type, handler)
        } else {
            element['on' + type] = null;
        }
    }
}