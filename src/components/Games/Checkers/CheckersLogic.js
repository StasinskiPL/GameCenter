const isPawn = (id) => {
  if ((id < 20 || (id > 30 && id < 40)) && id % 2 === 0) {
    return "PAWN_BLACK";
  } else if (id > 20 && id < 30 && id % 2 === 1) {
    return "PAWN_BLACK";
  } else if (((id > 60 && id < 70) || id > 80) && id % 2 === 1) {
    return "PAWN_WHITE";
  } else if (id > 70 && id < 80 && id % 2 === 0) {
    return "PAWN_WHITE";
  } else {
    return null;
  }
};

const clearCell = (cell) => {
  return {
    ...cell,
    quenn: false,
    pawn: null,
  };
};

export const initGrid = () =>
  new Array(64).fill().map((_, index) => ({
    index: index,
    id: +index.toString(8) + 11,
    cellColor:
      (index % 16 > 8 && index % 2 === 1) || (index % 16 < 8 && index % 2 === 0)
        ? "CELL_WHITE"
        : "CELL_BROWN",
    // white black or null
    pawn: isPawn(+index.toString(8) + 11),
    quenn: false,
  }));

export const possibleMoves = (grid, pawn) => {};

const move = (grid, cell, pawn) => {
  grid[cell.index].pawn = grid[pawn.index].pawn;
  grid[cell.index].quenn = grid[pawn.index].quenn;
  grid[pawn.index] = clearCell(grid[pawn.index]);
  if (cell.id < 19 && grid[cell.index].pawn === "PAWN_WHITE") {
    grid[cell.index].quenn = true;
  }
  if (cell.id > 80 && grid[cell.index].pawn === "PAWN_BLACK") {
    grid[cell.index].quenn = true;
  }
  return grid;
};

const flipCellWithRemove = (grid, cell, cellToRemove, pawn) => {
  grid = move(grid, cell, pawn);
  grid[cellToRemove] = clearCell(grid[cellToRemove]);
  return grid;
};

const moveQuennOneSqr = (grid, pawnCell, position, target, ods) => {
  const updatedPosition = position + ods;
  const updatedPositionCell = grid.find((p) => p.id === updatedPosition);

  if (updatedPosition < 10 || updatedPosition > 88) {
    return null;
  }

  if (
    updatedPositionCell.pawn &&
    !(updatedPositionCell.pawn === pawnCell.pawn)
  ) {
    const nextPosition = grid.find((p) => p.id === updatedPosition + ods);
    if (nextPosition.pawn) {
      return null;
    } else {
      const currentIndex = grid.findIndex((p) => p.id === updatedPosition);

      return flipCellWithRemove(grid, nextPosition, currentIndex, pawnCell);
    }
  }
  if (updatedPosition === target) {
    const cell = grid.find((p) => p.id === target);
    return move(grid, cell, pawnCell);
  }
  if (updatedPositionCell.pawn === pawnCell.pawn) {
    return null;
  }
  return moveQuennOneSqr(grid, pawnCell, updatedPosition, target, ods);
};

const moveQuenn = (grid, pawn, cell) => {
  const pawnPosision = pawn.id;
  const targetPosition = cell.id;
  if (pawnPosision - targetPosition > 0) {
    if (pawnPosision % 10 > targetPosition % 10) {
      // left up
      return moveQuennOneSqr(grid, pawn, pawnPosision, targetPosition, -11);
    } else {
      // rigth up
      return moveQuennOneSqr(grid, pawn, pawnPosision, targetPosition, -9);
    }
  } else {
    if (pawnPosision % 10 > targetPosition % 10) {
      // left down
      return moveQuennOneSqr(grid, pawn, pawnPosision, targetPosition, 9);
    } else {
      // rigth down
      return moveQuennOneSqr(grid, pawn, pawnPosision, targetPosition, +11);
    }
  }
};

export const movePawn = (pawn, cell, grid) => {
  if (pawn.quenn) {
    return moveQuenn(grid, pawn, cell);
  }
  if (pawn.pawn === "PAWN_WHITE") {
    if (pawn.id === cell.id + 9) {
      return move(grid, cell, pawn);
    }
    if (pawn.id === cell.id + 11) {
      return move(grid, cell, pawn);
    }
    if (pawn.id === cell.id + 18) {
      const cellToRemoveIndex = grid.findIndex((c) => c.id === cell.id + 9);
      if (grid[cellToRemoveIndex].pawn === "PAWN_BLACK")
        return flipCellWithRemove(grid, cell, cellToRemoveIndex, pawn);
      return null;
    }
    if (pawn.id === cell.id + 22) {
      const cellToRemoveIndex = grid.findIndex((c) => c.id === cell.id + 11);
      if (grid[cellToRemoveIndex].pawn === "PAWN_BLACK")
        return flipCellWithRemove(grid, cell, cellToRemoveIndex, pawn);
      return null;
    }
  } else if (pawn.pawn === "PAWN_BLACK") {
    if (pawn.id === cell.id - 9) {
      return move(grid, cell, pawn);
    }
    if (pawn.id === cell.id - 11) {
      return move(grid, cell, pawn);
    }
    if (pawn.id === cell.id - 18) {
      const cellToRemoveIndex = grid.findIndex((c) => c.id === cell.id - 9);
      if (grid[cellToRemoveIndex].pawn === "PAWN_WHITE")
        return flipCellWithRemove(grid, cell, cellToRemoveIndex, pawn);
      return null;
    }
    if (pawn.id === cell.id - 22) {
      const cellToRemoveIndex = grid.findIndex((c) => c.id === cell.id - 11);
      if (grid[cellToRemoveIndex].pawn === "PAWN_WHITE")
        return flipCellWithRemove(grid, cell, cellToRemoveIndex, pawn);
      return null;
    }
  }
  return null;
};
