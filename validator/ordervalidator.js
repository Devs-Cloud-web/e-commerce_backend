export const placeOrderSchema = (data) => {

    if(!data.items || data.items.length === 0){
        return { error: "Order must have at least one item" };
    }

    for(let item of data.items){

        if(!item.product || !item.quantity){
            return { error: "Invalid order item" };
        }

        if(item.quantity <= 0){
            return { error: "Quantity must be greater than 0" };
        }
    }

    return { error: null };
};