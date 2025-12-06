const http = require('http');
const HaxballJS = require('haxball.js');
const localStorage = require('./storage');

const PORT = process.env.PORT || 8080;

// Servidor HTTP para que Fly no tire timeout
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('X3 Host running\n');
});
server.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});

// Acá vamos a tener el room accesible globalmente
let room;

// Cargamos Haxball Headless en Node
HaxballJS().then((HBInit) => {
  room = HBInit({
    roomName: "🟣 X3 Thrivium (ELO + PICKS) 🟣",
    maxPlayers: 18,
    noPlayer: true,
    public: true,
    token: "thr1.AAAAAGkvuJv916TGT4XJow.D8VlVxHqaLQ",
    geo: {code: "AR", lat: -36, lon:-59.9964}  
});

// MAPA

var stadiumFileText = `
{
	"name" : "X3 Thrivium",

	"width" : 620,

	"height" : 270,

	"bg" : { "width" : 418, "height" : 500, "kickOffRadius" : 100, "cornerRadius" : 1, "color" : "303030" },

	"vertexes" : [
		/* 0 */ { "x" : 550, "y" : -240, "cMask" : ["ball" ] },
		/* 1 */ { "x" : -550, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 2, "color" : "ffffff" },
		/* 2 */ { "x" : -590, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 0, "color" : "ffffff" },
		/* 3 */ { "x" : -590, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 0, "color" : "ffffff" },
		/* 4 */ { "x" : -550, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 2, "color" : "ffffff" },
		/* 5 */ { "x" : 550, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : -2, "color" : "ffffff" },
		/* 6 */ { "x" : 590, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 0, "color" : "ffffff" },
		/* 7 */ { "x" : 590, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 0, "color" : "ffffff" },
		/* 8 */ { "x" : 550, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : -2, "color" : "ffffff" },
		/* 9 */ { "x" : -550, "y" : 80, "bCoef" : 1.1, "cMask" : ["ball" ], "color" : "8B5FD9", "bias" : 40 },
		/* 10 */ { "x" : -550, "y" : 240, "bCoef" : 1.1, "cMask" : ["ball" ], "color" : "8B5FD9", "bias" : 40 },
		/* 11 */ { "x" : -550, "y" : -80, "bCoef" : 1.1, "cMask" : ["ball" ], "color" : "8B5FD9", "bias" : -40 },
		/* 12 */ { "x" : -550, "y" : -240, "bCoef" : 1.1, "cMask" : ["ball" ], "color" : "8B5FD9", "bias" : -40 },
		/* 13 */ { "x" : -551.5, "y" : 240, "cMask" : ["ball" ], "color" : "8B5FD9" },
		/* 14 */ { "x" : 551.5, "y" : 240, "cMask" : ["ball" ], "color" : "8B5FD9" },
		/* 15 */ { "x" : 550, "y" : 80, "bCoef" : 1.1, "cMask" : ["ball" ], "color" : "8B5FD9", "bias" : -40 },
		/* 16 */ { "x" : 550, "y" : 240, "bCoef" : 1.1, "cMask" : ["ball" ], "color" : "8B5FD9", "bias" : -40 },
		/* 17 */ { "x" : 550, "y" : -240, "bCoef" : 1.1, "cMask" : ["ball" ], "color" : "8B5FD9", "bias" : -40 },
		/* 18 */ { "x" : 550, "y" : -80, "bCoef" : 1.1, "cMask" : ["ball" ], "color" : "8B5FD9", "bias" : -40 },
		/* 19 */ { "x" : 550, "y" : -240, "bCoef" : 0, "cMask" : ["ball" ] },
		/* 20 */ { "x" : 550, "y" : -240, "bCoef" : 0, "cMask" : ["ball" ] },
		/* 21 */ { "x" : -551.5, "y" : -240, "cMask" : ["ball" ], "color" : "8B5FD9" },
		/* 22 */ { "x" : 551.5, "y" : -240, "cMask" : ["ball" ], "color" : "8B5FD9" },
		/* 23 */ { "x" : 0, "y" : -240, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "8B5FD9", "vis" : false },
		/* 24 */ { "x" : 0, "y" : -81.4, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "8B5FD9" },
		/* 25 */ { "x" : 0, "y" : 81.4, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "8B5FD9" },
		/* 26 */ { "x" : 0, "y" : 240, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "8B5FD9", "vis" : false },
		/* 27 */ { "x" : 550, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "999999" },
		/* 28 */ { "x" : 550, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "999999" },
		/* 29 */ { "x" : -550, "y" : -80, "bCoef" : 0.1, "cMask" : [ ], "color" : "a3acc2" },
		/* 30 */ { "x" : -550, "y" : 80, "bCoef" : 0.1, "cMask" : [ ], "color" : "a3acc2" },
		/* 31 */ { "x" : 550, "y" : -80, "bCoef" : 0.1, "cMask" : [ ], "color" : "a3acc2" },
		/* 32 */ { "x" : 550, "y" : 80, "bCoef" : 0.1, "cMask" : [ ], "color" : "a3acc2" },
		/* 33 */ { "x" : -548.5, "y" : 160, "bCoef" : 0.1, "cMask" : [ ], "color" : "8B5FD9" },
		/* 34 */ { "x" : -548.5, "y" : -160, "bCoef" : 0.1, "cMask" : [ ], "color" : "8B5FD9" },
		/* 35 */ { "x" : 548.5, "y" : 160, "bCoef" : 0.1, "cMask" : [ ], "color" : "8B5FD9" },
		/* 36 */ { "x" : 548.5, "y" : -160, "bCoef" : 0.1, "cMask" : [ ], "color" : "8B5FD9" },
		/* 37 */ { "x" : -590, "y" : -81.5, "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 0, "color" : "ffffff" },
		/* 38 */ { "x" : -590, "y" : 81.5, "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 0, "color" : "ffffff" },
		/* 39 */ { "x" : 590, "y" : -81.5, "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 0, "color" : "ffffff" },
		/* 40 */ { "x" : 590, "y" : 81.5, "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 0, "color" : "ffffff" },
		/* 41 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "8B5FD9" },
		/* 42 */ { "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "8B5FD9" },
		/* 43 */ { "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "a3acc2" },
		/* 44 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "FFC800", "curve" : 0 },
		/* 45 */ { "x" : 0, "y" : 273.241909911278, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "vis" : false },
		/* 46 */ { "x" : 0, "y" : -270.4079786837766, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "vis" : false }

	],

	"segments" : [
		{ "v0" : 1, "v1" : 2, "color" : "ffffff", "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 2 },
		{ "v0" : 3, "v1" : 4, "color" : "ffffff", "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 2 },
		{ "v0" : 5, "v1" : 6, "color" : "ffffff", "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : -2 },
		{ "v0" : 7, "v1" : 8, "color" : "ffffff", "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : -2 },
		{ "v0" : 9, "v1" : 10, "color" : "8B5FD9", "bCoef" : 1.1, "cMask" : ["ball" ], "bias" : 40 },
		{ "v0" : 11, "v1" : 12, "color" : "8B5FD9", "bCoef" : 1.1, "cMask" : ["ball" ], "bias" : -40 },
		{ "v0" : 13, "v1" : 14, "color" : "8B5FD9", "cMask" : ["ball" ] },
		{ "v0" : 15, "v1" : 16, "color" : "8B5FD9", "bCoef" : 1.1, "cMask" : ["ball" ], "bias" : -40 },
		{ "v0" : 17, "v1" : 18, "color" : "8B5FD9", "bCoef" : 1.1, "cMask" : ["ball" ], "bias" : -40 },
		{ "v0" : 19, "v1" : 20, "color" : "F8F8F8", "bCoef" : 0, "cMask" : ["ball" ] },
		{ "v0" : 21, "v1" : 22, "color" : "8B5FD9", "cMask" : ["ball" ] },
		{ "v0" : 23, "v1" : 24, "color" : "8B5FD9", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		{ "v0" : 25, "v1" : 26, "color" : "8B5FD9", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		{ "v0" : 29, "v1" : 30, "color" : "a3acc2", "bCoef" : 0.1, "cMask" : [ ] },
		{ "v0" : 31, "v1" : 32, "color" : "a3acc2", "bCoef" : 0.1, "cMask" : [ ] },
		{ "v0" : 34, "v1" : 33, "curve" : 180, "color" : "8B5FD9", "bCoef" : 0.1, "cMask" : [ ], "curveF" : 6.1232339957368e-17 },
		{ "v0" : 35, "v1" : 36, "curve" : 180, "color" : "8B5FD9", "bCoef" : 0.1, "cMask" : [ ], "curveF" : 6.1232339957368e-17 },
		{ "v0" : 37, "v1" : 38, "color" : "ffffff", "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 0 },
		{ "v0" : 39, "v1" : 40, "color" : "ffffff", "bCoef" : 0.1, "cMask" : ["ball" ], "bias" : 0 },
		{ "v0" : 41, "v1" : 42, "curve" : 180, "color" : "8B5FD9", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "curveF" : 6.1232339957368e-17 },
		{ "v0" : 42, "v1" : 41, "curve" : 180, "color" : "8B5FD9", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "curveF" : 6.1232339957368e-17 },
		{ "v0" : 26, "v1" : 45, "vis" : false, "color" : "FFC800", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		{ "v0" : 23, "v1" : 46, "vis" : false, "color" : "FFC800", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] }

	],

	"planes" : [
		{ "normal" : [0,1 ], "dist" : -240, "bCoef" : 1.1, "cMask" : ["ball" ] },
		{ "normal" : [0,-1 ], "dist" : -240, "bCoef" : 1.1, "cMask" : ["ball" ] },
		{ "normal" : [0,1 ], "dist" : -270, "bCoef" : 0.1 },
		{ "normal" : [0,-1 ], "dist" : -270, "bCoef" : 0.1 },
		{ "normal" : [1,0 ], "dist" : -620, "bCoef" : 0.1 },
		{ "normal" : [-1,0 ], "dist" : -620, "bCoef" : 0.1 },
		{ "normal" : [1,0 ], "dist" : -590, "bCoef" : 0.1, "cMask" : ["ball" ] },
		{ "normal" : [-1,0 ], "dist" : -590, "bCoef" : 0.1, "cMask" : ["ball" ] }

	],

	"goals" : [
		{ "p0" : [550,80 ], "p1" : [550,-80 ], "team" : "blue", "color" : "999999" },
		{ "p0" : [-550,-80 ], "p1" : [-550,80 ], "team" : "red", "color" : "999999" }

	],

	"discs" : [
		{ "radius" : 4.5, "invMass" : 0, "pos" : [-550,80 ], "color" : "FF4B44" },
		{ "radius" : 4.5, "invMass" : 0, "pos" : [-550,-80 ], "color" : "FF4B44" },
		{ "radius" : 4.5, "invMass" : 0, "pos" : [550,80 ], "color" : "6666FF" },
		{ "radius" : 4.5, "invMass" : 0, "pos" : [550,-80 ], "color" : "6666FF" }

	],

	"playerPhysics" : {
		"bCoef" : 0,
		"acceleration" : 0.11,
		"kickingAcceleration" : 0.083,
		"kickStrength" : 5

	},

	"ballPhysics" : {
		"radius" : 6.25,
		"bCoef" : 0.4,
		"invMass" : 1.5,
		"damping" : 0.99,
		"color" : "FFFFFF"

	},

	"spawnDistance" : 268,

	"traits" : [
		

	],

	"joints" : [
		

	],

	"redSpawnPoints" : [
		

	],

	"blueSpawnPoints" : [
		

	],

	"canBeStored" : false,

	"cameraWidth" : 0,

	"cameraHeight" : 0,

	"maxViewWidth" : 0,

	"cameraFollow" : "ball",

	"kickOffReset" : "partial"
}`;

room.setCustomStadium(stadiumFileText);

// INTERVALOS

setInterval(saveStats, 60000);

// ROOM CONFIG

room.setScoreLimit(3);
room.setTimeLimit(3);
room.setTeamsLock(true);

// VARIABLES GLOBALES

const adminWebhookURL = 'https://discord.com/api/webhooks/1445573103299067945/XmxIUw8EfpSa2kKx2zs97p1snQI24JLbeOCCcBmM2AtNRhjFhlpR4q1nQjkmH1qNP4BI'; 
const chatLogWebhookURL = 'https://discord.com/api/webhooks/1445572651274993766/Ta_BF3lF662C3BwRQISxgwRUtquhC7ZMtDX-vkRT3sVf_HvdQuIrJo6XTHajTr1L7OW2';
const entryExitWebhookURL = 'https://discord.com/api/webhooks/1445572486363353139/xuMdVB-gi6GWLBTeE-Cyz6stn2vfhjEgA6F-IecRV8i_ETYrXd42PyfpXr0hItJKbLt5'; 
var playerStats = {};
let lastTouch = null;
let prelastTouch = null;
let lastTouchAuth;
let prelastTouchAuth;
let pauseVote = false;
const jugardenuevoCooldowns = {};
const usedJugardenuevo = new Set();
let pauseVoters = new Set();
let resumen = "";
const players = {};
let redTeam;
let blueTeam;
let redGK = null;
let blueGK = null; 
let afkPlayers = [];
let initialRedPlayers = 0;
let initialBluePlayers = 0;
let redTeamWinStreak = 0;
let blueTeamWinStreak = 0;
var minimumPlayersMet = false;
let playerQueue = [];
let latePlayers = new Set(); 
let gameStatsEnabled = false; 
let gameStartedWithSixPlayers = false;
let warmupMode = false; 
let gameStarted = false;
let isKickOff = true;
let mvp;
let loggedAdmins = []; 
const MVP_POINTS = {
    goal: 10,
    assist: 7,
    cleanSheet: 15,
    pass: 0.1
};
let vips = {};
const GOAL_AREA_DISTANCE = 200; 
let saves = {};
const recWebhookURL = "https://discord.com/api/webhooks/1445572987217510523/rhlOhnE7qpPJ9iR5aH2XyaK4A0QTreG7Q5GXIr1foMs_4eF_vmFD-urFuH0dfgOA2Sdb";
let matchStats = {};
let currentReplay = null;
let gameStatsBuffer = {
    goals: [],
    assists: [],
    ownGoals: []
};
let matchEvents = [];
let matchStartTime = 0;
const eventTime = Date.now() - matchStartTime;
const callAdminWebhookURL = "https://discord.com/api/webhooks/1445572844862967870/Mrq-oBwHyQdVuJswT12KyNbDYVBy4pXgxmw13smhfdHTzsWbugKzq4c_6BSF38rD70HX";
const moderationWebhookURL = "https://discord.com/api/webhooks/1445572754513465504/cieTIYBCP9zho5vEfxresLmCr5NK7cH3CfqiZVadDHDfIMri38c1D9qrbaa3Ym9-oGIq";
let blacklist = { auths: [], ips: [] };
let uniqueAuths = new Set();
let queue = []; 
let waitingQueue = []; 
let invicto;
const maxTeamSize = 3;
let movingPlayer = null;
let mutedPlayers = {};

let tempBans = {
    auths: [
        // {
        //   auth: "XXXXXXXX",
        //   name: "Pepito",
        //   expiresAt: 0,
        //   reason: "Flood",
        //   by: "Admin",
        //   hostBanId: null // id del jugador usado en room.kickPlayer(..., true)
        // }
    ]
};

function loadTempBans() {
    const saved = localStorage.getItem("tempBans");
    if (saved) {
        try {
            tempBans = JSON.parse(saved);
        } catch (e) {
            console.error("[TEMPBANS] Error parseando tempBans, se reinicia:", e);
            tempBans = { auths: [] };
        }
    }
}

function saveTempBans() {
    localStorage.setItem("tempBans", JSON.stringify(tempBans));
}

loadTempBans();

let player_on_game = [[], []];
let Players_team = [[], [], []];

const VOTES_REQUIRED = 2;
const VOTE_WINDOW_MS = 30000;
const PAUSE_TIME_MS  = 30000;

let autoStartTimeout = null;

const winPoints = 3;
const losePoints = -4;
const cleanSheetPoints = 6;	
const goalPoints = 2;
const assistPoints = 1;
const ownGoalPoints = -2;
const mvpPoints = 4;

// --- SISTEMA DE PICKS ---
const MIN_PLAYERS_FOR_PICKS = 6;      // Jugadores no AFK mínimos para activar picks
const PICK_TIME_LIMIT_MS = 15000;     // 15 segundos para pickear

let picksActive = false;              // ¿hay picks activos?
let pickMode = null;                  // "postGame" | "midGame"
let pickingCaptain = null;            // jugador que está pickeando
let pickTeamToFill = null;            // 1 o 2 en modo midGame
let pickTimeoutId = null;             // timeout actual del pick

loadBlacklist();

// RANGOS

const ranks = [
	{ name: "👴 Retirado", minElo: -Infinity, maxElo: -1 },
    { name: "🏃‍♂️ Aspirante", minElo: 0, maxElo: 99 },
    { name: "🌱 Promesa", minElo: 100, maxElo: 249 },
    { name: "🌟 Fenomeno", minElo: 250, maxElo: 399 },
    { name: "💫 Prodigio", minElo: 400, maxElo: 599},
    { name: "⚽ Pichichi", minElo: 600, maxElo: 849 },
    { name: "🏅 Emblema", minElo: 850, maxElo: 1149 },
    { name: "🌞 Iluminado", minElo: 1150, maxElo: 1499 },
    { name: "🦁 Titan", minElo: 1500, maxElo: 1999 },
    { name: "🏆 Leyenda", minElo: 2000, maxElo: 3499 },
    { name: "👑 Thrivium", minElo: 3500, maxElo: Infinity }
];

function getRank(elo) {
	elo = Math.max(elo, -20);
    for (const rank of ranks) {
        if (elo >= rank.minElo && elo <= rank.maxElo) {
            return rank.name;
        }
    }
    return "Sin rango";
}

// CAMISETAS

let teams = {
    elite: [
        { name: "Argentina", colors: { angle: 0, textColor: 0x000000, colors: [0x00AEC9, 0xFFFFFF, 0x00AEC9] } },
        { name: "Colombia", colors: { angle: 0, textColor: 0xFF0808, colors: [0xFFFF1C] } },
        { name: "Peru", colors: { angle: 60, textColor: 0x1F1F1F, colors: [0xE60000, 0xFCFCFC, 0xE61515] } },
        { name: "Turquia", colors: { angle: 0, textColor: 0xFFFFFF, colors: [0xED0000, 0xFF0000, 0xCF0000] } },
        { name: "España", colors: { angle: 0, textColor: 0xFFEA29, colors: [0xFF0000] } },
        { name: "Alemania", colors: { angle: 0, textColor: 0x000000, colors: [0xFFFFFF] } },
        { name: "Juventus", colors: { angle: 0, textColor: 0xFFE600, colors: [0x000000, 0xFFFFFF, 0x000000] } },
        { name: "Napoli", colors: { angle: 0, textColor: 0xFFFFFF, colors: [0x0099FF] } },
        { name: "Roma", colors: { angle: 0, textColor: 0x000000, colors: [0xFFF700, 0x940000] } },
        { name: "Inter", colors: { angle: 0, textColor: 0x000000, colors: [0x001E94, 0x000000, 0x001E94] } },
        { name: "Milan", colors: { angle: 0, textColor: 0x000000, colors: [0xE80000, 0x000000, 0xE80000] } },
        { name: "Genoa", colors: { angle: 0, textColor: 0xFFFFFF, colors: [0xB00000, 0x001E94] } },
        
        { name: "Leicester City", colors: { angle: 90, textColor: 0xFFFFFF, colors: [0x0027A6] } },
        { name: "Manchester United", colors: { angle: 90, textColor: 0xFFFFFF, colors: [0xE80000] } },
        { name: "Manchester City", colors: { angle: 90, textColor: 0x000000, colors: [0x00BEE3] } },
        { name: "Arsenal", colors: { angle: 90, textColor: 0xFFFFFF, colors: [0xFF0000] } },
        { name: "Chelsea", colors: { angle: 90, textColor: 0xFFFFFF, colors: [0x0039BF] } },
        
        { name: "Bayern Munich", colors: { angle: 0, textColor: 0xFFFFFF, colors: [0xFF0000, 0x002EAD, 0xFF0000] } },
        { name: "Borussia Dortmund", colors: { angle: 0, textColor: 0x000000, colors: [0xFFFF00] } },
        { name: "Bayer Leverkusen", colors: { angle: 90, textColor: 0xFFFFFF, colors: [0x000000, 0xFF0000, 0x000000] } },
        { name: "Schalke 04", colors: { angle: 90, textColor: 0xFFFFFF, colors: [0x0037EB] } },
        
        { name: "Barcelona", colors: { angle: 90, textColor: 0xF7FF00, colors: [0x000073, 0x800000, 0x000073] } },
        { name: "Real Madrid", colors: { angle: 0, textColor: 0xFFF81F, colors: [0xFFFFFF] } },
        { name: "Atletico Madrid", colors: { angle: 0, textColor: 0x0A0063, colors: [0xE80000, 0xFFFAFA, 0xE80000] } },
        { name: "Athletic Club", colors: { angle: 0, textColor: 0x000000, colors: [0xE80000, 0xFFFAFA, 0xE80000] } },
        { name: "Real Betis", colors: { angle: 0, textColor: 0x000000, colors: [0x00DE3B, 0xFFFAFA, 0x00DE3B] } },
        { name: "Espanyol", colors: { angle: 0, textColor: 0x000000, colors: [0xFFFFFF, 0x0016DB, 0xFFFFFF] } },
        { name: "Malaga", colors: { angle: 0, textColor: 0x000000, colors: [0xFFFFFF, 0x0083DB, 0xFFFFFF] } },
        { name: "Sevilla", colors: { angle: 0, textColor: 0x000000, colors: [0xFFFFFF, 0xFF0000, 0xFFFFFF] } },
        { name: "Valencia", colors: { angle: 0, textColor: 0x000000, colors: [0xFFFFFF] } },
        
        { name: "Boca Juniors", colors: { angle: 90, textColor: 0x000000, colors: [0x002F5E, 0xFCF517, 0x002F53] } },
        { name: "River Plate", colors: { angle: 60, textColor: 0x000000, colors: [0xFFFFFF, 0xFA0000, 0xFFFFFF] } },
        { name: "Racing Club", colors: { angle: 0, textColor: 0x000000, colors: [0x0088FF, 0xFAFAFA, 0x0088FF] } },
        { name: "Independiente", colors: { angle: 60, textColor: 0xFFFFFF, colors: [0xFF0000, 0xBD0000, 0xFF0000] } },
        { name: "San Lorenzo", colors: { angle: 0, textColor: 0xFFFFFF, colors: [0x00002E, 0xFF0000, 0x00002E] } },
        { name: "Huracan", colors: { angle: 0, textColor: 0xEB0000, colors: [0xFFFFFF] } },
        { name: "Estudiantes", colors: { angle: 0, textColor: 0x000000, colors: [0xFF0000, 0xFFFFFF, 0xFF0000] } },
        { name: "Gimnasia", colors: { angle: 90, textColor: 0xFFFFFF, colors: [0xFFFFFF, 0x00159C, 0xFFFFFF] } },
        { name: "Rosario Central", colors: { angle: 0, textColor: 0xFFFFFF, colors: [0x001CA6, 0xFFF700, 0x001CA6] } },
        { name: "Newell's Old Boys", colors: { angle: 0, textColor: 0xFFFFFF, colors: [0xFF0000, 0x000000] } },
        { name: "Argentinos Juniors", colors: { angle: 120, textColor: 0x000000, colors: [0xFF0000, 0xFFFFFF, 0xFF0000] } },
        { name: "Velez", colors: { angle: 90, textColor: 0xFFFFFF, colors: [0xFFFFFF, 0x000C59, 0xFFFFFF] } },
        { name: "Banfield", colors: { angle: 0, textColor: 0x000000, colors: [0xFFFFFF, 0x00B035, 0xFFFFFF] } },
        { name: "Lanus", colors: { angle: 60, textColor: 0xFFFFFF, colors: [0x590801] } },
        { name: "Belgrano", colors: { angle: 60, textColor: 0xFFFFFF, colors: [0x00E5FF] } },
        { name: "Quilmes", colors: { angle: 60, textColor: 0x02003D, colors: [0xFFFFFF] } },
        { name: "Tigre", colors: { angle: 90, textColor: 0xFFFFFF, colors: [0x0010EB, 0xFF0000, 0x0010EB] } },
        { name: "Colon", colors: { angle: 0, textColor: 0xFFFFFF, colors: [0xFF0000, 0x000000] } },
        { name: "Union", colors: { angle: 0, textColor: 0x000000, colors: [0xFF0000, 0xFFFFFF, 0xFF0000] } },
        { name: "Aldosivi", colors: { angle: 0, textColor: 0x000000, colors: [0xF7FF00, 0x006E0B, 0xF7FF00] } },
        { name: "Olimpo", colors: { angle: 0, textColor: 0x000000, colors: [0xF7FF00] } },
        { name: "Sarmiento", colors: { angle: 0, textColor: 0xFFFF00, colors: [0x00E636] } },
        { name: "Defensa y Justicia", colors: { angle: 0, textColor: 0x000000, colors: [0xF7FF00] } },
        { name: "Godoy Cruz", colors: { angle: 0, textColor: 0xFFFFFF, colors: [0x002CD9] } },		
    ]
};

function randomizeTeamColors(player) {
    redTeam = teams.elite[Math.floor(Math.random() * teams.elite.length)];
    blueTeam = teams.elite[Math.floor(Math.random() * teams.elite.length)];

    room.setTeamColors(1, redTeam.colors.angle, redTeam.colors.textColor, redTeam.colors.colors);
    room.setTeamColors(2, blueTeam.colors.angle, blueTeam.colors.textColor, blueTeam.colors.colors);

    if(player){
        room.sendAnnouncement(
            `EL JUGADOR ${player.name} REINICIO LAS CAMISETAS: \n🔴: ${redTeam.name}\n🔵: ${blueTeam.name}`,
            null,
            0xFFFFFF,
            "bold",
            2
        );
    }
    else{
        room.sendAnnouncement(
            `[🔴] Equipo Rojo: ${redTeam.name} | [🔵] Equipo Azul: ${blueTeam.name}`,
            null,
            0xFFFFFF,
            "bold",
            2
        );
    }
}

// WEBHOOKS

async function sendWebhook(url, message) {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: message })
    });
}

