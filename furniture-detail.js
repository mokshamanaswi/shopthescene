const roomData = {
  bedroom: {
    image: "https://i.pinimg.com/control1/1200x/bc/6b/a3/bc6ba324fdfc69382c5ca88fec6e762b.jpg",
    items: ["bed", "cupboard", "sofa"]
  },
  living: {
    image: "https://i.pinimg.com/736x/f1/5d/4b/f15d4b7ed86d2db008b5d956ada9b265.jpg",
    items: ["sofa", "coffeeTable", "accentChair", "wardrobe", "bed"]
  },
  study: {
    image: "https://i.pinimg.com/736x/d3/a0/0e/d3a00e812368bd144cda06ce14ad054d.jpg",
    items: ["sofa", "stool"]
  },
  cozy: {
    image: "https://i.pinimg.com/736x/e6/ca/2d/e6ca2d30599548c7d6244088a1d3a99d.jpg",
    items: ["bed", "table", "chair"]
  },
  designercupboard: {
    image: "https://i.pinimg.com/control1/736x/60/14/84/60148460645e9eb042707b2d2c4258c4.jpg",
    items: ["cupboard"]
  },
  classy: {
    image: "https://cdn.cosmos.so/e6b7d258-da25-4e60-9a1f-ca087dd8a790?format=jpeg",
    items: ["sofa", "table"]
  },
  buss: {
    image: "https://cdn.cosmos.so/4ba871ba-660a-4d76-835c-fa9a4d7387ec?format=jpeg",
    items: ["table", "sofa", "table", "stool"]
  },
  cutecup: {
    image: "https://i.pinimg.com/control1/736x/81/44/38/8144387ab4c01ef27aa5c0a9105eee60.jpg",
    items: ["shelf"]
  }
};

const products = {
  bed: {
    name: "Cozy Bed",
    description: "A soft upholstered bed designed for a cozy and elegant bedroom.",
    price: 420
  },
  table: {
    name: "Designer Table",
    description: "A sleek and modern table that adds style to any room.",
    price: 190
  },
  cupboard: {
    name: "Book Shelf",
    description: "A stylish shelf unit that adds storage and elegance to the room.",
    price: 145
  },
  wardrobe: {
    name: "Wardrobe",
    description: "A stylish cupboard that adds storage and elegance to the room.",
    price: 200
  },
  bench: {
    name: "Tufted Bench",
    description: "An elegant bench placed at the foot of the bed.",
    price: 205
  },
  sofa: {
    name: "Modern Sofa",
    description: "A cozy and stylish sofa for a warm living room setup.",
    price: 550
  },
  coffeeTable: {
    name: "Coffee Table",
    description: "A sleek center table that completes the room layout.",
    price: 180
  },
  accentChair: {
    name: "Accent Chair",
    description: "A stylish single-seater chair that adds character to the room.",
    price: 250
  },
  desk: {
    name: "Wooden Desk",
    description: "A clean wooden desk for a focused study corner.",
    price: 210
  },
  chair: {
    name: "Office Chair",
    description: "A supportive chair for comfort and productivity.",
    price: 160
  },
  shelf: {
    name: "Wall Shelf",
    description: "A minimalist shelf for books and decor pieces.",
    price: 120
  },
  stool: {
    name: "Stool",
    description: "A versatile stool that can be used for seating or as a side table.",
    price: 80
  }
};

const roomDescriptions = {
  bedroom: "This bedroom setup combines comfort and storage with a cozy bed, a shelf unit, and a sofa for a warm multi-use vibe.",
  living: "This living room focuses on comfort and elegance with a sofa, coffee table, accent chair, wardrobe, and bed-inspired seating layout.",
  study: "This study corner keeps things simple and functional with seating and flexible furniture pieces.",
  cozy: "This cozy room setup mixes soft sleeping furniture with practical pieces for a comfortable and aesthetic look.",
  designercupboard: "This setup highlights a stylish storage piece that works both as decor and functional organization.",
  classy: "This classy room uses elegant seating and a modern table to create a clean premium look.",
  buss: "This room blends work and comfort with a desk, sofa, table, and stool for a versatile layout.",
  cutecup: "This furniture setup focuses on a compact storage piece that adds charm and practicality."
};

let currentRoom = "bedroom";

function getRoomFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("room") || "bedroom";
}

function hideAllHotspots() {
  document.querySelectorAll(".hotspot").forEach((btn) => {
    btn.style.display = "none";
  });
}

function showCurrentRoomHotspots(roomName) {
  document.querySelectorAll(`.room-${roomName}`).forEach((btn) => {
    btn.style.display = "block";
  });
}

function loadRoom() {
  currentRoom = getRoomFromURL();

  if (!roomData[currentRoom]) {
    currentRoom = "bedroom";
  }

  const room = roomData[currentRoom];
  const roomImage = document.getElementById("roomImage");
  const productInfo = document.getElementById("productInfo");
  const wholeLookResult = document.getElementById("wholeLookResult");
  const roomDescription = document.getElementById("roomDescription");

  if (roomImage) {
    roomImage.src = room.image;
    roomImage.alt = `${currentRoom} furniture room`;
  }

  hideAllHotspots();
  showCurrentRoomHotspots(currentRoom);

  if (productInfo) {
    productInfo.innerHTML = `
      <h2>Click a + button</h2>
      <p>See the furniture details, price, and buying options here.</p>
    `;
  }

  if (wholeLookResult) {
    wholeLookResult.innerHTML = "";
  }

  if (roomDescription && roomDescriptions[currentRoom]) {
    roomDescription.textContent = roomDescriptions[currentRoom];
  }

  document.getElementById("roomDescription").textContent = roomDescriptions[currentRoom];
}

function showProduct(productId) {
  const product = products[productId];
  const productInfo = document.getElementById("productInfo");

  if (!product || !productInfo) return;

  productInfo.innerHTML = `
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <div class="single-price">Price: $${product.price}</div>
    <div class="action-buttons">
      <button class="cart-btn" onclick="addToCart('${product.name.replace(/'/g, "\\'")}')">Add to Cart</button>
      <button class="buy-btn" onclick="buyNow('${product.name.replace(/'/g, "\\'")}', ${product.price})">Buy Now</button>
    </div>
  `;
}

function buyWholeLook() {
  const room = roomData[currentRoom];
  const wholeLookResult = document.getElementById("wholeLookResult");

  if (!room || !wholeLookResult) return;

  let total = 0;

  room.items.forEach((itemId) => {
    if (products[itemId]) {
      total += products[itemId].price;
    }
  });

  const discount = total * 0.10;
  const finalTotal = total - discount;

  wholeLookResult.innerHTML = `
    Original Total: $${total.toFixed(2)}<br>
    Discount: 10% (-$${discount.toFixed(2)})<br>
    <strong>Final Price: $${finalTotal.toFixed(2)}</strong>
  `;
}

function addToCart(productName) {
  alert(productName + " added to cart!");
}

function buyNow(productName, price) {
  alert("Buying " + productName + " for $" + price + " with no discount.");
}

window.addEventListener("DOMContentLoaded", loadRoom);
