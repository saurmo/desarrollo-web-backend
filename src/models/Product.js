

class Product {

    static createProductFromObject(data) {
        if (!data.id) {
            throw { ok: false, message: "Id obligatorio" }
        }
        return new Product(data)
    }

    constructor(id,
        name,
        image,
        type,
        price) {
        this.id = id
        this.name = name
        this.image = image
        this.type = type
        this.price = price
    }



}

module.exports = Product