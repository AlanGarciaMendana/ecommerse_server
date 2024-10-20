class UserDTO {
    constructor(user) {
        this.email = user.email
        this.rol = user.rol
        this.cart = user.cart
        this.firstName = user.firstName
        this.lastName = user.lastName
    }
}

export default UserDTO 