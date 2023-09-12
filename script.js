/** @format */

const startButton = document.getElementById("startbutton");

const markerButtons = document.querySelectorAll(".button_markers");
const gamePositions = ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9"];

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
      printMarker(grid, C.pMarker);
    });
  });

  printMarker = (gr) => {
    gr.innerHTML = `${C.pMarker}`;
    let availablePositions = removePosition(gamePositions, gr.id);

    chooseNextPosition(availablePositions, gr.id);
  };

  chooseNextPosition = (avPositions, grId) => {
    let finalPosition = "";
    const levels = ["easy", "tough"];
    const randomLevel = levels[Math.floor(levels.length * Math.random())];

    if (randomLevel == "easy" || grId == "g5") {
      const chosenPosition =
        avPositions[Math.floor(avPositions.length * Math.random())];
      finalPosition = chosenPosition;

      playGameBot(finalPosition, C.bMarker, avPositions);
    } else {
      if (grId == "g1" || grId == "g3" || grId == "g7" || grId == "g9") {
        const chosenPosition =
          avPositions[Math.floor(avPositions.length * Math.random())];
        const lastDigit = chosenPosition.slice(-1);

        if (lastDigit % 2 == 0) {
          finalPosition = `g${parseInt(lastDigit) + 1}`;

          playGameBot(finalPosition, C.bMarker, avPositions);
        } else {
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

        const finalPosition =
          tempArray[Math.floor(tempArray.length * Math.random())];
        playGameBot(finalPosition, C.bMarker, avPositions);
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
        const finalPosition =
          tempArray[Math.floor(tempArray.length * Math.random())];
        playGameBot(finalPosition, C.bMarker, avPositions);
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
        const finalPosition =
          tempArray[Math.floor(tempArray.length * Math.random())];
        playGameBot(finalPosition, C.bMarker, avPositions);
      } else if (grId == "g6") {
        avPositions.forEach((position) => {
          if (
            position == "g3" ||
            position == "g9" ||
            position == "g5" ||
            position == "g4"
          ) {
            tempArray.push(position);
            console.log(tempArray);
          }
        });
        const finalPosition =
          tempArray[Math.floor(tempArray.length * Math.random())];
        playGameBot(finalPosition, C.bMarker, avPositions);
      }
    }
  };
  removePosition = (gmPositions, gR) => {
    if (gmPositions.includes(gR)) {
      const index = gmPositions.indexOf(gR);

      const deletedPosition = gmPositions.splice(index, 1);

      return gmPositions;
    }
  };

  playGameBot = (fP, bM, availablePos) => {
    printBotMarker(fP, bM, availablePos);
  };

  printBotMarker = (botPosition, botMarker, availablePos) => {
    botMarkerPosition = document.getElementById(`${botPosition}`);

    botMarkerPosition.innerHTML = `${botMarker}`;

    removePosition(availablePos, botPosition);
  };

  checkWinner = (gamboard) => {
    gamboard.forEach((gridItem) => {
      if (gridItem.innerHTML == "X") {
        markerArray.push(gridItem);
      }
    });
    console.log(markerArray);
  };
};
