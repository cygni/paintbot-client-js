export const enum MessageType {
  // Requests
  ClientInfo = 'se.cygni.paintbot.api.request.ClientInfo',
  StartGame = 'se.cygni.paintbot.api.request.StartGame',
  RegisterMove = 'se.cygni.paintbot.api.request.RegisterMove',
  RegisterPlayer = 'se.cygni.paintbot.api.request.RegisterPlayer',
  HeartBeatRequest = 'se.cygni.paintbot.api.request.HeartBeatRequest',

  // Responses
  HeartBeatResponse = 'se.cygni.paintbot.api.response.HeartBeatResponse',
  PlayerRegistered = 'se.cygni.paintbot.api.response.PlayerRegistered',

  // Exceptions
  InvalidMessage = 'se.cygni.paintbot.api.exception.InvalidMessage',
  InvalidPlayerName = 'se.cygni.paintbot.api.exception.InvalidPlayerName',
  NoActiveTournament = 'se.cygni.paintbot.api.exception.NoActiveTournament',

  // Events
  ArenaUpdate = 'se.cygni.paintbot.api.event.ArenaUpdateEvent',
  CharacterStunned = 'se.cygni.paintbot.api.event.CharacterStunnedEvent',
  GameAborted = 'se.cygni.paintbot.api.event.GameAbortedEvent',
  GameChanged = 'se.cygni.paintbot.api.event.GameChangedEvent',
  GameCreated = 'se.cygni.paintbot.api.event.GameCreatedEvent',
  GameEnded = 'se.cygni.paintbot.api.event.GameEndedEvent',
  GameLink = 'se.cygni.paintbot.api.event.GameLinkEvent',
  GameResult = 'se.cygni.paintbot.api.event.GameResultEvent',
  GameStarting = 'se.cygni.paintbot.api.event.GameStartingEvent',
  MapUpdate = 'se.cygni.paintbot.api.event.MapUpdateEvent',
  TournamentEnded = 'se.cygni.paintbot.api.event.TournamentEndedEvent',
}

export type CharacterAction = 'LEFT' | 'RIGHT' | 'UP' | 'DOWN' | 'STAY' | 'EXPLODE';
export type InvalidPlayerNameReason = 'Taken' | 'Empty' | 'InvalidCharacter';
export type StunReason =
  | 'CollisionWithWall'
  | 'CollisionWithObstacle'
  | 'CollisionWithCharacter'
  | 'CaughtByBombExplosion';

export interface GameSettings {
  maxNoofPlayers: number;
  startSnakeLength: number;
  timeInMsPerTick: number;
  obstaclesEnabled: boolean;
  foodEnabled: boolean;
  headToTailConsumes: boolean;
  tailConsumeGrows: boolean;
  addFoodLikelihood: number;
  removeFoodLikelihood: number;
  spontaneousGrowthEveryNWorldTick: number;
  trainingGame: boolean;
  pointsPerLength: number;
  pointsPerFood: number;
  pointsPerCausedDeath: number;
  pointsPerNibble: number;
  noofRoundsTailProtectedAfterNibble: number;
  startFood: number;
  startObstacles: number;
}

export interface CharacterInfo {
  playerId: string;
  name: string;
  points: number;
  position: number;
  colouredPositions: number[];
  stunnedForGameTicks: number;
}

export interface CollisionInfo {
  position: number;
  colliders: string;
}

export interface BombingInfo {
  position: number;
  bombers: string;
}

export interface Map {
  width: number;
  height: number;
  worldTick: number;
  characterInfos: CharacterInfo[];
  bombPositions: number[];
  obstaclePositions: number[];
  collisionInfos: CollisionInfo[];
  bombingInfos: BombingInfo[];
}

export interface ClientInfoMessage {
  type: MessageType.ClientInfo;
  language: string;
  languageVersion?: string;
  operatingSystem?: string;
  operatingSystemVersion?: string;
  clientVersion?: string;
}

