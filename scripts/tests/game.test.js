/**
 * @jest-environment jsdom
 */

const {
    expect
} = require("@jest/globals");
const {
    game
} = require("../game")

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
})

describe("game object contains correct keys", () => {
    test("score key exsists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exsists", () => {
        expect("CurrentGame" in game).toBe(true);
    });
});