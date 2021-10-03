const fs = require('fs');
let Path = require("path");

// https://www.npmjs.com/package/free-tex-packer-core
let texturePacker = require("free-tex-packer-core");

const spritesheets = [
    {
        outputPath: './assets/generated/',
        filename: '_ph',
        sprites: [
            { name: 'test', path: './sprites/test.jpg' },
            { name: 'dot', path: './sprites/dot.jpg' },
        ]
    },
    {
        outputPath: './assets/generated/',
        filename: 'tiles',
        sprites: [
            { name: 'base-tile', path: './sprites/base-tile.png' },
            { name: 'icon-circle', path: './sprites/icon-circle.png' },
            { name: 'icon-squre', path: './sprites/icon-squre.png' },
            { name: 'icon-triangle', path: './sprites/icon-triangle.png' },
            { name: 'icon-star', path: './sprites/icon-star.png' }
        ]
    },
    {
        outputPath: './assets/generated/',
        filename: 'roads',
        sprites: [
            { name: 'corner', path: './sprites/roads/corner.png' },
            { name: 'cross-t', path: './sprites/roads/cross-t.png' },
            { name: 'cross-x', path: './sprites/roads/cross-x.png' },
            { name: 'dead-end', path: './sprites/roads/dead-end.png' },
            { name: 'road-1', path: './sprites/roads/road-1.png' },
            { name: 'road-2', path: './sprites/roads/road-2.png' }
        ]
    },
    {
        outputPath: './assets/generated/',
        filename: 'map',
        sprites: [
            { name: 'background', path: './sprites/map/background.jpg' },
            { name: 'player', path: './sprites/map/player.png' },
            { name: 'target-red', path: './sprites/map/target-red.png' },
            { name: 'client-red', path: './sprites/map/client-red.png' },
        ]
    },
    {
        outputPath: './assets/generated/',
        filename: 'player',
        sprites: [
            { name: 'player0', path: './sprites/map/player-anim_Animation1_0.png' },
            { name: 'player1', path: './sprites/map/player-anim_Animation1_1.png' },
            { name: 'player2', path: './sprites/map/player-anim_Animation1_2.png' }
        ]
    },
    {
        outputPath: './assets/generated/',
        filename: 'blocks',
        sprites: [
            { name: 'tree-1', path: './sprites/blocks/tree-1.png' }
        ]
    },
    {
        outputPath: './assets/generated/',
        filename: 'panel',
        sprites: [
            { name: 'add', path: './sprites/icons/add.png' },
            { name: 'arrow-down', path: './sprites/icons/arrow-down.png' },
            { name: 'arrow-up', path: './sprites/icons/arrow-up.png' },
            { name: 'arrow-right', path: './sprites/icons/arrow-right.png' },
            { name: 'arrow-left', path: './sprites/icons/arrow-left.png' },
            { name: 'frame', path: './sprites/icons/frame.png' },
            { name: 'frame-big', path: './sprites/icons/frame-big.png' },
            { name: 'frame-small', path: './sprites/icons/frame-small.png' },
            { name: 'play-active', path: './sprites/icons/play-active.png' },
            { name: 'play', path: './sprites/icons/play.png' },
            { name: 'scroll-body', path: './sprites/icons/scroll-body.png' },
            { name: 'scroll-down', path: './sprites/icons/scroll-down.png' },
            { name: 'scroll-up', path: './sprites/icons/scroll-up.png' },
            { name: 'scroll', path: './sprites/icons/scroll.png' },
            { name: 'install', path: './sprites/icons/install.png' }
        ]
    }
];

spritesheets.forEach(ss => {
    const images = ss.sprites.map((s) => {
        return {
            path: s.name,
            contents: fs.readFileSync(s.path)
        }
    });
    texturePacker(images, {
        exporter: 'Phaser3',
        textureName: ss.filename,
        packer: 'OptimalPacker',
        padding: 2,
        width: 2048,
        height: 2048,
        allowRotation: false, // Phaser3 nie obsługuje rotacji
        allowTrim: false
    }, (files, error) => {
        if (error) {
            console.error('Packaging failed', error);
        } else {
            for (let item of files) {
                console.log(item.name);
                fs.mkdirSync(ss.outputPath, { recursive: true })
                fs.writeFileSync(Path.join(ss.outputPath, item.name), item.buffer)
            }
        }
    })
});
