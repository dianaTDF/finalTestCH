
export class Cart {
    #_id
    #users
    #products
    
    constructor({
        _id,
        users,
        products= [],
    }){
        this._id=_id
        this.users=users
        this.products = products   
    }   


    get _id() {return this.#_id}
    get users() {return this.#users}
    get products() {return this.#products}

    set _id(value){
        if(!value) throw new Error('el campo "_id"  es obligatorio')
        this.#_id= value
    }
    set users(value){
        if(!value) throw new Error('el campo "users"  es obligatorio')
        this.#users= value
    }
    
    set products(value){
        //if(!value) throw new Error('el campo "title"  es obligatorio')
        this.#products= value
    }

    toPojo(){
        return {
            _id : this.#_id,
            users: this.#users,
            products: this.#products,
        }
    }
}
