
export class Ticket {
    #_id
    #users
    #created_at
    #products
    #amount
    
    constructor({
        _id,
        users,
        created_at,
        products={},
        amount,
    }){
        this._id=_id
        this.users=users
        this.created_at = created_at
        this.products = products
        this.amount = amount   
    }   


    get _id() {return this.#_id}
    get users() {return this.#users}
    get created_at() {return this.#created_at}
    get amount() {return this.#amount}
    get products() {return this.#products}

    set _id(value){
        if(!value) throw new Error('el campo "_id"  es obligatorio')
        this.#_id= value
    }
    set users(value){
        if(!value) throw new Error('el campo "users"  es obligatorio')
        this.#users= value
    }
    set created_at(value){
        if(!value) throw new Error('el campo "created_at"  es obligatorio')
        this.#created_at= value
    }
    set amount(value){
        if(value ===null) throw new Error('el campo "amount"  es obligatorio')
        if(value < 0) throw new Error('el campo "amount"  debe ser 0 como minimo')
        this.#amount= value
    }
    set products(value){
        //if(!value) throw new Error('el campo "products"  es obligatorio')
        this.#products= value
    }

    toPojo(){
        return {
            _id : this.#_id,
            users: this.#users,
            created_at: this.#created_at,
            products: this.#products,
            amount: this.#amount,
        }
    }
}
