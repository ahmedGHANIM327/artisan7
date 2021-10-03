export class ClientImpl
{
    id = 0;
    name : String;
    email : String;
    password : String;
    phone : String;

    constructor(name : string,email:string,password:string,phone:string)
    {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }
}