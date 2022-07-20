import { CourseParts } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: CourseParts) => {
  return (<>
    {courseParts.map((coursePart) => <Part key={coursePart.name} coursePart={coursePart} />)}
  </>)
}

export default Content;