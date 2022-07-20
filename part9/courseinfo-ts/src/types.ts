interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartWithDesc extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends CoursePartWithDesc {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDesc {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartWithDesc {
  type: "special";
  requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

export interface CourseParts {
  courseParts: Array<CoursePart>
}

export interface CourseName {
  courseName: string
}

export interface PartProps {
  coursePart: CoursePart
}