export interface StartGameMessage {
  type: MessageType.StartGame;
}

export interface RegisterPlayerMessage {
  type: MessageType.RegisterPlayer;
  playerName: string;
  gameSettings?: Partial<GameSettings>;
}

export interface RegisterMoveMessage {
  type: MessageType.RegisterMove;
  gameId: string;
  gameTick: number;
  direction: CharacterAction;
}

export interface HeartBeatRequestMessage {
  type: MessageType.HeartBeatRequest;
}

export interface HeartBeatResponseMessage {
  type: MessageType.HeartBeatResponse;
}

export interface InvalidMessageMessage {
  type: MessageType.InvalidMessage;
  errorMessage: string;
  receivedMessage: string;
}

export interface InvalidPlayerNameMessage {
  type: MessageType.InvalidPlayerName;
  reasonCode: InvalidPlayerNameReason;
}

export interface NoActiveTournamentMessage {
  type: MessageType.NoActiveTournament;
}

export interface PlayerRegisteredMessage {
  type: MessageType.PlayerRegistered;
}

export interface ArenaUpdateMessage {
  type: MessageType.ArenaUpdate;
  arenaName: string;
  gameId: string;
  ranked: boolean;
  rating: Record<string, number>;
  onlinePlayers: string[];
  gameHistory: Array<{
    gameId: string;
    playerPositions: string[];
  }>;
}

export interface CharacterStunnedMessage {
  type: MessageType.CharacterStunned;
  gameId: string;
  playerId: string;
  stunReason: StunReason;
  durationInTicks: number;
  x: number;
  y: number;
  long: number;
}

export interface GameAbortedMessage {
  type: MessageType.GameAborted;
  gameId: string;
}

export interface GameChangedMessage {
  type: MessageType.GameChanged;
  gameId: string;
}

export interface GameCreatedMessage {
  type: MessageType.GameCreated;
  gameId: string;
}

export interface GameLinkMessage {
  type: MessageType.GameLink;
  gameId: string;
  url: string;
}

export interface GameEndedMessage {
  type: MessageType.GameEnded;
  playerWinnerId: string;
  playerWinnerName: string;
  gameId: string;
  gameTick: number;
  map: Map;
}

export interface GameResultMessage {
  type: MessageType.GameResult;
  gameId: string;
  gameResult: Array<{
    playerName: string;
    playerId: string;
    rank: number;
    points: number;
    alive: boolean;
  }>;
}

export interface GameStartingMessage {
  type: MessageType.GameStarting;
  gameId: string;
  noofPlayers: number;
  width: number;
  gameHeight: number;
  gameSettings: GameSettings;
}

export interface MapUpdateMessage {
  type: MessageType.MapUpdate;
  receivingPlayerId: string;
  gameId: string;
  gameTick: number;
  map: Map;
}

export interface TournamentEndedMessage {
  type: MessageType.TournamentEnded;
  tournamentId: string;
  tournamentName: string;
  playerWinnerId: string;
  gameId: string;
  gameResult: Array<{
    name: string;
    playerId: string;
    points: number;
  }>;
}

export type Message =
  // Requests
  | ClientInfoMessage
  | StartGameMessage
  | RegisterMoveMessage
  | RegisterPlayerMessage
  | HeartBeatRequestMessage
  // Responses
  | HeartBeatResponseMessage
  | PlayerRegisteredMessage
  // Exceptions
  | InvalidMessageMessage
  | InvalidPlayerNameMessage
  | NoActiveTournamentMessage
  // Events
  | ArenaUpdateMessage
  | CharacterStunnedMessage
  | GameAbortedMessage
  | GameChangedMessage
  | GameCreatedMessage
  | GameEndedMessage
  | GameLinkMessage
  | GameResultMessage
  | GameStartingMessage
  | MapUpdateMessage
  | TournamentEndedMessage;
