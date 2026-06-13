/* ═══════════════════════════════════════
   NUEVA MODA — app.js
   Para agregar productos: añade objetos al array `productos`
   Campos: id, nombre, precio, imagen, tallas, categoria, descripcion
═══════════════════════════════════════ */

/* ── 1. BASE DE DATOS DE PRODUCTOS ─────────────────────────────────
   Para agregar más referencias simplemente copia un objeto { } y
   pégalo aquí separado por una coma. Cambia id, nombre, precio, etc.
   Las imágenes pueden ser URLs o rutas locales como "img/producto.jpg"
─────────────────────────────────────────────────────────────────── */
const productos = [
  {
  id: 1,
  nombre: "Chaqueta Polar Nueva Moda",
  precio: 65000,
  imagen: "img/chaquetas.jpg",
imagenesColor: {
  "Blanca": "img/chaqueta-Blanca.jpg",
  "Rosa":   "img/chaqueta-rosa.jpg",
  "Azul":   "img/chaqueta-azul.jpg",
  "Verde":  "img/chaqueta-Verde.jpg",
},
  tallas: ["S", "M", "L", "XL"],
  colores: ["Blanca", "Rosa", "Azul", "Verde"],
  categoria: "chaquetas",
  descripcion: "Chaqueta polar con forro ovejero."
  },
 
  {
  id: 2,
  nombre: "pantalones Nueva Moda",
  precio: 90000,
  imagen: "img/pantalones.jpg",          // imagen por defecto
  imagenesColor: {
  "Negro": "img/pantalon-azul-negro.jpg",
},
  tallas: ["8", "10", "12", "14", "16", "18"],
  colores: ["Negro"],
  categoria: "pantalones",
  descripcion: "pantalones tipo jeans."
  },
  
  {
    id: 3,
    nombre: "Falda nueva moda",
    precio: 70000,
    imagen: "img/faldas.jpg",
    imagenesColor: {
    "Azul":  "img/falda-Azul.jpg",      // ← la imagen que ya tienes  
    "Negra": "img/falda-Negra.jpg",  
    "Verde": "img/falda-Verde.jpg",
    
  },
    tallas: ["S", "M", "L", "XL"],
    colores: ["Negra", "Azul", "Verde"],
    categoria: "faldas",
    descripcion: "Falda midi de corte fluido que se adapta perfectamente a tu figura."
  },
  {
    id: 4,
    nombre: "chaqueta tejido confeti nueva moda",
    precio: 70000,
   imagen: "img/Chaqueta_tejido_confeti.jpg",
imagenesColor: {
  "blanco crema": "img/Chaqueta_tejido_confeti.jpg",
},

     tallas: ["XS", "S", "M", "L"],
    colores: ["blanco crema"],
    categoria: "chaqueta dama",
    descripcion: "chaqueta tejida confeti para darle un toque a tu moda."
  },
  {
    id: 5,
    nombre: "Braga tipo jean nueva moda",
    precio: 80000,
    imagen: "img/braga tipo jean.jpg",
    tallas: ["S", "M", "L"],
    colores: ["Azul"],
    categoria: "bragas",
    descripcion: "hermosa braga para dama."
  },
  {
    id: 6,
    nombre: "Abrigo de piel peluche nueva moda",
    precio: 65000,
    imagen: "img/abrigos de peil_peluche.jpg",
imagenesColor: {
  "Rosa":  "img/abrigo-de-piel-rosa.jpg",
  "Negro": "img/abrigo-de-piel-negro.jpg",
},
    tallas: ["XS", "S", "M", "L", "XL"],
    colores: ["Rosa" , "Negro"],
    categoria: "Abrigos",
    descripcion: "abrigos de piel de peluche comodos y adecuados para los dias frios."
  },
  {
  id: 7,
  nombre: "pantalon tipo jean clasico",
  precio: 65000,
  imagen: "img/pantalon tipo jean clasico_azul claro.jpg",
imagenesColor: {
  "Azul claro":  "img/pantalon tipo jean clasico_azul claro.jpg",
  "Azul oscuro": "img/pantalo tipo jean clasico_azul oscuro.jpg",
}
  tallas: ["XS", "S", "M", "L", "XL"],
  colores: ["Azul claro", "Azul oscuro"],
  categoria: "pantalon tipo jean",
  descripcion: "pantalones tipo jean clasico para dar un toque de comodidad."
},
  {
    id: 8,
    nombre: "media termica control abdomen",
    precio: 35000,
   imagen: "img/medias_termica_piel_control_abdomen.jpg",
   imagenesColor: {
  "Rosa":  "img/medias_termica_piel_control_abdomen.jpg",
  "Negro": "img/medias_termica_piel_control_abdomen.jpg",
   },
    tallas: ["XS", "S", "M", "L", "XL"],
    colores: ["negro"],
    categoria: "medias",
    descripcion: "media termicas para el control de tu abdomen."
  },
   
];

