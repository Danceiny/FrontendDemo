/**
 * Created by XiaAo on 2017/1/20.
 */

window.onload = function () {
    var oDiv = document.getElementById('playimages');
    var oBtnPrev = getByClass(oDiv, 'prev')[0];
    var oBtnNext = getByClass(oDiv, 'next')[0];
    var oMarkLeft = getByClass(oDiv, 'mark-left')[0];
    var oMarkRight = getByClass(oDiv, 'mark-right')[0];

    var oDivSmall = getByClass(oDiv, 'small-pic')[0];
    var oUlSmall = oDivSmall.getElementsByTagName('ul')[0];
    var aLiSmall = oDivSmall.getElementsByTagName('li');

    var oDivBig = getByClass(oDiv, 'big-pic')[0];
    var aLiBig = oDivBig.getElementsByTagName('li');

    var NowZIndex = 2;  //定义显示的优先级
    var now = 0;        //定义当前所在的this.index

    //使缩略图的ul宽度等于所有的li的宽度和
    console.log(oUlSmall, aLiSmall[0].offsetWidth, oUlSmall.style.width, aLiSmall.length);

    oUlSmall.style.width = aLiSmall.length * aLiSmall[0].offsetWidth + 'px';
    console.log(oUlSmall);
    /*左右按钮的实现*/
    oBtnPrev.onmouseover = oMarkLeft.onmouseover = function () {
        starMove(oBtnPrev, 'opacity', 100);
    };
    oBtnPrev.onmouseout = oMarkLeft.onmouseout = function () {
        starMove(oBtnPrev, 'opacity', 0);
    }

    oBtnNext.onmouseover = oMarkRight.onmouseover = function () {
        starMove(oBtnNext, 'opacity', 100);
    };
    oBtnNext.onmouseout = oMarkRight.onmouseout = function () {
        starMove(oBtnNext, 'opacity', 0);
    }


    /*大图的切换*/
    for (var i = 0; i < aLiSmall.length; i++) {

        aLiSmall[i].index = i;
        aLiSmall[i].onclick = function () {

            if (this.index == now) return;
            now = this.index;

            tab();   //大图切换
        }

        //鼠标移入移出改变缩略图的透明度
        aLiSmall[i].onmouseover = function () {
            starMove(this, 'opacity', 100);
        }
        aLiSmall[i].onmouseout = function () {
            if (this.index != now) {
                starMove(this, 'opacity', 60);
            }
        }

        /*按钮点击切换上下张*/
        oBtnPrev.onclick = function () {
            now--;
            if (now == -1) {
                now = aLiSmall.length - 1;
            }
            tab();
        }
        oBtnNext.onclick = function () {
            now++;
            if (now == aLiSmall.length) {
                now = 0;
            }
            tab();  //大图切换
        }

/*        var timer = setInterval(oBtnNext.onclick, 4000);
        oDiv.onmouseover = function () {
            clearInterval(timer);
        }
        oDiv.onmouseout = function () {
            timer = setInterval(oBtnNext.onclick, 4000);
        }*/
    }
    /*小图设置*/
    function tab() {
        aLiBig[now].style.zIndex = NowZIndex++;

        //将每一个small-pic都设为60%
        for (var i = 0; i < aLiSmall.length; i++) {
            starMove(aLiSmall[i], 'opacity', 60);
        }
        starMove(aLiSmall[now], 'opacity', 100);

        aLiBig[now].style.height = 0;
        starMove(aLiBig[now], 'height', 320);

        if (now == 0) {
            starMove(oUlSmall, 'left', 0); //第一张位置靠左
        }
        else if (now == aLiSmall.length - 1) {
            starMove(oUlSmall, 'left', -(now - 2) * aLiSmall[0].offsetWidth); //最后一张位置靠右
        }
        else {
            starMove(oUlSmall, 'left', -(now - 1) * aLiSmall[0].offsetWidth); //位置移位居中
        }
    }
};


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

/*
 * starMove()
 * obj:传入对象this
 * attr:传入样式名
 * iTarget:设定样式目标
 * */
function starMove(obj, attr, iTarget) {

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


