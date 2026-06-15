export const addproductSchema = (data) => {

    if(!data.name || data.name.length < 2){
        return { error: "Product name required" };
    }

    if(data.price == null || data.price <= 0){
        return { error: "Price must be greater than 0" };
    }

    if(data.stock == null || data.stock < 0){
        return { error: "Stock cannot be negative" };
    }

    return { error: null };
};