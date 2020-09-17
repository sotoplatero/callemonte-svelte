const LOCATIONS = /Pinar del R.o|La Habana|Artemisa|Mayabeque|Isla de la Juventud|Matanzas|Cienfuegos|Villa Clara|Santi Spiritus|Ciego de .vila|Camag.ey|Las Tunas|Holgu.n|Granma|Santiago de Cuba|Guat.namo/i;
const REPETITIONS = /([^a-zA-Z0-9])\1{2,}/ig;

module.exports = {
    reLocations: LOCATIONS,
    reRepetition: REPETITIONS,
};