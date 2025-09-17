# Class Booking App (Expo + TypeScript)

A simple demo app with two screens:
- Home: Browse and book classes with filters
- Profile: View & edit basic user details

## 🚀 Setup
```bash
git clone <repo-url>
cd class-booking-app
npm install
npx expo start


class-booking-app/
├── App.tsx
├── package.json
├── tsconfig.json
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── ProfileScreen.tsx
│   ├── components/
│   │   ├── ClassCard.tsx
│   │   ├── FilterChips.tsx
│   │   └── InstructorDropdown.tsx 
│   ├── data/mockClasses.ts
│   ├── types.ts
│   └── hooks/useBooking.ts
└── README.md
