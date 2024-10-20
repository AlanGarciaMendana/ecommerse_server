export function permissionAdmin (req, res, next) {
    if(req.user.role === "admin") {
        next() 
    } else {
        res.status(403).send("Acceso denegado") 
    }
}


export function permissionUser (req, res, next) {
    if(req.user.role === "user") {
        next() 
    } else {
        res.status(403).send("Acceso denegado")
    }

}