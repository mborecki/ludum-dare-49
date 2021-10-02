import GAME_CONFIG from "../config";
import { DIRECTION, Intersection } from "../types";

const ROAD_CHANCE = .5

export default function generateIntersections(width: number, height: number): Intersection[] {

    const intersections: Intersection[] = [];

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {

            intersections.push({
                x: i, y: j, open: []
            });
        }
    }

    for (let i = 0; i < intersections.length; i++) {
        const me = intersections[i];
        const siblingE = intersections.find(sibling => (sibling.x === me.x + 1 && sibling.y === me.y));
        const siblingS = intersections.find(sibling => (sibling.x === me.x && sibling.y === me.y + 1));

        if (siblingE && Math.random() < ROAD_CHANCE) {
            me.open.push(DIRECTION.E),
                siblingE.open.push(DIRECTION.W);
        }

        if (siblingS && Math.random() < ROAD_CHANCE) {
            me.open.push(DIRECTION.S),
                siblingS.open.push(DIRECTION.N);
        }
    }

    validateIntersections(intersections);

    return intersections;
}


function validateIntersections(intersections: Intersection[]) {
    const outside = new Set<Intersection>(intersections);
    const inside = new Set<Intersection>();

    const queue = [intersections[0]];

    while (queue.length) {
        const target = queue.shift();

        outside.delete(target);
        inside.add(target);

        const siblings = getConnectedSiblings(target.x, target.y, intersections);

        siblings.forEach(s => {
            if (!inside.has(s)) {
                inside.add(s);
                outside.delete(s);
                queue.push(s);
            }
        });
    }

    if (inside.size !== intersections.length) {

        if (outside.size > inside.size) {
            validateIntersections(fix(inside, outside));
        } else {
            validateIntersections(fix(outside, inside));
        }
    }


}

function fix(g1: Set<Intersection>, g2: Set<Intersection>): Intersection[] {
    const intersections = [
        ...Array.from(g1),
        ...Array.from(g2)
    ];

    g1.forEach(int => {
        const siblings = getSiblings(int.x, int.y, intersections);

        const outsideSibling = siblings.find(s => g2.has(s));

        if (outsideSibling) {
            const dir = getSiblingDirection(int.x, int.y, outsideSibling);

            int.open.push(dir);
            outsideSibling.open.push(reverseDirection(dir));
        }
    });

    return intersections;
}

export function getSibling(x: number, y: number, direction: DIRECTION, intersections: Intersection[]) {
    switch (direction) {
        case DIRECTION.W:
            return intersections.find(int => (int.x === x - 1 && int.y === y));
        case DIRECTION.E:
            return intersections.find(int => (int.x === x + 1 && int.y === y));
        case DIRECTION.N:
            return intersections.find(int => (int.x === x && int.y === y - 1));
        case DIRECTION.S:
            return intersections.find(int => (int.x === x && int.y === y + 1));
    }
}

function getConnectedSiblings(x: number, y: number, intersections: Intersection[]): Intersection[] {
    const result: Intersection[] = [];

    const target = intersections.find(int => (int.x === x && int.y === y));

    if (!target) {
        return [];
    }

    [
        DIRECTION.N,
        DIRECTION.E,
        DIRECTION.S,
        DIRECTION.W
    ].forEach(dir => {
        if (target.open.includes(dir)) {
            const sibling = getSibling(x, y, dir, intersections);
            if (sibling) {
                result.push(sibling)
            }
        }
    })


    return result;
}

function getSiblings(x: number, y: number, intersections: Intersection[]): Intersection[] {
    const result: Intersection[] = [];

    const target = intersections.find(int => (int.x === x && int.y === y));

    if (!target) {
        return [];
    }

    [
        DIRECTION.N,
        DIRECTION.E,
        DIRECTION.S,
        DIRECTION.W
    ].forEach(dir => {
        const sibling = getSibling(x, y, dir, intersections);
        if (sibling) {
            result.push(sibling)
        }
    })


    return result;
}

function getSiblingDirection(x: number, y: number, sibling: Intersection): DIRECTION {
    if (sibling.x < x) return DIRECTION.W;
    if (sibling.x > x) return DIRECTION.E;
    if (sibling.y < y) return DIRECTION.N;
    if (sibling.y > y) return DIRECTION.S;

    throw 'ERROR: getSiblingDirection';
}

export function reverseDirection(dir: DIRECTION): DIRECTION {
    switch (dir) {
        case DIRECTION.N: return DIRECTION.S;
        case DIRECTION.S: return DIRECTION.N;
        case DIRECTION.W: return DIRECTION.E;
        case DIRECTION.E: return DIRECTION.W;
    }
}
