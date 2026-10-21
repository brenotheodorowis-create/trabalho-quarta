const cart = [];
const cartEl = document.getElementById("cart");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

function money(value){
  return value.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
}
function renderCart(){
  cartCount.textContent = cart.length;
  if(!cart.length){
    cartItems.innerHTML = '<p class="empty">Seu carrinho está vazio.</p>';
  }else{
    cartItems.innerHTML = cart.map((item,i)=>`
      <div class="cart-row">
        <div><strong>${item.name}</strong><small>${money(item.price)}</small></div>
        <button class="remove" onclick="removeItem(${i})">Remover</button>
      </div>`).join("");
  }
  cartTotal.textContent = money(cart.reduce((sum,item)=>sum+item.price,0));
}
function removeItem(index){cart.splice(index,1);renderCart();}
function openCart(){cartEl.classList.add("open");overlay.classList.add("show")}
function closeCart(){cartEl.classList.remove("open");overlay.classList.remove("show")}

document.querySelectorAll(".buy-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    cart.push({name:btn.dataset.name,price:Number(btn.dataset.price)});
    renderCart();
    openCart();
  });
});
document.getElementById("openCart").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
overlay.onclick=closeCart;
document.getElementById("checkout").onclick=()=>{
  if(!cart.length){alert("Adicione um produto ao carrinho.");return;}
  const total=cart.reduce((s,i)=>s+i.price,0);
  alert("Pedido criado! Total: "+money(total)+"\n\nAqui você pode integrar WhatsApp ou pagamento depois.");
};
renderCart();
