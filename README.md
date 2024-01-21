# 🏕️ [The Wild Oasis](https://the-wild-oasis-six-eta.vercel.app/)
#### A classy app for hotel staff to handle bookings for their fancy cabins. 🏠

## Functionalities:

> **Account:** *(in case you're too lazy to create your own 🧐)* **email:** plamivanova37@gmail.com, **password:** pass12345

- **dashboard:** 
  - stats about all bookings, sales, check ins and occupancy rate with filter for the last 7, 30 or 90 days
  - today's activity with upcoming check in and outs
  - stay duration pie chart and total sales line chart depending on the last 7, 30 or 90 days

- **bookings:** 
  - info about all bookings with filters whether they are *check out*, *check in*, or *unconfirmed*
  - sorting by date (recent/earlier) or amount (high/low)
  - form for adding a new booking in which you add an already exising guest and click *Lookup guest*. If the guest is not existing it will open the form for creating a new guest
  - pagination

- **cabins:** 
  - info about all cabins with filters whether they have *discount* or not
  - sorting by name (A-Z/Z-A), capacity (hign/low) or price (high/low)
 
- **users:** 
  - form for creating new users, who can use the app
  - after a user is created, he will recieve an email in which he has to confirm his mail
 
- **settings:** 
  - form for app settings: min and max nights per booking, max guests per booking and breakfast price

- **account:** 
  - two forms for updating users data: full name, avatar and password
    
- currently not responsive *yet*

  
## Features:
- authentication, authorization, protected routes
- compound components
- remote state management
- form validation
- dark mode
- sorting, filtering, pagination
- line and pie charts


## Tech stack:
React + Vite, React Router, JavaScript, React Query, react-hook-form, styled-components, context API, Supabase, React Icons, React Hot Toast, Recharts, date-fns
   
#### 🔗 Here are some previews 📸:
![Login](https://i.imgur.com/1ZBysAb.png)

![Dashboard](https://i.imgur.com/kwDfhPx.png)

![Bookings](https://i.imgur.com/JDifKlp.png)

![Cabins](https://i.imgur.com/CzsR5hH.png)

![CabinsForm](https://i.imgur.com/ghlLGM4.png)

![CheckIn](https://i.imgur.com/suaRLaL.png)

![Account](https://i.imgur.com/Gf869RE.png)

![Settings](https://i.imgur.com/j4nqKzi.png)

![Users](https://i.imgur.com/Hw3kOn0.png)

![DashboardDarkMode](https://i.imgur.com/IQz8NdU.png)

![EmailConfirmation](https://i.imgur.com/8DV5wWa.png)


