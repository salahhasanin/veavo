export interface Course {
  _id: string;
  courseName: string;
  courseDescription: string;
  priviousSalary: number;
  salary: number;
  coursePlace: string;
  courseStart: string;
  attendanceNum: number;
  rate: string[];
  learnPoint: string[];
  prerequists: string[];
  category: string;
  favorited: boolean;
  instructorID: string;
  bookedID: string;
  comments: string[];
  video: [
    {
      url: string;
      public_id: string;
    }
  ];
  mainImage: [
    {
      url: string;
      public_id: string;
    }
  ];
}
