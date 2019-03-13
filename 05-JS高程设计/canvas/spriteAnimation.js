nie.define('spriteAnimation', function() {
    var frame = null,
        animationQueue = [],
        _id = 0;

    function _playAll(timestamp) {
        animationQueue.forEach(function(item, index) {
            item.fn(timestamp);
        });
        frame = requestAnimationFrame(_playAll);
    }

    function Sprite() {
        this.canvas = null;
        this.index = 0;
        this.frame = null;
        this.images = [];
        this.ctx = null;
        this.FPS = null;
        this.length = 0;
        this.playing = false;
        this._id = _id;
        this.timer = null;
        this.round = 0;
        _id++;
    }

    Sprite.prototype.updateSize = function() {
        // 屏幕的设备像素比
        var devicePixel  = window.devicePixelRatio || 1;
        // 浏览器在渲染canvas之前存储画布信息的像素比
        var backingStoreRatio = this.ctx.webkitBackingStorePixelRatio ||
                                this.ctx.mozBackingStorePixelRatio ||
                                this.ctx.msBackingStorePixelRatio ||
                                this.ctx.oBackingStorePixelRatio ||
                                this.ctx.backingStorePixelRatio || 1;
        // canvas的实际渲染倍率
        var ratio = devicePixelRatio / backingStoreRatio;

        this.canvas.width = $(this.canvas).width() * ratio;
        this.canvas.height = $(this.canvas).height() * ratio;

        if (this.images.length && !this.playing) {
            this.goto(this.index);
        }
    };

    Sprite.prototype.init = function(selector, imgUrlArr, callback) {
        var self = this,
            finished = 0,
            imgUrlArr = imgUrlArr.map(function(item) {
                return item;
            });

        this.length = imgUrlArr.length;

        this.canvas = document.querySelector(selector);
        this.ctx = this.canvas.getContext('2d');

        this.updateSize();
        $(window).on('resize', this.updateSize.bind(this));

        this.timer = setInterval(function() {
            if (imgUrlArr.length > 0) {
                loadImg(imgUrlArr.splice(0, 8));
            } else {
                clearInterval(self.timer);
            }
        }, 50);

        function loadImg(urlArr) {
            urlArr.forEach(function(imgUrl, index) {
                var image = new Image();
                image.src = imgUrl;

                image.addEventListener('load',function() {
                    finished++;
                    if (finished === self.length) {
                        callback && callback();
                    }
                });
                image.addEventListener('error',function() {
                    image.error = true;
                    finished++;
                    if (finished === self.length) {
                        callback && callback();
                    }
                });
                self.images[index + self.round * 8] = image;
            });
            self.round++;
        }
    };

    Sprite.prototype.play = function() {
        if (this.playing) {
            return;
        }
        this.playing = true;
        if (animationQueue.length === 0) {
            frame = requestAnimationFrame(_playAll);
        }
        animationQueue.push({
            _id: this._id,
            fn: play.bind(this),
        });
        // this.frame = requestAnimationFrame(play.bind(this));
        function play(timestamp) {
            if (this.FPS) {
                if (!this.prevTime) {
                    this.prevTime = timestamp;
                }
                var delta = timestamp - this.prevTime;
                if (delta < 1000 / this.FPS) {
                    // this.frame = requestAnimationFrame(play.bind(this));
                    return;
                }
            }
            if (this.index >= this.length) {
                this.index = 0;
            }
            if (this.images.length) {
                if (!this.images[this.index].error) {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    this.ctx.drawImage(this.images[this.index], 0, 0, this.images[this.index].width, this.images[this.index].height, 0, 0, this.canvas.width, this.canvas.height);
                    this.index++;
                    // this.frame = requestAnimationFrame(play.bind(this));
                    this.prevTime = timestamp;
                } else {
                    this.index++;
                    play();
                }
            }
        }
    };

    Sprite.prototype.stop = function() {
        // console.log(this.frame);
        for (var i = 0; i < animationQueue.length; i++) {
            if (animationQueue[i]._id == this._id) {
                animationQueue.splice(i, 1);
                break;
            }
        }
        if (animationQueue.length === 0) {
            cancelAnimationFrame(frame);
        }
        clearInterval(this.timer);
        // cancelAnimationFrame(this.frame);
        this.playing = false;
    };

    Sprite.prototype.goto = function(index) {
        this.index = index;
        if (this.index >= this.length) {
            this.index = 0;
        }
        // this.ctx.drawImage(this.images[this.index], 0, 0, this.canvas.width, this.canvas.height, 0, 0, this.canvas.width, this.canvas.height);
        if (this.images.length) {
            if (!this.images[this.index].error) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.images[this.index], 0, 0, this.images[this.index].width, this.images[this.index].height, 0, 0, this.canvas.width, this.canvas.height);
            } else {
                this.goto(index+1);
            }
        }
    };

    Sprite.prototype.playOnce = function(callback) {
        if (this.playing) {
            return;
        }
        this.playing = true;
        if (animationQueue.length === 0) {
            frame = requestAnimationFrame(_playAll);
        }
        animationQueue.push({
            _id: this._id,
            fn: play.bind(this),
        });
        this.index = 0;

        // this.frame = requestAnimationFrame(play.bind(this));

        function play(timestamp) {
            if (this.FPS) {
                if (!this.prevTime) {
                    this.prevTime = timestamp;
                }
                var delta = timestamp - this.prevTime;
                if (delta < 1000 / this.FPS) {
                    // this.frame = requestAnimationFrame(play.bind(this));
                    return;
                }
            }
            if (this.index >= this.length) {
                this.stop();
                callback && callback();
                return;
            }
            if (this.images.length) {
                if (!this.images[this.index].error) {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    this.ctx.drawImage(this.images[this.index], 0, 0, this.images[this.index].width, this.images[this.index].height, 0, 0, this.canvas.width, this.canvas.height);
                    this.index++;
                    // this.frame = requestAnimationFrame(play.bind(this));
                    this.prevTime = timestamp;
                } else {
                    this.index++;
                    play();
                }
            }
        }
    };
    return Sprite;
});
