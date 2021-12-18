onNet("GetInfo", (player, name, coords, heading, modelhash, vehicle) => {
    const model = GetDisplayNameFromVehicleModel(modelhash);
    const vehclass = GetVehicleClassFromName(modelhash);

    emitNet("SendInfo", player, name, coords, heading, model, vehclass);
});
