const { REACT_APP_HOST: host } = process.env;

const signIn = () => `${host}/api/v1/auth/signin`;

const signUp = () => `${host}/api/v1/auth/signup`;

const editUser = () => `${host}/api/v1/users/`;

const cards = () => `${host}/api/v1/cards/`;

const columns = () => `${host}/api/v1/columns/`;

const tasks = () => `${host}/api/v1/tasks/`;

const setColumnsOrder = () => `${columns()}setColumnsOrder`;

const setTasksOrder = () => `${tasks()}setTasksOrder`;

export {
  signIn, signUp, editUser, cards, columns, tasks, setColumnsOrder, setTasksOrder,
};
