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
                    type: Schema.Types.ObjectId,
                    ref: 'Course',
                    required: true 
                }
            }
        ]
    }
})

userSchema.methods.addToCart = function(course) {
    const items = [...this.cart.items];
    const index = items.findIndex(c => {
        return c.courseId.toString() === course.id.toString()
    })
    
    if (index === -1) {
        items.push({
            courseId: course._id,
            count: 1
        })
    } else {
        items[index].current += 1;
    }

    const cart = {items}
    this.cart = cart
    return this.save()

}

userSchema.methods.removeFromCart = function(id) {
    
    let items = [...this.cart.items];
    //console.log(items);
    
    const idx = items.findIndex(c => {
        return c.courseId.toString() === id.toString();
    })

    if (items[idx].current === 1) {
        //items = items.splice(idx, 1)
        items = items.filter(c => c.courseId.toString() !== id.toString())
    } else {
        items[idx].current--;
    }
    
    this.cart = {items}
    return this.save()
}

module.exports = model('User', userSchema)