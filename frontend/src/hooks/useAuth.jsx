import { jwtDecode } from "jwt-decode";

export default function useAuth() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    // Function to determine who is logged in
    const getWhoIsLoggedIn = () => {
      if (decoded.role === "Driver") return "driver";
      if (decoded.role === "Passenger") return "passenger";
      if (decoded.role === "Admin") return "admin";
      return null; // Fallback
    };

    return {
      ...decoded,
      getWhoIsLoggedIn,
    }; // Return decoded user data along with the function
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}




// import { jwtDecode } from "jwt-decode";

// export default function useAuth() {
//   const token = localStorage.getItem("token");

//   if (!token) return null;

//   try {
//     const decoded = jwtDecode(token);
//     return decoded; // { username, email, role, ... }
//   } catch (error) {
//     console.error("Invalid token:", error);
//     return null;
//   }
// }
