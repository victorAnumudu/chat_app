import Axios from "axios";

class usersService {
  constructor() {
    console.log("WRB Service Entry");
  }

  
  // FUNCTION TO ASSIGN TASK TO FAMILY MEMBER
  assignFamilyTask(reqData) {
    var postData = {
      uid: localStorage.getItem("uid"),
      member_id: localStorage.getItem("member_id"),
      sessionid: localStorage.getItem("session_token"),
      action: 13025,
      ...reqData,
    };
    return this.postAuxEnd("/assigntask", postData);
  }
  //----------------------------------------  -----
  //----------------------------------------  -----
  // Unified call below
  //----------------------------------------  -----
  //----------------------------------------  -----
  getAuxEnd(uri, reqData) {
    const session_token = localStorage.getItem("session_token");
    let axiosConfig = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Basic ${session_token}`,
      },
    };
    const endPoint = process.env.REACT_APP_BACKEND_ENDPOINT + uri;
    return Axios.get(endPoint, {
      params: {
        reqData,
      },
    })
      .then((response) => {
        console.log("~~~~~~~ Toks2 GET ~~~~~~~~");
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
    const endPoint = process.env.REACT_APP_BACKEND_ENDPOINT + uri;
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
        // res = response;
        console.log("~~~~~~~ Toks2 POST ~~~~~~~~");
        return response;
      })
      .catch((error) => {
        if (error.response) {
          //response status is an error code
          console.log(
            "ERROR-------------------------------------------------------"
          );
          console.log(error.response.status);
          console.log(
            "ERROR-------------------------------------------------------"
          );
        } else if (error.request) {
          //response not received though the request was sent
          console.log(
            "ERROR2-------------------------------------------------------"
          );
          console.log(error?.request);
          console.log(
            "ERROR2-------------------------------------------------------"
          );
        } else {
          //an error occurred when setting up the request
          console.log(
            "ERROR3-------------------------------------------------------"
          );
          console.log(error);
          console.log(
            "ERROR3-------------------------------------------------------"
          );
        }
      });
  }
}

export default usersService;
