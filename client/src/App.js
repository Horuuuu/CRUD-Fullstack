import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
//estado para actualizar el salario
  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {//axios solicita a la ruta
    Axios.post("http://localhost:3001/create", {//envia info del frontend al backend a travez de un objeto
      name: name,//(name,age,etc son las propiedades del objeto a enviar
      age: age,//key : variable enviada
      country: country,//tambien pasa valores al backend
      position: position,// y este es el body
      wage: wage,
    }).then(() => {//cuado termina la solicitud...
      setEmployeeList([//para agregar automaticamente un nuevo empleado a la lista
        ...employeeList,//funciona tambien con metodo push
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const getEmployees = () => {//para obtener info de los empleados y listarla en una nueva ruta
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);//responde con el arreglo de empleados
    });
  };
//funcion para actualizar salario
  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {//para eliminar de la pantalla sin refrescar
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      
      <div className="information">
      <h1>Sistema de registro de empleados</h1>
        <label>Nombre:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Edad:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Pais:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <label>Posicion:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label>Salario (mes):</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <button onClick={addEmployee}>Agregar empleado</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Mostrar empleados</button>

        {employeeList.map((val, key) => {//renderiza lista de empleados registrados
          return (//devuelve la informacion*val es la info del empleado del objeto
            <div className="employee">
              <div >
                <h3>Nombre: {val.name}</h3>
                <h3>Edad: {val.age}</h3>
                <h3>Pais: {val.country}</h3>
                <h3>Posicion: {val.position}</h3>
                <h3>Salario: {val.wage}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="salario pretendido..."
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />
                <button
                  onClick={() => {//cada empleado registrado ,en cada boton tiene un id unico
                    updateEmployeeWage(val.id);
                  }}
                >
                  {" "}
                  Editar
                </button>

                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Borrar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
