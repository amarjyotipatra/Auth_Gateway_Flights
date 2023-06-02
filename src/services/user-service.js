const { UserRepository } = require('../repositories');

const userRepo = new UserRepository();

async function create(data){
    try {
        const user=await userRepo.create(data);
        return user;
    } catch (error) {
        
    }
}

module.exports={
    create,
}