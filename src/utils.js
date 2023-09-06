export const getTotals = (cart) => {
    let totalAmount = 0;
    let totalCost = 0;
    for (let [key, { name, price, amount }] of cart) {
    //   console.log(key, name, price, amount);
      totalAmount += amount ;
      let itemTotalCost = amount * price;
      totalCost += itemTotalCost
    }
    totalCost = Math.round(totalCost * 100) / 100


    return {totalAmount, totalCost}
}