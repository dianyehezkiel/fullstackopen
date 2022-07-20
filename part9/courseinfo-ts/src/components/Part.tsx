import { PartProps } from "../types";

const Part = ({ coursePart }: PartProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (coursePart.type) {
    case 'normal':
      return (
        <p>
          <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
          <i>{coursePart.description}</i>
        </p>
      );
    case 'groupProject':
      return (
        <p>
          <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
          project exercises {coursePart.groupProjectCount}
        </p>
      );
      case 'submission':
        return (
          <p>
            <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
            <i>{coursePart.description}</i><br/>
            submit to {coursePart.exerciseSubmissionLink}
          </p>
        );
      case 'special':
        return (
          <p>
            <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
            <i>{coursePart.description}</i><br/>
            required skills: {coursePart.requirements.join(", ")}
          </p>
        );
      default:
        return assertNever(coursePart);
  }
}

export default Part;
