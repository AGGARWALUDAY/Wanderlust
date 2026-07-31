# 🏡 Wanderlust

A full-stack, Airbnb-inspired property listing platform built with **Node.js, Express, MongoDB, and EJS**, following the MVC architecture.

Wanderlust lets users sign up, log in, and browse property listings. Authenticated users can create their own listings, edit or delete listings they own, and leave reviews with star ratings on any listing.

---

## 🚀 Tech Stack

**Backend:** Node.js, Express.js
**Database:** MongoDB with Mongoose (ODM)
**Templating:** EJS + EJS-Mate (for layout reuse)
**Auth:** Passport.js (passport-local + passport-local-mongoose) with Express-Session
**Validation:** Joi (schema-based request validation)
**Other:** Connect-Flash (session-based flash messages), Method-Override (PUT/DELETE via HTML forms)

---

## ✨ Features

- 📋 **Browse listings** — view all property listings on the homepage
- 🔍 **View listing details** — see full details of a listing along with its reviews
- ➕ **Create listings** — add a new property with title, description, price, location, and image
- ✏️ **Edit listings** — update details of a listing (owner-only)
- ❌ **Delete listings** — remove a listing (owner-only)
- 🔐 **User authentication** — sign up, log in, and log out with Passport-backed sessions
- 🛡️ **Authorization guards** — only a listing's owner can edit/delete it; only a review's author can delete it
- ⭐ **Reviews & ratings** — logged-in users can leave a comment and 1–5 star rating on any listing
- ↩️ **Redirect-after-login** — users are sent back to the page they were trying to reach before being asked to log in
- ✅ **Server-side validation** — listing and review data is validated with Joi before hitting the database
- 💬 **Flash messages** — user feedback (success/error) on auth, create, update, and delete actions
- 📱 **Responsive UI** — built with Bootstrap for mobile and desktop

---

## 🗂️ Project Structure

```
Wanderlust/
├── controllers/      # Route handler logic (users, reviews)
├── init/             # DB seed script + sample data
├── models/           # Mongoose schemas (Listing, Review, User)
├── routes/           # Express route definitions (listings, reviews, users)
├── utils/            # ExpressError + async wrapper helpers
├── views/            # EJS templates (listings, user auth, layouts, includes)
├── public/           # Static assets (CSS, JS, images)
├── app.js            # App entry point
├── middleware.js      # Auth guards, ownership/author checks, validation middleware
├── schema.js          # Joi validation schemas
└── package.json
```

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
node init/inti.js

# Start the server
node app.js
```

The app will be available at `http://localhost:8080`.

---

## 🛣️ Roadmap

Planned improvements as the project moves toward a full booking platform:

- [ ] Cloud-based image uploads (Cloudinary)
- [ ] Search & filter listings by location/price
- [ ] Actual booking/reservation flow with date selection
- [ ] Deployment (Render/Railway + MongoDB Atlas)
- [ ] Move session secret and DB URI to environment variables (`.env`)

---

## 👤 Author

**Uday Aggarwal**
Built as part of learning the MERN stack / backend fundamentals.