pass1 = generateRandomPassword();
sendPasswordToWebhook(pass1);

// AUTHS

const adminAuths = [
	"en proceso"
];

// FUNCIONES GENERALES

// Helper para parsear 10m, 2h, 3d, etc.
function parseDurationToMs(token) {
    if (!token) return null;

    const match = token.match(/^(\d+)([mhd])$/i);
    if (!match) return null;

    const amount = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();

    let ms = 0;
    switch (unit) {
        case "m": ms = amount * 60 * 1000; break;        // minutos
        case "h": ms = amount * 60 * 60 * 1000; break;   // horas
        case "d": ms = amount * 24 * 60 * 60 * 1000; break; // días
    }
    return ms;
}

// Elimina bans expirados
function cleanExpiredTempBans() {
    const now = Date.now();

    if (!tempBans.auths) return;

    tempBans.auths = tempBans.auths.filter(ban => {
        if (ban.expiresAt <= now) {
            // Si teníamos un ban interno registrado, lo limpiamos
            if (ban.hostBanId != null) {
                try {
                    room.clearBan(ban.hostBanId);
                } catch (e) {
                    // por si el host se reinició y el id ya no existe
                }
            }
            return false; // lo sacamos del array
        }
        return true; // se mantiene activo
    });

    saveTempBans();
}

// Agregar un ban temporal por AUTH
function addTempBanAuth(auth, durationMs, reason, byAdmin, playerName) {
    const now       = Date.now();
    const expiresAt = now + durationMs;

    const existing = tempBans.auths.find(b => b.auth === auth);
    if (existing) {
        existing.expiresAt = expiresAt;
        existing.reason    = reason;
        existing.by        = byAdmin;
        existing.name      = playerName || existing.name || "Desconocido";
        // NO tocamos hostBanId acá, se setea cuando efectivamente lo baneamos en el host
    } else {
        tempBans.auths.push({
            auth,
            name: playerName || "Desconocido",
            expiresAt,
            reason,
            by: byAdmin || "Sistema",
            hostBanId: null
        });
    }

    saveTempBans();
}

function saveTempBans() {
    localStorage.setItem("tempBans", JSON.stringify(tempBans));
}

function formatRemainingTime(expiresAt) {
    const now = Date.now();
    let ms = expiresAt - now;
    if (ms <= 0) return "expirado";

    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
}


function updateAdmins() { 
    var playersList = room.getPlayerList();
    if ( playersList.length == 0 ) return;
    if ( playersList.find((player) => player.admin) != null ) return;
    room.setPlayerAdmin(playersList[0].id, true);
}

function resetSpecificStat(stat) {
    for (const auth in playerStats) {
        if (!playerStats[auth].hasOwnProperty(stat)) {
            playerStats[auth][stat] = 0;
        }
        playerStats[auth][stat] = 0;
    }

    saveStats();
    room.sendAnnouncement(`[🪄] ¡La estadística "${stat}" ha sido reiniciada para todos los jugadores!`, null, 0xFF0000);
}

function processQueue(team) {
    const currentPlayers = room.getPlayerList().filter(p => p.team === team);
    const spacesAvailable = maxTeamSize - currentPlayers.length;

    if (spacesAvailable > 0) {
        const playersToAdd = queue.splice(0, spacesAvailable);
        playersToAdd.forEach(playerId => {
            const player = room.getPlayer(playerId);
            if (player && !isPlayerAFK(player.id)) {
                room.setPlayerTeam(player.id, team);
                console.log(`✅ ${player.name} movido al equipo ${team === 1 ? "Rojo" : "Azul"}.`);
            }
        });
    }
}

function changeAvatarTemporarily(playerId, newAvatar) {
    const player = room.getPlayer(playerId);
    if (!player) {
        console.log(`[LOG] Jugador con ID ${playerId} no encontrado.`);
        return;
    }

    const originalAvatar = player.avatar;
    room.setPlayerAvatar(playerId, newAvatar);

    setTimeout(() => {
        const updatedPlayer = room.getPlayer(playerId);
        if (updatedPlayer) {
            room.setPlayerAvatar(playerId, originalAvatar);
        } else {
            console.log(`[LOG] El jugador ${playerId} ya no está en la sala.`);
        }
    }, 2000);
}

function getProgressBar(current, min, max, length = 20) {
    const progress = Math.floor(((current - min) / (max - min)) * length);
    const bar = "█".repeat(progress) + "·".repeat(length - progress);
    return bar;
}

// SISTEMA AUTOMÁTICO ANTIGUO (SE USA SOLO CUANDO HAY MENOS DE 6 JUGADORES)

function moveJug(team) {
    for (let i = Players_team[team].length, j = 0; i < 3 && j < Players_team[0].length; i++, j++) {
        while (isPlayerAFK(Players_team[0][j])) {
            if (j == Players_team[0].length - 1) {
                break;
            }
            j += 1;
        }
        if (isPlayerAFK(Players_team[0][j])) {
            break;
        }
        room.setPlayerTeam(Players_team[0][j], team);
    }
}

function moveSpec(team_loser) {
    console.log(team_loser);
    console.log(player_on_game);

    for (let i = 0; i < player_on_game[team_loser - 1].length; i++) {
		const playerId = player_on_game[team_loser - 1][i];

		if (usedJugardenuevo.has(playerId)) {
            usedJugardenuevo.delete(playerId);
            continue;
        }

        room.setPlayerTeam(afkPlayers[i], 0);
        if (Players_team[team_loser].indexOf(player_on_game[team_loser - 1][i]) !== -1) {
            room.setPlayerTeam(player_on_game[team_loser - 1][i], 0);
        }
    }
}

function enough_players() {
    player_online = room.getPlayerList().length - afkPlayers.length;
    player_playing = Players_team[1].length + Players_team[2].length;

    if (player_playing == 6) {
        return;
    } else if (player_online == player_playing) {
        return;
    } else {
        if (Players_team[1].length >= 3 && Players_team[2].length >= 3) {
            return;
        } else if (player_online <= 6) {
            if (player_online - player_playing != 0) {
                for (let i = 0; i < Players_team[0].length; i++) {
                    if (Players_team[1].length > Players_team[2].length) {
                        room.setPlayerTeam(Players_team[0][i], 2);
                    } else if (Players_team[2].length > Players_team[1].length) {
                        room.setPlayerTeam(Players_team[0][i], 1);
                    } else {
                        room.setPlayerTeam(Players_team[0][i], 1);
                    }
                }
            }
        } else {
            if (Players_team[1].length == 3 && Players_team[2].length == 3) {
                return;
            } else if (Players_team[1].length != 3 && Players_team[2].length == 3) {
                for (let i = Players_team[1].length, j = 0; i < 3; i++, j++) {
                    while (isPlayerAFK(Players_team[0][j])) {
                        j += 1;
                        if (j == Players_team[0].length - 1) {
                            break;
                        }
                    }
                    if (j == Players_team[0].length - 1) {
                        break;
                    }
                    room.setPlayerTeam(Players_team[0][j], 1);
                }
            } else if (Players_team[1].length == 3 && Players_team[2].length != 3) {
                for (let i = Players_team[2].length, j = 0; i < 3; i++, j++) {
                    while (isPlayerAFK(Players_team[0][j])) {
                        j += 1;
                        if (j == Players_team[0].length - 1) {
                            break;
                        }
                    }
                    if (j == Players_team[0].length - 1) {
                        break;
                    }
                    room.setPlayerTeam(Players_team[0][j], 2);
                }
            } else if (Players_team[1].length != 3 && Players_team[2].length != 3) {
                for (let i = player_playing, j = 0; i < 6; i++, j++) {
                    while (isPlayerAFK(Players_team[0][j])) {
                        j += 1;
                        if (j == Players_team[0].length - 1) {
                            break;
                        }
                    }
                    if (j == Players_team[0].length - 1) {
                        break;
                    }
                    if (Players_team[1].length > Players_team[2].length) {
                        room.setPlayerTeam(Players_team[0][j], 2);
                    } else if (Players_team[2].length > Players_team[1].length) {
                        room.setPlayerTeam(Players_team[0][j], 1);
                    } else {
                        room.setPlayerTeam(Players_team[0][j], 1);
                    }
                }
            }
        }
    }
}

