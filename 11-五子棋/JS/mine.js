/**
 * Created by XiaAo on 2017/2/17.
 */
window.onload = function () {
    var chess = document.getElementById('chess');
    var context = chess.getContext('2d');

    var me = true;
    var over;   //定义比赛是否结束
    var chessBoard = [];    //定义棋盘数组
    var wins = [];  //定义赢法数组
    var count = 0;    //定义所有赢法种类
    var myWin = [];   //定义我方赢法数组
    var computerWin = [];   //定义计算机赢法数组
    var stepDone = true; //  定义onStep函数执行完的标志位

    //chessBoard[]初始化
    for (var i = 0; i < 16; i++) {
        chessBoard[i] = [];
        for (var j = 0; j < 16; j++) {
            chessBoard[i][j] = 0;
        }
    }
    console.log(chessBoard);

    //wins[]初始化
    for (var i = 0; i < 16; i++) {
        wins[i] = [];
        for (var j = 0; j < 16; j++) {
            wins[i][j] = [];
        }
    }

    //纵向五子赢法
    for (var i = 0; i < 16; i++) {
        for (var j = 0; j < 12; j++) {
            for (var k = 0; k < 5; k++) {
                wins[i][j + k][count] = true;
            }
            count++;
        }
    }
    //横向五子棋赢法
    for (var i = 0; i < 16; i++) {
        for (var j = 0; j < 12; j++) {
            for (var k = 0; k < 5; k++) {
                wins[j + k][i][count] = true;
            }
            count++;
        }
    }
    //正斜向五子棋赢法
    for (var i = 0; i < 12; i++) {
        for (var j = 0; j < 12; j++) {
            for (var k = 0; k < 5; k++) {
                wins[i + k][j + k][count] = true;
            }
            count++;
        }
    }
    //反斜向五子棋赢法
    for (var i = 0; i < 12; i++) {
        for (var j = 15; j > 3; j--) {
            for (var k = 0; k < 5; k++) {
                wins[i + k][j - k][count] = true;
            }
            count++;
        }
    }
    //
    console.log(count);

    for (var i = 0; i < count; i++) {
        myWin[i] = [];
        computerWin[i] = [];
    }

    context.strokeStyle = "#BFBFBF";
    drawChess();    //画棋盘


    function drawChess() {
        for (var i = 0; i < 16; i++) {
            //画纵线
            context.moveTo(25 + i * 30, 25);
            context.lineTo(25 + i * 30, 475);
            context.stroke();
            //画横线
            context.moveTo(25, 25 + i * 30);
            context.lineTo(475, 25 + i * 30);
            context.stroke();
        }
    }

    function onStep(x, y, me) {
        context.beginPath();    //  开始路径
        // context.arc(x,y,r,sAngle,eAngle,counterclockwise);画圆弧
        context.arc(25 + x * 30, 25 + y * 30, 13, 0, 2 * Math.PI);
        context.closePath();
        //实现渐变效果
        var gradrent = context.createRadialGradient(25 + x * 30 + 2, 25 + y * 30 - 2, 13, 25 + x * 30, 25 + y * 30, 5);
        if (me) {
            gradrent.addColorStop(0, "#0a0a0a");
            gradrent.addColorStop(1, "#636766");
        } else {
            gradrent.addColorStop(0, "#d1d1d1");
            gradrent.addColorStop(1, "#f9f9f9");
        }

        context.fillStyle = gradrent;     //将效果应用上去
        context.fill();
        return stepDone = true;
    }

    chess.onclick = function (e) {
        if (over) {
            return;
        }
        if (!me) {
            return;
        }
        var x = e.offsetX;
        var y = e.offsetY;


        //将定位到最近的棋格上
        var X, Y;
        var xInt = parseInt((x - 25) / 30);
        var xTemp = (x - 25) % 30;

        var yInt = parseInt((y - 25) / 30);
        var yTemp = (y - 25) % 30;

        if (xTemp < 15) {
            xTemp = 0;
        } else {
            xTemp = 1;
        }
        X = xInt + xTemp;

        if (yTemp < 15) {
            yTemp = 0;
        } else {
            yTemp = 1;
        }
        Y = yInt + yTemp;

        // //直接向上取整
        // var X = Math.floor((x - 10) / 30);
        // var Y = Math.floor((y - 10) / 30);
        if (chessBoard[X][Y] == 0) {
            onStep(X, Y, me);
            chessBoard[X][Y] = 1;

            for (var k = 0; k < count; k++) {
                if (wins[X][Y][k]) {
                    myWin[k]++;
                    computerWin[k] = 6;

                    if (myWin[k] == 5) {
                        over = true;
                        alert('你赢了');
                    }
                }

            }

            if (!over) {
                me = !me;
                computerAI();
            }

        }
    };

    //计算机AI算法
    var computerAI = function () {
        var myScore = [];   //定义我方成绩
        var computerScore = [];   //定义计算机成绩
        var maxScore = 0;   //最大成绩
        var u = 0;
        var v = 0;


        for (var i = 0; i < 16; i++) {
            myScore[i] = [];
            computerScore[i] = [];
            for (var j = 0; j < 16; j++) {
                myScore[i][j] = 0;
                computerScore[i][j] = 0;
            }
        }
        console.log(myScore);

        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 16; j++) {

                if (chessBoard[i][j] == 0) {
                    for (var k = 0; k < count; k++) {
                        if (wins[i][j][k]) {
                            if (myWin[k] == 1) {
                                myScore[i][j] += 200;
                            } else if (myWin[k] == 2) {
                                myScore[i][j] += 400;
                            } else if (myWin[k] == 3) {
                                myScore[i][j] += 2000;
                            } else if (myWin[k] == 4) {
                                myScore[i][j] += 10000;
                            }

                            if (computerWin[k] == 1) {
                                computerScore[i][j] += 220;
                            } else if (computerWin[k] == 2) {
                                computerScore[i][j] += 420;
                            } else if (computerWin[k] == 3) {
                                computerScore[i][j] += 2100;
                            } else if (computerWin[k] == 4) {
                                computerScore[i][j] += 20000;
                            }
                        }
                    }

                    //找到最有价值的点
                    if (myScore[i][j] > maxScore) {
                        maxScore = myScore[i][j];
                        u = i;
                        v = j;
                    } else if (myScore[i][j] == maxScore) {
                        if (computerScore[i][j] > computerScore[u][v]) {
                            u = i;
                            v = j;
                        }
                    }

                    if (computerScore[i][j] > maxScore) {
                        maxScore = computerScore[i][j];
                        u = i;
                        v = j;
                    } else if (computerScore[i][j] == maxScore) {
                        if (myScore[i][j] > myScore[u][v]) {
                            u = i;
                            v = j;
                        }
                    }
                }
            }
        }

        //计算机落棋
        onStep(u, v, false);
        chessBoard[u][v] = 2;

        for (var k = 0; k < count; k++) {
            if (wins[u][v][k]) {
                computerWin[k]++;
                myWin[k] = 6;

                if (computerWin[k] == 5) {
                    over = true;
                    alert('计算机赢了');
                }
            }

        }


        if (!over) {
            me = !me;
        }

    }
};
