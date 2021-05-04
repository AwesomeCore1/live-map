const app = require("express")(); // npm i express

app.get('/', (req, res) => {

    var array = [];

    const players =  getPlayers();
    players.forEach(element => {
        const name = GetPlayerName(element);
        const ped = GetPlayerPed(element);
        const [playerX, playerY, playerZ] = GetEntityCoords(ped);
        const coords = [Math.round(playerX), Math.round(playerY), Math.round(playerZ)];
        const heading = Math.round(GetEntityHeading(ped));

        const vehicle = GetVehiclePedIsIn(ped, false);
        const model = GetEntityModel(vehicle);

        if (model != 0) {
            var playerarray = {
                "id": element,
                "name": name,
                "coords": coords,
                "heading": heading,
                "vehicle": model
            };
        } else {
            var playerarray = {
                "id": element,
                "name": name,
                "coords": coords,
                "heading": heading
            };
        }
        
        console.log(model);

        var playerarray = {
            "id": element,
            "name": name,
            "coords": coords,
            "heading": heading
        };
        array.push(playerarray);

    });
    res.json(JSON.stringify(array));
}); //whenever someone hits / (the base url) itll display hi

app.listen(3000); // can be any port the server has to listen on
console.log(`server is online on port 3000`);