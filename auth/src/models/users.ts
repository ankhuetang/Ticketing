import mongoose from "mongoose";
import { Password } from "../services/password";

// an interface that describes properties that are required to create a new User
interface UserAttrs {
    email: string;
    password: string;
}

//an interface to describe properties of a User model
//pass type UserDoc vao de build function return dc type UserDoc
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs):UserDoc;
}

//an interface to describe properties that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//middleware to hash the password before saving
userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
})

//use statics to add function to a mongoose model
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

//UserModel is the type returned by model()
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

//eg. TypeScript ko check dc type of below code
// new User({
//     email: 'test@gmail.com',
//     password: 'ancoeshndn'
// })

export {User};