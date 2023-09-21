import Axios from "axios";
import Cookies from "js-cookie";

class Services {
  constructor() {
    console.log("WRB Service Entry");
  }

  
  // // FUNCTION TO ASSIGN TASK TO FAMILY MEMBER
  // assignFamilyTask(reqData) {
  //   var postData = {
  //     uid: localStorage.getItem("uid"),
  //     member_id: localStorage.getItem("member_id"),
  //     token: localStorage.getItem("session_token"),
  //     action: 13025,
  //     ...reqData,
  //   };
  //   return this.postAuxEnd("/assigntask", postData);
  // }

   // FUNCTION TO LOGIN USER
   loginUser(reqData) {
    var postData = {
      ...reqData,
    };
    return this.postAuxEnd("/login", postData);
  }

   // FUNCTION TO REGISTER USER
   registerUser(reqData) {
    var postData = {
      ...reqData,
    };
    return this.postAuxEnd("/register", postData);
  }

   // FUNCTION TO GET USER PROFILE
   getUserProfile() {
    var postData = {
      token: Cookies.get('_token')
    };
    return this.postAuxEnd("/profile", postData);
  }
  //----------------------------------------  -----
  //----------------------------------------  -----
  // Unified call below
  //----------------------------------------  -----
  //----------------------------------------  -----
  apiConfig(){
    let apiUrl =
      process.env.NODE_ENV == "development"
        ? "http://localhost:10000/api"
        : "https://swift-chat-58zz.onrender.com/api";
    return apiUrl;
  };

  getAuxEnd(uri, reqData) {
    const session_token = localStorage.getItem("session_token");
    let axiosConfig = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Basic ${session_token}`,
      },
    };
    const endPoint = this.apiConfig() + uri;
    return Axios.get(endPoint, {
      params: {
        reqData,
      },
    })
      .then((response) => {
        console.log("~~~~~~~ API CALL SUCCESSFUL ~~~~~~~~");
        return response;
      })
      .catch((error) => {
        if (error.response) {
          //response status is an error code
          console.log(error.response.status);
        } else if (error.request) {
          //response not received though the request was sent
          console.log(error.request);
        } else {
          //an error occurred when setting up the request
          console.log(error.message);
        }
      });
  }

  postAuxEnd(uri, reqData) {
    const endPoint = this.apiConfig() + uri;
    const session_token = localStorage.getItem("session_token");
    // session_token = session_token !=null ?session_token : '';
    //   'Authorization': `Basic ${(session_token !=null) ?session_token : ''}`,
    let axiosConfig = {
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Expose-Headers": "Access-Control-Allow-Origin",
        "Access-Control-Allow-Headers":
          "Origin, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Allow-Headers, Authorization, observe, enctype, Content-Length, X-Csrf-Token",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    //  Axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    //     Axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'; //,axiosConfig
    //     Axios.defaults.withCredentials = true;
    //debugger;
    return Axios.post(endPoint, reqData)
      .then((response) => {
        console.log(response);
        console.log("~~~~~~~ API CALL SUCCESSFUL ~~~~~~~~");
        return response;
      })
      .catch((error) => {
        // if (error.response) {
          //response status is an error code
          console.log(
            "ERROR-------------------------------------------------------"
          );
          console.log('MY ERROR',error.response);
          console.log(
            "ERROR-------------------------------------------------------"
          );
          return error.response;
        // } else if (error.request) {
        //   //response not received though the request was sent
        //   console.log(
        //     "ERROR2-------------------------------------------------------"
        //   );
        //   console.log(error?.request);
        //   console.log(
        //     "ERROR2-------------------------------------------------------"
        //   );
        //   return error.request;
        // } else {
        //   //an error occurred when setting up the request
        //   console.log(
        //     "ERROR3-------------------------------------------------------"
        //   );
        //   console.log(error);
        //   console.log(
        //     "ERROR3-------------------------------------------------------"
        //   );
        // }
      });
  }
}

export default Services;
