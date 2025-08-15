// function Login() {
//   return (
//     <div className="login">
//       <div className="login-form">
//         <h1>Login</h1>
//         <form>
//           <div className="mb-3">
//             <label className="form-label">Email address</label>
//             <input
//               type="email"
//               className="form-control"
//               id="exampleInputEmail1"
//               aria-describedby="emailHelp"
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="exampleInputPassword1"
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
// import { useAuth } from "../AuthContext";

// function LoginPage() {
//   const { login } = useAuth();

//   const handleLogin = () => {
//     // פה תוכל לבדוק סיסמה וכו' – כרגע מדמה התחברות
//     login();
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <button onClick={handleLogin}>login</button>
//     </div>
//   );
// }

// export default LoginPage;
import { useState } from "react";
import { useAuth } from "../AuthContext";
import "../styles/Login.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true); // true = login mode, false = signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // מפנה לדף הבית אם כבר מחובר
    }
  }, [isAuthenticated, navigate]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (isLogin) {
  //     localStorage.setItem("username", name);
  //     // פה אתה מבצע התחברות
  //     // בדיקה מול השרת או דמו:
  //     if (email === "test@example.com" && password === "1234") {
  //       login(); // התחברות מוצלחת
  //     } else {
  //       alert("some error in login, try again"); // הודעת שגיאה
  //     }
  //   } else {
  //     // פה תוכל לשלוח בקשת רישום לשרת
  //     console.log("New user: ", name, email, password);
  //     alert("User registered successfully!");
  //     setIsLogin(true); // חזרה למצב התחברות
  //   }
  // };
  const date = new Date();
  const createdAtLocal = date
    .toLocaleString("sv-SE", { timeZone: "Asia/Jerusalem" })
    .replace(" ", "T");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/login" : "/signup";
    try {
      const res = await axios.post(
        `http://localhost:8000/login-page${endpoint}`,
        {
          createdAt: createdAtLocal,
          username: name,
          email: email,
          password: password,
        }
      );
      localStorage.setItem("user_id", res.data.user_id);
      console.log(res.data.message);
      console.log(res.data.user_id);
      if (isLogin) {
        localStorage.setItem("username", name);
        login(); // מהAuthContext שלך
      } else {
        setIsLogin(true); // עובר חזרה למסך login
      }
    } catch (err) {
      alert(err.response?.data?.detail || "Error during authentication");
    }
  };

  return (
    <div className="auth-container">
      <h1>PII Detection App</h1>
      <h2>{isLogin ? "Login" : "SignUp"}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="auth-input"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="auth-input"
        />
        <button type="submit" className="auth-button">
          {isLogin ? "Login" : "SignUp"}
        </button>
      </form>
      <p>
        <button onClick={() => setIsLogin(!isLogin)} className="switch-button">
          {isLogin ? "SignUp" : "Login"}
        </button>
        {isLogin
          ? " You do not have an account ? "
          : " You already have an account ? "}{" "}
      </p>
    </div>
  );
}

export default LoginPage;