/* ── 2. ESTADO GLOBAL ── */
let carrito = JSON.parse(localStorage.getItem("nm_carrito") || "[]");
let wishlist = JSON.parse(localStorage.getItem("nm_wishlist") || "[]");
let filtroActivo = "todos";
let productosMostrados = 6;

/* ── 3. FORMATEAR PRECIO ── */
function formatPrecio(n) {
  return "$" + n.toLocaleString("es-CO");
}

/* ── 4. RENDERIZAR PRODUCTOS ── */
function renderProductos() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const filtrados = filtroActivo === "todos"
    ? productos
    : productos.filter(p => p.categoria === filtroActivo);

  const visibles = filtrados.slice(0, productosMostrados);

  grid.innerHTML = visibles.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img-wrap">
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy" />
        <button class="wish-btn ${wishlist.includes(p.id) ? 'active' : ''}" data-wish="${p.id}">
          <i class="${wishlist.includes(p.id) ? 'fas' : 'far'} fa-heart"></i>
        </button>
      </div>
      <div class="product-info">
        <p class="product-name">${p.nombre}</p>
        <p class="product-price">${formatPrecio(p.precio)}</p>
        <div class="sizes">
          ${p.tallas.map(t => `<span class="size-tag">${t}</span>`).join("")}
        </div>
        <button class="btn-ver" data-id="${p.id}">
          VER PRODUCTO <i class="fas fa-shopping-bag"></i>
        </button>
      </div>
    </div>
  `).join("");

  /* Mostrar / ocultar "Ver más" */
  const btnMore = document.getElementById("btnLoadMore");
  if (btnMore) {
    btnMore.style.display = filtrados.length > productosMostrados ? "inline-block" : "none";
  }

  /* Mostrar / ocultar botón "Ver todos" */
  const btnTodos = document.getElementById("btnVerTodos");
  if (btnTodos) {
    btnTodos.style.display = filtroActivo !== "todos" ? "inline-block" : "none";
  }

  /* Eventos de las cards */
  grid.querySelectorAll(".wish-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      toggleWish(parseInt(btn.dataset.wish));
    });
  });

  grid.querySelectorAll(".btn-ver").forEach(btn => {
    btn.addEventListener("click", () => abrirModal(parseInt(btn.dataset.id)));
  });

  grid.querySelectorAll(".size-tag").forEach(tag => {
    tag.addEventListener("click", () => {
      tag.closest(".sizes").querySelectorAll(".size-tag").forEach(t => t.classList.remove("selected"));
      tag.classList.add("selected");
    });
  });
}

/* ── 5. WISHLIST ── */
function toggleWish(id) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(w => w !== id);
  } else {
    wishlist.push(id);
  }
  localStorage.setItem("nm_wishlist", JSON.stringify(wishlist));
  renderProductos();
}

/* ── 6. CARRITO ── */
function agregarAlCarrito(id, talla, color) {
  const prod = productos.find(p => p.id === id);
  if (!prod) return;

  const existe = carrito.find(c => c.id === id && c.talla === talla && c.color === color);
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ id, nombre: prod.nombre, precio: prod.precio, talla, color, cantidad: 1 });
  }

  localStorage.setItem("nm_carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  mostrarToast(`✓ ${prod.nombre} (${talla} - ${color}) agregado`);
  cerrarModal();
}

function actualizarContadorCarrito() {
  const total = carrito.reduce((acc, c) => acc + c.cantidad, 0);
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = total);
  renderCarrito();
}

function renderCarrito() {
  const items = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  if (!items) return;

  if (carrito.length === 0) {
    items.innerHTML = `<p class="cart-empty">Tu carrito está vacío 🛍️</p>`;
    if (totalEl) totalEl.textContent = "$0";
    return;
  }

  items.innerHTML = carrito.map((c, i) => {
    const prod = productos.find(p => p.id === c.id);
    const img = prod ? prod.imagen : "";
    return `
      <div class="cart-item">
        <img src="${img}" alt="${c.nombre}" />
        <div class="cart-item-info">
          <strong>${c.nombre}</strong>
          <span>Talla: ${c.talla} | Color: ${c.color}</span>
          <p class="cart-item-price">${formatPrecio(c.precio)}</p>
          <div class="cart-item-controls">
            <button class="qty-btn" data-i="${i}" data-action="menos">−</button>
            <span class="qty-display">${c.cantidad}</span>
            <button class="qty-btn" data-i="${i}" data-action="mas">+</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  const total = carrito.reduce((acc, c) => acc + c.precio * c.cantidad, 0);
  if (totalEl) totalEl.textContent = formatPrecio(total);

  /* Botones + y - */
  items.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = parseInt(btn.dataset.i);
      if (btn.dataset.action === "mas") {
        carrito[i].cantidad++;
      } else {
        carrito[i].cantidad--;
        if (carrito[i].cantidad <= 0) carrito.splice(i, 1);
      }
      localStorage.setItem("nm_carrito", JSON.stringify(carrito));
      actualizarContadorCarrito();
    });
  });
}

