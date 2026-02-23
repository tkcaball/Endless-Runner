class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        this.load.path = './assets/'

        // Sprites
        this.load.spritesheet('rabbit', 'Rabbit.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('cards', 'Cards.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('teacups', 'Teacups.png', { frameWidth: 32, frameHeight: 32 })
        this.load.image('background', 'Background.png')

        // Audio
        this.load.audio('bgm', 'bgm.wav')
        this.load.audio('restart', 'restart.ogg')
        this.load.audio('jump', 'jump.flac')
        this.load.audio('collision', 'collision.flac')
        this.load.audio('landing', 'landing.flac')
    }

    create() {

        // select sound
        this.restartSound = this.sound.add('restart', { volume: 0.7 })

        // Add background
        this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'background').setOrigin(0).setScale(12.5)

        this.add.text(400, 80, 'WHITE RABBIT RUNNER', {
            fontSize: '50px',
            fontFamily: 'Monospace',
            color: '#7A0E0E'
        }).setOrigin(0.5)

        this.add.text(400, 200, 'SPACE: Jump\nSurvive as long as possible\nAvoid Teacups & Cards', 
            { fontSize: '28px', fontFamily: 'Monospace', align: 'center' }).setOrigin(0.5)

        // Rabbit
        this.menuRabbit = this.add.sprite(150, 350, 'rabbit', 0).setScale(3.5)

        // Speech bubble
        let bubbleX = this.menuRabbit.x - 130
        let bubbleY = this.menuRabbit.y - 110
        let bubble = this.add.graphics({ x: bubbleX, y: bubbleY })
        bubble.fillStyle(0xffffff, 1)
        bubble.lineStyle(2, 0x000000, 1)
        bubble.fillRoundedRect(0, 0, 160, 50, 10)
        bubble.strokeRoundedRect(0, 0, 160, 50, 10)
        bubble.fillTriangle(130, 50, 140, 50, 135, 60)

        let bubbleText = this.add.text(
            bubbleX + 10, 
            bubbleY + 10, 
            "I'm late, I'm late!", 
            { fontSize: '16px', color: '#000000', fontFamily: 'Monospace', wordWrap: { width: 140 } }
        )

        // Menu instructions
        this.add.text(400, 270, 'Press SPACE to Start', { fontSize: '24px', fontFamily: 'Monospace' }).setOrigin(0.5)
        this.add.text(400, 310, 'Press C for Credits', { fontSize: '20px', fontFamily: 'Monospace' }).setOrigin(0.5)

        // Input
        this.input.keyboard.once('keydown-SPACE', () => {
            this.restartSound.play()
            this.scene.start('playScene')
        })

        this.input.keyboard.once('keydown-C', () => {
            this.scene.start('creditsScene')
        })
    }
}