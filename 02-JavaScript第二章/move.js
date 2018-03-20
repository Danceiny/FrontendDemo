/**
 * Created by XiaAo on 2017/1/29.
 */
/*
 * starMove()
 * obj:传入对象this
 * attr:传入样式名
 * iTarget:设定样式目标
 * */
function starMove(obj, attr, iTarget, fnEnd) {

    clearInterval(obj.timer);

    obj.timer = setInterval(function () {

        var curStyle = 0;
        //判断是否为改变透明度，改变透明度单独处理
        if (attr == 'opacity') {
            curStyle = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            console.log(attr);
        }
        else {
            //注意：parseInt是字符串解析
            curStyle = parseInt(getStyle(obj, attr));       //获取当前所在的style
            console.log(attr);
        }
//                console.log(curStyle);
        var speed = (iTarget - curStyle) / 5;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        //判断是否为改变透明度，改变透明度单独处理
        if (curStyle == iTarget) {
            clearInterval(obj.timer);
            //执行完判断传入函数是否有效
            if(fnEnd)fnEnd();
        }
        else {
            if (attr == 'opacity') {
                curStyle += speed;
                obj.style[attr] = curStyle / 100;
                obj.filter = 'alpha(opacity:' + curStyle + ')';
            }
            //非透明度样式模板
            else {
                obj.style[attr] = curStyle + speed + 'px';
            }
        }
    }, 30)
}

/*获取当前对象的style*/
function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    }
    else {
        return getComputedStyle(obj, false)[name];
    }
}
/*从父级里面通过class获取元素*/
function getByClass(oParent, sClass) {
    var aEle = oParent.getElementsByTagName('*');
    var aResult = [];

    for (var i = 0; i < aEle.length; i++) {
        if (aEle[i].className == sClass) {
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}