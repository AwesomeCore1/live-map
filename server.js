var express = require('express');
var app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

Delay = (ms) => new Promise(res => setTimeout(res, ms));

var array = [];
var result;
const refresh_time = 500;

var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

app.set('views', path.join(GetResourcePath(GetCurrentResourceName()), "views"));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {

    refresh_users();

    res.render('pages/index', {
        result: result
    });
    
});

app.get('/airports', function(req, res) {
    res.render('pages/airports');
});

app.get('/clear', function(req, res) {
    localStorage.clear();
    res.send('Cleared');
});

io.on('connection', (socket) => {

    // console.log('a user connected');

    socket.on('disconnect', () => {
        // console.log('user disconnected');
    });
});

setInterval(function(){
    refresh_users();
    io.emit('result', localStorage.getItem('SocketResult'));
}, refresh_time);

server.listen(3000, () => {
  console.log('Live at port 3000');
});

onNet('SendInfo', (player, name, coords, heading, model, vehclass, callsign, speedMS) => {

    if (model != "CARNOTFOUND") {
        var playerarray = {
            "id": player,
            "name": name,
            "coords": coords,
            "heading": heading,
            "vehclass": vehclass,
            "vehicle": model
        };
    } else {
        var playerarray = { 
            "id": player,
            "name": name,
            "coords": coords,
            "heading": heading
        };
    }

    array.push(playerarray);

    localStorage.setItem('array', JSON.stringify(array));

});

process.on('exit', () => {

    localStorage.clear();

});

function refresh_users() {

    var { players, playercount, playercounts } = get_players();

    get_player_info(players, playercount);
    set_player_result(playercounts);
};

function get_players() {

    const players =  getPlayers();
    var playercount = players.length;
    var playercounts = playercount;

    return {
        players: players, 
        playercount: playercount, 
        playercounts: playercounts
    };
};

function get_player_info(players, playercount) {

    players.forEach(element => {

        playercount = playercount - 1;

        const player = element;
        const name = GetPlayerName(player);
        const ped = GetPlayerPed(player);
        const [playerX, playerY, playerZ] = GetEntityCoords(ped);
        const coords = [Math.round(playerX), Math.round(playerY), Math.round(playerZ)];
        const heading = 360 - Math.round(GetEntityHeading(ped));

        const vehicle = GetVehiclePedIsIn(ped, false);
        const modelhash = GetEntityModel(vehicle);

        const callsign = Player(element).state.callsign;

        emitNet("GetInfo", player, player, name, coords, heading, modelhash, vehicle, callsign);

        if (playercount == 0) {

            localStorage.setItem('result', localStorage.getItem('array'));

            array = [];

        }

    });
};

function set_player_result(playercounts) {

    if (playercounts == 0) {

        var result = array;

        localStorage.setItem('SocketResult', result);
        
    } else {

        var result = localStorage.getItem('result');

        localStorage.setItem('SocketResult', result);

    }
};



/*
function refresh_users() {

    const players =  getPlayers();
    var playercount = players.length;

    
    var playercounts = playercount;

    players.forEach(element => {

        playercount = playercount - 1;

        const player = element;
        const name = GetPlayerName(player);
        const ped = GetPlayerPed(player);
        const [playerX, playerY, playerZ] = GetEntityCoords(ped);
        const coords = [Math.round(playerX), Math.round(playerY), Math.round(playerZ)];
        const heading = 360 - Math.round(GetEntityHeading(ped));

        const vehicle = GetVehiclePedIsIn(ped, false);
        const modelhash = GetEntityModel(vehicle);

        const callsign = Player(element).state.callsign;

        emitNet("GetInfo", player, player, name, coords, heading, modelhash, vehicle, callsign);

        if (playercount == 0) {

            localStorage.setItem('result', localStorage.getItem('array'));

            array = [];

        }

    });

    if (playercounts == 0) {

        var result = array;

        localStorage.setItem('SocketResult', result);
        
    } else {

        var result = localStorage.getItem('result');

        localStorage.setItem('SocketResult', result);

    }
}
*/