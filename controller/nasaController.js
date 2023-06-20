import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const nasaKey = process.env.API_KEY;

class nasaRequest {
  async handleError(promise, key, res) {
    try {
      if (await this.validAccess(key)) {
        const response = await promise;
        return res.json(response.data);
      }
      return res.status(401).json({
        message: "the user is not authorized, provide the access key",
      });
    } catch (error) {
      res.json({ message: error["message"] });
      console.log(error);
    }
  }

  // validation of access keys
  async validAccess(key) {
    return process.env.ACCESS_KEY.includes(Number(key));
  }

  // checking the api link
  checkLink(link) {
    try {
      const linkBank = {
        api: "https://api.nasa.gov",
        genelab: "https://genelab-data.ndc.nasa.gov",
        ssd: "https://ssd-api.jpl.nasa.gov",
      };

      if (!linkBank.hasOwnProperty(`${link}`)) {
        return null;
      }

      return linkBank[link];
    } catch (error) {
      return error;
    }
  }

  // returns a link to the picture of the day
  getPictureOfTheDay = async (req, res) => {
    return await this.handleError(
      axios.get(
        `${this.checkLink(
          req.path.split("/")[1]
        )}/planetary/apod?api_key=${nasaKey}`
      ),
      req.headers.accesskey,
      res
    );
  };

  // returns a list of asteroids that will approach the earth within seven days from your date
  getAsteroids = async (req, res) => {
    const { endDate } = req.body;
    return await this.handleError(
      axios.get(
        `${this.checkLink(
          req.path.split("/")[1]
        )}/neo/rest/v1/feed?startdate=none&enddate=${endDate}&api_key=${nasaKey}`
      ),
      req.headers.accesskey,
      res
    );
  };

  // returns an object with detailed information about the asteroid
  getInfoAboutAsteroid = async (req, res) => {
    const { asteroidId } = req.body;
    return await this.handleError(
      axios.get(
        `${this.checkLink(
          req.path.split("/")[1]
        )}/neo/rest/v1/neo/${asteroidId}?api_key=${nasaKey}`
      ),
      req.headers.accesskey,
      res
    );
  };

  // returns information about radiation belt
  getRadiationBelt = async (req, res) => {
    return await this.handleError(
      axios.get(
        `${this.checkLink(
          req.path.split("/")[1]
        )}/DONKI/RBE?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=${nasaKey}`
      ),
      req.headers.accesskey,
      res
    );
  };

  // returns information about the weather on Mars
  getMarsWeather = async (req, res) => {
    return await this.handleError(
      axios.get(
        `${this.checkLink(
          req.path.split("/")[1]
        )}/insight_weather/?api_key=${nasaKey}&feedtype=json&ver=1.0`
      ),
      req.headers.accesskey,
      res
    );
  };

  // designed to collect image data gathered by NASA's Curiosity, Opportunity, and Spirit rovers on Mars
  getMarsPhotos = async (req, res) => {
    try {
      const { date, camera } = req.body;

      //Cameras: FHAZ, RHAZ, MAST, CHEMCAM, MAHLI, MARDI, NAVCAM, PANCAM, MINITES
      const marsPhoto = await axios.get(
        `${this.checkLink(
          req.path.split("/")[1]
        )}/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&camera=${camera}&api_key=${nasaKey}`
      );

      if (marsPhoto.data["photos"].length === 0) {
        return res.json({ message: "Photo not found enter other options" });
      }

      marsPhoto.data["photos"].forEach((elm) => {
        delete elm["rover"];
        delete elm["camera"];
      });

      return res.send(marsPhoto.data);
    } catch (error) {
      res.json({ message: error["message"] });
      console.log(error);
    }
  };

  // returns a link to a random image from space
  getRandomSpacePhoto = async (req, res) => {
    const { date, hd } = req.body;
    return await this.handleError(
      axios.get(`${this.checkLink(req.path.split("/")[1])}/planetary/apod`, {
        params: {
          api_key: `${process.env.API_KEY}`,
          date: date,
          hd: hd, // Fetch high-definition (HD) photo
          concept_tags: "true",
        },
      }),
      req.headers.accesskey,
      res
    );
  };

