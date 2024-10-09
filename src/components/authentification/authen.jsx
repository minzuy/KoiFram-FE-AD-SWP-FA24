import "./authen.css";
import vidPg from "../images-vid/vid.mp4";

function AuthenTemplate({ children }) {
  return (
    <div className="containner">
      <div className="form-box">{children}</div>
      <video autoPlay muted loop className="background-video">
        <source src={vidPg} type="video/mp4" />
      </video>
    </div>
  );
}

export default AuthenTemplate;
