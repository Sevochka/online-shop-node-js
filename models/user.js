const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                current:{
                    type: Number,
                    required: true,
                    default: 1  
                },
                courseId: {
                    courseId:{
                        type: Schema.Types.ObjectId,
                        ref: 'Course',
                        required: true
                    }
                }
            }
        ]
    }
})

module.exports = model('User', userSchema)