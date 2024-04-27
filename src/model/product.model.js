
export class Product {
    #_id
    #users
    #title
    #description
    #code
    #price
    #status
    #stock
    #category
    #thumbnails
    
    constructor({
        _id,
        title,
        users,
        description = 'sin descipción',
        code,
        price,
        status,
        stock,
        category,
        thumbnails= [],
    }){
        this._id=_id
        this.users=users
        this.title = title
        this.description = description
        this.code = code
        this.price = price
        this.status = status
        this.stock = stock
        this.category = category
        this.thumbnails = thumbnails        
    }   


    get _id() {return this.#_id}
    get title() {return this.#title}
    get users() {return this.#users}
    get description() {return this.#description}
    get code() {return this.#code}
    get price() {return this.#price}
    get status() {return this.#status}
    get stock() {return this.#stock}
    get category() {return this.#category}
    get thumbnails() {return this.#thumbnails}


    set _id(value){
        if(!value) throw new Error('el campo "_id"  es obligatorio')
        this.#_id= value
    }
    set title(value){
        if(!value) throw new Error('el campo "title"  es obligatorio')
        this.#title= value
    }
    set users(value){
        if(!value) throw new Error('el campo "users"  es obligatorio')
        this.#users= value
    }
    set description(value){
        //if(!value) throw new Error('el campo "title"  es obligatorio')
        this.#description= value
    }
    set code(value){
        if(!value) throw new Error('el campo "code"  es obligatorio')
        this.#code= value
    }
    set price(value){
        if(!value ) throw new Error('el campo "price"  es obligatorio')
        if(parseInt(value) <= 0) throw new Error('el campo "price"  debe ser un numero positivo')
        this.#price= value
    }
    set status(value){
        if(!value) throw new Error('el campo "status"  es obligatorio')
        this.#status= value
    }
    set stock(value){
        if(!value) throw new Error('el campo "stock"  es obligatorio')
        if(parseInt(value) < 0) throw new Error('el campo "stock"  debe ser un numero mayor o igual a 0')
        this.#stock= value
    }
    set category(value){
        if(!value) throw new Error('el campo "category"  es obligatorio')
        this.#category= value
    }
    set thumbnails(value){
        /* if(!value) throw new Error('el campo "thumbnails"  es obligatorio') */
        this.#thumbnails= value
    }


    toPojo(){
        return {
            _id : this.#_id,
            title: this.#title,
            users: this.#users,
            description: this.#description,
            code: this.#code,
            price: this.#price,
            status: this.#status,
            stock: this.#stock,
            category: this.#category,
            thumbnails: this.#thumbnails,
        }
    }
}
