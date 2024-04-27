// TODO aca crearon un error presonalizado y lo implementaron, chquear

export class User {
    #_id
    #username
    #first_name
    #last_name
    #age
    #rol
    #email
    #password
    #picture
    #created_at
    #last_login
    
    constructor({
        _id,
        username,
        rol,
        created_at,
        last_login,
        first_name,
        last_name,
        age,
        email,
        password,
        picture,
    }){
        this._id=_id
        this.username = username 
        this.rol = rol 
        this.created_at = created_at 
        this.last_login = last_login 
        this.first_name = first_name 
        this.last_name = last_name 
        this.age = age 
        this.email = email 
        this.password = password 
        this.picture = picture 

        
    }   


    get _id() {return this.#_id}
    get username() {return this.#username}
    get rol() {return this.#rol}
    get created_at() {return this.#created_at}
    get last_login() {return this.#last_login}
    get first_name() {return this.#first_name}
    get last_name() {return this.#last_name}
    get age() {return this.#age}
    get email() {return this.#email}
    get password() {return this.#password}
    get picture() {return this.#picture}

    set _id(value){
        if(!value) {throw new Error('el campo "_id"  es obligatorio')}
        this.#_id = value
        return
    }
    set created_at(value){
        if(!value) {throw new Error('el campo "created_at"  es obligatorio')}
        this.#created_at = value
        return
    }
    set last_login(value){
        if(!value) throw new Error('el campo "last_login"  es obligatorio')
        this.#last_login = value
    }
    set username(value){
        if(!value) throw new Error('el campo "username"  es obligatorio')
        this.#username = value
    }
    set first_name(value){
        if(!value) throw new Error('el campo "first_name"  es obligatorio')
        this.#first_name = value
    }
    set last_name(value){
        if(!value) throw new Error('el campo "last_name"  es obligatorio')
        this.#last_name = value
    }
    set age(value){
        if(!value || value < 0) throw new Error('el campo "age"  es obligatorio')
        this.#age = value
    }
    set email(value){
        if(!value) throw new Error('el campo "email"  es obligatorio')
        this.#email = value
    }
    set password(value){
        if(!value) throw new Error('el campo "password"  es obligatorio')
        this.#password = value
    }
    set rol(value){
        if(!value) throw new Error('el campo "rol"  es obligatorio')
        this.#rol = value
    }
    set picture(value){
        //if(!value) throw new Error('el campo "picture" no es obligatorio')
        this.#picture = value
    }

    toPojo(){
        return {
            _id : this.#_id,
            username : this.#username,
            first_name : this.#first_name,
            last_name : this.#last_name,
            age : this.#age,
            rol : this.#rol,
            email : this.#email,
            password : this.#password,
            picture : this.#picture,
            created_at : this.#created_at,
            last_login : this.#last_login,
        }
    }
}
