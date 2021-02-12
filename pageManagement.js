const itemQuantity = 100;
const limit = 20;

//Page quantity calculation 
pagesQtity = itemQuantity/limit;


const pages = [];

for (let i = 1; i <= pagesQtity; i++) {
  pages.push(i);
}

console.log(pages);

pages.map((page) => {
  return console.log("One page");
});
