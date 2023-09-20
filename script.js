/** @format */

/*declaration of global variables */
const startButton = document.getElementById("startbutton");

const markerButtons = document.querySelectorAll(".button_markers");
const gamePositions = ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9"];
let xArray = [];
let oArray = [];
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

/*Starting the game */
startButton.addEventListener("click", () => {
  if (startButton.innerHTML == "Start") {
    const markerDiv = document.querySelector(".markers");

    markerDiv.classList.replace("markers", "markers-show");

    markerButtons.forEach((b) => {
      b.addEventListener("click", () => {
        const current = setMarkers(b);
        startButton.innerHTML = "Restart";

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
  } else if (startButton.innerHTML == "Restart") {
    clearArray();
  }

  /*Setting marker */
});

/*clearing board and restarting game */

/*Playing game begins here */
playGame = (C) => {
  const grids = document.querySelectorAll(".item");
  const markerArray = [];
  grids.forEach((grid) => {
    grid.addEventListener("click", () => {
      const playerReturn = printPlayerMarker(grid, C.pMarker);
    });
  });

  /*Printing player marker */
  printPlayerMarker = (gr) => {
    gr.innerHTML = `${C.pMarker}`;
    console.log(`chosen grid is ${gr.id}`);
    xArray.push(gr.id.slice(-1));
    let availablePositions = removePosition(gamePositions, gr.id);
    const trigger = checkConditions(xArray, C.pMarker);

    if (trigger == 1) {
      return;
    }
    chooseNextPosition(availablePositions, gr.id);
    console.log(xArray);

    return xArray;
  };

  clearArray = () => {
    xArray = [];
    oArray = [];

    window.location.reload(true);
  };
  /*Checking conditions to see if there is a winner */

  checkConditions = (A, Marker) => {
    let tempC = [];
    let i = 0;
    let stopTrigger = 0;

    for (i = 0; i < winningConditions.length; i++) {
      tempC = winningConditions[i];

      if (A.length >= 3) {
        A = A.sort();

        arrayEquals = (A, tempC, Marker) => {
          let count = 0;

          let aStringified = JSON.stringify(A);
          let tempcStringified = JSON.stringify(tempC);

          if (aStringified.length == tempcStringified.length) {
            stopTrigger = 1;
            if (aStringified == tempcStringified) {
              stopTrigger = 1;
              announceWinner(Marker, stopTrigger);
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
              stopTrigger = 1;
              announceWinner(Marker, stopTrigger);
            }
          }
        };

        arrayEquals(A, tempC, Marker);
      }
    }

    return stopTrigger;
  };

  announceWinner = (marker) => {
    const para = document.createElement("p");
    const node = document.createTextNode(`${marker} is the Winner`);
    para.appendChild(node);
    const winnerDiv = document.getElementById("winnerDiv");

    winnerDiv.classList.add("winnerDiv");
    winnerDiv.appendChild(para);

    startButton.innerHTML = "Restart";
  };

  //choose postion starts here

  chooseNextPosition = (avPositions, grId) => {
    let finalPosition = "";

    const levels = ["easy", "tough"];
    // const levels = ["tough"];
    const randomLevel = levels[Math.floor(levels.length * Math.random())];

    if (randomLevel == "easy") {
      const chosenPosition =
        avPositions[Math.floor(avPositions.length * Math.random())];
      finalPosition = chosenPosition;

      playGameBot(finalPosition, C.bMarker, avPositions);
    } else {
      if (grId == "g1" || grId == "g3" || grId == "g7" || grId == "g9") {
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
          finalPosition =
            tempArray[Math.floor(tempArray.length * Math.random())];

          playGameBot(finalPosition, C.bMarker, avPositions);
        } else {
          finalPosition =
            avPositions[Math.floor(avPositions.length * Math.random())];

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
          finalPosition =
            tempArray[Math.floor(tempArray.length * Math.random())];
          playGameBot(finalPosition, C.bMarker, avPositions);
        } else {
          finalPosition =
            avPositions[Math.floor(avPositions.length * Math.random())];
          // finalPosition = chosenPosition;
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
          finalPosition =
            tempArray[Math.floor(tempArray.length * Math.random())];
          playGameBot(finalPosition, C.bMarker, avPositions);
        } else {
          const finalPosition =
            avPositions[Math.floor(avPositions.length * Math.random())];
          //finalPosition = chosenPosition;
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
          finalPosition =
            tempArray[Math.floor(tempArray.length * Math.random())];

          playGameBot(finalPosition, C.bMarker, avPositions);
        } else {
          const finalPosition =
            avPositions[Math.floor(avPositions.length * Math.random())];

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
          finalPosition =
            tempArray[Math.floor(tempArray.length * Math.random())];

          playGameBot(finalPosition, C.bMarker, avPositions);
        } else {
          finalPosition =
            avPositions[Math.floor(avPositions.length * Math.random())];
          //     finalPosition = chosenPosition;

          playGameBot(finalPosition, C.bMarker, avPositions);
        }
      } else if (grId == "g5") {
        finalPosition =
          avPositions[Math.floor(avPositions.length * Math.random())];
        //  finalPosition = chosenPosition;

        playGameBot(finalPosition, C.bMarker, avPositions);
      }
    }
  };
  clearBoard = () => {
    let mD = document.querySelectorAll(".item");
    mD.forEach((d) => {
      d.innerHTML = "";
    });

    startButton.innerHTML = "start";
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
    const botReturn = printBotMarker(fP, bM, availablePos);
  };

  printBotMarker = (botPosition, botMarker, availablePos) => {
    botMarkerPosition = document.getElementById(`${botPosition}`);
    oArray.push(botPosition.slice(-1));

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
  return;
};
