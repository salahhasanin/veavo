// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  instBaseUrl: "http://localhost:4000/inst",
  authBaseUrl: "http://localhost:4000/auth",
  userBaseUrl: "http://localhost:4000/user",
  courseBaseUrl: "http://localhost:4000/course",
  stripePublish_key: "pk_test_PD9i0uvMBBy1to3zR8QdFR7x",
  facebookAppId: "254991581875975",
  googleClientApi:
    "931940237699-3vu7jctcrf8i4utuc9cuotdbulc667ek.apps.googleusercontent.com",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
