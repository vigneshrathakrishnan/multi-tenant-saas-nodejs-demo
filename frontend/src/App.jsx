import { useState, useEffect } from "react";

const API = "http://localhost:5000/api/v1/auth";

export default function App() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  // 🔐 Remove default body margin (fix white border)
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.background = "#f8fafc";
  }, []);

  // 🔐 Auth
  const register = async () => {
    await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    alert("Registered");
  };

  const login = async () => {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    setToken(data.token);
    setEmail(email); // store email for branding
    console.log("see here: " + email)
  };

  // Fetch data
  const getUsers = async () => {
    const res = await fetch(`${API}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(await res.json());
  };

  const getOrders = async () => {
    const res = await fetch(`${API}/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setOrders(await res.json());
  };

  useEffect(() => {
    if (token) {
      getUsers();
      getOrders();
    }
  }, [token]);

  // Helper to extract store name from email
  const getStoreName = (email) => {
    if (!email) return "";

    const domain = email.split("@")[1]; // amazon.com
    const name = domain.split(".")[0];  // amazon

    console.log("getStoreName: " + name.charAt(0).toUpperCase() + name.slice(1))

    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // 🔗 Group orders under users
  const grouped = users.map(u => ({
    ...u,
    orders: orders.filter(o => o.userId?._id === u._id)
  }));

  return (
    <div style={styles.app}>
      {!token ? (
        <div style={styles.authWrapper}>
          <div style={styles.authCard}>
            <h1 style={styles.logo}>MultiTenant</h1>
            <p style={styles.sub}>Minimal Dashboard</p>

            <input
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
              style={styles.input}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              style={styles.input}
            />

            <div style={styles.btnRow}>
              <button onClick={register} style={styles.secondaryBtn}>
                Register
              </button>
              <button onClick={login} style={styles.primaryBtn}>
                Login
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div style={styles.header}>
            <h2 style={{ margin: 0 }}>Dashboard ({getStoreName(email)} Store)</h2>
            <button onClick={() => setToken("")} style={styles.logout}>
              Logout
            </button>
          </div>

          <div style={styles.grid}>
            {grouped.map(user => (
              <div key={user._id} style={styles.userCard}>
                <div style={styles.userHeader}>{user.email}</div>

                {user.orders.length === 0 ? (
                  <p style={styles.empty}>No orders</p>
                ) : (
                  user.orders.map(order => (
                    <div key={order._id} style={styles.orderCard}>
                      <span>{order.item}</span>
                      <span style={styles.price}>₹{order.price}</span>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// 🎨 Clean Light Theme Styles
const styles = {
  app: {
    fontFamily: "Inter, system-ui",
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "20px",
    color: "#111827"
  },

  // 🔐 Auth
  authWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  },

  authCard: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    width: "340px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
    textAlign: "center"
  },

  logo: {
    marginBottom: "5px",
    fontWeight: "700"
  },

  sub: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "25px"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    background: "#f9fafb"
  },

  btnRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px"
  },

  primaryBtn: {
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "500"
  },

  secondaryBtn: {
    padding: "10px 18px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer"
  },

  // 🧭 Header
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  logout: {
    background: "#ef4444",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer"
  },

  // 📊 Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px"
  },

  userCard: {
    background: "#ffffff",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb"
  },

  userHeader: {
    fontWeight: "600",
    marginBottom: "10px"
  },

  orderCard: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    marginBottom: "8px",
    borderRadius: "8px",
    background: "#f9fafb"
  },

  price: {
    color: "#16a34a",
    fontWeight: "600"
  },

  empty: {
    color: "#9ca3af"
  }
};