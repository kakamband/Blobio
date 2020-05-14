import { Game } from './Game.js';
let gameDiv = document.getElementById('gameDiv');
let app;

window.onload = function() {
    // Check whether webgl is supported
    let type = "WebGL"
    if(!PIXI.utils.isWebGLSupported()){
      type = "canvas"
    }
    PIXI.utils.sayHello(type);

    // Initialize pixi app
    app = new PIXI.Application({
        width: 1200,
        height: 1000,
        autoResize: true,
        backgroundColor: 0xFFFFFF
    });
    app.view.id = "canvas";
    app.view.style = 'position: relative';
    gameDiv.prepend(app.view);
    

    // Preload image assets
    app.loader.baseUrl = 'client/img';
    app.loader.add('player', 'player.png')
              .add('spike', 'spike.png')
              .add('map', 'somemap.png')
              .add('food-green', 'food-green.png')
              .add('food-yellow', 'food-yellow.png')
              .add('food-red', 'food-red.png')
              .add('food-blue', 'food-blue.png')
              .add('food-purple', 'food-purple.png');
    app.loader.onProgress.add(showProgress);
    app.loader.onComplete.add(doneLoading);
    app.loader.onError.add(reportError);

    const bgTexture = new PIXI.Texture(PIXI.Texture.from('/client/img/map1.png'),
                      new PIXI.Rectangle(0, 0, 3008, 3008));
    const bg = new PIXI.Sprite(bgTexture);
    bg.anchor.x = 0;
    bg.anchor.y = 0;
    bg.position.x = 0;
    bg.position.y = 0;
    app.stage.addChild(bg);

    app.loader.load();

    
    function showProgress(e) {
        console.log(e.progress);
    }

    function reportError(e) {
        console.error('ERROR: ' + e.message);
    }

    function doneLoading(e) {
        console.log("Done loading!");

        new Game(app);
    }
}