function abrirCarrito() {
  document.getElementById("cartPanel").classList.add("active");
  document.getElementById("cartOverlay").classList.add("active");
  renderCarrito();
}

function cerrarCarrito() {
  document.getElementById("cartPanel").classList.remove("active");
  document.getElementById("cartOverlay").classList.remove("active");
}

function finalizarPedido() {
  if (carrito.length === 0) {
    mostrarToast("Tu carrito está vacío");
    return;
  }

  const lineas = ["Hola, quiero realizar la compra de estos productos de Nueva Moda:", ""];

  carrito.forEach((c, i) => {
    const subtotal = c.precio * c.cantidad;
    lineas.push(`${i + 1}. ${c.nombre}`);
    lineas.push(`Talla: ${c.talla} | Color: ${c.color}`);
    lineas.push(`Cantidad: ${c.cantidad}`);
    lineas.push(`Subtotal: ${formatPrecio(subtotal)}`);
    lineas.push("");
  });

  const total = carrito.reduce((acc, c) => acc + c.precio * c.cantidad, 0);
  lineas.push(`Total: ${formatPrecio(total)}`);

  const mensaje = lineas.join("\n");
  window.open(`https://api.whatsapp.com/send?phone=573232419952&text=${encodeURIComponent(mensaje)}`, "_blank");
}

/* ── 7. TOAST ── */
function mostrarToast(msg) {
  const t = document.createElement("div");
  t.textContent = msg;
  Object.assign(t.style, {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    background: "#111",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: ".88rem",
    fontFamily: "Raleway, sans-serif",
    zIndex: "9999",
    boxShadow: "0 4px 16px rgba(0,0,0,.25)",
    animation: "none",
    opacity: "1",
    transition: "opacity .4s"
  });
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = "0"; setTimeout(() => t.remove(), 400); }, 2500);
}

