import axios from "axios";

class AuthController {
  constructor({ headers = {} } = {}) {
    this.baseURL = (() => {
    const host = window?.location?.hostname;
    if (host.includes("localhost") || host.includes("nzen") || host.includes("calllog.web")) {
      return "http://192.168.1.71:3001/api/report";
    }
    return process.env.NODE_ENV === "production" ? "https://apilx.optigoapps.com/api/report" : "http://newnextjs.web/api/report";
  })();

  

    this.defaultHeaders = {
      "Content-Type": "application/json",
      Authorization: "",
      YearCode: process.env.NODE_ENV === "production" ? "e3tsaXZlLm9wdGlnb2FwcHMuY29tfX17ezIwfX17e29wdGlnb2h1Yn19e3tvcHRpZ29odWJ9fQ==" : "e3tuemVufX17ezIwfX17e29yYWlsMjV9fXt7b3JhaWwyNX19",
      version: "v1",
      sv: process.env.NODE_ENV === "production" ? "1" : "0",
      sp: "28",
      ...headers,
    };

    this.instance = this._createInstance(this.defaultHeaders);
  }

  _createInstance(headers) {
    return axios.create({
      baseURL: this.baseURL,
      timeout: 5000,
      headers,
    });
  }

  /**
   * Update global headers and re-create axios instance.
   */
  setHeaders(headers) {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
    this.instance = this._createInstance(this.defaultHeaders);
    return this;
  }

  _post(mode, appUserId, payload) {
    return this.instance.post("", {
      con: JSON.stringify({
        id: "35",
        mode,
        appuserid: appUserId,
        FormName: "AMaster",
      }),
      p: JSON.stringify(payload),
      f: "m-test2.orail.co.in (ConversionDetail)",
    });
  }

}


export default AuthController;
