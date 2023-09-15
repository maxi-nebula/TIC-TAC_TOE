/** @format */

const startButton = document.getElementById("startbutton");

const markerButtons = document.querySelectorAll(".button_markers");
const gamePositions = ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9"];
const xArray = [];
const oArray = [];
const winningConditions = [
  ["1", "2", "3"],
  ["1", "4", "7"],
  ["1", "5", "9"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["3", "5", "7"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];

startButton.addEventListener("click", () => {
  const markerDiv = document.querySelector(".markers");

  markerDiv.classList.replace("markers", "markers-show");

  markerButtons.forEach((b) => {
    b.addEventListener("click", () => {
      const current = setMarkers(b);

      playGame(current);
    });
  });

  setMarkers = (b) => {
    markerDiv.classList.replace("markers-show", "markers");
    if (b.innerHTML == "X") {
      let pMarker = "X";
      let pName = "Player";
      let bMarker = "O";
      let bName = "bot";

      return { pMarker, pName, bMarker, bName };
    } else if (b.innerHTML == "O") {
      let pMarker = "O";
      let pName = "Player";
      let bMarker = "X";
      let bName = "bot";

      return { pMarker, pName, bMarker, bName };
    }
  };
});

playGame = (C) => {
  const grids = document.querySelectorAll(".item");
  const markerArray = [];
  grids.forEach((grid) => {
    grid.addEventListener("click", () => {
      printPlayerMarker(grid, C.pMarker);
    });
  });

  printPlayerMarker = (gr) => {
    gr.innerHTML = `${C.pMarker}`;
    let availablePositions = removePosition(gamePositions, gr.id);
    xArray.push(gr.id.slice(-1));

    chooseNextPosition(availablePositions, gr.id);

    checkConditions(xArray, C.pMarker);

    return xArray;
  };

  checkConditions = (A, Marker) => {
    let tempC = [];
    let i = 0;

    for (i = 0; i < winningConditions.length; i++) {
      tempC = winningConditions[i];

      if (A.length >= 3) {
        A = A.sort();

        arrayEquals = (A, tempC, Marker) => {
          let count = 0;
          let aStringified = JSON.stringify(A);
          let tempcStringified = JSON.stringify(tempC);

          if (aStringified.length == tempcStringified.length) {
            if (aStringified == tempcStringified) {
              announceWinner(Marker);
            }
          } else {
            for (let i = 0; i < A.length; i++) {
              for (let j = 0; j < tempC.length; j++) {
                if (tempC[j] == A[i]) {
                  count = count + 1;
                }
              }
            }

            if (count >= 3) {
              announceWinner(Marker);
            }
          }
        };

        arrayEquals(A, tempC, Marker);
      }
    }
  };

  announceWinner = (marker) => {
    console.log(`${marker} is the winner`);
  };

  //choose postion starts here

  chooseNextPosition = (avPositions, grId) => {
    let finalPosition = "";

    const levels = ["easy", "tough"];
    const randomLevel = levels[Math.floor(levels.length * Math.random())];

    if (randomLevel == "easy") {
      const chosenPosition =
        avPositions[Math.floor(avPositions.length * Math.random())];
      finalPosition = chosenPosition;

      playGameBot(finalPosition, C.bMarker, avPositions);
    } else {
      if (grId == "g1" || grId == "g3" || grId == "g7" || grId == "g9") {
        /*const chosenPosition =
          avPositions[Math.floor(avPositions.length * Math.random())];
        const lastDigit = chosenPosition.slice(-1);

        if (lastDigit % 2 == 0) {
          finalPosition = `g${parseInt(lastDigit) + 1}`;

          playGameBot(finalPosition, C.bMarker, avPositions);
        } else {
          finalPosition = chosenPosition;

          playGameBot(finalPosition, C.bMarker, avPositions);
        }*/

        let tempArray = [];
        avPositions.forEach((position) => {
          if (
            position == "g3" ||
            position == "g7" ||
            position == "g9" ||
            position == "g5"
          ) {
            tempArray.push(position);
          }
        });
        if (tempArray != []) {
          const finalPosition =
            tempArray[Math.floor(tempArray.length * Math.random())];

          playGameBot(finalPosition, C.bMarker, avPositions);
        } else {
          const finalPosition =
            avPositions[Math.floor(avPositions.length * Math.random())];
          finalPosition = chosenPosition;
          playGameBot(finalPosition, C.bMarker, avPositions);
        }
      } else if (grId == "g2") {
        let tempArray = [];
        avPositions.forEach((position) => {
          if (
            position == "g1" ||
            position == "g3" ||
            position == "g5" ||
            position == "g8"
          ) {
            tempArray.push(position);
          }
        });
        if (tempArray != []) {
          const finalPosition =
            tempArray[Math.floor(tempArray.length * Math.random())];
          playGameBot(finalPosition, C.bMarker, avPositions);
        } else {
          const finalPosition =
            avPositions[Math.floor(avPositions.length * Math.random())];
          finalPosition = chosenPosition;
          playGameBot(finalPosition, C.bMarker, avPositions);
        }
      } else if (grId == "g8") {
        let tempArray = [];
        avPositions.forEach((position) => {
          if (
            position == "g7" ||
            position == "g9" ||
            position == "g5" ||
            position == "g2"
          ) {
            tempArray.push(position);
          }
        });
        if (tempArray != []) {
          const finalPosition =
            tempArray[Math.floor(tempArray.length * Math.random())];
          playGameBot(finalPosition, C.bMarker, avPositions);
        } else {
          const finalPosition =
            avPositions[Math.floor(avPositions.length * Math.random())];
          finalPosition = chosenPosition;
          playGameBot(finalPosition, C.bMarker, avPositions);
        }
      } else if (grId == "g4") {
        let tempArray = [];
        avPositions.forEach((position) => {
          if (
            position == "g1" ||
            position == "g7" ||
            position == "g5" ||
            position == "g6"
          ) {
            tempArray.push(position);
          }
        });
        if (tempArray != []) {
          const finalPosition =
            tempArray[Math.floor(tempArray.length * Math.random())];
          playGameBot(finalPosition, C.bMarker, avPositions);
        } else {
          const finalPosition =
            avPositions[Math.floor(avPositions.length * Math.random())];
          finalPosition = chosenPosition;
          playGameBot(finalPosition, C.bMarker, avPositions);
        }
      } else if (grId == "g6") {
        let tempArray = [];
        avPositions.forEach((position) => {
          if (
            position == "g3" ||
            position == "g9" ||
            position == "g5" ||
            position == "g4"
          ) {
            tempArray.push(position);
          }
        });
        if (tempArray != []) {
          const finalPosition =
            tempArray[Math.floor(tempArray.length * Math.random())];

          playGameBot(finalPosition, C.bMarker, avPositions);
        } else {
          const finalPosition =
            avPositions[Math.floor(avPositions.length * Math.random())];
          finalPosition = chosenPosition;
          playGameBot(finalPosition, C.bMarker, avPositions);
        }
      } else if (grId == "g5") {
        const chosenPosition =
          avPositions[Math.floor(avPositions.length * Math.random())];
        finalPosition = chosenPosition;

        playGameBot(finalPosition, C.bMarker, avPositions);
      }
    }
  };

  //choose position function ends here
  removePosition = (gmPositions, gR) => {
    if (gmPositions.includes(gR)) {
      const index = gmPositions.indexOf(gR);

      const deletedPosition = gmPositions.splice(index, 1);

      pushMarkedPositions(deletedPosition);

      return gmPositions;
    }
  };

  playGameBot = (fP, bM, availablePos) => {
    printBotMarker(fP, bM, availablePos);
  };

  printBotMarker = (botPosition, botMarker, availablePos) => {
    botMarkerPosition = document.getElementById(`${botPosition}`);
    oArray.push(botPosition.slice(-1));
    console.log(oArray);

    botMarkerPosition.innerHTML = `${botMarker}`;

    removePosition(availablePos, botPosition);
    checkConditions(oArray, botMarker);

    return oArray;
  };
  const alreadyMarkedArray = [];
  pushMarkedPositions = (alreadyMarkedPostion) => {
    alreadyMarkedArray.push(alreadyMarkedPostion);
    // checkCombinations(alreadyMarkedArray);
    return alreadyMarkedArray;
  };
};
