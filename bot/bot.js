import { Action, MessageType, MapUtility } from '../src/index.js';

export const BOT_NAME = 'Power Mad';

/*
  This bot is hungry for power. It always goes for the closest power up.
  It's smart enough to not crash into obstacles, but not smart enough to find a way around them.
  If there are no power ups, it just moves in a random valid direction.
*/

/**
 * @template T
 * @param {readonly T[]} items
 * @returns {T}
 */
function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const directionActions = [Action.Down, Action.Up, Action.Left, Action.Right];

/**
 * @param {import('../src/index.js').MapUpdateEvent} mapUpdateEvent
 * @returns {Action | Promise<Action>}
 */
export function getNextAction(mapUpdateEvent) {
  const mapUtils = new MapUtility(mapUpdateEvent.map, mapUpdateEvent.receivingPlayerId);
  const myCharacter = mapUtils.getMyCharacterInfo();

  if (myCharacter.carryingPowerUp) {
    return Action.Explode;
  }

  const powerUpCoordinates = mapUtils.getCoordinatesContainingPowerUps();

  if (powerUpCoordinates.length) {
    const myCoordinates = mapUtils.getMyCoordinate();

    const sortedPowerUpCoordinates = powerUpCoordinates.sort(
      (a, b) => a.manhattanDistanceTo(myCoordinates) - b.manhattanDistanceTo(myCoordinates),
    );
    const closestPowerUpCoordinate = sortedPowerUpCoordinates[0];

    const xDiff = closestPowerUpCoordinate.x - myCoordinates.x;
    const yDiff = closestPowerUpCoordinate.y - myCoordinates.y;

    if (xDiff > 0 && mapUtils.canIMoveInDirection(Action.Right)) {
      return Action.Right;
    } else if (xDiff < 0 && mapUtils.canIMoveInDirection(Action.Left)) {
      return Action.Left;
    } else if (yDiff < 0 && mapUtils.canIMoveInDirection(Action.Up)) {
      return Action.Up;
    } else if (yDiff > 0 && mapUtils.canIMoveInDirection(Action.Down)) {
      return Action.Down;
    }
  }

  const validActions = directionActions.filter((action) => mapUtils.canIMoveInDirection(action));

  if (!validActions.length) {
    return Action.Stay;
  }

  return randomItem(validActions);
}

// This handler is optional
export function onMessage(message) {
  switch (message.type) {
    case MessageType.GameStarting:
      // Reset bot state here
      break;
  }
}

// Set to null to user server default settings
export const GAME_SETTINGS = {
  maxNoofPlayers: 5,
  timeInMsPerTick: 250,
  obstaclesEnabled: true,
  powerUpsEnabled: true,
  addPowerUpLikelihood: 15,
  removePowerUpLikelihood: 5,
  trainingGame: true,
  pointsPerTileOwned: 1,
  pointsPerCausedStun: 5,
  noOfTicksInvulnerableAfterStun: 3,
  minNoOfTicksStunned: 8,
  maxNoOfTicksStunned: 10,
  startObstacles: 5,
  startPowerUps: 0,
  gameDurationInSeconds: 60,
  explosionRange: 4,
  pointsPerTick: false,
};
