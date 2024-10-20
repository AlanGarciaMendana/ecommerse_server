class UserDTO {
    constructor(user) {
        this.email = user.email
        this.role = user.role 
        this.cart = user.cart
        this.firstName = user.firstName
        this.lastName = user.lastName
    }
}

export default UserDTO 