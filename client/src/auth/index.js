//import axios from "axios";

// export const signup = (user) => {
//   const config = {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     }
//   };
//   axios.post("/api/signup", { config, body: JSON.stringify(user)})
//     .then(response => {
//       console.log("response : " + response);
//       return response.json();
//     })
//     .catch(err => console.log(err));
// };

export const signup = user => {
    return fetch("/api/signup", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const signin = user => {
    //${process.env.REACT_APP_API_URL}
    return fetch("/api/signin", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const authenticate = (jwt, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(jwt));
        next();
    }
};

export const setName = (name, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('username', JSON.stringify(name));
        next();
    }
};

export const signout = next => {
    if (typeof window !== 'undefined') localStorage.removeItem('jwt');
    next();
    // ${process.env.REACT_APP_API_URL}
    return fetch("/api/signout", {
        method: 'GET'
    })
        .then(response => {
            console.log('signout', response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }

    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};
