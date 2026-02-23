class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {

        // Background Music
        this.gameMusic = this.sound.add('bgm', { loop: true, volume: 0.3 })
        this.gameMusic.play()

        // Sound Effects
        this.jumpSound = this.sound.add('jump', { volume: 0.6 })
        this.collisionSound = this.sound.add('collision', { volume: 0.6 })
        this.landingSound = this.sound.add('landing', { volume: 0.6 })
        this.restartSound = this.sound.add('restart', { volume: 0.7 })

        this.wasInAir = false   // detect landing

        // Background scroll
        this.background = this.add.tileSprite(
            0, 0,
            this.game.config.width,
            this.game.config.height,
            'background'
        ).setOrigin(0).setScale(12.5)


        //Rabbit physics
        this.rabbitY = 400

        this.rabbit = this.physics.add.sprite(150, this.rabbitY, 'rabbit', 1)
        this.rabbit.setCollideWorldBounds(true)
        this.rabbit.setGravityY(1500)
        this.rabbit.setScale(3.5)
        this.rabbit.body.setSize(this.rabbit.width - 20, this.rabbit.height - 2).setOffset(10, 0)

        if (!this.anims.exists('run')) {
            this.anims.create({
                key: 'run',
                frames: this.anims.generateFrameNumbers('rabbit', { start: 1, end: 4 }),
                frameRate: 10,
                repeat: -1
            })
        }

        this.rabbit.play('run')
        this.cursors = this.input.keyboard.createCursorKeys()
        this.obstacles = this.add.group()

        // Collider
        this.physics.add.collider(this.rabbit, this.obstacles, () => {
            if (!this.isGameOver) {
                this.collisionSound.play()
                this.gameOver()
            }
        }, null, this)

        this.score = 0
        this.scoreText = this.add.text(20, 20, 'Score: 0', { fontSize: '24px', fontFamily: 'Monospace', color: '#7A0E0E'})

        this.gameSpeed = 300
        this.isGameOver = false

        this.time.addEvent({
            delay: 1500,
            callback: this.spawnObstacle,
            callbackScope: this,
            loop: true
        })
    }

    update(time, delta) {
        if (this.isGameOver) return

        this.background.tilePositionX += 0.3

        if (Phaser.Input.Keyboard.JustDown(this.cursors.space) && this.rabbit.body.onFloor()) {
            this.rabbit.setVelocityY(-800)
            this.rabbit.setFrame(3)
            this.jumpSound.play()
        }

        // Detect landing
        if (!this.rabbit.body.onFloor()) {
            this.wasInAir = true
        }

        if (this.rabbit.body.onFloor() && this.wasInAir) {
            this.landingSound.play()
            this.wasInAir = false
        }

        if (this.cursors.space.isDown && this.rabbit.body.velocity.y < 0) {
            this.rabbit.setVelocityY(this.rabbit.body.velocity.y - 20)
        }

        if (this.rabbit.body.onFloor() && this.rabbit.frame.name === 3) {
            this.rabbit.play('run', true)
        }

        // Move obstacles
        this.obstacles.getChildren().forEach(obstacle => {
            if (obstacle && obstacle.active) {
                obstacle.x -= this.gameSpeed * (delta / 1000)

                if (obstacle.x < -150) obstacle.destroy()
            }
        })

        this.gameSpeed += 0.02

        this.score += delta * 0.01
        this.scoreText.setText('Score: ' + Math.floor(this.score))
    }

    spawnObstacle() {
        if (this.isGameOver) return

        let type = Phaser.Math.Between(0, 1)
        let key = type === 0 ? 'cards' : 'teacups'
        let frame = Phaser.Math.Between(0, 3)

        let obstacle = this.add.sprite(850, this.rabbitY, key, frame)
        obstacle.setOrigin(0.5, 1)
        obstacle.setScale(type === 0 ? 4 : 4)

        this.physics.add.existing(obstacle)
        obstacle.body.setImmovable(true)
        obstacle.body.allowGravity = false

        obstacle.body.setSize(obstacle.width - 12, obstacle.height - 10)
        obstacle.body.setOffset(5, 8)

        obstacle.body.height += 1
        obstacle.body.y -= 1

        this.obstacles.add(obstacle)
    }

    gameOver() {
        this.isGameOver = true

        this.gameMusic.stop()   // stop BGM

        this.rabbit.anims.stop()
        this.rabbit.setFrame(5)

        this.obstacles.getChildren().forEach(ob => ob.active = false)

        this.add.text(400, 180, 'GAME OVER', { fontSize: '48px', fontFamily: 'Monospace' }).setOrigin(0.5)
        this.add.text(400, 220, 'Press SPACE to Restart', { fontSize: '24px', fontFamily: 'Monospace' }).setOrigin(0.5)

        // Disable further input until restart
        this.input.keyboard.removeAllListeners('keydown-SPACE')

        this.input.keyboard.once('keydown-SPACE', () => {
        this.restartSound.play()

        // Delay restart
        this.time.delayedCall(200, () => {
        this.scene.start('menuScene') 
        })

        })
    }
}