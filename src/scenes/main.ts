import getAudioPlayer from "./audio";

const header = 'Our autopilot is somewhat unstable...';

const text1 = '...so we hire ';
const text2 = 'YOU!';
const text3 = 'You will'
const text4 = 'debug and fix'
const text5 = 'autopilot in out taxi in real time.';
const text6 = 'Remember:';
const text7 = ' - adding new steps cost you ';
const text7a = '$3';
const text8 = ' - executing imposible order cost you ';
const text10 = '$5';
const text11 = ' - every happy customer earns you';
const text12 = '$10';
const text13 = 'When you are out of money, you are ';
const text14 = 'FIRED!';

export default class MainScene extends Phaser.Scene {

    private audio = getAudioPlayer();

    constructor() {
        super(null);
    }


    create() {

        const box = new Phaser.GameObjects.Graphics(this);
        box.fillStyle(0x0d0d0d);
        box.fillRect(100, 100, 980, 520);
        box.lineStyle(1, 0x8fd96c, 1);
        box.moveTo(100, 100);
        box.lineTo(1080, 100);
        box.lineTo(1080, 620);
        box.lineTo(100, 620);
        box.lineTo(100, 100);
        box.stroke();

        const textContainer = new Phaser.GameObjects.Container(this);

        const h = new Phaser.GameObjects.Text(this, 520, 150, header, {
            fontSize: '36px',
            color: '#8fd96c'
        })
        h.setOrigin(.5);

        textContainer.add(h);

        const t1 = new Phaser.GameObjects.Text(this, 150, 200, text1, {
            fontSize: '16px',
            color: '#8fd96c'
        })
        t1.setOrigin(0);

        textContainer.add(t1);

        const t2 = new Phaser.GameObjects.Text(this, 285, 200, text2, {
            fontSize: '16px',
            color: '#e2df19'
        })
        t1.setOrigin(0);

        textContainer.add(t2);

        const t3 = new Phaser.GameObjects.Text(this, 150, 230, text3, {
            fontSize: '16px',
            color: '#8fd96c'
        })
        t1.setOrigin(0);

        textContainer.add(t3);

        const t4 = new Phaser.GameObjects.Text(this, 235, 230, text4, {
            fontSize: '16px',
            color: '#e2df19'
        })

        textContainer.add(t4);

        const t5 = new Phaser.GameObjects.Text(this, 370, 230, text5, {
            fontSize: '16px',
            color: '#8fd96c'
        })

        textContainer.add(t5);

        const t6 = new Phaser.GameObjects.Text(this, 200, 270, text6, {
            fontSize: '16px',
            color: '#8fd96c'
        })

        textContainer.add(t6);

        const t7 = new Phaser.GameObjects.Text(this, 200, 300, text7, {
            fontSize: '16px',
            color: '#8fd96c'
        })

        textContainer.add(t7);

        const t7a = new Phaser.GameObjects.Text(this, 480, 300, text7a, {
            fontSize: '16px',
            color: '#e2df19'
        })

        textContainer.add(t7a);

        const t8 = new Phaser.GameObjects.Text(this, 200, 330, text8, {
            fontSize: '16px',
            color: '#8fd96c'
        })

        textContainer.add(t8);

        const t10 = new Phaser.GameObjects.Text(this, 565, 330, text10, {
            fontSize: '16px',
            color: '#e2df19'
        })

        textContainer.add(t10);

        const t11 = new Phaser.GameObjects.Text(this, 200, 360, text11, {
            fontSize: '16px',
            color: '#8fd96c'
        })

        textContainer.add(t11);

        const t12 = new Phaser.GameObjects.Text(this, 525, 360, text12, {
            fontSize: '16px',
            color: '#e2df19'
        })

        textContainer.add(t12);

        const t13 = new Phaser.GameObjects.Text(this, 300, 420, text13, {
            fontSize: '16px',
            color: '#8fd96c'
        })

        textContainer.add(t13);

        const t14 = new Phaser.GameObjects.Text(this, 635, 420, text14, {
            fontSize: '16px',
            color: '#e2df19'
        })

        textContainer.add(t14);


        const buttonFrame = new Phaser.GameObjects.Graphics(this);
        buttonFrame.lineStyle(1, 0x8fd96c, 1);
        buttonFrame.moveTo(300, 500);
        buttonFrame.lineTo(880, 500);
        buttonFrame.lineTo(880, 550);
        buttonFrame.lineTo(300, 550);
        buttonFrame.lineTo(300, 500);
        buttonFrame.stroke();




        const buttonText = new Phaser.GameObjects.Text(this, 590, 525, 'GO TO WORK!', {
            fontSize: '24px',
            color: '#8fd96c'
        });
        buttonText.setOrigin(.5);

        buttonFrame.setInteractive({
            hitArea: new Phaser.Geom.Rectangle(300, 500, 580, 50),
            hitAreaCallback: Phaser.Geom.Rectangle.Contains,
            useHandCursor: true
        });

        buttonFrame.on('pointerover', () => {
            buttonText.setColor('#e2df19');
            buttonFrame.clear()
            buttonFrame.lineStyle(1, 0xe2df19, 1);
            buttonFrame.moveTo(300, 500);
            buttonFrame.lineTo(880, 500);
            buttonFrame.lineTo(880, 550);
            buttonFrame.lineTo(300, 550);
            buttonFrame.lineTo(300, 500);
            buttonFrame.stroke();
        });

        buttonFrame.on('pointerout', () => {
            buttonText.setColor('#8fd96c');
            buttonFrame.clear()
            buttonFrame.lineStyle(1, 0x8fd96c, 1);
            buttonFrame.moveTo(300, 500);
            buttonFrame.lineTo(880, 500);
            buttonFrame.lineTo(880, 550);
            buttonFrame.lineTo(300, 550);
            buttonFrame.lineTo(300, 500);
            buttonFrame.stroke();
        });

        buttonFrame.on('pointerdown', () => {
            this.game.scene.start('gameScene');
        })


        this.add.existing(box);
        this.add.existing(textContainer);
        this.add.existing(buttonFrame);
        this.add.existing(buttonText);

    }
}
