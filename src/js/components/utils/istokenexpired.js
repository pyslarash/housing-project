import jwt_decode from 'jwt-decode';

export const isTokenExpired = (token) => {
    const currentTime = Date.now() / 1000; // Convert to seconds
  
    try {
      const decodedToken = jwt_decode(token);
  
      if (decodedToken.exp < currentTime) {
        // Token has expired
        return true;
      } else {
        // Token is still valid
        return false;
      }
    } catch (error) {
      console.error('Invalid token format', error);
      return true;
    }
  };
  