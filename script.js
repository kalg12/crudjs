document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("formProducto")
    .addEventListener("submit", agregarProducto);
  mostrarProductos();
});

function agregarProducto(e) {
  e.preventDefault();
  const producto = document.getElementById("nombreProducto").value;
  if (producto) {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));
    document.getElementById("formProducto").reset();
    mostrarProductos();
  }
}

function mostrarProductos() {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const listaProductos = document.getElementById("listaProductos");
  listaProductos.innerHTML = "";
  productos.forEach((producto, index) => {
    listaProductos.innerHTML += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${producto}</td>
                <td>
                    <button class="btn btn-danger" onclick="eliminarProducto(${index})">Eliminar</button>
                </td>
                <td>
                <button class="btn btn-warning" onclick="editarProducto(${index})">Editar</button>
                </td>
            </tr>
        `;
  });
}

function eliminarProducto(index) {
  const productos = JSON.parse(localStorage.getItem("productos"));
  productos.splice(index, 1);
  localStorage.setItem("productos", JSON.stringify(productos));
  mostrarProductos();
}

let indiceEdicion = null; // Añadir una lína global para controlar el índice de edición de nuestro producto

function editarProducto(index) {
  //Recupera el producto a editar
  const productos = JSON.parse(localStorage.getItem("productos") || []);
  const producto = productos[index];

  //Cargar la información  del producto en un formulario
  document.getElementById("nombreProducto").value = producto;

  //Guardar el índice del producto a editar o que se estará editando
  indiceEdicion = index;

  //Cambiar el texto del botón de guardar a editar
  document.querySelector("#formProducto button[type='submit']").textContent =
    "Actualizar";
}

document
  .getElementById("formProducto")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const producto = document.getElementById("nombreProducto").value;

    if (producto) {
      const productos = JSON.parse(localStorage.getItem("productos")) || [];

      if (indiceEdicion !== null) {
        productos[indiceEdicion] = producto;
        indiceEdicion = null; // Resetear índice de ecición
        document.querySelector(
          "#formProducto button[type='submit']"
        ).textContent = "Guardar";
      } else {
        //Agregar el producto
        productos.push(producto);
      }

      localStorage.setItem("productos", JSON.stringify(productos));
      document.getElementById("formProducto").reset();
      mostrarProductos();
    }
  });
