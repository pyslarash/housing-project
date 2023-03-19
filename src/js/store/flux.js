import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white"
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white"
        }
      ]
    },
    actions: {
      // Use getActions to call a function within a function
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      syncTokenFromSessionStore: () => {
        const token = sessionStorage.getItem("token");
        console.log("Application just loaded, syncing the session storage token");
        if (token && token !== "" && token !== undefined) {
          setStore({ token: token });
        }
      },

      logout: () => {
        sessionStorage.removeItem("token");
        console.log("Logging out");
        setStore({ token: null });
      },

      login: async (email, password) => {
        const data = {
          email: email,
          password: password
        };

        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };

        try {
          const resp = await axios.post("http://127.0.0.1:5000/login", data, config);
          if (resp.status !== 200) {
            alert("There has been some error!");
            return false;
          }

          console.log("This came from the backend", resp.data);
          sessionStorage.setItem("token", resp.data.access_token);
          setStore({ token: resp.data.access_token });
          getActions().setLoggedIn(true);
          return true;
        } catch (error) {
          console.error("There has been an error logging in");
        }
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await axios.get(process.env.BACKEND_URL + "/login");
          setStore({ message: resp.data.message });
          // don't forget to return something, that is how the async resolves
          return resp.data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) {
            elm.background = color;
          }
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },

      setLoggedIn: value => {
        setStore({ isLoggedIn: value });
      }
    }
  }
}

export default getState;