// UTILIDADES STATS / VIP / BLACKLIST

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function saveReplayToFile(replayData) {
    const blob = new Blob([replayData], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    console.log(`Repetición guardada en la URL temporal: ${url}`);
}

function getAuthsFromTeam(team) {
    return room.getPlayerList()
        .filter(player => player.team === team)
        .map(player => players[player.id]);
}

function getIdFromTeam(team) {
    return room.getPlayerList()
        .filter(player => player.team === team)
        .map(player => player.id);
}

function resetStats() {
    for (const auth in playerStats) {
        playerStats[auth].gamesPlayed = 0;
        playerStats[auth].gamesWon = 0;
        playerStats[auth].gamesLost = 0;
        playerStats[auth].goals = 0;
        playerStats[auth].assists = 0;
        playerStats[auth].ownGoals = 0;
        playerStats[auth].cleanSheets = 0;
        playerStats[auth].mvps = 0;
		playerStats[auth].maxWinStreak = 0;
		playerStats[auth].currentWinStreak = 0;
		playerStats[auth].elo = 0;
    }
    saveStats();
    room.sendAnnouncement("[🪄] ¡Las estadísticas han sido reiniciadas!", null, 0xFF0000);
}

function saveVips() {
    localStorage.setItem("vips", JSON.stringify(vips));
}

function loadVips() {
    const savedVips = localStorage.getItem("vips");
    if (savedVips) {
        try {
            vips = JSON.parse(savedVips);
        } catch (e) {
            console.error("[VIP] Error parseando vips, se reinicia:", e);
            vips = {};
        }
    }
}

loadVips();

function removeExpiredVips() {
    const now = new Date();
    for (const auth in vips) {
        if (vips[auth].expirationDate !== "perm" && new Date(vips[auth].expirationDate) < now) {
            delete vips[auth];
        }
    }
    saveVips();
}

function calculateExpiration(duration) {
    const now = new Date();
    const unit = duration.slice(-1);
    const amount = parseInt(duration.slice(0, -1), 10);

    if (unit === "d") now.setDate(now.getDate() + amount);
    if (unit === "m") now.setMonth(now.getMonth() + amount);
    if (unit === "y") now.setFullYear(now.getFullYear() + amount);

    return now.toISOString();
}

function calculateRemainingTime(expirationDate) {
    const now = new Date();
    const expiration = new Date(expirationDate);
    const diff = expiration - now;

    if (diff <= 0) return "Expirado";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${days} días y ${hours} horas`;
}

function loadVips() {
    const savedVips = localStorage.getItem("vips");
    if (savedVips) {
        vips = JSON.parse(savedVips);
    }
}

loadVips();

function sendPasswordToWebhook(password) {
    const message = {
        content: `🔒 La nueva contraseña de admin es: ${password}`
    };

    fetch(adminWebhookURL, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: { 'Content-Type': 'application/json' }
    }).catch(err => console.error('Error enviando webhook:', err));
}

function addMatchEvent(player, eventType, eventTime, eventTeam) {
    if (Array.isArray(matchEvents)) {
        matchEvents.push({
            playerName: player.name,
            eventType: eventType,
            eventTime: eventTime,
			eventTeam: eventTeam
        });
    } else {
        console.error("matchEvents no es un array:", matchEvents);
    }
}

function getPlayerByAuth(auth) {
    const playersList = room.getPlayerList();
    return playersList.find(player => player.auth === auth) || null;
}

function isPlayerAFK(playerId) {
	return afkPlayers.includes(playerId);
}

function generateRandomPassword() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

function loadStats() {
    const savedStats = localStorage.getItem("playerStats");
    if (savedStats) {
        try {
            playerStats = JSON.parse(savedStats);
        } catch (e) {
            console.error("[STATS] Error parseando playerStats, se reinicia:", e);
            playerStats = {};
        }
    }
}

function saveStats() {
    localStorage.setItem("playerStats", JSON.stringify(playerStats));
}

loadStats();
saveStats();
function loadBlacklist() {
    const savedBlacklist = localStorage.getItem("blacklist");
    if (savedBlacklist) {
        try {
            blacklist = JSON.parse(savedBlacklist);
        } catch (e) {
            console.error("[BLACKLIST] Error parseando blacklist, se reinicia:", e);
            blacklist = { auths: [], ips: [] };
        }
    } else {
        blacklist = { auths: [], ips: [] };
    }
}

function saveBlacklist() {
    localStorage.setItem("blacklist", JSON.stringify(blacklist));
}

loadBlacklist();

function isAdmin(player) {
	let pAuth = players[player.id];
	return adminAuths.includes(pAuth) || loggedAdmins.includes(pAuth);
}

function isOwner(player) {
	let pAuth = players[player.id];
	return pAuth === "Xk3ewst3hmxG20Xs5uEaWKDyi2ayUNf5TiJ3kr4W7LE";
}

function sendReplayToDiscord(replayData, scores) {
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat("es-AR", { day: "2-digit", month: "2-digit" }).format(date);
    const formattedTime = new Intl.DateTimeFormat("es-AR", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(date);
    const replayFilename = `ThriviumREC-${formattedDate}-${formattedTime}.hbr2`;

    const formData = new FormData();
    formData.append("file", new Blob([replayData], { type: "application/octet-stream" }), replayFilename);

    const buenosAiresTime24 = new Intl.DateTimeFormat("es-AR", {
        timeStyle: "short",
        hourCycle: "h23",
        timeZone: "America/Argentina/Buenos_Aires"
    }).format(date);

    const playersRed = room.getPlayerList()
        .filter(player => player.team === 1)
        .map(player => player.name)
        .join(", ") || "Ninguno";

    const playersBlue = room.getPlayerList()
        .filter(player => player.team === 2)
        .map(player => player.name)
        .join(", ") || "Ninguno";

	const resumen = matchEvents
		.map(event => {
			let message = "";
	
			switch (event.eventType) {
				case "⚽":
					const assists = matchEvents
						.filter(e => e.eventType === "🎯" && e.eventTime === event.eventTime)
						.map(e => `🎯 ${e.playerName}`)
						.join(" ");
	
					message = `⚽ ${event.playerName} ${assists} [${event.eventTime}]`;
					break;
	
				case "🤡":
					message = `🤡 ${event.playerName} (Gol en contra) [${event.eventTime}]`;
					break;
	
				case "🧤":
					message = `🧤 ${event.playerName} (Valla invicta) [${event.eventTime}]`;
					break;
			}
	
			return message;
		})
		.join("\n") || "No hay eventos registrados.";

	let embed;
	if(mvp){
		embed = {
			embeds: [{
				title: `🔴 ${redTeam.name} ${scores.red} - ${scores.blue} ${blueTeam.name} 🔵`,
				description: `📊 Resultado Final`,
				color: scores.red > scores.blue ? 0xFF4500 : (scores.red < scores.blue ? 0x1E90FF : 0x808080),
				fields: [
					{ name: "🔴 Jugadores Equipo Rojo", value: playersRed, inline: true },
					{ name: "🔵 Jugadores Equipo Azul", value: playersBlue, inline: true },
					{ name: "📋 Resumen del Partido", value: resumen, inline: false },
					{ name: "🏆 MVP del Partido", value: `**${mvp.name}**`, inline: false } 
				],
				footer: { text: `Finalizado a las ${buenosAiresTime24} (Hora Buenos Aires)` },
				timestamp: new Date().toISOString()
			}]
		};
	}
	else{
		embed = {
			embeds: [{
				title: `🔴 ${redTeam.name} ${scores.red} - ${scores.blue} ${blueTeam.name} 🔵`,
				description: `📊 Resultado Final`,
				color: scores.red > scores.blue ? 0xFF4500 : (scores.red < scores.blue ? 0x1E90FF : 0x808080),
				fields: [
					{ name: "🔴 Jugadores Equipo Rojo", value: playersRed, inline: true },
					{ name: "🔵 Jugadores Equipo Azul", value: playersBlue, inline: true },
					{ name: "📋 Resumen del Partido", value: resumen, inline: false }
				],
				footer: { text: `Finalizado a las ${buenosAiresTime24} (Hora Buenos Aires)` },
				timestamp: new Date().toISOString()
			}]
		};
	}

    formData.append("payload_json", JSON.stringify(embed));

    fetch(recWebhookURL, {
        method: "POST",
        body: formData
    }).then(response => {
        if (response.ok) {
            console.log("Resumen y repetición enviados exitosamente a Discord.");
        } else {
            console.error("Error al enviar a Discord:", response.statusText);
        }
    }).catch(error => {
        console.error("Error en la conexión al webhook:", error);
    });
}

function getCooldownTimeLeft(lastUsedTime) {
    const now = Date.now();
    const elapsed = now - lastUsedTime;
    const cooldownTime = 30 * 60 * 1000;
    return cooldownTime - elapsed;
}

function initializeStats(auth) {
    if (!playerStats[auth]) {
        playerStats[auth] = {
            name: "",
			gamesPlayed: 0,
            gamesWon: 0,
            gamesLost: 0,
            goals: 0,
            assists: 0,
			ownGoals: 0,
            cleanSheets: 0,
			mvps: 0,
			maxWinStreak: 0,
			currentWinStreak: 0,
			elo: 0
        };
    }
}

function generateMatchSummary() {
    let summaryMessage = "📊 Resumen del partido: \n";
    room.sendAnnouncement(summaryMessage, null, 0xFFFFFF, "normal", 2);

    const groupedEvents = [];
    const pendingAssists = [];

    matchEvents.sort((a, b) => a.eventTime.localeCompare(b.eventTime));

    console.log("Eventos registrados:", matchEvents);

    matchEvents.forEach(event => {
        let color;

        if (event.eventType === '⚽') {
            color = event.eventTeam === 1 ? 0xf44336 : 0x5cb9ff;
        } else if (event.eventType === '🧤') {
            color = 0xf1c232;
        } else if (event.eventType === '🤡') {
            color = event.eventTeam === 1 ? 0x5cb9ff : 0xf44336;
        } else if (event.eventType === '🎯') {
            color = event.eventTeam === 1 ? 0xf44336 : 0x5cb9ff;
        } else {
            color = 0xFFFFFF;
        }

        if (event.eventType === "🎯") {
            pendingAssists.push(event);
        } else if (event.eventType === '⚽') {
            const assistString = pendingAssists
                .filter(assist => assist.eventTeam === event.eventTeam)
                .map(assist => `🎯 ${assist.playerName}`)
                .join(" ");

            groupedEvents.push({
                message: `⚽ ${event.playerName} ${assistString} [${event.eventTime}]`,
                color
            });

            pendingAssists.length = 0;
        } else if (event.eventType === '🧤') {
            groupedEvents.push({
                message: `🧤 ${event.playerName}`,
                color
            });
        } else if (event.eventType === '🤡') {
            groupedEvents.push({
                message: `🤡 ${event.playerName} [${event.eventTime}]`,
                color
            });
        } else {
            groupedEvents.push({
                message: `${event.eventType} ${event.playerName} [${event.eventTime}]`,
                color
            });
        }
    });

    groupedEvents.forEach(event => {
        room.sendAnnouncement(event.message, null, event.color, "normal", 2);
    });
}

function getTopPlayers(stat, topN = 5) {
	const statsArray = Object.entries(playerStats)
	  .map(([auth, stats]) => ({
		auth,
		name: stats.name || "Desconocido",
		value: stats[stat],
	  }))
	  .sort((a, b) => b.value - a.value)
	  .slice(0, topN);
  
	return statsArray;
}

function identifyGoalkeepers(teamToEvaluate = null) {
    const playersList = room.getPlayerList();

    if (teamToEvaluate === 1 || teamToEvaluate === null) {
        const redTeamPlayers = playersList.filter(player => player.team === 1);

        if (redTeamPlayers.length > 0) {
            const newRedGK = redTeamPlayers.reduce((closest, player) => {
                const distance = Math.abs(player.position.x + 557);
                return !closest || distance < Math.abs(closest.position.x + 557) ? player : closest;
            }, null);

            if (newRedGK !== redGK) {
                redGK = newRedGK;
                room.sendAnnouncement(`🔴 GK del Equipo Rojo: ${redGK.name}`, null, 0xf44336, "bold", 2);
            }
        } else {
            if (redGK !== null) {
                redGK = null;
                room.sendAnnouncement(`🔴 El Equipo Rojo se quedó sin GK.`, null, 0xf44336, "bold");
            }
        }
    }

    if (teamToEvaluate === 2 || teamToEvaluate === null) {
        const blueTeamPlayers = playersList.filter(player => player.team === 2);

        if (blueTeamPlayers.length > 0) {
            const newBlueGK = blueTeamPlayers.reduce((closest, player) => {
                const distance = Math.abs(player.position.x - 557);
                return !closest || distance < Math.abs(closest.position.x - 557) ? player : closest;
            }, null);

            if (newBlueGK !== blueGK) {
                blueGK = newBlueGK;
                room.sendAnnouncement(`🔵 GK del Equipo Azul: ${blueGK.name}`, null, 0x5cb9ff, "bold", 2);
            }
        } else {
            if (blueGK !== null) {
                blueGK = null;
                room.sendAnnouncement(`🔵 El Equipo Azul se quedó sin GK.`, null, 0x5cb9ff, "bold");
            }
        }
    }
}

// NUEVAS FUNCIONES PARA SISTEMA DE PICKS

function getNonAfkPlayersCount() {
    return room.getPlayerList().filter(p => !isPlayerAFK(p.id)).length;
}

function getAvailableSpecs() {
    const specs = room.getPlayerList().filter(p => p.team === 0 && !isPlayerAFK(p.id));
    // 🔧 Filtrar al capitán actual si está pickeando
    if (pickingCaptain) {
        return specs.filter(p => p.id !== pickingCaptain.id);
    }
    return specs;
}

function resetPickState() {
    picksActive = false;
    pickMode = null;
    pickingCaptain = null;
    pickTeamToFill = null;
    if (pickTimeoutId !== null) {
        clearTimeout(pickTimeoutId);
        pickTimeoutId = null;
    }
}

function announcePickList(targetId) {
    const specs = getAvailableSpecs();
    if (specs.length === 0) {
        room.sendAnnouncement("[PICKS] No hay jugadores disponibles en espectadores.", targetId ?? null, 0xFFFF00, "normal", 2);
        return;
    }

    // 🔧 Calcular cuántos espacios quedan
    const teamDestino = (pickMode === "midGame" ? pickTeamToFill : 2);
    const currentTeamSize = room.getPlayerList().filter(p => p.team === teamDestino && !isPlayerAFK(p.id)).length;
    const slotsNeeded = maxTeamSize - currentTeamSize;

    let msg = `[PICKS] Jugadores disponibles (necesitas ${slotsNeeded}):\n`;
    specs.forEach((p, idx) => {
        msg += `${idx + 1}. ${p.name}\n`;
    });

    room.sendAnnouncement(msg, targetId ?? null, 0xFFFFFF, "normal", 2);

    if (pickingCaptain) {
        room.sendAnnouncement(
            `[PICKS] ${pickingCaptain.name}, escribe el número, "random" o "top" para elegir.`,
            pickingCaptain.id,
            0xFFFFFF,
            "bold",
            2
        );
    }
}

function schedulePickTimeout() {
    if (!pickingCaptain) return;
    if (pickTimeoutId !== null) {
        clearTimeout(pickTimeoutId);
    }
    pickTimeoutId = setTimeout(handlePickTimeout, PICK_TIME_LIMIT_MS);
}

function handlePickTimeout() {
    if (!picksActive || !pickingCaptain) return;

    const oldCaptain = pickingCaptain;
    
    // 🔧 Marcar como AFK
    if (!afkPlayers.includes(oldCaptain.id)) {
        afkPlayers.push(oldCaptain.id);
    }
    
    room.sendAnnouncement(
        `[PICKS] ${oldCaptain.name} no eligió a tiempo, fue enviado a espectadores y marcado como AFK.`,
        null,
        0xFFFF00,
        "bold",
        2
    );
    room.setPlayerTeam(oldCaptain.id, 0);

    pickingCaptain = null;
    pickTimeoutId = null;

    const specs = getAvailableSpecs();

    if (pickMode === "postGame") {
        if (specs.length === 0) {
            room.sendAnnouncement("[PICKS] No hay más jugadores para ser capitán. Se inicia el partido.", null, 0xFFFF00, "bold", 2);
            resetPickState();
            setTimeout(() => {
                room.startGame();
            }, 1000);
            return;
        }
        pickingCaptain = specs[0];
        room.setPlayerTeam(pickingCaptain.id, 2);
        room.sendAnnouncement(`[PICKS] Nuevo capitán azul: ${pickingCaptain.name}.`, null, 0x5cb9ff, "bold", 2);
        announcePickList(pickingCaptain.id);
        schedulePickTimeout();
    } else if (pickMode === "midGame") {
        const teamPlayers = room.getPlayerList().filter(p => p.team === pickTeamToFill && !isPlayerAFK(p.id));
        if (teamPlayers.length === 0) {
            room.sendAnnouncement("[PICKS] Tu equipo se quedó sin jugadores. Se reanuda el partido.", null, 0xFFFF00, "bold", 2);
            resetPickState();
            setTimeout(() => {
                room.pauseGame(false);
            }, 1000);
            return;
        }
        pickingCaptain = teamPlayers[0];
        room.sendAnnouncement(
            `[PICKS] Nuevo capitán del equipo ${pickTeamToFill === 1 ? "🔴" : "🔵"}: ${pickingCaptain.name}.`,
            null,
            0xFFFFFF,
            "bold",
            2
        );
        announcePickList(pickingCaptain.id);
        schedulePickTimeout();
    }
}

// Picks post-partido (gana sigue)
function startPostGamePicks(winningTeam, losingTeam) {
    resetPickState();

    const totalNonAfk = getNonAfkPlayersCount();

    // Si hay menos de 6 jugadores no AFK → sistema viejo + AUTOSTART
    if (totalNonAfk < MIN_PLAYERS_FOR_PICKS) {
        moveSpec(losingTeam);
        setTimeout(() => {
        moveJug(losingTeam);
        }, 500);
		
        setTimeout(() => {
            const scoresNow = room.getScores();
            if (!scoresNow) {
                room.startGame();
            }
        }, 2000);

        return;
    }

    pickMode = "postGame";

    // 1) Ganador queda siempre en ROJO, resto a spec
    room.getPlayerList().forEach(p => {
        if (isPlayerAFK(p.id)) return;
        if (p.team === winningTeam) {
            room.setPlayerTeam(p.id, 1); // Rojo
        } else {
            room.setPlayerTeam(p.id, 0); // Spec
        }
    });

    // 🔧 Pequeño delay para asegurar que los movimientos se completen
    setTimeout(() => {
        // 🔧 PRIMERO mover al capitán a azul, LUEGO obtener specs
        const allSpecs = room.getPlayerList().filter(p => p.team === 0 && !isPlayerAFK(p.id));
        
        if (allSpecs.length === 0) {
            room.sendAnnouncement("[PICKS] No hay jugadores suficientes para armar el equipo azul. Se desactiva el sistema de picks.", null, 0xFFFF00, "bold", 2);
            resetPickState();
            return;
        }

        picksActive = true;
        pickingCaptain = allSpecs[0];
        room.setPlayerTeam(pickingCaptain.id, 2); // Mover a azul

        room.sendAnnouncement(
            `[PICKS] El equipo ganador queda en 🔴 Rojo.\n[PICKS] Capitán 🔵 Azul: ${pickingCaptain.name}.`,
            null,
            0xFFFFFF,
            "bold",
            2
        );

        // 🔧 Ahora sí, mostrar lista (sin el capitán)
        announcePickList(pickingCaptain.id);
        schedulePickTimeout();
    }, 300);
}

// Picks en medio de un partido (cuando alguien se va)
function startMidGamePick(teamNeedingPick) {
    resetPickState();

    const specs = getAvailableSpecs();
    if (specs.length === 0) {
        room.sendAnnouncement("[PICKS] No hay jugadores en espectadores para reemplazar. El partido continúa.", null, 0xFFFF00, "bold", 2);
        room.pauseGame(false);
        return;
    }

    const teamPlayers = room.getPlayerList().filter(p => p.team === teamNeedingPick && !isPlayerAFK(p.id));
    if (teamPlayers.length === 0) {
        room.sendAnnouncement("[PICKS] No quedan jugadores en tu equipo para elegir. El partido continúa.", null, 0xFFFF00, "bold", 2);
        room.pauseGame(false);
        return;
    }

    pickMode = "midGame";
    pickTeamToFill = teamNeedingPick;
    picksActive = true;
    pickingCaptain = teamPlayers[0];

    room.sendAnnouncement(
        `[PICKS] Se pausó el partido porque el equipo ${teamNeedingPick === 1 ? "🔴 Rojo" : "🔵 Azul"} perdió un jugador.\n${pickingCaptain.name} debe elegir un reemplazo de espectadores.`,
        null,
        0xFFFFFF,
        "bold",
        2
    );

    announcePickList(pickingCaptain.id);
    schedulePickTimeout();
}

// EVENTOS

room.onPlayerJoin = function(player) {
	players[player.id] = player.auth;

	const auth = player.auth || "Desconocido";
    const ip = player.conn || "Desconocida";

	let pAuth = players[player.id];

	const MAX_SLOTS = 17;
    const currentPlayers = room.getPlayerList().length;

	// Buscar en blacklist por AUTH e IP
const blAuth = blacklist.auths.find(e => e.value === auth);
const blIp   = blacklist.ips.find(e => e.value === ip);

if (blAuth || blIp) {
    // Actualizamos nombre e ID en las entradas que correspondan
    if (blAuth) {
        blAuth.lastName  = player.name;
        blAuth.hostBanId = player.id;
    }
    if (blIp) {
        blIp.lastName  = player.name;
        blIp.hostBanId = player.id;
    }
    saveBlacklist();

    const reasonText = (blAuth?.reason || blIp?.reason || "Sin especificar");

    room.kickPlayer(
        player.id,
        `Estás en la lista negra.\nRazón: ${reasonText}`,
        true // ban interno de Haxball
    );
    return;
}

cleanExpiredTempBans(); // la actualizamos (te la rehago abajo)

const tempBan = tempBans.auths.find(b => b.auth === player.auth);

if (tempBan) {
    // Actualizar nombre e ID si no los teníamos
    if (!tempBan.name || tempBan.name === "Desconocido") {
        tempBan.name = player.name;
    }
    tempBan.hostBanId = player.id;
    saveTempBans();

    const restanteMs  = tempBan.expiresAt - Date.now();
    const restanteMin = Math.max(1, Math.round(restanteMs / 60000));

    room.kickPlayer(
        player.id,
        `Sigues temporalmente baneado.\nMotivo: ${tempBan.reason}\nBaneado por: ${tempBan.by}\nTiempo restante aprox: ${restanteMin} min.`,
        true // ban interno
    );
    return;
}

	Players_team[0].push(player.id);

    if (currentPlayers >= MAX_SLOTS && (isAdmin(player) || vips[pAuth])) {
        room.kickPlayer(player.id, "Slot reservado para administradores o vips.", false);
        return;
    }

	const jugadores = room.getPlayerList();

    // Si este es el PRIMER jugador de la sala
    if (jugadores.length === 1) {
        // Si ya hay un timeout programado, no hacemos nada
        if (autoStartTimeout) return;

        autoStartTimeout = setTimeout(() => {
            autoStartTimeout = null;

            const currentPlayers = room.getPlayerList();

            // Verificamos que siga habiendo gente
            if (currentPlayers.length > 0 && room.getScores() === null) {
                room.startGame();
            }
        }, 3000); // 3 segundos
    }

	if (vips[pAuth]) {
        const vipData = vips[pAuth];
        const name = player.name;
        room.sendAnnouncement(`💎 El VIP ${name} ha ingresado!`, null, 0xC3A6FF, "bold", 2);

		if (vips[pAuth]) {
			const vipData2 = vips[pAuth];
			if (vipData2.expirationDate !== "perm" && new Date(vipData2.expirationDate) < new Date()) {
				room.sendAnnouncement(`⚠️ Tu membresía VIP ha expirado.`, player.id, 0xFF0000, "italic", 2);
				delete vips[pAuth];
				saveVips();
				return;
			}
			else if (vipData2.expirationDate !== "perm") {
				const remainingTime = calculateRemainingTime(vipData2.expirationDate);
				room.sendAnnouncement(`🔔 Tu membresía VIP le quedan ${remainingTime}.`, player.id, 0xFFFF00, "italic", 2);
			}
		}
    }
	
    sendWebhook(
        entryExitWebhookURL,
        `El jugador \`${player.name}\` ha ingresado.\n**AUTH**: \`${auth}\`\n**IP**: \`${ip}\`\n**ID**: ${player.id}`
    );

	let playerAuthjoin = players[player.id];

	if(player.name === " " || player.name === "" || player.name === "    "){
		room.kickPlayer(player.id, "[❌] No se puede entrar con nombres vacios. ", false);
	}

    if (uniqueAuths.has(player.auth)) {
        room.kickPlayer(player.id, "[❌] Ya estás conectado/a en el servidor", false);
        return;
    }

	uniqueAuths.add(player.auth);

    if (!picksActive) {
        enough_players();
    }
	initializeStats(playerAuthjoin);

	loadStats();

	if (!playerStats[playerAuthjoin]) {
        playerStats[playerAuthjoin] = {
            name: player.name,
			gamesPlayed: 0,
            gamesWon: 0,
            gamesLost: 0,
            goals: 0,
            assists: 0,
			ownGoals: 0,
            cleanSheets: 0,
			mvps: 0,
			maxWinStreak: 0,
			currentWinStreak: 0,
			elo: 0,
        };
    } else {
        playerStats[playerAuthjoin].name = player.name;
    }

	if (isAdmin(player)) {
		loggedAdmins.push(playerAuthjoin);
		room.setPlayerAdmin(player.id, true);
		room.sendAnnouncement(`👮 Se unio el administrador ${player.name} al host.`, null, 0x6666FF, "bold", 2);
	}
	
	if (isOwner(player)) {
		loggedAdmins.push(playerAuthjoin);
		room.setPlayerAdmin(player.id, true);
	} 

	setTimeout(() => {
		room.sendAnnouncement(`--------------------------------------------------
👋 Bienvenido/a ${player.name} a Thrivium
💬 Recuerda unirte a nuestro discord: https://discord.gg/dehAAFmUuh
🆘 Si necesitas ayuda con los comandos usa [!help]
--------------------------------------------------` , player.id, 0x8B5FD9, "bold", 2);
	    }, 1000);

    setTimeout(() => {
        if (picksActive && pickMode === "postGame") {
            const specs = getAvailableSpecs();
            if (specs.length > 0 && pickingCaptain) {
                announcePickList(pickingCaptain.id);
            }
        }
    }, 1000);
};