  //returns a link to a photo of the earth from space
  getEarthSpacePhotos = async (req, res) => {
    return await this.handleError(
      axios.get(
        `${this.checkLink(
          req.path.split("/")[1]
        )}/EPIC/api/natural/images?api_key=${nasaKey}`
      ),
      req.headers.accesskey,
      res
    );
  };

  //returns a link to a photo of the earth
  getEarthPhoto = async (req, res) => {
    const { date, lat, lon, dim } = req.body;
    return await this.handleError(
      axios.get(
        `${this.checkLink(
          req.path.split("/")[1]
        )}/planetary/earth/assets?lon=${lon}&lat=${lat}&date=${date}&&dim=${dim}&api_key=${nasaKey}`
      ),
      req.headers.accesskey,
      res
    );
  };

  getEarthPhotoList = async (req, res) => {
    const { date } = req.body;
    return await this.handleError(
      axios.get(
        `${this.checkLink(
          req.path.split("/")[1]
        )}/EPIC/api/natural/date/${date}?api_key=${nasaKey}`
      ),
      req.headers.accesskey,
      res
    );
  };

  //GeneLab Public API
  getGeneLab = async (req, res) => {
    const { glds, currentPage, resultsPerPage } = req.body;
    return await this.handleError(
      axios.get(
        `${this.checkLink(
          req.path.split("/")[1]
        )}/genelab/data/glds/files/${glds}/?page=${currentPage}&size=${resultsPerPage}`
      ),
      req.headers.accesskey,
      res
    );
  };

  //TechTransfer
  getTechTransfer = async (req, res) => {
    return await this.handleError(
      axios.get(
        `${this.checkLink(
          req.path.split("/")[1]
        )}/techtransfer/patent/?engine&api_key=${nasaKey}`
      ),
      req.headers.accesskey,
      res
    );
  };

  //SBDB Close-Approach Data API
  getSbdb = async (req, res) => {
    const { dateMax, dateMin, dist, des } = req.body;
    return await this.handleError(
      axios.get(
        `${this.checkLink(
          req.path.split("/")[1]
        )}/cad.api?des=${des}&date-min=${dateMin}&date-max=${dateMax}&dist-max=${dist}`
      ),
      req.headers.accesskey,
      res
    );
  };

  // returns information about the fireball
  getFireball = async (req, res) => {
    const { dateMax, dateMin, velComp, reqLoc, reqAlt } = req.body;
    return await this.handleError(
      axios.get(
        `${this.checkLink(
          req.path.split("/")[1]
        )}/fireball.api?date-min=${dateMin}&date-max=${dateMax}&req-alt=${reqAlt}&req-loc=${reqLoc}&vel-comp=${velComp}`
      ),
      req.headers.accesskey,
      res
    );
  };

  // returns a link to a photo from the Mars rover
  getMissionDesign = async (req, res) => {
    const { ec, qr, tp, om, w, iN, jd0, jdf, maxOut, maxDist } = req.body;

    return await this.handleError(
      axios.get(
        `${this.checkLink(
          req.path.split("/")[1]
        )}/mdesign.api?ec=${ec}&qr=${qr}&tp=${tp}&om=${om}&w=${w}&in=${iN}&jd0=${jd0}&jdf=${jdf}&maxout=${maxOut}&maxdist=${maxDist}`
      ),
      req.headers.accesskey,
      res
    );
  };

  //NHATS API
  getNHATS = async (req, res) => {
    const { des, dv, dur, stay, launch } = req.body;
    return await this.handleError(
      axios.get(
        `${this.checkLink(
          req.path.split("/")[1]
        )}/nhats.api?des=${des}&dv=${dv}&dur=${dur}&stay=${stay}&launch=${launch}`
      ),
      req.headers.accesskey,
      res
    );
  };

  //Techport
  getTechport = async (req, res) => {
    const { updatedSince } = req.body;

    return await this.handleError(
      axios.get(
        `${this.checkLink(
          req.path.split("/")[1]
        )}/techport/api/projects?updatedSince=${updatedSince}&api_key=${nasaKey}`
      ),
      req.headers.accesskey,
      res
    );
  };

  //Techport
  getTle = async (req, res) => {
    return await this.handleError(
      axios.get(`http://tle.ivanstanojevic.me/api/tle`),
      req.headers.accesskey,
      res
    );
  };
}

export default new nasaRequest();
