import axios from "axios";
import { supportedPairs } from "../assets/supportedPairs.json";

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

export default class ForexService {
  getForexData() {      
    return axios.get(
      CORS_PROXY +
        `https://www.freeforexapi.com/api/live?pairs=${supportedPairs}`
    );
  }
}
