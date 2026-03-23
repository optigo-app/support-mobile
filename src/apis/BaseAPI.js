class ApiError extends Error {
  constructor(message, functionName, response) {
    super(message);
    this.name = "ApiError";
    this.functionName = functionName;
    this.timestamp = new Date();
    this.response = response;
  }

  getResponseData() {
    return this.response && this.response.json ? this.response.json() : null;
  }
}


class BaseAPI {
  // static BASE_URL = process.env.NODE_ENV === "production" ? "https://livenx.optigoapps.com/api/report" : "http://newnextjs.web/api/report";
  static BASE_URL = (() => {
    const host = window?.location?.hostname;
    // if (host.includes("localhost") || host.includes("nzen") || host.includes("calllog.web")) {
    // return "http://192.168.1.71:3001/api/report";
    // return "http://newnextjs.web/api/report";
    // // return "https://apilx.optigoapps.com/api/report";
    // }
    // return process.env.NODE_ENV === "production" ? "https://apilx.optigoapps.com/api/report" : "http://newnextjs.web/api/report";
    return "http://newnextjs.web/api/report";
    // return "https://apilx.optigoapps.com/api/report";
  })();

  // static BASE_URL = "http://newnextjs.web/api/report";
  static config = {};


  static serviceConfigs = {};

  static initialize(configValues = {}, serviceName = null) {
    if (serviceName) {
      this.serviceConfigs[serviceName] = {
        ...configValues,
      };
      return this.serviceConfigs[serviceName];
    } else {
      this.config = {
        ...configValues,
      };
      return this.config;
    }
  }

  static getConfig(serviceName = null) {
    return serviceName && this.serviceConfigs[serviceName] ? this.serviceConfigs[serviceName] : this.config;
  }

  static getHeaders(yearCode, serviceName = null, sp, version, DeviceToken, sv) {
    const config = this.getConfig(serviceName);

    return {
      "Content-Type": "application/json",
      ...((yearCode || config.YEAR_CODE) && { YearCode: yearCode || config.YEAR_CODE }),
      version: version || config.VERSION_NO,
      sv: sv || '0',
      sp: sp || config?.SP,
      'Authorization': `Bearer ${DeviceToken}`
    };
  }


  static async requestToApi({ mode, params, yearCode, functionName, serviceName = "CallLog", sp, version, socketEvent, signal, DeviceToken, sv }) {
    const config = this.getConfig(serviceName);

    const body = {
      con: JSON.stringify({
        id: "",
        mode,
        appuserid: config?.APP_USER_ID || this?.config?.APP_USER_ID,
        ...(socketEvent && { socketEvent })
      }),
      p: JSON.stringify(params),
      f: `${serviceName} (${functionName})`,
    };

    try {
      const response = await fetch(this.BASE_URL, {
        method: "POST",
        headers: this.getHeaders(yearCode, serviceName, sp, version, DeviceToken, sv, sp),
        body: JSON.stringify(body),
        signal,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new ApiError(data.message || `Failed to ${functionName.toLowerCase()}`, functionName, response);
      }

      return data?.Data;
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`Error during "${error.functionName}" operation:`, error);
        throw error;
      } else {
        console.error(`Unexpected error during "${functionName}" operation:`, error);
        throw new ApiError(error.message, functionName);
      }
    }
  }


  static async getToken(DeviceToken, sv) {
    try {
      const response = await this.requestToApi({
        mode: "gettoken_corp",
        // params: { appuserid: userId, corporate: "true" },
        params: {},
        functionName: "gettoken_corp",
        DeviceToken: DeviceToken,
        sv: sv,
        version: 'v4',
        sp: '14'
      });

      return response;
    } catch (error) {
      console.error("Error getting token:", error);
      throw error;
    }
  }

}

export { BaseAPI, ApiError };
