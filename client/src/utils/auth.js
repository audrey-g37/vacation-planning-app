import decode from "jwt-decode";

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    //this is a check to see if token is expired
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    //storing jwt in local storage so we pull it up and see if token is expired
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    let itemsToRemove = ["id_token", "username", "userId", "tripId"]
    itemsToRemove.forEach(item => {
      localStorage.removeItem(item);
    })
    window.location.replace("/");
  }

  storeUsername(username) {
    localStorage.setItem("username", username);
  }

  getUsername() {
    return localStorage.getItem("username");
  }
  storeUserId(userId) {
    localStorage.setItem("userId", userId);
  }

  getUserId() {
    return localStorage.getItem("userId");
  }
  storeTripId(id) {
    localStorage.setItem("tripId", id);
  }

  getTripId() {
    return localStorage.getItem("tripId");
  }
}

export default new AuthService();
