const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: true
    },
    author: {
        type: String,
        required: [true, 'Author is required']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required']
    },
    publisher: {
        type: String,
        required: [true, 'Publisher is required']
    },
    publicationYear: {
        type: Number
    },
    totalCopies: {
        type: Number,
        required: [true, 'Total copies is required'],
        min: [1, 'Total copies must be a positive number']
    },
    availableCopies: {
        type: Number
    },
    shelfLocation: {
        type: String
    },
    bookType: {
        type: String,
        enum: ['Reference', 'Circulating'],
        default: 'Circulating'
    },
    status: {
        type: String,
        enum: ['Available', 'Checked Out'],
        default: 'Available'
    }
}, {
    timestamps: true
});

// Calculate available copies before saving if not provided
bookSchema.pre('save', function(next) {
    if (this.isNew && this.availableCopies === undefined) {
        this.availableCopies = this.totalCopies;
    }
    next();
});

module.exports = mongoose.model('Book', bookSchema);
