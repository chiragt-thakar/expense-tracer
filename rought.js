console.time("s")

const n = 10 
let i=1
const f =(x)=>{
   if(n < x) return;
   console.log(x)
   f(x+1)
    
}

f(i);
console.timeEnd("s")


console.time("d")
for (let index = 10; index > 0; index--) {
  console.log(index)
  
}
console.timeEnd("d")


