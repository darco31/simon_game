/**
 * @jest-environment jsdom
 */

const {
    game,
    newGame,
    showScore,
    addTurn,
    lightsOn,
    showTurns,
    playerTurn
} = require("../game")

jest.spyOn(window, "alert").mockImplementation(() => {});

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
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exsists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exsists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contains the correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    test("turnNumber key exsists", () => {
        expect("turnNumber" in game).toBe(true);
    });
});

describe("new game works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button3", "button4"];
        document.getElementById("score").innerHTML = "42";
        newGame();
    });
    test("should set score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should clear player moves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("should be one element in computer array", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("should display zero with element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("expect data-listener to be true", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        };
    });
});

describe("game play works correctly", () => {
    beforeEach(() => {
        game.score = 0;
        game.playerMoves = [];
        game.currentGame = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.playerMoves = [];
        game.currentGame = [];
    });
    test("addTurn addsa new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up button", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurns should update game turn number", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("should increment score if the turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test("should call an alert if move is wrong", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong move!");
    });
    test("should toggle turnInProgess to true", () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test("clicking during computer sequence shouldn fail", () => {
        showTurns();
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    });
});