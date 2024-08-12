export const HTMLContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css" />
    <title>HTML Starter</title>
  </head>
  <body>
    <div class="container">
        <h1>Hello there.</h1>
    </div>
    <script src="main.js"></script>
  </body>
</html>
`;
export const CSSContent = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  font-family: "Roboto", sans-serif;
  background-color: #f3f3f3;
  color: #333;
  font-size: 10px;
}
a{
  text-decoration: none;
  color: #333;
}
ul{
  list-style: none;
}
.container {
  max-width: 1100px;
  margin: auto;
  padding: 0 1rem;
  padding-top: 2rem;
}
`;
export const JSContent = `
console.log('working...');
`;
export const ReactAppContent = `
function App() {

  return (
    <>
      <h1>Hello there.</h1>
    </>
  )
}

export default App

`;
