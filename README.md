# MentorLagbe - Smart Tuition & Mentorship Platform

MentorLagbe is a full-stack role-based tuition management platform built with Next.js, Express, MongoDB, BetterAuth, JWT, and Stripe. It connects qualified Tutors with Students looking for personalized academic guidance.

## 🌐 Live Links
- **Live Site:** https://mentorlagbe-clientside.vercel.app
- **Server API:** 

## 🔐 Admin Credentials
- **Email:** `admin@mentorlagbe.com`
- **Password:** `12345678`

## 👨‍🏫 Tutor Credentials (For Testing)
- **Email:** `sumaya935@gmail.com`
- **Password:** `12345678`

## ✨ Key Features
- **Role-Based Access:** Separate dashboards for Student, Tutor, and Admin.
- **Tuition Management:** Tutors can post tuitions (with ImgBB banner upload) and manage applicants.
- **Admin Moderation:** Admins can approve/reject tuitions and manage user roles.
- **Student Applications:** Students can search, filter, and apply for approved tuitions.
- **Stripe Integration:** Pro Plan upgrades ($15 for Tutor, $10 for Student).
- **Authentication:** Secure login/signup using BetterAuth with JWT.
- **Responsive Design:** Fully responsive UI using Tailwind CSS and shadcn/ui.
- **Image Upload:** Direct image upload using ImgBB API.

## 🛠️ Tech Stack
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** BetterAuth, JWT
- **Payment:** Stripe
- **Image Hosting:** ImgBB

## 📦 NPM Packages Used
### Client:
- `next`, `react`, `react-dom`
- `better-auth`
- `axios`, `sonner`
- `lucide-react`
- `tailwindcss`, `shadcn`

### Server:
- `express`, `mongoose`, `mongodb`
- `better-auth`
- `jsonwebtoken`, `cors`, `dotenv`
- `multer`, `form-data`, `axios`
- `stripe`

## 🚀 Setup Instructions (Local)
1. Clone the repository.
2. **Client:** Run `npm install` then `npm run dev`.
3. **Server:** Run `npm install` then `node index.js`.
4. Add necessary `.env` variables in both client and server.