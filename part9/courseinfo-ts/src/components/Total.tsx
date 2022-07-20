import { CourseParts } from "../types";

const Total = ({ courseParts }: CourseParts) => {
  return (<>
    <p>
      Number of exercises{" "}
      {courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)}
    </p>
  </>)
}

export default Total;