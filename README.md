# This is front-end part of RS-Clone project for JSON.Statham team
## To see how app works simply visit https://json-statham.com/
To run this app locally use create .env file with
REACT_APP_HOST=https://api.json-statham.com/
in it, and then use script:
### `npm start`

Back-end repository is located here:
https://github.com/sensaur/JSON.Statham-back/tree/sensaur

# ABOUT

1. Task: https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rsclone/rsclone.md
2. Screenshot:
![image](https://user-images.githubusercontent.com/96470401/223028873-f4fa63a3-d5b9-41a6-a15b-09d80b059de5.png)


4. Deploy: https://json-statham.com/
5. Done 07.02.2023 / deadline 28.02.2023
6. Task project. Our Team: 
- [sensaur](https://github.com/sensaur) - back-end
- [NikolayBalabanov](https://github.com/sensaur) - front-end
- [VEKozlov111](https://github.com/VEKozlov111) - front-end
8. Back-end 
repository is located here: https://github.com/sensaur/JSON.Statham-back/tree/sensaur
production server deployed here: https://api.json-statham.com/

## This app is designed to manage tasks, with it you can easily:
- Create as many boards as you wish
- Create columns with tasks inside the boards
- Drag and drop your task columns
- Add descriptions and titles to tasks
- Drag and drop your tasks both inside and into other columns as you wish
- Customize you profile


## Features Front-end:

### Stack:
- TypeScript
- React
- React-router-dom
- React-beautiful-dnd
- React-loading-skeleton
- Redux, RTK Query
- Tailwind
- Cypress

### General
- Sweetalert2 (user notification)
- Adaptive
- SPA
- Ligth/Dark mode

### Main page:
- Contains basic information about the app and its creators

### Authorization and registration pages:
- authorization form
- validation of authorization form fields
- registration form
- validation of registration form fields
- singout of the account and control over the authorization status has been implemented

### User Profile edit page:
- to change the name
- to change the email
- to change the avatar
- validation of form fields

### Boards list page:
- add a board
- remove a board
- change the title of the board
- the state of the content is always up-to-date
- loading animation

### Detail board page:
- board title
- loading animation
- tasks column: create/delete/edit 
- tasks: create/delete/edit/done/undone
- dragging columns between each other(drag-and-drop)
- dragging tasks between each other inside a column
- dragging tasks between each other between columns
- the state of the content is always up-to-date

### Application Functionality tests:
E2e tests using the Cypress framework.
The tests cover the basic functionality of the application:
- user authorization
- singout
- availability of all application pages to the registered user
- create/delete/edit a task board
- creating/deleting/editing a column

## Features Back-end:
- REST API
- Connecting and working with the Postgres database
- ORM(Sequelize) is used
- Registration
- Authentication
- Authorization
- Password hashing is performed
- Implemented Node js and Express
- Implemented work with Amazon S3 images
- The server is deployed to a domain https://api.json-statham.com/
