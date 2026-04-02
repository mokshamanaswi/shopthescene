const roomData = {
  zmirror: {
    image: "https://i.pinimg.com/736x/52/0f/75/520f75ac720a48362895187e0ad133bf.jpg",
    items: ["zmirrorr"]
  },
  livingroom: {
    image: "https://i.pinimg.com/control1/1200x/d0/62/ea/d062ea7d5f16bd6d92af21777bd34dcc.jpg",
    items: ["zmirrorr", "rug", "floorlamp", "wallFrame"]
  },
  grid: {
    image: "https://i.pinimg.com/control1/1200x/ca/c1/96/cac1965fe75c02b357554acde8d03ac2.jpg",
    items: ["grill"]
  },
  doorstep: {
    image: "https://i.pinimg.com/736x/60/a2/a2/60a2a29856e38ec980de56272f17d830.jpg",
    items: ["mirror", "stool", "shoestand","holder"]
  },
  plantu: {
    image: "https://i.pinimg.com/control1/1200x/8f/8e/28/8f8e287717ff65348214636ce7839d67.jpg",
    items: ["plant"]
  },
  beanbagg: {
    image: "https://i.pinimg.com/736x/ee/35/2c/ee352c85c3dcd7a8855b5ad4c9ff3d5a.jpg",
    items: ["beanbag"]
  },
  clockk: {
    image: "https://i.pinimg.com/control1/736x/da/e1/f0/dae1f04b6f391b18ebac2695306b54e3.jpg",
    items: ["clock"]
},
pillows: {
    image: "https://i.pinimg.com/1200x/21/aa/95/21aa955a7087e99c9aa1eb40bf5b6492.jpg",
    items: ["pillowss"]
  },
  holderr: {
    image: "https://i.pinimg.com/736x/be/e4/b5/bee4b5566382892c365491a4753456b4.jpg",
    items: ["holder"]
  }
}

const products = {
  pillowss: {
    name: "Decorative Pillow Set",
    description: "A set of decorative pillows that add color and comfort to your living space.",
    price: 50
  },
  beanbag: {
    name: "Bean Bag Chair",
    description: "A comfortable and stylish bean bag chair that adds a casual and cozy vibe to any room.",
    price: 200
  },
    zmirrorr: {
    name: "Gen Z Mirror",
    description: "A trendy mirror with a sleek design that adds a modern touch to any room.",
    price: 100
  },
  clock: {
    name: "Wall Clock",
    description: "A stylish wall clock that combines functionality with decorative appeal.",
    price: 50
  },
  stool: {
    name: "Decorative Stool",
    description: "A versatile decorative stool that can be used for seating or as a side table.",
    price: 75
  },
  shoestand: {
    name: "Shoe Stand",
    description: "A stylish shoe stand that keeps your footwear organized and adds a decorative element to your entryway.",
    price: 80
  },
  holder: {
    name: "Entry Holder",
    description: "A functional entry holder that keeps your keys and mail organized.",
    price: 60
  },
    grill: {
    name: "Decorative Grill",
    description: "A stylish grill that adds a unique and artistic element to your decor.",
    price: 40
  },
  floorLamp: {
    name: "Floor Lamp",
    description: "A warm floor lamp that adds both light and elegance to the room.",
    price: 120
  },
  rug: {
    name: "Decor Rug",
    description: "A soft textured rug that makes the room feel cozy and complete.",
    price: 180
  },
  mirror: {
    name: "Wall Mirror",
    description: "A decorative mirror that makes the room feel larger and brighter.",
    price: 150
  },
  plant: {
    name: "Indoor Plant",
    description: "A fresh indoor plant that adds life and color to the space.",
    price: 70
  },
  wallFrame: {
    name: "Wall Frame",
    description: "A stylish framed piece that adds personality to the room.",
    price: 85
  },

}

const roomDescriptions = {
  lampcorner: "This decor setup uses lighting, textiles, and window styling to create a warm and elegant room vibe.",
  mirrorroom: "This space combines reflective surfaces and accent pieces to create a bright and polished look.",
  plantspace: "This room feels fresh and lively with greenery, wall styling, and soft lighting details.",
  wallart: "This decor arrangement highlights statement wall pieces, cushions, and rugs for a finished designer look.",
  rugstyle: "This room uses layered decor elements like rugs, mirrors, and plants to create depth and warmth.",
  cozydecor: "This cozy setup uses ambient lighting and soft decorative details to make the room feel personal and welcoming."
};

let currentRoom = "lampcorner";

function getRoomFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("room") || "lampcorner";
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
    currentRoom = "lampcorner";
  }

  const room = roomData[currentRoom];
  const roomImage = document.getElementById("roomImage");
  const productInfo = document.getElementById("productInfo");
  const wholeLookResult = document.getElementById("wholeLookResult");
  const roomDescription = document.getElementById("roomDescription");

  if (roomImage) {
    roomImage.src = room.image;
    roomImage.alt = `${currentRoom} decor room`;
  }

  hideAllHotspots();
  showCurrentRoomHotspots(currentRoom);

  if (productInfo) {
    productInfo.innerHTML = `
      <h2>Click a + button</h2>
      <p>See the decor details, price, and buying options here.</p>
    `;
  }

  if (wholeLookResult) {
    wholeLookResult.innerHTML = "";
  }

  if (roomDescription && roomDescriptions[currentRoom]) {
    roomDescription.textContent = roomDescriptions[currentRoom];
  }
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
