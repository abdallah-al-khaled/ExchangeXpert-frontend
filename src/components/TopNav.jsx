import profilePic from "../assets/images/Ellipse 81.png";
import "../assets/css/topnav.css";

function TopNav() {
  return (
    <div className="topnav flex">
      <div className="search">
        <input type="text" placeholder="Search for stocks and more" />
      </div>
      {/* <div className="flex profile">
        <img src={profilePic} alt="profile" />
        <div className="flex column username">
          <p className="name">John Doe</p>
          <p className="email">johndoe@gmail.com</p>
        </div>

        <div className="dash"></div>
        <div className="profileBalance flex column">
          <p>Profile Balance</p>
          <p>$623,000.00</p>
        </div>
      </div> */}
    </div>
  );
}
export default TopNav;
