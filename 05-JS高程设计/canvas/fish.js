__inline('../lib/spriteAnimation.js');

nie.define('fishAnimation',function() {
        
    var SpriteAnimation = nie.require('spriteAnimation');
    var introAnimation = new SpriteAnimation();

    introAnimation.init('#fish1', __resload('/img/fish'),function () {
        introAnimation.FPS = 20;
        introAnimation.goto(0);
    });

    introAnimation.play();
});