/* ── 8. MODAL ── */
function abrirModal(id) {
  const prod = productos.find(p => p.id === id);
  if (!prod) return;

  const body = document.getElementById("modalBody");
  body.innerHTML = `
    <img src="${prod.imagen}" alt="${prod.nombre}" id="modalImg" loading="eager" />
    <div class="modal-info">
      <h3>${prod.nombre}</h3>
      <p class="price">${formatPrecio(prod.precio)}</p>
      <p>${prod.descripcion}</p>
      <div class="sizes">
  ${prod.tallas.map(t => `<span class="size-tag" data-t="${t}">${t}</span>`).join("")}
</div>
<p style="font-size:.8rem; font-weight:700; margin-top:4px;">COLOR</p>
 <div class="colores">
    ${prod.colores.map(c => `<span class="color-tag" data-c="${c}">${c}</span>`).join("")}
  </div>
  <button class="btn-primary" id="btnAddCart">AGREGAR AL CARRITO</button>
  </div>
  `;

  /* Seleccionar talla */
  let tallaSeleccionada = null;
  body.querySelectorAll(".size-tag").forEach(tag => {
    tag.addEventListener("click", () => {
      body.querySelectorAll(".size-tag").forEach(t => t.classList.remove("selected"));
      tag.classList.add("selected");
      tallaSeleccionada = tag.dataset.t;
    });
  });                    // ← cierre forEach tallas

  /* Seleccionar color y cambiar imagen */
  let colorSeleccionado = null;
  body.querySelectorAll(".color-tag").forEach(tag => {
    tag.addEventListener("click", () => {
      body.querySelectorAll(".color-tag").forEach(t => t.classList.remove("selected"));
      tag.classList.add("selected");
      colorSeleccionado = tag.dataset.c;
      if (prod.imagenesColor && prod.imagenesColor[colorSeleccionado]) {
       document.querySelector("#modalBody img").src = prod.imagenesColor[colorSeleccionado];
      }
    });
  });                    // ← cierre forEach colores

 /* Botón agregar al carrito */  // ✅
  document.getElementById("btnAddCart").addEventListener("click", () => {
    if (!tallaSeleccionada) {
      mostrarToast("⚠ Selecciona una talla primero");
      return;
    }
    if (!colorSeleccionado) {
      mostrarToast("⚠ Selecciona un color primero");
      return;
    }
    agregarAlCarrito(id, tallaSeleccionada, colorSeleccionado);
  });

  document.getElementById("modalOverlay").classList.add("active");
}

function cerrarModal() {
  document.getElementById("modalOverlay").classList.remove("active");
}

/* ── 9. FILTRO POR CATEGORÍA ── */
document.querySelectorAll(".cat-card").forEach(card => {
  card.addEventListener("click", () => {
    filtroActivo = card.dataset.cat || "todos";
    productosMostrados = 6;
    renderProductos();
    document.getElementById("coleccion").scrollIntoView({ behavior: "smooth" });
  });
});

/* ── 10. VER MÁS ── */
const btnMore = document.getElementById("btnLoadMore");
if (btnMore) {
  btnMore.addEventListener("click", () => {
    productosMostrados += 6;
    renderProductos();
  });
}

/* ── 11. CERRAR MODAL ── */
document.getElementById("modalClose").addEventListener("click", cerrarModal);
document.getElementById("modalOverlay").addEventListener("click", e => {
  if (e.target === document.getElementById("modalOverlay")) cerrarModal();
});
document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarModal(); });

/* Abrir/cerrar carrito */
document.getElementById("cartBtn").addEventListener("click", abrirCarrito);
document.getElementById("cartClose").addEventListener("click", cerrarCarrito);
document.getElementById("cartOverlay").addEventListener("click", cerrarCarrito);
document.getElementById("btnCheckout").addEventListener("click", finalizarPedido);

/* ── 13. WHATSAPP – MENSAJE AUTOMÁTICO ── */
document.querySelector(".whatsapp-float").addEventListener("click", e => {
  e.preventDefault();
  const msg = encodeURIComponent("¡Hola! Estoy interesada en sus productos de Nueva Moda");
  window.open(`https://wa.me/573232419952?text=${msg}`, "_blank");
});

const btnVerTodos = document.getElementById("btnVerTodos");
if (btnVerTodos) {
  btnVerTodos.addEventListener("click", () => {
    filtroActivo = "todos";
    productosMostrados = 6;
    renderProductos();
  });
}


/* ── INIT ── */
window.abrirCarrito = abrirCarrito;
window.cerrarCarrito = cerrarCarrito;
actualizarContadorCarrito();
renderProductos();

// ── MENÚ HAMBURGUESA ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});



