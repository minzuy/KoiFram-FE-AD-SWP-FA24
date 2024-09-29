import "./authen.css";
function AuthenTemplate({ children }) {
  return (
    <div className="containner">
      <div className="form-box">{children}</div>
    </div>
  );
}

export default AuthenTemplate;
