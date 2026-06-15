export const addToCartSchema = (data) => {

    if(!data.productId){
        return { error: "Product ID is required" };
    }

    if(data.quantity == null){
        return { error: "Quantity is required" };
    }

    if(data.quantity <= 0){
        return { error: "Quantity must be greater than 0" };
    }

    return { error: null };
}

export const deleteFromCartSchema = (data) => {

    if(!data.productId){
        return { error: "Product ID is required" };
    }

    return { error: null };
};

export const updateCartSchema = (data) => {

    if(!data.productId){
        return { error: "Product ID is required" };
    }

    if(data.quantity == null){
        return { error: "Quantity is required" };
    }

    if(data.quantity < 1){
        return { error: "Quantity must be at least 1" };
    }

    return { error: null };
};