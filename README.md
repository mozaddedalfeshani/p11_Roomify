# Roomify 🌍

Roomify is a modern hotel booking platform that allows users to search, book, and manage hotel reservations with ease. Built with React.js, Node.js, MongoDB, and Firebase.

## 🌟 Features

- **User Authentication:** Secure user registration and login.
- **Hotel Search:** Search and filter hotels based on various criteria.
- **Booking Management:** Book and manage hotel reservations.
- **Interactive Map:** View hotel locations on an interactive map.
- **Responsive Design:** Optimized for mobile, tablet, and desktop devices.

## 🔗 Live Demo

[Live Demo](https://your-live-url.com)

## 🚀 Technologies Used

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase Authentication
- **Hosting:** Firebase (Client) & Vercel (Server)

## 📦 Packages Used

- **axios:** ^1.7.9
- **dotenv:** ^16.4.7
- **firebase:** ^11.1.0
- **framer-motion:** ^11.15.0
- **leaflet:** ^1.9.4
- **localforage:** ^1.10.0
- **match-sorter:** ^8.0.0
- **react:** ^19.0.0-rc.1
- **react-dom:** ^19.0.0-rc.1
- **react-icons:** ^5.4.0
- **react-leaflet:** ^5.0.0-rc.2
- **react-router-dom:** ^7.1.0
- **react-tooltip:** ^5.28.0
- **sort-by:** ^1.2.0
- **sweetalert2:** ^11.15.3
- **swiper:** ^11.1.15

## 📂 Folder Structure

```plaintext
roomify/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── LoginForm.jsx
│   │   │   └── Profile.jsx
│   │   ├── common/
│   │   │   ├── Card.jsx
│   │   │   ├── LoadingUI.jsx
│   │   │   └── UserIcon.jsx
│   │   ├── Home/
│   │   │   ├── AddHotel.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── ContactUs.jsx
│   │   │   ├── CoverflowSlider.jsx
│   │   │   ├── ExtraOne.jsx
│   │   │   ├── LatestCards.jsx
│   │   │   └── NavBar.jsx
│   │   └── utils/
│   │       ├── CardWithModal.jsx
│   │       └── PageNotFound.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── AllHotels.jsx
│   │   ├── AddHotel.jsx
│   │   ├── MyBookings.jsx
│   │   ├── HotelDetails.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── NotFound.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── HotelContext.jsx
│   ├── hooks/
│   │   ├── useAuth.jsx
│   │   └── useHotel.jsx
│   ├── services/
│   │   ├── api/
│   │   │   ├── hotelService.js
│   │   │   └── authService.js
│   │   └── firebase/
│   │       └── firebase.config.js
│   ├── styles/
│   │   ├── global.css
│   │   ├── Navbar.css
│   │   ├── Banner.css
│   │   ├── Footer.css
│   │   ├── Forms.css
│   │   └── Cards.css
│   ├── App.jsx
│   ├── index.js
│   ├── routes/
│   │   └── Routes.jsx
│   └── utils/
│       ├── formatDate.js
│       ├── calculateAge.js
│       └── validations.js
├── .env
├── package.json
└── README.md
```

## 🛠 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/roomify.git
   cd roomify
   ```

## 📝 Key Functionality

- **Home Page:**
  - Banner slider
  - Latest hotels section with newest hotel cards
  - Extra informative sections

- **Add Hotel:**
  - Private/protected route
  - Form to add hotel details including images, amenities, price, etc.

- **All Hotels Page:**
  - Displays all hotels in a grid layout with "See Details" functionality.

- **Hotel Details Page:**
  - Shows complete information about a hotel.
  - "Book Now" button with a booking form.

- **Authentication:**
  - Login, Register, and Google OAuth support.
  - Password validation for security.

## 🙌 Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.
