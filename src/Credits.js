class Credits extends Phaser.Scene {
    constructor() { super('creditsScene'); }

    create() {
        this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'background').setOrigin(0).setScale(12.5)
        this.add.text(400, 100, 'CREDITS', { fontSize: '40px', fontFamily: 'Monospace', color: '#7A0E0E' }).setOrigin(0.5)

        this.add.text(400, 230,
            'Graphics: Tiffany Caballero\nMusic & Sounds: Syncopika, Blender Foundation\n (from OpenGameArt.org)\n\nPress ESC to go back',
            { fontSize: '25px', color: '#fff', fontFamily: 'Monospace', align: 'center' }
        ).setOrigin(0.5)

        this.input.keyboard.once('keydown-ESC', () => this.scene.start('menuScene'))
    }
}