room.onPlayerLeave = function(player) {
    sendWebhook(entryExitWebhookURL, `El jugador ${player.name}, ID: ${player.id} ha salido.`);

    Players_team[0] = Players_team[0].filter(id => id !== player.id);
    Players_team[1] = Players_team[1].filter(id => id !== player.id);
    Players_team[2] = Players_team[2].filter(id => id !== player.id);

    afkPlayers = afkPlayers.filter(id => id !== player.id);

    const scores = room.getScores();
    
    // 🔧 VERIFICAR PRIMERO si necesitamos picks
    const shouldUsePicks = (
        !picksActive &&
        gameStarted &&
        scores &&
        !scores.paused &&
        (player.team === 1 || player.team === 2) &&
        getNonAfkPlayersCount() >= MIN_PLAYERS_FOR_PICKS
    );

    if (shouldUsePicks) {
        const teamSize = room.getPlayerList().filter(p => p.team === player.team && !isPlayerAFK(p.id)).length;
        
        if (teamSize < maxTeamSize) {
            room.pauseGame(true);
            
            setTimeout(() => {
                startMidGamePick(player.team);
            }, 500);
        }
    } else {
        // 🔧 SOLO llamar enough_players si NO vamos a usar picks
        if (!picksActive) {
            enough_players();
        }
    }

    if(isKickOff === false){
        if(redGK){
            if(player.id === redGK.id){
                identifyGoalkeepers(1);
            }
        }
        if(blueGK){
            if(player.id === blueGK.id){
                identifyGoalkeepers(2);
            }
        }
    }

	const jugadores = room.getPlayerList();

	if (jugadores.length === 0) {
        // Cancelamos auto start si estaba programado
        if (autoStartTimeout) {
            clearTimeout(autoStartTimeout);
            autoStartTimeout = null;
        }

        // Si hay un partido en juego, lo paramos
        if (room.getScores() !== null) {
            room.stopGame();
        }
    }
    
    let pAuth = players[player.id];
    uniqueAuths.delete(pAuth);
    delete players[player.id];
    latePlayers.delete(player.id);
};

room.onPlayerBallKick = function(player) {
    if (!matchStats[lastTouch?.id]) {
        matchStats[lastTouch?.id] = { goals: 0, assists: 0, cleanSheet: 0, pass: 0 };
    }
    if (prelastTouch && !matchStats[prelastTouch?.id]) {
        matchStats[prelastTouch?.id] = { goals: 0, assists: 0, cleanSheet: 0, pass: 0 };
    }

    if (isKickOff) {
        setTimeout(() => {
            identifyGoalkeepers();
        }, 1500);
        isKickOff = false;
    }

    if (lastTouch !== player) {
        prelastTouch = lastTouch;
        lastTouchTime = Date.now();
    }
    lastTouch = player;

    lastTouchAuth = players[lastTouch?.id];

    if (prelastTouch && prelastTouch.id) {
        prelastTouchAuth = players[prelastTouch.id];

        if (prelastTouch.team === lastTouch.team && prelastTouch.id !== lastTouch.id) {
            matchStats[lastTouch.id].pass++;
        }
    } else {
        prelastTouchAuth = null;
    }
};

room.onGameStart = function() {
	room.startRecording();

	matchStartTime = Date.now();

	player_on_game = [[], []];

	isKickOff = true;

	player_on_game = [
        Players_team[1].slice(),
        Players_team[2].slice()
    ];

	const playersHost = room.getPlayerList();
	const redTeamPlayers = playersHost.filter(p => p.team === 1);
	const blueTeamPlayers = playersHost.filter(p => p.team === 2);

	matchStats = {};
	matchEvents = [];

	playersHost.forEach(player => {
		if (player.team !== 0) {
			matchStats[player.id] = {
				goals: 0,
				assists: 0,
				cleanSheet: 0,
				pass: 0
			};
		}
	});
  
	if (redTeamPlayers.length >= 3 && blueTeamPlayers.length >= 3) {
	  gameStatsEnabled = true;
	  gameStarted = true;
	  room.sendAnnouncement("[▶️] El partido ha comenzado. Las estadísticas cuentan.\n\n", null, 0xFFFFFF, "bold", 2);
	  room.sendAnnouncement(`[💬] Unite a nuestro Discord! Enlace: https://discord.gg/aC9vp72Hna`, null, 0xFF8C00, "bold");
	} else {
	  gameStatsEnabled = false;
	  gameStarted = true;
	  warmupMode = true;
	  room.sendAnnouncement("[💪] Modo calentamiento: estadísticas desactivadas.\n\n", null, 0xFFFF00, "bold");
	  room.sendAnnouncement(`[💬] Unite a nuestro Discord! Enlace: https://discord.gg/aC9vp72Hna`, null, 0xFF8C00, "bold");
	}

	gameStatsBuffer = {
        goals: [],
        assists: [],
        ownGoals: []
    };
  
	latePlayers.clear();

	initialRedPlayers = room.getPlayerList().filter(p => p.team === 1).length;
    initialBluePlayers = room.getPlayerList().filter(p => p.team === 2).length;
	initialPlayers = room.getPlayerList().map(player => player.id);
	
	randomizeTeamColors();
};

room.onGameStop = function (scores) {
	resumen = "";
	isKickOff = true;
	redGK = null;
	blueGK = null;
	invicto = null;
	gameStarted = false;
};

room.onTeamGoal = function(team) {
	if(lastTouch){
		initializeStats(lastTouchAuth);
		initializeStats(prelastTouchAuth);

		let isOwnGoal = (team === 1 && lastTouch.team === 2) || (team === 2 && lastTouch.team === 1);
        let mensaje;
        let colormensaje;

		if (!matchStats[lastTouch.id]) {
			matchStats[lastTouch.id] = { goals: 0, assists: 0, cleanSheet: 0, pass: 0};
		}
		if(prelastTouch){
			if (!matchStats[prelastTouch.id]) {
				matchStats[prelastTouch.id] = { goals: 0, assists: 0, cleanSheet: 0, pass: 0};
			}
		}
		const lastStats = matchStats[lastTouch.id];
        if (!lastStats) return;

        const scores = room.getScores();
        if (!scores) return;
        const eventTime = formatTime(scores.time);

		if (isOwnGoal) {
			gameStatsBuffer.ownGoals.push({ auth: lastTouchAuth, name: lastTouch.name, time: eventTime });
            mensaje = `🤡 Que mala suerte! ${lastTouch.name}`;
            colormensaje = `0xf44336`;
			addMatchEvent(lastTouch, '🤡', eventTime, team);
			changeAvatarTemporarily(lastTouch.id, "🤡");
		} else {
            if (prelastTouch && prelastTouch.id !== lastTouch.id && prelastTouch.team === lastTouch.team && (Date.now() - lastTouchTime <= 5000)) {				
				gameStatsBuffer.goals.push({ auth: lastTouchAuth, name: lastTouch.name, time: eventTime });
				gameStatsBuffer.assists.push({ auth: prelastTouchAuth, name: prelastTouch.name, time: eventTime });
				addMatchEvent(prelastTouch, '🎯', eventTime, team);
				addMatchEvent(lastTouch, '⚽', eventTime, team);
				changeAvatarTemporarily(lastTouch.id, "⚽");
				changeAvatarTemporarily(prelastTouch.id, "🎯");
				lastStats.goals++;
				matchStats[prelastTouch.id].assists++;
                mensaje = `⚽ Goooool de ${lastTouch.name} (asistencia de ${prelastTouch.name})`;
                colormensaje = `0xf1c232`;
            } else {
                gameStatsBuffer.goals.push({ auth: lastTouchAuth, name: lastTouch.name, time: eventTime });
				lastStats.goals++;
				changeAvatarTemporarily(lastTouch.id, "⚽");
                mensaje = `⚽ Goooool de ${lastTouch.name}!`;
                colormensaje = `0xf1c232`;
				addMatchEvent(lastTouch, '⚽', eventTime, team);
            }
        }

        room.sendAnnouncement(mensaje, null, colormensaje, "bold", 2);
	}
};

room.onTeamVictory = function (scores) {
  let winningTeam;
  let losingTeam;
  let winnerAuths;
  let loserAuths;
  let winnerIds;

  isKickOff = true;

  const eventTimeLocal = formatTime(scores.time);

  if(scores.red > scores.blue){
    winningTeam = 1;
    losingTeam = 2;
    winnerIds = getIdFromTeam(1);
    winnerIds.forEach(id => {
        if(usedJugardenuevo.has(id)){
            usedJugardenuevo.delete(id);
            setTimeout(() => {
                room.sendAnnouncement(`[🌟] Perdiste el jugar de nuevo ya que ganaste.`, id, 0xf1c232, "bold", 2);
            }, 500);
        }
    });
    winnerAuths = getAuthsFromTeam(1);
    loserAuths = getAuthsFromTeam(2);
  }
  else if(scores.blue > scores.red){
    winningTeam = 2;
    losingTeam = 1;
    winnerIds = getIdFromTeam(2);
    winnerIds.forEach(id => {
        if(usedJugardenuevo.has(id)){
            usedJugardenuevo.delete(id);
            setTimeout(() => {
                room.sendAnnouncement(`[🌟] Perdiste el jugar de nuevo ya que ganaste.`, id, 0xf1c232, "bold", 2);
            }, 500);
        }
    });
    winnerAuths = getAuthsFromTeam(2);
    loserAuths = getAuthsFromTeam(1);
  }
  
  if(blueGK && redGK){
    if(scores.blue === 0){
      let rAuth = players[redGK.id];
      initializeStats(rAuth);
      if(gameStatsEnabled && !latePlayers.has(rAuth)){
          playerStats[rAuth].cleanSheets++;
          playerStats[rAuth].elo += cleanSheetPoints;
          if(playerStats[rAuth].elo < -20){
              playerStats[rAuth].elo = -20;
          }
      }
      invicto = redGK;
      matchStats[redGK.id].cleanSheet++;
      addMatchEvent(redGK, '🧤', eventTimeLocal, 1);
    }
    else if(scores.red === 0){
      let bAuth = players[blueGK.id];
      initializeStats(bAuth);
      if (!playerStats[bAuth]) {
          playerStats[bAuth] = { gamesWon: 0, gamesLost: 0, gamesPlayed: 0, maxWinStreak: 0, cleanSheets: 0 };
      }
      if(gameStatsEnabled && !latePlayers.has(bAuth)){
          playerStats[bAuth].cleanSheets++;
          playerStats[bAuth].elo += cleanSheetPoints;
          if(playerStats[bAuth].elo < -20){
              playerStats[bAuth].elo = -20;
          }
      }
      invicto = blueGK;
      matchStats[blueGK.id].cleanSheet++;
      addMatchEvent(blueGK, '🧤', eventTimeLocal, 2);
    }
  }

  generateMatchSummary();

  let maxPoints = 0;

  Object.entries(matchStats).forEach(([id, stats]) => {
      const points = 
          (stats.goals * MVP_POINTS.goal) +
          (stats.assists * MVP_POINTS.assist) +
          (stats.cleanSheet ? MVP_POINTS.cleanSheet : 0);

      if (points > maxPoints) {
          maxPoints = points;
          mvp = room.getPlayer(Number(id));
      }
  });
    
  if (mvp) {
    room.sendAnnouncement(`[🏆] El MVP del partido es: ${mvp.name}`, null, 0x673ca3, "normal", 1);
    let mvpAuth = players[mvp.id];
    if(gameStatsEnabled && !latePlayers.has(mvpAuth)){
        initializeStats(mvpAuth);
        playerStats[mvpAuth].mvps++;
        playerStats[mvpAuth].elo += mvpPoints;
        if(playerStats[mvpAuth].elo < -20){
            playerStats[mvpAuth].elo = -20;
        }
    }
  }

  if (gameStatsEnabled) {
    try {
        if (Array.isArray(winnerAuths) && winnerAuths.length > 0) {
            winnerAuths.forEach(a => {
                if (!latePlayers.has(a)) {
                    if (!playerStats[a]) initializeStats(a);
                    playerStats[a].gamesWon++;
                    playerStats[a].gamesPlayed++;
                    playerStats[a].currentWinStreak++;
                    if(vips[a]){
                        playerStats[a].elo += 3;
                    }
                    playerStats[a].elo += winPoints;
                    if(playerStats[a].elo < -20){
                        playerStats[a].elo = -20;
                    }
                }
            });
        }

        if (Array.isArray(loserAuths) && loserAuths.length > 0) {
            loserAuths.forEach(a => {
                if (!latePlayers.has(a)) {
                    if (!playerStats[a]) initializeStats(a);
                    playerStats[a].gamesLost++;
                    playerStats[a].gamesPlayed++;
                    playerStats[a].currentWinStreak = 0;
                    playerStats[a].elo += losePoints;
                    if(vips[a]){
                        playerStats[a].elo += 3;
                    }
                    if(playerStats[a].elo < -20){
                        playerStats[a].elo = -20;
                    }
                }
            });
        }
    } catch (error) {
        console.error("Error al asignar estadísticas:", error);
    }
  }

  if (gameStatsEnabled) {
        gameStatsBuffer.goals.forEach(event => {
            if (!latePlayers.has(event.auth)) {
                playerStats[event.auth].goals++;
                playerStats[event.auth].elo += goalPoints;
                if(playerStats[event.auth].elo < -20){
                    playerStats[event.auth].elo = -20;
                }
            }
        });
    
        gameStatsBuffer.assists.forEach(event => {
            if (!latePlayers.has(event.auth)) {
                playerStats[event.auth].assists++;
                playerStats[event.auth].elo += assistPoints;
                if(playerStats[event.auth].elo < -20){
                    playerStats[event.auth].elo = -20;
                }
            }
        });
    
        gameStatsBuffer.ownGoals.forEach(event => {
            if (!latePlayers.has(event.auth)) {
                playerStats[event.auth].ownGoals++;
                playerStats[event.auth].elo += ownGoalPoints;
                if(playerStats[event.auth].elo < -20){
                    playerStats[event.auth].elo = -20;
                }
            }
        });

        gameStatsBuffer = {
            goals: [],
            assists: [],
            ownGoals: []
        };
  }

  if (scores.red > scores.blue) {
        redTeamWinStreak++;
        blueTeamWinStreak = 0;

        const winningPlayers = room.getPlayerList().filter(player => player.team === 1);
        if(gameStatsEnabled){
            winningPlayers.forEach(winner => {
                const winnerAuth = players[winner.id];
                if (!playerStats[winnerAuth]) {
                    playerStats[winnerAuth] = { gamesWon: 0, gamesLost: 0, gamesPlayed: 0, maxWinStreak: 0, currentWinStreak: 0 };
                }
                if (playerStats[winnerAuth].currentWinStreak > playerStats[winnerAuth].maxWinStreak) {
                    if (!latePlayers.has(winnerAuth)) {
                        playerStats[winnerAuth].maxWinStreak = playerStats[winnerAuth].currentWinStreak;
                    }
                }
            });
        }
  } else if (scores.blue > scores.red) {
        blueTeamWinStreak++;
        redTeamWinStreak = 0;

        const winningPlayers = room.getPlayerList().filter(player => player.team === 2);
        if(gameStatsEnabled){
            winningPlayers.forEach(winner => {
                const winnerAuth = players[winner.id];
                if (!playerStats[winnerAuth]) {
                    playerStats[winnerAuth] = { gamesWon: 0, gamesLost: 0, gamesPlayed: 0, maxWinStreak: 0, currentWinStreak: 0 };
                }
                if (playerStats[winnerAuth].currentWinStreak > playerStats[winnerAuth].maxWinStreak) {
                    if (!latePlayers.has(winnerAuth)) {
                        playerStats[winnerAuth].maxWinStreak = playerStats[winnerAuth].currentWinStreak;
                    }
                }
            });
        }
  }

  // Se termina el partido
  room.stopGame();

  // SISTEMA DE PICKS / AUTO (con delay para evitar desincronización)
  startPostGamePicks(winningTeam, losingTeam);


  const replayData = room.stopRecording();
  sendReplayToDiscord(replayData, scores);

  if (redTeamWinStreak > 3) {
    room.sendAnnouncement(
        `🔥 ¡El equipo Rojo lleva una racha de ${redTeamWinStreak} victorias consecutivas!`,
        null, 0xFF4500, "normal", 2
    );
  }
  if (blueTeamWinStreak > 3) {
    room.sendAnnouncement(
        `🔥 ¡El equipo Azul lleva una racha de ${blueTeamWinStreak} victorias consecutivas!`,
        null, 0x1E90FF, "normal", 2
    );
  }

  matchEvents = [];
  saveStats();
};

