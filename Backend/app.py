# app.py

"""
This file serves as the backend API for an e-commerce web application. It uses Flask to manage routes for user registration,
login, and product retrieval. It also hashes user passwords for security and provides cross-origin resource sharing (CORS) to
allow frontend requests from different origins.
"""

from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

# Initialize the Flask app and enable CORS for cross-origin requests
app = Flask(__name__)
CORS(app)

# In-memory storage for registered users and products available in the store
users = []
products = [
    {
        "id": 1,
        "name": "Pure Paleo Protein Powder",
        "description": "High-quality paleo protein powder, perfect for enhancing muscle growth and recovery. Gluten-free and low-carb.",
        "price": 29.99,
        "image": 'images/product1.png'
    },
    {
        "id": 2,
        "name": "iPhone 11 Pro Case",
        "description": "Durable and stylish case designed to protect your iPhone 11 Pro. Scratch-resistant and slim design.",
        "price": 19.99,
        "image": 'images/product2.jpg'
    },
    {
        "id": 3,
        "name": "Gisou Honey Hair Oil",
        "description": "Premium honey-infused hair oil, ideal for nourishing and adding shine to all hair types. Lightweight and non-greasy.",
        "price": 39.99,
        "image": 'images/product3.jpg'
    },
    {
        "id": 4,
        "name": "Lip Gloss Duo Set",
        "description": "A set of moisturizing and long-lasting lip glosses, perfect for a subtle and natural shine.",
        "price": 15.99,
        "image": 'images/product4.jpg'
    },
    {
        "id": 5,
        "name": "Multi-Port USB Hub",
        "description": "High-speed USB hub with multiple ports for all your devices. Compatible with USB 3.0 and provides quick data transfer.",
        "price": 18.99,
        "image": 'images/product5.jpg'
    },
    {
        "id": 6,
        "name": "Bluetooth Sports Headband",
        "description": "Sweat-proof headband with built-in Bluetooth speakers for hands-free listening during workouts or running.",
        "price": 24.99,
        "image": 'images/product6.jpg'
    },
    {
        "id": 7,
        "name": "Apple TV Streaming Device",
        "description": "The latest Apple TV, offering seamless streaming with access to all your favorite apps and channels. Comes with remote control.",
        "price": 149.99,
        "image": 'images/product7.jpg'
    },
    {
        "id": 8,
        "name": "Essential Oil Diffuser",
        "description": "Ultrasonic essential oil diffuser with LED lighting for a relaxing ambiance. Perfect for home or office use.",
        "price": 25.99,
        "image": 'images/product8.jpg'
    },
    {
        "id": 9,
        "name": "Electric Toothbrush",
        "description": "Advanced electric toothbrush with multiple brushing modes for a thorough clean and a built-in timer for convenience.",
        "price": 49.99,
        "image": 'images/product9.jpg'
    },
    {
        "id": 10,
        "name": "Gaming Keyboard and Mouse Combo",
        "description": "RGB backlit gaming keyboard and mouse combo, perfect for gaming enthusiasts. Ergonomic design for comfortable use.",
        "price": 119.99,
        "image": 'images/product10.jpg'
    }
]

# User registration route
@app.route('/register', methods=['POST'])
def register_user():
    """
    Registers a new user by storing their username, hashed password, and email.
    Ensures the username is unique and all fields are provided.
    """
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    # Validate input fields
    if not username or not password or not email:
        return jsonify({'error': 'Username, password, and email are required'}), 400

    # Check for existing username
    if any(user['username'] == username for user in users):
        return jsonify({'error': 'Username already exists'}), 400

    # Hash and store the password
    hashed_password = generate_password_hash(password)
    users.append({'username': username, 'password': hashed_password, 'email': email})
    return jsonify({'message': 'User registered successfully'}), 201

# User login route
@app.route('/login', methods=['POST'])
def login_user():
    """
    Authenticates a user based on username and password. Checks the hashed password
    and returns a success message if credentials are valid.
    """
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Retrieve user and verify password
    user = next((user for user in users if user['username'] == username), None)
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'error': 'Incorrect username or password'}), 401

    return jsonify({'message': 'Login successful', 'user': user}), 200

# Products retrieval route
@app.route('/products', methods=['GET'])
def get_products():
    """
    Returns a list of all available products in the store, including name, description,
    price, and image path.
    """
    return jsonify(products), 200

if __name__ == '__main__':
    app.run(debug=True)