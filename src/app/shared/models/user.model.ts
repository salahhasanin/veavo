export interface User {
  _id: number;
  email: string;
  password: string;
  name: string;
  image: string;
  favouriteCourses?: number[];
  bookedCourses?: number[];
  phone?: string;
  bithday?: Date;
  gender?: string;
  country?: string;
  city?: string;
  follows?: number[];
  instructor?: number;
  role: string;
  rate?: number[];
  createdAt: Date;
  updatedAt: Date;
}

// _id: number;                        _id: "5eb33bb234ca664c24c3bb10"
// email: string;                      email: "salah@yahoo.com"
// password: string;                   password: "$2a$10$TMJEgEkzAdSIHHkqXK2.J.D48EA9Tfujmlg4k3UjtuBBvj0FIYMRe"
// name: string;                       fullname: "salah hasanin said"
// image: string;                      image: [{…}]
// favouriteCourses?: number[];        favouriteCourses: []
// bookedCourses?: number[];           bookedCourses: []
// phone?: string;                     phone: "01060509340"
// bithday?: Date;
// gender?: string;                    gender: "male"
// country?: string;                   country: "Cairo"
// city?: string;                      city: "Helwan"
// follows?: number[];                 follows: []
// instructor?: number;                instructor: "5ebdcedfa11ae224c4a04ea1"
// role:string;                        role: "instructor"
// rate?: number[];                    rate: (2) ["5ed4fb27b6d03315b4cfc0e5", "5ed4ffdf2c15fd4c40e95132"]
// createdAt:Date;                     createdAt: "2020-05-06T22:35:30.139Z"
// updatedAt:Date;                     updatedAt: "2020-06-07T15:58:12.728Z"
