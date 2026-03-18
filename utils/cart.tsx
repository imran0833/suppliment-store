export function getCart() {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart: any) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product: any) {

  let cart = getCart();

  const existing = cart.find((item: any) => item._id === product._id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
}

export function removeFromCart(id: string) {

  let cart = getCart();

  cart = cart.filter((item: any) => item._id !== id);

  saveCart(cart);
}
export function updateCart(cart:any){

  saveCart(cart)

  window.dispatchEvent(new Event("storage"))

}