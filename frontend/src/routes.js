// const host = 'http://0.0.0.0:5001'; // for local tests
export default {
  login: () => ['api', 'v1', 'login'].join('/'),
  getData: () => ['api', 'v1', 'data'].join('/'),
  creatNewUser: () => ['api', 'v1', 'signup'].join('/'),
  logIn: '/login',
  signup: '/signup',
  err: '*',
  main: '/',
};

// const host = 'http://localhost:8080'; // for local tests
// export default {
//   tasksPath: () => [host, 'tasks'].join('/'),
//   taskPath: (id) => [host, 'tasks', id].join('/'),
//   finishTaskPath: (id) => [host, 'tasks', id, 'finish'].join('/'),
//   activateTaskPath: (id) => [host, 'tasks', id, 'activate'].join('/'),
// };