// COMANDOS

const validCommands = [
    "!help", "!vip", "!claim-admin", "!jugardenuevo", "!llamaradmin", "!stats",
    "!reglas", "!top", "!nv", "!bb", "!me", "!elo", "!afk", "!afks", "!msg",
    "!gks", "!rangos", "!mute", "!unmute", "!rr", "!rc", "!reset", "!rstat",
    "!login", "!clearbans", "!discord", "!ds", "!racha", "!anuncio",
    "!top goles", "!top mvp", "!top asis", "!top vallas", "!top pj",
    "!top pg", "!top pp", "!top gc", "!top elo", "!top racha", "!blacklist",
    "!blacklist add", "!blacklist remove", "!calladmin", "!rank", "!ban", "!tempbanlist", "!unban", "!banauth"];

room.onPlayerChat = function (player, message) {

	let pAuth = players[player.id];

	sendWebhook(chatLogWebhookURL, `${player.name}: ${message}`);

	// MUTE
	if (mutedPlayers[player.id]) {
		const muteInfo = mutedPlayers[player.id];

		if (Date.now() > muteInfo.until) {
			delete mutedPlayers[player.id];
			room.sendAnnouncement(`[🔊] El jugador "${player.name}" ha sido desmuteado (Fin del tiempo de muteo automático).`, null, 0x00FF00, "bold", 2);
		} else if (!message.startsWith("!")) {
			room.sendAnnouncement("[🔇] Estás muteado, no puedes enviar mensajes.", player.id, 0xFF0000, "bold", 2);
			return false;
		}
	}

	// BLOQUE GENERAL DE COMANDOS CON !
    if (message.startsWith("!")) {
        const parts = message.slice(1).split(" ");
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        let command2 = message.split(" ")[0];

        if (!validCommands.includes(command2)) {
            room.sendAnnouncement(`❌ Comando "${command2}" no existe. Escribe !help para ver la lista de comandos.`, player.id, 0xFF0000, "normal", 2);
            return false;
        }

		    // --- SISTEMA DE PICKS: entrada del capitán (número / random / top) --

        // MUTE
        if (command === "mute") {
            if(isAdmin(player) || loggedAdmins.includes(pAuth)){
                if (args.length < 2) {
                    room.sendAnnouncement("[❌] Uso correcto: !mute @jugador minutos", player.id, 0xFFFF00, "normal", 2);
                    return false;
                }
    
                let targetName = args[0].replace("@", "").trim();
                targetName = targetName.replace(/_/g, " ").toLowerCase();
                const minutes = parseInt(args[1]);
                if (isNaN(minutes) || minutes <= 0) {
                    room.sendAnnouncement("[❌] Por favor, ingresa un tiempo válido en minutos.", player.id, 0xFFFF00, "normal", 2);
                    return false;
                }
    
                const targetPlayer = room.getPlayerList().find(p => p.name.toLowerCase() === targetName.toLowerCase());
                if (!targetPlayer) {
                    room.sendAnnouncement(`[❌] No se encontró al jugador "${targetName}".`, player.id, 0xFFFF00, "normal", 2);
                    return false;
                }
    
                mutedPlayers[targetPlayer.id] = {
                    until: Date.now() + minutes * 60 * 1000
                };
    
                room.sendAnnouncement(`[🔇] El jugador "${targetPlayer.name}" ha sido muteado por ${minutes} minuto(s).`, null, 0xFF0000, "bold", 2);
    
                setTimeout(() => {
                    if (mutedPlayers[targetPlayer.id]) {
                        delete mutedPlayers[targetPlayer.id];
                        room.sendAnnouncement(`[🔊] El jugador "${targetPlayer.name}" ha sido desmuteado (Fin del tiempo de muteo automático).`, null, 0x00FF00, "bold", 2);
                    }
                }, minutes * 60 * 1000);
    
                return false;
            } else {
                room.sendAnnouncement("[❌] No tienes permisos para hacer esto.", player.id, 0xFFFF00, "normal", 2);
                return false;
            }
        }
    
        // UNMUTE
        if (command === "unmute") {
            if(isAdmin(player) || loggedAdmins.includes(pAuth)){
                if (args.length < 1) {
                    room.sendAnnouncement("[❌] Uso correcto: !unmute @jugador", player.id, 0xFFFF00, "normal", 2);
                    return false;
                }
    
                let targetName = args[0].replace("@", "").trim();
                targetName = targetName.replace(/_/g, " ").toLowerCase();
                const targetPlayer = room.getPlayerList().find(p => p.name.toLowerCase() === targetName.toLowerCase());
                if (!targetPlayer) {
                    room.sendAnnouncement(`[❌] No se encontró al jugador "${targetName}".`, player.id, 0xFFFF00, "normal", 2);
                    return false;
                }
    
                if (!mutedPlayers[targetPlayer.id]) {
                    room.sendAnnouncement(`[❌] El jugador "${targetPlayer.name}" no está muteado.`, player.id, 0xFFFF00, "normal", 2);
                    return false;
                }
    
                delete mutedPlayers[targetPlayer.id];
                room.sendAnnouncement(`[🔊] El jugador "${targetPlayer.name}" ha sido desmuteado.`, null, 0x00FF00, "bold", 2);
                return false;

            } else {
                room.sendAnnouncement("[❌] No tienes permisos para hacer esto.", player.id, 0xFFFF00, "normal", 2);
                return false;
            }
        }
    }

if (picksActive && pickingCaptain && player.id === pickingCaptain.id && !message.startsWith("!")) {
    const input = message.trim().toLowerCase();
    
    // Reiniciamos el timeout actual
    if (pickTimeoutId !== null) {
        clearTimeout(pickTimeoutId);
        pickTimeoutId = null;
    }

    const teamDestino = (pickMode === "midGame" ? pickTeamToFill : 2);

    // 🔧 CALCULAR CUÁNTOS JUGADORES FALTAN EN EL EQUIPO (ANTES de hacer nada)
    const currentTeamSize = room.getPlayerList().filter(p => p.team === teamDestino && !isPlayerAFK(p.id)).length;
    const slotsNeeded = maxTeamSize - currentTeamSize;

    console.log(`[DEBUG] Equipo ${teamDestino} tiene ${currentTeamSize} jugadores, faltan ${slotsNeeded}`);

    if (slotsNeeded <= 0) {
        room.sendAnnouncement("[PICKS] Tu equipo ya está completo.", player.id, 0xFFFF00, "normal", 2);
        resetPickState();
        if (pickMode === "postGame") {
            setTimeout(() => {
                room.startGame();
            }, 1000);
        } else {
            setTimeout(() => {
                room.pauseGame(false);
            }, 1000);
        }
        return false;
    }

    const specs = getAvailableSpecs();

    if (specs.length === 0) {
        room.sendAnnouncement("[PICKS] No hay jugadores disponibles en espectadores.", player.id, 0xFFFF00, "normal", 2);
        
        // Si no hay más specs, iniciar el partido
        const bluePlayers = room.getPlayerList().filter(p => p.team === 2 && !isPlayerAFK(p.id));
        const redPlayers = room.getPlayerList().filter(p => p.team === 1 && !isPlayerAFK(p.id));
        
        if (bluePlayers.length >= 1 && redPlayers.length >= 1) {
            room.sendAnnouncement("[PICKS] No hay más jugadores disponibles. Se inicia el partido.", null, 0xFFFF00, "bold", 2);
            resetPickState();
            setTimeout(() => {
                room.startGame();
            }, 1000);
        } else {
            resetPickState();
        }
        return false;
    }

    let chosen = [];

    if (input === "random") {
        const toTake = Math.min(slotsNeeded, specs.length);
        console.log(`[DEBUG] RANDOM va a pickear ${toTake} jugadores de ${specs.length} disponibles`);
        
        let pool = specs.slice();
        for (let i = 0; i < toTake; i++) {
            const idx = Math.floor(Math.random() * pool.length);
            chosen.push(pool.splice(idx, 1)[0]);
        }
        
        chosen.forEach(ch => {
            room.setPlayerTeam(ch.id, teamDestino);
            console.log(`[DEBUG] Moviendo ${ch.name} al equipo ${teamDestino}`);
        });
        
        room.sendAnnouncement(
            `[PICKS] ${pickingCaptain.name} eligió RANDOM: ${chosen.map(c => c.name).join(", ")}.`,
            null,
            0x5cb9ff,
            "bold",
            2
        );
    } else if (input === "top") {
        const toTake = Math.min(slotsNeeded, specs.length);
        console.log(`[DEBUG] TOP va a pickear ${toTake} jugadores de ${specs.length} disponibles`);
        
        chosen = specs.slice(0, toTake);
        
        chosen.forEach(ch => {
            room.setPlayerTeam(ch.id, teamDestino);
            console.log(`[DEBUG] Moviendo ${ch.name} al equipo ${teamDestino}`);
        });
        
        room.sendAnnouncement(
            `[PICKS] ${pickingCaptain.name} eligió TOP: ${chosen.map(c => c.name).join(", ")}.`,
            null,
            0x5cb9ff,
            "bold",
            2
        );
    } else {
        const num = parseInt(input, 10);
        if (isNaN(num) || num < 1 || num > specs.length) {
            room.sendAnnouncement('[PICKS] Entrada inválida. Escribe el número, "random" o "top".', player.id, 0xFFFF00, "normal", 2);
            schedulePickTimeout();
            return false;
        }
        const ch = specs[num - 1];
        chosen = [ch];
        room.setPlayerTeam(ch.id, teamDestino);
        console.log(`[DEBUG] Moviendo ${ch.name} al equipo ${teamDestino}`);
        
        room.sendAnnouncement(
            `[PICKS] ${pickingCaptain.name} eligió a ${ch.name}.`,
            null,
            0x5cb9ff,
            "bold",
            2
        );
    }

    // 🔧 ESPERAR A QUE LOS MOVIMIENTOS SE COMPLETEN ANTES DE VERIFICAR
    setTimeout(() => {
        if (pickMode === "postGame") {
            const bluePlayers = room.getPlayerList().filter(p => p.team === 2 && !isPlayerAFK(p.id));
            console.log(`[DEBUG] Después del pick, equipo azul tiene ${bluePlayers.length} jugadores`);
            
            if (bluePlayers.length >= 3) {
                // ✅ Equipo azul completo → iniciar partido
                room.sendAnnouncement("[PICKS] Equipos completos. ¡Comienza el partido!", null, 0x00FF00, "bold", 2);
                resetPickState();
                setTimeout(() => {
                    room.startGame();
                }, 1000);
            } else {
                // Faltan jugadores por pickear
                const updatedSpecs = getAvailableSpecs();
                console.log(`[DEBUG] Specs actualizados: ${updatedSpecs.length} disponibles`);
                
                if (updatedSpecs.length === 0) {
                    // No hay más specs pero el equipo no está completo
                    room.sendAnnouncement("[PICKS] No hay más jugadores disponibles. Se inicia el partido de todas formas.", null, 0xFFFF00, "bold", 2);
                    resetPickState();
                    setTimeout(() => {
                        room.startGame();
                    }, 1000);
                } else {
                    announcePickList(pickingCaptain.id);
                    schedulePickTimeout();
                }
            }
        } else if (pickMode === "midGame") {
            const teamSize = room.getPlayerList().filter(p => p.team === pickTeamToFill && !isPlayerAFK(p.id)).length;
            console.log(`[DEBUG] Después del pick, equipo ${pickTeamToFill} tiene ${teamSize} jugadores`);
            
            if (teamSize >= maxTeamSize) {
                // ✅ Equipo completo → despausar
                room.sendAnnouncement("[PICKS] Equipo completo. Se reanuda el partido.", null, 0x00FF00, "bold", 2);
                resetPickState();
                setTimeout(() => {
                    room.pauseGame(false);
                }, 1000);
            } else {
                const updatedSpecs = getAvailableSpecs();
                console.log(`[DEBUG] Specs actualizados: ${updatedSpecs.length} disponibles`);
                
                if (updatedSpecs.length === 0) {
                    room.sendAnnouncement("[PICKS] No hay más jugadores disponibles. El partido continúa.", null, 0xFFFF00, "bold", 2);
                    resetPickState();
                    setTimeout(() => {
                        room.pauseGame(false);
                    }, 1000);
                } else {
                    announcePickList(pickingCaptain.id);
                    schedulePickTimeout();
                }
            }
        }
    }, 200); // 🔧 Esperar 200ms para que Haxball procese los movimientos

    return false;
}

	// RESTO DE COMANDOS (elo, stats, etc) – SIN CAMBIOS DE LÓGICA

// === COMANDO !stats (SIN INFO DE RANGO) ===
if (message.startsWith("!elo")) {
	const parts = message.split(" ");
	const targetName = parts.length > 1 ? parts.slice(1).join(" ").trim().replace("@", "") : null;

	let targetPlayer;
	if (targetName) {
		targetPlayer = room.getPlayerList().find(p => 
			p.name.toLowerCase() === targetName.replace(/_/g, " ").toLowerCase()
		);
		if (!targetPlayer) {
			room.sendAnnouncement(`[❌] No se encontró al jugador "${targetName}".`, player.id, 0xFFFFFF, "normal", 2);
			return false;
		}
	} else {
		targetPlayer = player;
	}

	let targetAuth = players[targetPlayer.id];
	initializeStats(targetAuth)
	const stats = playerStats[targetAuth];
	if (stats) {
		const winRate = stats.gamesPlayed > 0
			? ((stats.gamesWon / stats.gamesPlayed) * 100).toFixed(2)
			: "0.00";

		const headerMessage = targetPlayer.id === player.id
			? `${player.name}, tus estadísticas:`
			: `${player.name} consultó las estadísticas de ${targetPlayer.name}:`;

		room.sendAnnouncement(
			`${headerMessage}\n` +
			`PJ: ${stats.gamesPlayed} | PG: ${stats.gamesWon} (${winRate}%) | PP: ${stats.gamesLost}\n` +
			`[⚽] ${stats.goals} | [🎯] ${stats.assists} | [🤡] ${stats.ownGoals} | ` +
			`[🥅] ${stats.cleanSheets}\n` +
			`[🏆] MVPs: ${stats.mvps} | [🔥] Racha máxima: ${stats.maxWinStreak}\n` +
			`[⭐] ELO: ${stats.elo}\n` +
			`Para ver tu progreso de rango, utiliza !rank.\n`,
			player.id,
			0xe7ebda,
			"bold"
		);

	} else {
		room.sendAnnouncement(
			targetPlayer.id === player.id
				? "No tienes estadísticas aún."
				: `No se encontraron estadísticas para ${targetPlayer.name}.`,
			player.id,
			0xe7ebda,
			"bold",
			2
		);
	}

	return false;
}

// === COMANDO !stats (SIN INFO DE RANGO) ===
if (message.startsWith("!me")) {
	const parts = message.split(" ");
	const targetName = parts.length > 1 ? parts.slice(1).join(" ").trim().replace("@", "") : null;

	let targetPlayer;
	if (targetName) {
		targetPlayer = room.getPlayerList().find(p => 
			p.name.toLowerCase() === targetName.replace(/_/g, " ").toLowerCase()
		);
		if (!targetPlayer) {
			room.sendAnnouncement(`[❌] No se encontró al jugador "${targetName}".`, player.id, 0xFFFFFF, "normal", 2);
			return false;
		}
	} else {
		targetPlayer = player;
	}

	let targetAuth = players[targetPlayer.id];
	initializeStats(targetAuth)
	const stats = playerStats[targetAuth];
	if (stats) {
		const winRate = stats.gamesPlayed > 0
			? ((stats.gamesWon / stats.gamesPlayed) * 100).toFixed(2)
			: "0.00";

		const headerMessage = targetPlayer.id === player.id
			? `${player.name}, tus estadísticas:`
			: `${player.name} consultó las estadísticas de ${targetPlayer.name}:`;

		room.sendAnnouncement(
			`${headerMessage}\n` +
			`PJ: ${stats.gamesPlayed} | PG: ${stats.gamesWon} (${winRate}%) | PP: ${stats.gamesLost}\n` +
			`[⚽] ${stats.goals} | [🎯] ${stats.assists} | [🤡] ${stats.ownGoals} | ` +
			`[🥅] ${stats.cleanSheets}\n` +
			`[🏆] MVPs: ${stats.mvps} | [🔥] Racha máxima: ${stats.maxWinStreak}\n` +
			`[⭐] ELO: ${stats.elo}\n` +
			`Para ver tu progreso de rango, utiliza !rank.`,
			player.id,
			0xe7ebda,
			"bold"
		);

	} else {
		room.sendAnnouncement(
			targetPlayer.id === player.id
				? "No tienes estadísticas aún."
				: `No se encontraron estadísticas para ${targetPlayer.name}.`,
			player.id,
			0xe7ebda,
			"bold",
			2
		);
	}

	return false;
}

// === COMANDO !stats (SIN INFO DE RANGO) ===
if (message.startsWith("!stats")) {
	const parts = message.split(" ");
	const targetName = parts.length > 1 ? parts.slice(1).join(" ").trim().replace("@", "") : null;

	let targetPlayer;
	if (targetName) {
		targetPlayer = room.getPlayerList().find(p => 
			p.name.toLowerCase() === targetName.replace(/_/g, " ").toLowerCase()
		);
		if (!targetPlayer) {
			room.sendAnnouncement(`[❌] No se encontró al jugador "${targetName}".`, player.id, 0xFFFFFF, "normal", 2);
			return false;
		}
	} else {
		targetPlayer = player;
	}

	let targetAuth = players[targetPlayer.id];
	initializeStats(targetAuth)
	const stats = playerStats[targetAuth];
	if (stats) {
		const winRate = stats.gamesPlayed > 0
			? ((stats.gamesWon / stats.gamesPlayed) * 100).toFixed(2)
			: "0.00";

		const headerMessage = targetPlayer.id === player.id
			? `${player.name}, tus estadísticas:`
			: `${player.name} consultó las estadísticas de ${targetPlayer.name}:`;

		room.sendAnnouncement(
			`${headerMessage}\n` +
			`PJ: ${stats.gamesPlayed} | PG: ${stats.gamesWon} (${winRate}%) | PP: ${stats.gamesLost}\n` +
			`[⚽] ${stats.goals} | [🎯] ${stats.assists} | [🤡] ${stats.ownGoals} | ` +
			`[🥅] ${stats.cleanSheets}\n` +
			`[🏆] MVPs: ${stats.mvps} | [🔥] Racha máxima: ${stats.maxWinStreak}\n` +
			`[⭐] ELO: ${stats.elo}\n` +
			`Para ver tu progreso de rango, utiliza !rank.`,
			player.id,
			0xe7ebda,
			"bold"
		);

	} else {
		room.sendAnnouncement(
			targetPlayer.id === player.id
				? "No tienes estadísticas aún."
				: `No se encontraron estadísticas para ${targetPlayer.name}.`,
			player.id,
			0xe7ebda,
			"bold",
			2
		);
	}

	return false;
}

// === NUEVO COMANDO !rank (SOLO RANGO Y PROGRESO) ===
if (message.startsWith("!rank")) {
	const parts = message.split(" ");
	const targetName = parts.length > 1 ? parts.slice(1).join(" ").trim().replace("@", "") : null;

	let targetPlayer;
	if (targetName) {
		targetPlayer = room.getPlayerList().find(p => 
			p.name.toLowerCase() === targetName.replace(/_/g, " ").toLowerCase()
		);
		if (!targetPlayer) {
			room.sendAnnouncement(`[❌] No se encontró al jugador "${targetName}".`, player.id, 0xFFFFFF, "normal", 2);
			return false;
		}
	} else {
		targetPlayer = player;
	}

	let targetAuth = players[targetPlayer.id];
	initializeStats(targetAuth)
	const stats = playerStats[targetAuth];
	if (stats) {
		const currentElo = stats.elo;
		const currentRank = getRank(currentElo);
		const nextRank = currentElo < 0 
			? "Sin rango disponible"
			: ranks.find(r => r.minElo > currentElo)?.name || "Máximo rango";
		const rankData = ranks.find(r => r.name === currentRank);

		const progressBar = currentElo >= 0
			? getProgressBar(currentElo, rankData.minElo, rankData.maxElo)
			: "Sin progreso";
		const progressPercent = currentElo >= 0
			? Math.floor(((currentElo - rankData.minElo) / (rankData.maxElo - rankData.minElo)) * 100)
			: 0;

		const headerMessage = targetPlayer.id === player.id
			? `${player.name}, tu rango:`
			: `${player.name} consultó el rango de ${targetPlayer.name}:`;

		room.sendAnnouncement(
			`${headerMessage}\n` +
			`🎖️ RANGO ACTUAL: ${currentRank}\n` +
			(currentElo >= 0 
				? `🔹 ${rankData.minElo} ELO [${progressBar}] ${rankData.maxElo} ELO\n` +
				  `Progreso: ${progressPercent}% | Próximo rango: ${nextRank}`
				: "No hay progreso para este rango."),
			player.id,
			0xe7ebda,
			"bold"
		);
	} else {
		room.sendAnnouncement(
			targetPlayer.id === player.id
				? "No tienes estadísticas aún."
				: `No se encontraron estadísticas para ${targetPlayer.name}.`,
			player.id,
			0xe7ebda,
			"bold",
			2
		);
	}

	return false;
}

		if (message.startsWith("!rstat ")) {
			if (!isOwner(player)) {
				room.sendAnnouncement("[❌] No tienes permisos para hacer esto.", player.id, 0xFFFF00, "italic", 2);
				return false;
			}

			const parts = message.split(" ");
			if (parts.length < 2) {
				room.sendAnnouncement("[❌] Debes especificar la estadística que quieres reiniciar.", player.id, 0xFFFF00, "normal", 2);
				return false;
			}
		
			const statToReset = parts[1].trim(); // La estadística a resetear
		
			resetSpecificStat(statToReset);
		
			return false;
		}

	  if (message.toLowerCase() === "!afk") {
		if (player.team !== 0) {
		  // Si el jugador está en un equipo, no puede ponerse AFK
		  room.sendAnnouncement("[❌] No puedes ponerte AFK mientras estás en un equipo.", player.id, 0xFFFFFF, "normal");
		  return false; // Prevenir que el comando se envíe como mensaje
		}
	
		if (isPlayerAFK(player.id)) {
		  // Si ya está AFK, lo sacamos del estado AFK
		  afkPlayers = afkPlayers.filter(id => id !== player.id);
		  room.sendAnnouncement(`[🥱] ${player.name} ya no estas AFK.`, player.id, 0xFFFFFF, "normal", 2);
		} else {
		  // Si no está AFK, lo agregamos
		  afkPlayers.push(player.id);
		  room.sendAnnouncement(`[💤] ${player.name} estas AFK.`, player.id, 0xFFFFFF, "normal", 2);
		}
		return false;
	}

	if (message === "!racha"){
		if(redTeamWinStreak > 0){
			if(redTeamWinStreak === 1){ // Lo mismo que los comentarios de abajo
				room.sendAnnouncement(
					`🔥 ¡El equipo Rojo lleva una racha de ${redTeamWinStreak} victoria consecutiva!`,
					player.id, 0xFF4500, "normal", 2
				);
			} else { // Lo mismo que los comentarios de abajo
			room.sendAnnouncement(
				`🔥 ¡El equipo Rojo lleva una racha de ${redTeamWinStreak} victorias consecutivas!`,
				player.id, 0xFF4500, "normal", 2
			);
		   }
		}
		if(blueTeamWinStreak > 0){
			if(blueTeamWinStreak === 1){ // Si es igual a uno mostrar mensaje mejor formulado para 1 victoria singular
				room.sendAnnouncement(
					`🔥 ¡El equipo Azul lleva una racha de ${blueTeamWinStreak} victoria consecutiva!`,
					player.id, 0x1E90FF, "normal", 2
				);
			} else { // Si no es igual a 1 es mayor entonces mostramos mensaje formulado con plural.
				room.sendAnnouncement(
					`🔥 ¡El equipo Azul lleva una racha de ${blueTeamWinStreak} victorias consecutivas!`,
					player.id, 0x1E90FF, "normal", 2
				);
			}
		}

		if(blueTeamWinStreak === 0 && redTeamWinStreak === 0){
			room.sendAnnouncement(
				`🔥 ¡Los dos equipos no tienen ninguna racha activa!`,
				player.id, 0xFFFFFF, "normal", 2
			);
		}

		return false;
	}


	if (message === "!rangos"){
		const rankDetails = ranks.map(rank => 
			`🔸 ${rank.name}: ${rank.minElo === -Infinity ? "-∞" : rank.minElo} | ${rank.maxElo === Infinity ? "∞" : rank.maxElo} ELO`
		).join("\n");
	
		room.sendAnnouncement(
			`📜 Lista de Rangos y Requisitos:\n${rankDetails}`,
			player.id,
			0xFFFF00,
			"normal"
		);

		return false;
	}

	if (message === "!gks") {
		if(isAdmin(player)) {
        if (redGK && blueGK) {
            room.sendAnnouncement(`[🔴] GK Equipo Rojo: ${redGK.name} | [🔵] GK Equipo Azul: ${blueGK.name}`, null, 0xFFFFFF, "bold", 2);
        } else {
            room.sendAnnouncement("[❌] Los arqueros no han sido definidos aún.", null, 0xFFFFFF, null, 2);
        }
		return false;
	}
	else {
		if (redGK && blueGK) {
            room.sendAnnouncement(`[🔴] GK Equipo Rojo: ${redGK.name} | [🔵] GK Equipo Azul: ${blueGK.name}`, player.id, 0xFFFFFF, "bold", 2);
        } else {
            room.sendAnnouncement("[❌] Los arqueros no han sido definidos aún.", player.id, 0xFFFFFF);
        }
	}
        return false;
    }
	
	if (message.toLowerCase() === "!nv"){
		room.kickPlayer(player.id, "[👋] Espero que la hayas pasado bien, nos vemos!", false)
		return false;
	}
	if (message === "!reset"){
		if (!isOwner(player)) {
            room.sendAnnouncement("[❌] No tienes permisos para hacer esto.", player.id, 0xFFFF00, "italic", 2);
            return false;
        }

		resetStats();

		return false;
	}

	if (message.startsWith("!vip")) {
        const args = message.split(" ").slice(1); // Dividir argumentos
        const command = args[0]; // Subcomando (e.g., "add", "remove", "list")

        if (!isOwner(player)) {
            room.sendAnnouncement("[❌] No tienes permisos para hacer esto.", player.id, 0xFFFF00, "italic", 2);
            return false;
        }

        switch (command) {
            case "add":
                if (args.length < 3) {
                    room.sendAnnouncement("⚠️ Uso del comando: !vip add [auth] [duración]", player.id, 0xFFFF00, "italic", 2);
                    return false;
                }

                const auth = args[1];
                const duration = args[2];
                const expirationDate = duration === "perm" ? "perm" : calculateExpiration(duration);

                if (!auth || !duration) {
                    room.sendAnnouncement("⚠️ Debes proporcionar un AUTH y una duración válida.", player.id, 0xFFFF00, "italic", 2);
                    return false;
                }

                vips[auth] = {
                    auth,
                    expirationDate,
                };

                saveVips();
                room.sendAnnouncement(`✅ VIP añadido: ${auth} con duración: ${duration}`, player.id, 0x00FF00, "bold", 2);
                return false;

            case "remove":
                if (args.length < 2) {
                    room.sendAnnouncement("⚠️ Uso del comando: !vip remove [auth]", player.id, 0xFFFF00, "italic", 2);
                    return false;
                }

                const removeAuth = args[1];

                if (vips[removeAuth]) {
                    delete vips[removeAuth];
                    saveVips();
                    room.sendAnnouncement(`✅ VIP eliminado: ${removeAuth}`, player.id, 0x00FF00, "bold", 2);
                } else {
                    room.sendAnnouncement(`⚠️ El AUTH ${removeAuth} no está en la lista de VIPs.`, player.id, 0xFFFF00, "italic", 2);
                }
                return false;

            case "list":
                const vipList = Object.values(vips).map(vip => {
                    const name = playerStats[vip.auth]?.name || "Desconocido";
                    const duration = vip.expirationDate === "perm" ? "Permanente" : calculateRemainingTime(vip.expirationDate);
                    return `${name} - AUTH: ${vip.auth} - Duración: ${duration}`;
                });

                const listMessage = vipList.length > 0 ? `📋 Lista de VIPs:\n${vipList.join("\n")}` : "📋 No hay VIPs registrados.";
                room.sendAnnouncement(listMessage, player.id, 0xFFFFFF, "normal", 2);
                return false;

            default:
                room.sendAnnouncement("⚠️ Uso del comando:\n!vip add [auth] [duración]\n!vip remove [auth]\n!vip list", player.id, 0xFFFF00, "italic", 2);
                return false;
        }
    }


if (message.startsWith("!ban")) {
    const pAuth = players[player.id]; // auth del admin que ejecuta
    const adminName = player.name;

    if (isAdmin(player) || loggedAdmins.includes(pAuth)) {
        const args = message.split(" ").slice(1); 
        // args[0] = @usuario, args[1] = duración, resto = razón

        if (args.length < 2) {
            room.sendAnnouncement(
                "⚠️ Uso del comando: !ban @usuario [duración] [razón]\nEj: !ban @pepito 24h Flood",
                player.id,
                0xFFFF00,
                "italic",
                2
            );
            return false;
        }

        const targetArg = args[0];    // "@usuario"
        const durationArg = args[1];  // "24h"
        const reason = args.slice(2).join(" ").trim() || "Sin especificar";

        const durationMs = parseDurationToMs(durationArg);
        if (!durationMs) {
            room.sendAnnouncement(
                "⚠️ Duración no válida. Usa algo como: 10m, 2h, 3d.",
                player.id,
                0xFFFF00,
                "italic",
                2
            );
            return false;
        }

        // Nombre sin @, se permiten underscores como en otros comandos
        const rawName = targetArg.startsWith("@") ? targetArg.slice(1) : targetArg;
        const targetName = rawName.toLowerCase().replace(/_/g, " ");

        const target = room.getPlayerList().find(p =>
            p.name.toLowerCase() === targetName
        );

        if (!target) {
            room.sendAnnouncement(
                `⚠️ Jugador ${targetName} no encontrado.`,
                player.id,
                0xFFFF00,
                "italic",
                2
            );
            return false;
        }

        // Intentamos primero con target.auth, si no, con el mapa players
        const targetAuth = target.auth || players[target.id];

        if (!targetAuth) {
            room.sendAnnouncement(
                "⚠️ No se pudo obtener el AUTH del jugador.",
                player.id,
                0xFFFF00,
                "italic",
                2
            );
            return false;
        }

        // Registramos ban temporal por AUTH
        // (si tu addTempBanAuth soporta 'byAdmin', acá podrías pasar adminName también)
        addTempBanAuth(targetAuth, durationMs, reason, adminName, target.name);

        // Kick inmediato
        room.kickPlayer(
            target.id,
            `Has sido temporalmente baneado por ${reason}.\nDuración: ${durationArg}.\nBaneado por: ${adminName}.`,
            false
        );

        room.sendAnnouncement(
            `✅ Jugador ${target.name} baneado temporalmente por ${durationArg}. Razón: ${reason}. (Baneado por: ${adminName})`,
            player.id,
            0x00FF00,
            "bold",
            2
        );

        return false;
    } else {
        room.sendAnnouncement(
            "[❌] No tienes permisos para hacer esto.",
            player.id,
            0xFFFF00,
            "normal",
            2
        );
        return false;
    }
}


if (message.startsWith("!banauth")) {
    const pAuth = players[player.id];
    const adminName = player.name;

    if (isAdmin(player) || loggedAdmins.includes(pAuth)) {
        const args = parts.slice(1);
        // args[0] = AUTH, args[1] = duración, resto = razón

        if (args.length < 2) {
            room.sendAnnouncement(
                "⚠️ Uso del comando: !banauth [AUTH] [duración] [razón]\nEj: !banauth XXXXXXXXXXXXXXXXXXXX 7d Abuso",
                player.id,
                0xFFFF00,
                "italic",
                2
            );
            return false;
        }

        const authValue   = args[0].trim();
        const durationArg = args[1];
        const reason      = args.slice(2).join(" ").trim() || "Sin especificar";

        const durationMs = parseDurationToMs(durationArg);
        if (!durationMs) {
            room.sendAnnouncement(
                "⚠️ Duración no válida. Usa algo como: 10m, 2h, 3d.",
                player.id,
                0xFFFF00,
                "italic",
                2
            );
            return false;
        }

        // Ban temporal OFFLINE: queda guardado y se aplica al entrar
        addTempBanAuth(authValue, durationMs, reason, adminName, "Desconocido");

        room.sendAnnouncement(
            `✅ AUTH ${authValue} ha sido baneado temporalmente por ${durationArg}. Motivo: ${reason}. (Baneado por: ${adminName})`,
            player.id,
            0x00FF00,
            "bold",
            2
        );

        return false;
    } else {
        room.sendAnnouncement(
            "[❌] No tienes permisos para hacer esto.",
            player.id,
            0xFFFF00,
            "normal",
            2
        );
        return false;
    }
}

if (message.startsWith("!tempbanlist")) {
    const pAuth = players[player.id];
    
    if (isAdmin(player) || loggedAdmins.includes(pAuth)) {

        // Limpiamos primero los que ya expiraron
        cleanExpiredTempBans();

        if (!tempBans.auths || tempBans.auths.length === 0) {
            room.sendAnnouncement(
                "📋 No hay baneos temporales activos.",
                player.id,
                0xFFFF00,
                "italic",
                2
            );
            return false;
        }

        let lines = ["📋 Baneos temporales activos:\n"];

        tempBans.auths.forEach((ban, i) => {
            const remaining = formatRemainingTime(ban.expiresAt);
            const auth      = ban.auth || "Desconocido";
            const name      = ban.name || "Desconocido";
            const by        = ban.by   || "Sistema";
            const reason    = ban.reason || "Sin especificar";

            lines.push(
                `${i}) Jugador: ${name} | AUTH: ${auth} | Restante: ${remaining} | Por: ${by} | Razón: ${reason}`
            );
        });

        const msg = lines.join("\n");

        room.sendAnnouncement(
            msg,
            player.id,   // solo al admin que ejecuta; poné null si querés global
            0xFFFFFF,
            "normal",
            2
        );

        return false;
    } else {
        room.sendAnnouncement(
            "[❌] No tienes permisos para hacer esto.",
            player.id,
            0xFFFF00,
            "normal",
            2
        );
        return false;
    }
}
	
if (message.startsWith("!unban")) {
    const pAuth = player.auth;
    if (isAdmin(player) || loggedAdmins.includes(pAuth)) {

        const args = message.split(" ").slice(1);
        if (args.length < 1) {
            room.sendAnnouncement(
                "⚠️ Uso del comando: !unban [índice|AUTH]\nEj: !unban 0  o  !unban XXXXXXXXXXXX",
                player.id,
                0xFFFF00,
                "italic",
                2
            );
            return false;
        }

        const target = args[0].trim();
        cleanExpiredTempBans();

        if (!tempBans.auths || tempBans.auths.length === 0) {
            room.sendAnnouncement(
                "📋 No hay baneos temporales activos.",
                player.id,
                0xFFFF00,
                "italic",
                2
            );
            return false;
        }

        let removedBan = null;

        // ¿Es un número? -> tratamos como índice
        if (/^\d+$/.test(target)) {
            const index = parseInt(target, 10);
            if (index < 0 || index >= tempBans.auths.length) {
                room.sendAnnouncement(
                    "⚠️ Índice inválido.",
                    player.id,
                    0xFFFF00,
                    "italic",
                    2
                );
                return false;
            }

            removedBan = tempBans.auths.splice(index, 1)[0];
        } else {
            // Lo tomamos como AUTH
            const idx = tempBans.auths.findIndex(b => b.auth === target);
            if (idx === -1) {
                room.sendAnnouncement(
                    `⚠️ No se encontró un ban temporal para AUTH ${target}.`,
                    player.id,
                    0xFFFF00,
                    "italic",
                    2
                );
                return false;
            }
            removedBan = tempBans.auths.splice(idx, 1)[0];
        }

        saveTempBans();

		if (removedBan.hostBanId != null) {
    try {
        room.clearBan(removedBan.hostBanId);
    } catch (e) {}
}

        room.sendAnnouncement(
            `✅ Se ha desbaneado el AUTH ${removedBan.auth}. Razón original: ${removedBan.reason}`,
            player.id,
            0x00FF00,
            "bold",
            2
        );

        return false;
    } else {
        room.sendAnnouncement(
            "[❌] No tienes permisos para hacer esto.",
            player.id,
            0xFFFF00,
            "normal",
            2
        );
        return false;
    }
}


	if (message.startsWith("!blacklist")) {
		if(isAdmin(player) || loggedAdmins.includes(pAuth)) {
        const args = message.split(" ").slice(1); // Separar los argumentos
        const command = args[0]; // Subcomando (e.g., "add", "remove", "list")

			if (args[0].startsWith("@")) {
            const rawName    = args[0].slice(1);
            const targetName = rawName.toLowerCase().replace(/_/g, " ");

            const target = room.getPlayerList().find(p =>
                p.name.toLowerCase() === targetName
            );

            if (!target) {
                room.sendAnnouncement(
                    `⚠️ Jugador ${targetName} no encontrado.`,
                    player.id,
                    0xFFFF00,
                    "italic",
                    2
                );
                return false;
            }

            if (!target.auth) {
                room.sendAnnouncement(
                    "⚠️ No se pudo obtener el AUTH del jugador.",
                    player.id,
                    0xFFFF00,
                    "italic",
                    2
                );
                return false;
            }

            const reason = args.slice(1).join(" ").trim() || "Sin especificar";

            // Ver si ya estaba en blacklist
            const existing = blacklist.auths.find(entry => entry.value === target.auth);
            if (!existing) {
                blacklist.auths.push({
                    value: target.auth,
                    reason,
                    hostBanId: target.id,
                    lastName: target.name
                });
            } else {
                existing.reason   = reason;
                existing.hostBanId = target.id;
                existing.lastName  = target.name;
            }

            saveBlacklist();

            room.kickPlayer(
                target.id,
                `Has sido añadido a la blacklist.\nRazón: ${reason}`,
                true // ban interno
            );

            room.sendAnnouncement(
                `✅ Jugador ${target.name} (AUTH: ${target.auth}) añadido a la blacklist. Razón: ${reason}`,
                player.id,
                0x00FF00,
                "bold",
                2
            );

            return false;
        }

        switch (command) {
            case "add":
                if (args.length < 3) {
                    room.sendAnnouncement(
                        "⚠️ Uso del comando: !blacklist add [ip/auth] [valor] [razón]",
                        player.id,
                        0xFFFF00,
                        "italic",
                        2
                    );
                    return false;
                }

                const type = args[1]?.toLowerCase();
                const value = args[2]?.trim();
                const reason = args.slice(3).join(" ").trim() || "Sin especificar";

                if (!type || (type !== "ip" && type !== "auth")) {
                    room.sendAnnouncement(
                        "⚠️ Tipo no válido. Usa 'ip' o 'auth'.",
                        player.id,
                        0xFFFF00,
                        "italic",
                        2
                    );
                    return false;
                }

                if (!value) {
                    room.sendAnnouncement(
                        "⚠️ Debes proporcionar un valor válido para IP o AUTH.",
                        player.id,
                        0xFFFF00,
                        "italic",
                        2
                    );
                    return false;
                }

                const blacklistCategory = blacklist[type + "s"]; // 'auths' o 'ips'
                if (!blacklistCategory.some(entry => entry.value === value)) {
                    blacklistCategory.push({ value, reason });
                    saveBlacklist();
                    room.sendAnnouncement(
                        `✅ ${type.toUpperCase()} ${value} ha sido añadido a la blacklist. Razón: ${reason}`,
                        player.id,
                        0x00FF00,
                        "bold",
                        2
                    );
                } else {
                    room.sendAnnouncement(
                        `⚠️ ${type.toUpperCase()} ${value} ya está en la blacklist.`,
                        player.id,
                        0xFFFF00,
                        "italic",
                        2
                    );
                }
                return false;

            case "remove":
                if (args.length < 3) {
                    room.sendAnnouncement(
                        "⚠️ Uso del comando: !blacklist remove [ip/auth] [valor]",
                        player.id,
                        0xFFFF00,
                        "italic",
                        2
                    );
                    return false;
                }

                const removeType = args[1]?.toLowerCase();
                const removeValue = args[2]?.trim();

                if (!removeType || !removeValue) {
                    room.sendAnnouncement(
                        "⚠️ Debes proporcionar un tipo y un valor válidos.",
                        player.id,
                        0xFFFF00,
                        "italic",
                        2
                    );
                    return false;
                }

				const removeCategory = blacklist[removeType + "s"]; // 'auths' o 'ips'
				const index = removeCategory.findIndex(entry => entry.value === removeValue);

				if (index !== -1) {
    				const [removed] = removeCategory.splice(index, 1);
    				saveBlacklist();

    				// Si ese usuario alguna vez entró y lo baneamos internamente…
    				if (removed.hostBanId != null) {
        			try {
            			room.clearBan(removed.hostBanId);
        				} catch (e) {}
    				}

    				room.sendAnnouncement(
        			`✅ ${removeType.toUpperCase()} ${removeValue} ha sido eliminado de la blacklist.`,
        			player.id,
        			0x00FF00,
        			"bold",
        			2
    				);
					} else {
                    room.sendAnnouncement(
                        `⚠️ ${removeType.toUpperCase()} ${removeValue} no está en la blacklist.`,
                        player.id,
                        0xFFFF00,
                        "italic",
                        2
                    );
                }
                return false;

            case "list":
                const authList = blacklist.auths
                    .filter(entry => entry.value && entry.reason)
                    .map(entry => `AUTH: ${entry.value} - Razón: ${entry.reason}`)
                    .join("\n");
                const ipList = blacklist.ips
                    .filter(entry => entry.value && entry.reason)
                    .map(entry => `IP: ${entry.value} - Razón: ${entry.reason}`)
                    .join("\n");

                const listMessage = `📋 Blacklist:\n\n${authList}\n\n${ipList}`.trim();

                if (!authList && !ipList) {
                    room.sendAnnouncement(
                        "📋 La blacklist está vacía.",
                        player.id,
                        0xFFFF00,
                        "italic",
                        2
                    );
                } else {
                    room.sendAnnouncement(listMessage, player.id, 0xFFFFFF, "normal", 2);
                }
                return false;

            default:
                room.sendAnnouncement(
                    "⚠️ Uso del comando:\n" +
                    "!blacklist add [ip/auth] [valor] [razón]\n" +
                    "!blacklist remove [ip/auth] [valor]\n" +
                    "!blacklist list",
                    player.id,
                    0xFFFF00,
                    "italic",
                    2
                );
                return false;
        }
	    }
		else{
			room.sendAnnouncement("[❌] No tienes permisos para hacer esto.", player.id, 0xFFFF00, "normal", 2);
			return false;
		}
    }

	if (message.startsWith("!jugardenuevo")) {

        if (!vips[pAuth]) {
            room.sendAnnouncement(
                "[❌] Este comando es exclusivo para usuarios VIP.",
                player.id,
                0xFFFF00,
                "normal",
                2
            );
            return false;
        }

		if(player.team === 0){
			room.sendAnnouncement(
                "[❌] Este comando solo se puede usar si estas en un equipo.",
                player.id,
                0xFFFF00,
                "normal",
                2
            );
            return false;
		}

		if(gameStarted === false){
			room.sendAnnouncement(
                "[❌] Este comando solo se puede usar si el partido esta empezado.",
                player.id,
                0xFFFF00,
                "normal",
                2
            );
            return false;
		}

		const currentTeam = player.team; // Obtener el equipo actual del jugador

        // Verificar cooldown
        const lastUsed = jugardenuevoCooldowns[pAuth] || 0;
        const timeLeft = getCooldownTimeLeft(lastUsed);
        if (timeLeft > 0) {
            const minutes = Math.floor(timeLeft / 60000);
            const seconds = Math.floor((timeLeft % 60000) / 1000);
            room.sendAnnouncement(
                `[⚠️] Debes esperar ${minutes} minutos y ${seconds} segundos para usar este comando nuevamente.`,
                player.id,
                0xFFFF00,
                "italic",
                2
            );
            return false;
        }

        // Registrar uso del comando
        jugardenuevoCooldowns[pAuth] = Date.now();
		usedJugardenuevo.add(player.id);

		room.sendAnnouncement(
			`[🌟] El jugador VIP ${player.name} decidio seguir jugando gracias a su beneficio VIP.`,
			null,
			0xFFD700,
			"bold",
			2
		);

        return false;
    }

	if (message.toLowerCase() === "!bb"){
		room.kickPlayer(player.id, "[🫡] Espero que la hayas pasado bien, nos vemos!", false)
		return false;
	}

	if (message === "!rr") {
		if(player.admin){
        if (room.getScores()) {
            room.stopGame();
        }
        room.startGame();
	    } 	else {
		room.sendAnnouncement("[❌] No tienes permisos para hacer esto.", player.id, 0xFFFF00, "normal", 2);
		}
        return false;
    }


	if (message === "!clearbans") {        

		if(isAdmin(player) || loggedAdmins.includes(pAuth)){
		room.sendAnnouncement(`Se reiniciaron los baneos.`, player.id)
		room.clearBans();
		}
		else{
			room.sendAnnouncement("[❌] No tienes permisos para hacer esto.", player.id, 0xFFFF00, "normal", 2);
			}

        return false;
    }


	if (message === "!help") {
		const helpMessage = 
			"🆘 Comandos disponibles:\n" +
			"[!nv] - Te expulsa de la sala con un mensaje de despedida.\n" +
			"[!bb] - Te expulsa de la sala con un mensaje de despedida.\n" +
			"[!afk] - Activa el estado AFK. Se puede desactivar poniendo el mismo comando.\n" +
			"[!afks] - Se pueden ver los jugadores afks.\n" +
			"[!msg @nombre] - Envía un mensaje privado a otro jugador mencionado. Usa el formato `@nombre` para mencionarlo.\n" +
			"[!gks] - Muestra los nombres de los arqueros de los equipos rojo y azul.\n" +
			"[!discord] - Proporciona el enlace para unirse al servidor de Discord.\n" +
			"[!top] - Muestra el top 10 de las estadisticas que especifiques.\n" +
			"[!reglas] - Muestra las reglas del host.\n" +
			"[t (mensaje)] - Hablas por el chat de equipo.\n" +
			"[p] - Inicia votacion para pausar.\n" +
			"[!calladmin] - Llama a un administrador con la razon que pusiste.\n" +
			"[!rangos] - Muestra los rangos con los elos necesarios.\n" +
			"[!stats] - Muestra tus estadísticas personales en la partida.\n";
	
		room.sendAnnouncement(helpMessage, player.id, 0xFFFFFF); // Mensaje de ayuda en amarillo
		return false; // Previene el envío del mensaje original
	}

if (message.toLowerCase() === "p") {
  /* ─── Requisitos previos ─────────────────────────────── */

  if (player.team === 0) {   // solo jugadores en cancha
    room.sendAnnouncement(
      "⚠️ Solo los jugadores en cancha pueden iniciar una votación de pausa.",
      player.id, 0xFFFF00, "normal", 2
    );
    return false;
  }

  if (pauseOnCooldown) {     // partido ya está en pausa
    room.sendAnnouncement(
      "⏸️ El partido ya está pausado. Esperá a que se reanude.",
      player.id, 0x5cb9ff, "italic", 1
    );
    return false;
  }

  /* ─── Iniciar o sumar votos ──────────────────────────── */

  if (!pauseVoteActive) {
    //   ⬤ Nuevo proceso de votación
    pauseVoteActive = true;
    pauseVoters.clear();
    pauseVoters.add(player.id);

    room.sendAnnouncement(
      `${player.name} inició una votación para pausar el partido. `
      + `Se necesitan ${VOTES_REQUIRED} votos. Escribí "p" para votar.`,
      null, 0xF4CD6B, "bold", 2
    );

    // Ventana de 30 s para alcanzar los votos
    setTimeout(() => {
      if (pauseVoteActive) {
        pauseVoteActive = false;
        pauseVoters.clear();
        room.sendAnnouncement(
          "⏳ La votación para pausar el partido expiró.",
          null, 0x5cb9ff, "italic", 2
        );
      }
    }, VOTE_WINDOW_MS);

  } else {
    //   ⬤ Votación YA abierta ➜ sumar voto
    if (pauseVoters.has(player.id)) {
      room.sendAnnouncement(
        "⚠️ Ya votaste para pausar el partido.",
        player.id, 0x5cb9ff, "italic", 1
      );
      return false;
    }

    pauseVoters.add(player.id);
    room.sendAnnouncement(
      `${player.name} votó para pausar (${pauseVoters.size}/${VOTES_REQUIRED}).`,
      null, 0xF4CD6B, "normal", 1
    );

    //   ✔️ ¿Se alcanzó el mínimo?
    if (pauseVoters.size >= VOTES_REQUIRED) {
      pauseVoteActive = false;
      pauseOnCooldown = true;
      pauseVoters.clear();

      room.sendAnnouncement(
        `⏸️ Partido PAUSADO por ${PAUSE_TIME_MS/1000} s.`,
        null, 0x5cb9ff, "bold", 2
      );
      room.pauseGame(true);

      setTimeout(() => {
        room.pauseGame(false);
        pauseOnCooldown = false;
        room.sendAnnouncement(
          "▶️ Partido reanudado.",
          null, 0x5cb9ff, "normal", 2
        );
      }, PAUSE_TIME_MS);
    }
  }

  return false;  // siempre anular el chat “p”
}

	if (message.startsWith("t ")) {
		const teamMessage = message.slice(2).trim();
		if (teamMessage.length === 0) {
			room.sendAnnouncement("⚠️ El mensaje para el equipo no puede estar vacío.", player.id, 0xf44336, "italic", 2);
			return false;
		}
	
		const team = player.team;
		if (team === 0) {
			room.sendAnnouncement("⚠️ No puedes enviar mensajes al equipo porque no estás en ninguno.", player.id, 0xFF0000, "normal", 2);
			return false;
		}
	
		const teamColor = team === 1 ? 0xf44336 : 0x5cb9ff;
		room.getPlayerList().forEach((p) => {
			if (p.team === team) {
				room.sendAnnouncement(`[EQUIPO] ${player.name}: ${teamMessage}`, p.id, teamColor, "normal", 1);
			}
		});
	
		return false;
	}

	if (message === "!reglas") {
		const rulesMessage = 
			"🆘 Reglas:\n" +
			"No se puede salir PERDIENDO de una partida, si este no se respeta se puede sancionar con baneo TEMPORAL de 24 HORAS.\n" +
			"Se tiene que respetar el GK que se elige al inicio de la partida, si es que alguien quiere cambiarte si se puede, si este no se respeta se puede sancionar con baneo TEMPORAL de 24 HORAS.\n" +
			"No se puede trolear ningun partido, no hay excusa, si este no se respeta se puede sancionar con BANEO PERMANENTE.\n" +
			"Los insultos se pueden tolerar, pero no en exceso ni amenazas.\n";	
		room.sendAnnouncement(rulesMessage, player.id, 0xFFFFFF); // Mensaje de ayuda en amarillo
		return false; // Previene el envío del mensaje original
	}

	if (message === "!discord") {
		if(isAdmin(player)){
			const discordMessage = 
			`[💬] ¡ÚNETE A NUESTRO DISCORD!\n` +
			`📢 ¡Conéctate con otros jugadores, participa en eventos y enterate de cuando abrimos host!\n\n` +
			`🌐 Enlace: https://discord.gg/Cr2yhvBMQa\n` +
			`🔔 ¡Te esperamos! 🎉`;
	
		room.sendAnnouncement(discordMessage, null, 0x8B5FD9, "bold", 2); // Negrita, color verde.
		return false;
		}
		else{
		const discordMessage = 
			`[💬] ¡ÚNETE A NUESTRO DISCORD!\n` +
			`📢 ¡Conéctate con otros jugadores, participa en eventos y enterate de cuando abrimos host!\n\n` +
			`🌐 Enlace: https://discord.gg/Cr2yhvBMQa\n` +
			`🔔 ¡Te esperamos! 🎉`;
	
		room.sendAnnouncement(discordMessage, player.id, 0x8B5FD9, "bold", 2); // Negrita, color verde.
		return false;
		}
	}

	if (message === "!ds") {
		if(isAdmin(player)){
			const discordMessage = 
			`[💬] ¡ÚNETE A NUESTRO DISCORD!\n` +
			`📢 ¡Conéctate con otros jugadores, participa en eventos y enterate de cuando abrimos host!\n\n` +
			`🌐 Enlace: https://discord.gg/Cr2yhvBMQa\n` +
			`🔔 ¡Te esperamos! 🎉`;
	
		room.sendAnnouncement(discordMessage, null, 0x8B5FD9, "bold", 2); // Negrita, color verde.
		return false;
		}
		else{
		const discordMessage = 
			`[💬] ¡ÚNETE A NUESTRO DISCORD!\n` +
			`📢 ¡Conéctate con otros jugadores, participa en eventos y enterate de cuando abrimos host!\n\n` +
			`🌐 Enlace: https://discord.gg/Cr2yhvBMQa\n` +
			`🔔 ¡Te esperamos! 🎉`;
	
		room.sendAnnouncement(discordMessage, player.id, 0x8B5FD9, "bold", 2); // Negrita, color verde.
		return false;
		}
	}

	if (message === "!rc") {
		if(player.admin || vips[pAuth]){
		if(gameStarted === false){
		room.sendAnnouncement("[❌] El partido no esta iniciado.", player.id, 0xFFFF00, "normal", 2);
		} else {
		randomizeTeamColors(player);
		}
		}
		else{
			room.sendAnnouncement("[❌] No tienes permisos para hacer esto.", player.id, 0xFFFF00, "normal", 2);
			}
        return false;
    }


	if (message.startsWith("!top")) {
		let args = message.split(" ");
		if (args.length === 1) {
			// Mensaje de ayuda para los comandos de top
			let helpMessage = "Comandos de Top disponibles:\n";
			helpMessage += "🔝 !top goles - Top 5 por goles\n";
			helpMessage += "🔝 !top asis - Top 5 por asistencias\n";
			helpMessage += "🔝 !top vallas - Top 5 por vallas invictas\n";
			helpMessage += "🔝 !top pj - Top 5 por partidos jugados\n";
			helpMessage += "🔝 !top pg - Top 5 por partidos ganados\n";
			helpMessage += "🔝 !top pp - Top 5 por partidos perdidos\n";
			helpMessage += "🔝 !top gc - Top 5 por goles en contra\n";
			helpMessage += "🔝 !top mvp - Top 5 por MVPs\n";
			helpMessage += "🔝 !top elo - Top 5 por ELO\n";
			helpMessage += "🔝 !top racha - Top 5 por racha máxima de victorias\n";
			room.sendAnnouncement(helpMessage, player.id, 0xFFFFFF);
			return false;
		}
	
		let statType = args[1];
		let statKey, statLabel;
	
		switch (statType) {
			case "goles":
				statKey = "goals";
				statLabel = "Goles";
				break;
			case "asis":
				statKey = "assists";
				statLabel = "Asistencias";
				break;
			case "vallas":
				statKey = "cleanSheets";
				statLabel = "Vallas Invictas";
				break;
			case "pj":
				statKey = "gamesPlayed";
				statLabel = "Partidos Jugados";
				break;
			case "pg":
				statKey = "gamesWon";
				statLabel = "Partidos Ganados";
				break;
			case "pp":
				statKey = "gamesLost";
				statLabel = "Partidos Perdidos";
				break;
			case "gc":
				statKey = "ownGoals";
				statLabel = "Goles en Contra";
				break;
			case "mvp":
				statKey = "mvps";
				statLabel = "MVPs";
				break;
			case "racha":
				statKey = "maxWinStreak";
				statLabel = "Racha de Victorias";
				break;
			case "elo":
				statKey = "elo";
				statLabel = "ELO";
				break;
			default:
				room.sendAnnouncement("Comando de top no reconocido. Usa !top para ver los comandos disponibles.", player.id, 0xFF0000);
				return false;
		}
	
		// Obtener y ordenar los jugadores según la estadística seleccionada
		let statsArray = Object.keys(playerStats)
			.map(auth => ({
				auth: auth,
				stat: playerStats[auth][statKey] || 0,
				name: playerStats[auth].name || "Desconocido"
			}))
			.filter(player => player.name !== "Desconocido"); // Filtrar "Desconocido"
	
		// Eliminar nombres duplicados dejando solo el mayor
		let uniqueStats = {};
		statsArray.forEach(player => {
			if (!uniqueStats[player.name] || uniqueStats[player.name].stat < player.stat) {
				uniqueStats[player.name] = player;
			}
		});
	
		// Convertir de nuevo a un array y ordenar
		let uniqueStatsArray = Object.values(uniqueStats);
		uniqueStatsArray.sort((a, b) => b.stat - a.stat);
	
		// Construir el mensaje del top 5
		let topPlayers = uniqueStatsArray.slice(0, 5); // Cambiar a top 5
		let topMessage = `🔝 Top 5 Jugadores por ${statLabel}:\n`;
		topPlayers.forEach((player, index) => {
			topMessage += `${index + 1}. ${player.name} - ${statLabel}: ${player.stat}\n`;
		});
	
		room.sendAnnouncement(topMessage, player.id, 0xe8874f);
		return false;
	}

	if (message.startsWith("!anuncio")) {
		if (isAdmin(player) || loggedAdmins.includes(pAuth) || vips[pAuth]) {
			const announcement = message.split(" ").slice(1).join(" ");
			room.sendAnnouncement(`📢 [Anuncio de ${player.name}] ${announcement}`, null, 0xFFFF00, "bold", 2);
		}
		else{
			room.sendAnnouncement("[❌] No tienes permisos para hacer esto. (VENTAJA VIP)", player.id, 0xFFFF00, "normal", 2);
			}
		return false;
	}

	if (message === "!claim-admin"){
		if(vips[pAuth]){
			room.setPlayerAdmin(player.id, true)
			room.sendAnnouncement(`💎 El usuario ${player.name} reclamo el admin gracias a el VIP!`, null, 0x5cb9ff, "bold", 2);
			return false;
		}
		else{
			room.sendAnnouncement("[❌] No tienes permisos para hacer esto. (VENTAJA VIP)", player.id, 0xFFFF00, "normal", 2);
			return false;
		}
	}

	if (message.startsWith("!login")) {
		const inputPassword = message.split(" ")[1]; // Suponiendo que la contraseña se pasa como segundo argumento
		
		if (inputPassword === pass1) {
			room.setPlayerAdmin(player.id, true);
			const playerAuth = players[player.id];
			
			// Agregar al administrador logueado a la lista oficial
			if (playerAuth && !loggedAdmins.includes(playerAuth)) {
				loggedAdmins.push(playerAuth);
			}
	
			room.sendAnnouncement(`[👮] ¡${player.name} ha iniciado sesión como administrador oficial!`, null, 0x33FFFF, null, 2);
			
			// Generar una nueva contraseña para la próxima sesión
			pass1 = generateRandomPassword();
			sendPasswordToWebhook(pass1);
		} else {
			room.kickPlayer(player.id, `❌ Contraseña incorrecta.`);
		}
		return false;
	}

	if (message.startsWith("!calladmin")) {
        const reason = message.slice(10).trim();
        if (reason.length === 0) {
            room.sendAnnouncement(
                "⚠️ Debes especificar una razón para solicitar un administrador.",
                player.id,
                0xFFFF00,
                "italic",
                2
            );
            return false;
        }

        const auth = pAuth || "Desconocido";
        sendWebhook(
            callAdminWebhookURL,
            `🚨 **Solicitud de Administrador** 🚨\nEl usuario \`${player.name}\`, AUTH: \`${auth}\` ha solicitado un administrador.\n**Razón**: ${reason}\n<@&1301606479261859950>`
        );
        room.sendAnnouncement(
            "📩 Solicitud de administrador enviada.",
            player.id,
            0xFFFFFF,
            "normal",
            2
        );
        return false;
    }

	if (message.startsWith("!llamaradmin")) {
        const reason = message.slice(12).trim();
        if (reason.length === 0) {
            room.sendAnnouncement(
                "⚠️ Debes especificar una razón para solicitar un administrador.",
                player.id,
                0xFFFF00,
                "italic",
                2
            );
            return false;
        }

        const auth = pAuth || "Desconocido";
        sendWebhook(
            callAdminWebhookURL,
            `🚨 **Solicitud de Administrador** 🚨\nEl usuario \`${player.name}\`, AUTH: \`${auth}\` ha solicitado un administrador.\n**Razón**: ${reason}\n<@&1301606479261859950>`
        );
        room.sendAnnouncement(
            "📩 Solicitud de administrador enviada.",
            player.id,
            0xFFFFFF,
            "normal",
            2
        );
        return false;
    }

	if (message.toLowerCase() === "!afks") {
		if (afkPlayers.length === 0) {
		  room.sendAnnouncement("[💤] No hay jugadores en estado AFK.", player.id, 0xFFFFFF, "normal");
		} else {
		  const afkNames = room.getPlayerList()
			.filter(p => afkPlayers.includes(p.id))
			.map(p => p.name)
			.join(", ");
		  room.sendAnnouncement(`[💤] Jugadores en estado AFK: ${afkNames}`, player.id, 0xFFFFFF, "normal");
		}
		return false; // Prevenir que el comando se envíe como mensaje
	  }

	  

	if (message.startsWith("!msg ")) {
		const args = message.split(" ");
		let targetNameWithAt = args[1];
		const msgContent = args.slice(2).join(" ").trim();
	
		if (targetNameWithAt && targetNameWithAt.startsWith("@") && msgContent) {
			const targetName = targetNameWithAt.slice(1).toLowerCase().replace(/_/g, " "); // Reemplaza "_" por espacios
	
			const target = room.getPlayerList().find(p => p.name.toLowerCase() === targetName);
	
			if (target) {
				room.sendAnnouncement(`🔒 [Privado de ${player.name}]: ${msgContent}`, target.id, 0xFFFF00, "bold", 2);
				room.sendAnnouncement(`🔒 [Privado de ${player.name}]: ${msgContent}`, player.id, 0xFFFF00, "bold", 2);
			} else {
				room.sendAnnouncement(`🔒 Jugador ${targetName} no encontrado.`, player.id, 0xFF0000, null, 2);
			}
		} else {
			room.sendAnnouncement("🔒 Uso correcto: !msg @nombre_jugador mensaje", player.id, 0xFF0000, null, 2);
		}
		return false;
	}

	let color;

	let equipo;
	if(player.team === 1) {
		equipo = `🔴`;
		color = 0xf44336;
	}
	else if (player.team === 2) {
		equipo = `🔵`;
		color = 0x5cb9ff;
	}
	else {
		equipo = `⚪`;
		color = 0xFFFFFF;
	}

	if (!playerStats[pAuth]) {  // Verifica si el jugador es nuevo (por su auth)
        playerStats[pAuth] = {
            name: player.name,
			gamesPlayed: 0,
            gamesWon: 0,
            gamesLost: 0,
            goals: 0,
            assists: 0,
			ownGoals: 0,
            cleanSheets: 0,
			mvps: 0,
			maxWinStreak: 0, // Racha máxima
			currentWinStreak: 0, // Racha actual
			elo: 0,
        };
    } else {
        playerStats[pAuth].name = player.name; // Actualiza el nombre en caso de cambio
    }

	const stats = playerStats[pAuth]

	initializeStats(pAuth);


    // Obtén el rango actual del jugador basado en su ELO
    const currentElo = stats.elo;
    const currentRank = getRank(currentElo);

    // Configurar colores y prefijos
    if (player.admin) {
        color = 0xFFFF00;
        if (isAdmin(player)) {
            color = 0x33FFFF;
        }

		if(isOwner(player)) {
			color = 0xFFE88A;
		}

    } else {
		if(vips[pAuth]){
			color = 0xC3A6FF;
			}
    }

    let prefixedMessage;

    if (player.team === 0) {
        prefixedMessage = `[${currentRank}] ${player.name}: ${message}`;
    } else {
        prefixedMessage = `[${currentRank}] ${player.name}: ${message}`;
    }

	if(vips[pAuth]){
		if(player.team != 0) {
			prefixedMessage = `[${currentRank}] 💎 ${player.name}: ${message}`;
			} else {
			prefixedMessage = `[${currentRank}] 💎 ${player.name}: ${message}`;
			}
	}

    if (isAdmin(player)) {
		if(player.team != 0) {
        prefixedMessage = `[${currentRank}] 🔧 ${player.name}: ${message}`;
		} else {
		prefixedMessage = `[${currentRank}] 🔧 ${player.name}: ${message}`;
		}
    }

	if (isOwner(player)){
		if(player.team != 0) {
			prefixedMessage = `[${currentRank}] 👑 ${player.name}: ${message}`;
			} else {
			prefixedMessage = `[${currentRank}] 👑 ${player.name}: ${message}`;
			}
	}


    room.sendAnnouncement(prefixedMessage, null, color, "normal", 1);

    return false;
};

  room.onPlayerTeamChange = function (player, byPlayer) {
	const playersHost = room.getPlayerList();
	const redTeam = playersHost.filter(p => p.team === 1);
	const blueTeam = playersHost.filter(p => p.team === 2);

	let pAuth = players[player.id];

	if (player.team !== 0) { // Solo jugadores en equipos
		matchStats[player.id] = {
			goals: 0,
			assists: 0,
			cleanSheet: 0,
			pass: 0
		};
	}

    if (player.id === movingPlayer) {
        movingPlayer = null; // Evitar duplicados y resetear bandera
        return;
    }

	Players_team[0] = Players_team[0].filter(id => id !== player.id);
    Players_team[1] = Players_team[1].filter(id => id !== player.id);
    Players_team[2] = Players_team[2].filter(id => id !== player.id);

    Players_team[player.team].push(player.id);

    if (!isAdmin(player) && !picksActive) {
        enough_players();
    }

	if(isKickOff === false){
	if(redGK){
	if(player.id === redGK.id){
	identifyGoalkeepers(1);
	}
}
	if(blueGK){
	if(player.id === blueGK.id){
	identifyGoalkeepers(2);
	}	
}

	}

    if(player.team === 1 || player.team === 2){
	if (isPlayerAFK(player.id)) {
		room.setPlayerTeam(player.id, 0);
		if(byPlayer){
		room.sendAnnouncement(`[💤] ${player.name} está AFK y ha sido movido de vuelta a espectadores.`, byPlayer.id, 0xFFFF00, "bold");
		}
	  }
	}

	// Verificar si el partido ya está en progreso
	if (gameStarted && player.team !== 0 && !latePlayers.has(pAuth)) {
	  latePlayers.add(pAuth); // Marcar como tardío
	}
  
	// Verificar si ambos equipos tienen al menos 3 jugadores
	const hasMinimumPlayers = redTeam.length >= 3 && blueTeam.length >= 3;
  
	if (!hasMinimumPlayers && gameStatsEnabled) {
	  gameStatsEnabled = false;
	  warmupMode = true;
	}
	if (hasMinimumPlayers && !gameStatsEnabled) {
		gameStatsEnabled = true;
		warmupMode = false;
	  }
  };

  room.onPlayerKicked = function (kickedPlayer, reason, ban, byPlayer) {
    const actionType = ban ? "Ban" : "Kick";
    const kickedAuth = kickedPlayer.auth || "Desconocido";
	const kickedId = kickedPlayer.id || "Desconocido";
    const kickerName = byPlayer ? byPlayer.name : "Sistema";
    const kickerAuth = byPlayer ? players[byPlayer.id] || "Desconocido" : "Desconocido";
    const reasonText = reason || "No especificada";

    sendWebhook(
        moderationWebhookURL,
        `🛑 **Evento de Moderación** 🛑\n**Usuario que realizó la acción**: ${kickerName}, AUTH: \`${kickerAuth}\`\n**Tipo de evento**: ${actionType}\n**Usuario afectado**: ${kickedPlayer.name} \n**Razón**: ${reasonText}`
    );

	enough_players();

    // Validar si hay un responsable y si no es un administrador oficial
    if (byPlayer) {
        const byPlayerAuth = players[byPlayer.id] || "Desconocido";
		if(vips[byPlayerAuth]){
			if(ban){
			room.clearBan(kickedId);
			room.kickPlayer(byPlayer.id, "❌ No puedes banear a otros jugadores si no eres administrador oficial. (Aunque seas vip)", false);
			}
			return false;
		}
        if (!isAdmin(byPlayer) || !loggedAdmins.includes(byPlayerAuth)) {
			if(ban){
			room.clearBan(kickedId);
			}
            room.kickPlayer(byPlayer.id, "❌ No puedes expulsar/banear a otros jugadores si no eres administrador oficial.", false);
        }
    }
};

