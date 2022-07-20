import { CourseParts } from "../types";

const Content = ({ courseParts }: CourseParts) => {
  return (<>
    {courseParts.map(({name, exerciseCount}) => <p key={name}>{name} {exerciseCount}</p>)}
  </>)
}

export default Content;