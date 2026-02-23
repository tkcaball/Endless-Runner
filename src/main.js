/*
Tiffany Caballero
Game: White Rabbit Runner
Hours: 27

1. 
The game is inspired by the White Rabbit from Alice in Wonderland, 
who is running late and runs while avoiding obstacles in Wonderland. 
Something interesting is that the obstacles are randomized with 
different frames from a sprite sheet which took a while to figure out.

2. I think the game looks pretty good visually. 
I’m proud of the sprites I created, it took me some time to figure 
out how they should look like but they came out well.

*/


'use strict'

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: { 
            gravity: { y: 1200 }, 
        debug: false }
    },
    scene: [ Menu, Play, Credits ]
})