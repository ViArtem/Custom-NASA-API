import { Router } from "express";
import nasaController from "../controller/nasaController.js";
const apiRouter = new Router();

//
apiRouter.get("/api/day/picture", nasaController.getPictureOfTheDay);

apiRouter.get("/api/earth/space/pictures", nasaController.getEarthSpacePhotos);

//Tle
apiRouter.get("/api/tle", nasaController.getTle);

// mars
apiRouter.get("/api/mars/weather", nasaController.getMarsWeather);

//
apiRouter.get("/api/radiation/belt", nasaController.getRadiationBelt);

//Earth
apiRouter.post("/api/earth/picture/list", nasaController.getEarthPhotoList);
apiRouter.post("/api/earth/picture", nasaController.getEarthPhoto);

//GeneLab Public API
apiRouter.post("/genelab", nasaController.getGeneLab);

//SBDB Close-Approach Data API
apiRouter.post("/ssd/sbdb", nasaController.getSbdb);

//SBDB Close-Approach Data API
apiRouter.post("/ssd/fireball", nasaController.getFireball);

//SBDB Close-Approach Data API
apiRouter.post("/ssd/missionDesign", nasaController.getMissionDesign);

//SBDB Close-Approach Data API
apiRouter.post("/ssd/nhats", nasaController.getNHATS);

//Techport
apiRouter.post("/api/techport", nasaController.getTechport);

// mars
apiRouter.post("/api/mars/picture", nasaController.getMarsPhotos);

// asteroids
apiRouter.post("/api/asteroids", nasaController.getAsteroids);
apiRouter.post("/api/asteroid/about", nasaController.getInfoAboutAsteroid);

// space picture
apiRouter.post("/api/random/space/picture", nasaController.getRandomSpacePhoto);

//TechTransfer
apiRouter.get("/api/techTransfer", nasaController.getTechTransfer);

export { apiRouter };