let currentStadium = stadiumFileText; // Inicializa con el estadio del host

room.onStadiumChange = function(newStadiumName, byPlayer) {
    if (newStadiumName === "X3 Thrivium") return;

	room.setCustomStadium(currentStadium); // Restaurar el estadio del host

    if (!isAdmin(byPlayer)) {
        room.kickPlayer(byPlayer.id, "❌ No podes cambiar el mapa del host.", false);
    }
};

setInterval(() => {
    const promoMessage = 
		`⭐ Unite a nuestro discord si te gusta el host!\n` +
        `🔗 Enlace: https://discord.gg/Cr2yhvBMQa\n` +
        `✨ ¡Eventos, rankings, y más te están esperando!`;

    room.sendAnnouncement(promoMessage, null, 0x8B5FD9, "bold", 2); // Negrita, color dorado.
}, 300000); // 5 minutos (300,000 ms)

const automaticMessages = [
    "🎖️ No sabes cuales son los rangos y sus elos necesarios? Con !rangos podes ver toda la informacion!",
    "📊 Con !stats puedes ver tus estadisticas!",
	"🧤 Si te toca ser gk de algun equipo y no lo respetas podes ser sancionado con kick!"
];

const messageInterval = 120000;

function sendAutomaticMessage() {
    const randomMessage = automaticMessages[Math.floor(Math.random() * automaticMessages.length)];
    room.sendAnnouncement(randomMessage, null, 0x8B5FD9, "normal", 1);
}

setInterval(sendAutomaticMessage, messageInterval);
});
