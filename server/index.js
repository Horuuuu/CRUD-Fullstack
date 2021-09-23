//BACKEND
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());//envia info en formato  json
//conexion con base de datos
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "tupassword",
  database: "employeeSystem",
});
//api--ruta***peticion publicacion
app.post("/create", (req, res) => {//envia variables y recibe del frontend
  const name = req.body.name;//nombre de la variable recibida del frontend
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;
//query sql
  db.query(//? representan variables que se tienen que almacenar en db
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],//cada elemento del arreglo es un ?
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Valores insertados");
      }
    }
  );
});
//peticion obtener
app.get("/employees", (req, res) => {//solo recibe info del frontend
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {//selecciona todo de la tabla de empleados
      console.log(err);
    } else {
      res.send(result);//envia el resultado de la peticion del query
    }
  });
});
//peticion editar
app.put("/update", (req, res) => {//info a editar
  const id = req.body.id;//para cambiar datos ,identifica el id 
  const wage = req.body.wage;//info viene de frontend
  db.query(//actualiza en la tabla empleados y el nombre de la columna
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//peticion borrar
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("SERVIDOR FUNCIONANDO SERVER RUNNING");
});
