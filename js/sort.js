const sortArr = [
   'anor', 'anjir', 'behi', 'olma'
]

sortArr.sort((a, b) => {
   if (a < b){
      return -1
   }
   if (a > b) {
      return 1
   }
   return 0
});

console.log(sortArr);