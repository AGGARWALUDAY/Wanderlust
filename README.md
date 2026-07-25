# 🏡 Wanderlust

A full-stack, Airbnb-inspired property listing platform built with **Node.js, Express, MongoDB, and EJS**, following the MVC architecture.

Wanderlust lets users browse property listings and lets hosts create, edit, and delete their own listings — with server-side validation and flash-message feedback baked in from the start.

---

## 🚀 Tech Stack

**Backend:** Node.js, Express.js  
**Database:** MongoDB with Mongoose (ODM)  
**Templating:** EJS + EJS-Mate (for layout reuse)  
**Validation:** Joi (schema-based request validation)  
**Other:** Connect-Flash (session-based flash messages), Method-Override (PUT/DELETE via HTML forms)

---

## ✨ Features

- 📋 **Browse listings** — view all property listings on the homepage
- ➕ **Create listings** — add a new property with title, description, price, location, and image
- ✏️ **Edit listings** — update details of an existing listing
- ❌ **Delete listings** — remove a listing
- ✅ **Server-side validation** — all listing data is validated with Joi before hitting the database
- 💬 **Flash messages** — user feedback (success/error) on create, update, and delete actions
- 📱 **Responsive UI** — built with Bootstrap for mobile and desktop

---

## 🗂️ Project Structure

Wanderlust/
├── init/ # DB seed script + sample data
├── models/ # Mongoose schemas (Listing)
├── routes/ # Express route handlers
├── utils/ # Error handling helpers
├── views/ # EJS templates
├── public/ # Static assets (CSS, JS, images)
├── app.js # App entry point
├── schema.js # Joi validation schemas
└── package.json

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB running locally (or a MongoDB Atlas URI)

### Installation

```bash
# Clone the repo
git clone https://github.com/AGGARWALUDAY/Wanderlust.git
cd Wanderlust

# Install dependencies
npm install

# Seed the database with sample listings (optional)
node init/index.js

# Start the server
node app.js
```

The app will be available at `http://localhost:8080` (or whichever port is set in `app.js`).

---

## 🛣️ Roadmap

Planned improvements as the project moves toward a full booking platform:

- [ ] User authentication & authorization (Passport.js)
- [ ] Reviews & ratings on listings
- [ ] Cloud-based image uploads (Cloudinary)
- [ ] Search & filter listings by location/price
- [ ] Actual booking/reservation flow with date selection
- [ ] Deployment (Render/Railway + MongoDB Atlas)

---

## 👤 Author

**Uday Aggarwal**  
Built as part of learning the MERN stack / backend fundamentals.