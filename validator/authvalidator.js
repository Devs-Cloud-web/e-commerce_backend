export const registerSchema = (data) => {

    if(!data.name || data.name.length < 3){
        return {error: "Name must be at least 3 characters"};
    }

    if(!data.email || !data.email.includes("@")){
        return {error: "Invalid email"};
    }

    if(!data.password || data.password.length < 6){
        return {error: "Password must be at least 6 characters"};
    }

    return {error: null};
};

export const loginSchema = (data) => {
    
    if (!data.email || !data.password) {
        return { error: "Email and password required" };
    }

    return { error: null };
};