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
            {name: 'base-tile', path: './sprites/base-tile.png'},
            {name: 'icon-circle', path: './sprites/icon-circle.png'},
            {name: 'icon-squre', path: './sprites/icon-squre.png'},
            {name: 'icon-triangle', path: './sprites/icon-triangle.png'},
            {name: 'icon-star', path: './sprites/icon-star.png'}
        ]
    },
    {
        outputPath: './assets/generated/',
        filename: 'roads',
        sprites: [
            {name: 'corner', path: './sprites/roads/corner.png'},
            {name: 'cross-t', path: './sprites/roads/cross-t.png'},
            {name: 'cross-x', path: './sprites/roads/cross-x.png'},
            {name: 'dead-end', path: './sprites/roads/dead-end.png'},
            {name: 'road', path: './sprites/roads/road.png'}
        ]
    },
    {
        outputPath: './assets/generated/',
        filename: 'map',
        sprites: [
            {name: 'background', path: './sprites/map/background.jpg'}
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
