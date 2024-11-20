export function getScrollWidth() {
   const outer = document.createElement("div");
   outer.style.visibility = "hidden";
   outer.style.overflow = "scroll";
   //@ts-ignore
   outer.style.msOverflowStyle = "scrollbar";
   document.body.appendChild(outer);

   const inner = document.createElement("div");
   outer.appendChild(inner);

   const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
   //@ts-ignore
   outer.parentNode.removeChild(outer);

   return scrollbarWidth;
}
