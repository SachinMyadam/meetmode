export default function Login() {
  return (
    <div style={{padding:"40px",fontFamily:"Arial"}}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        style={{display:"block",marginBottom:"10px",padding:"10px",width:"300px"}}
      />

      <input
        type="password"
        placeholder="Password"
        style={{display:"block",marginBottom:"10px",padding:"10px",width:"300px"}}
      />

      <button style={{padding:"10px 20px"}}>
        Login
      </button>
    </div>
  );
}
