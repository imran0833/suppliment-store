export function getWishlist() {
  if (typeof window === "undefined") return [];
  const list = localStorage.getItem("wishlist");
  return list ? JSON.parse(list) : [];
}

export function saveWishlist(list:any){
  localStorage.setItem("wishlist",JSON.stringify(list));
}

export function addToWishlist(product:any){

  let list = getWishlist();

  const exists = list.find((item:any)=>item._id === product._id);

  if(!exists){
    list.push(product);
  }

  saveWishlist(list);
}

export function removeFromWishlist(id:string){

  let list = getWishlist();

  list = list.filter((item:any)=>item._id !== id);

  saveWishlist(list);
}