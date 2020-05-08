export interface User {
  _id: number;
  email: string;
  password: string;
  username: String;
  name: string;
  image: string;
  favouriteCourses?: number[];
  bookedCourses?: number[];
  phone?: string;
  bithday: Date;
  gender?: string;
  country?: string;
  city?: string;
  follows?: number[];
  instructor?: number;
}
