import { CourseName } from "../types";

const Header = ({ courseName }: CourseName) => {
  return <h1>{courseName}</h1>;
}

export default Header;