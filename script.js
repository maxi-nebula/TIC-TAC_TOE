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
      console.log(current);

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
  grids.forEach((grid) => {
    grid.addEventListener("click", () => {
      printMarker(grid);
    });
  });

  printMarker = (gr) => {
    gr.innerHTML = `${C.pMarker}`;
    const availablePositions = removePosition(gamePositions, gr.id);

    chooseNextPosition(availablePositions, gr.id);
  };

  chooseNextPosition = (avPositions, grId) => {
    let finalPosition = "";
    const levels = ["easy", "tough"];
    const randomLevel = levels[Math.floor(levels.length * Math.random())];

    if (randomLevel == "easy") {
      const chosenPosition =
        avPositions[Math.floor(avPositions.length * Math.random())];
      finalPosition = chosenPosition;

      playGameBot(finalPosition, C.bMarker);
    } else {
      console.log("tough level");
      if (grId == "g1" || grId == "g3" || grId == "g7" || grId == "g9") {
        const chosenPosition =
          avPositions[Math.floor(avPositions.length * Math.random())];
        const lastDigit = chosenPosition.slice(-1);

        if (lastDigit % 2 == 0) {
          finalPosition = `g${parseInt(lastDigit) + 1}`;
          playGameBot(finalPosition, C.bMarker);
        } else {
          finalPosition = chosenPosition;
          playGameBot(finalPosition, C.bMarker);
        }
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

  /*choosePosition = (Gr, positionsA) => {
 

    if (positionsA.includes(Gr)) {
      const index = positionsA.indexOf(Gr);
      console.log(index);
      removePosition(positionsA, index);
    }
  };
  removePosition = (pos, ind) => {
    const deletedPosition = pos.splice(ind, 1);
    console.log(pos);
    return pos;
  };*/

  playGameBot = (fP, bM) => {
    console.log(`choosing position ${fP}`);
  };
};
