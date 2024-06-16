# Aplicația Cake Tracker

## Prezentare generală
Această aplicație este construită folosind .NET pentru backend, React pentru frontend și MongoDB pentru baza de date. Urmați instrucțiunile de mai jos pentru a configura și rula proiectul local.

## Cerințe preliminare
- Visual Studio
- Node.js și npm
- MongoDB

## Începerea proiectului

### Backend (.NET)
1. Deschideți Visual Studio.
2. Deschideți folderul `server` în Visual Studio.
3. Construiți și rulați proiectul din Visual Studio.

### Frontend (React)
1. Deschideți un terminal.
2. Navigați în folderul `client`.
3. Rulați următoarele comenzi:
   ```bash
   npm install
   npm run dev
   
### Baza de date (MongoDB)
1. Asigurați-vă că MongoDB este instalat și rulează pe mașina dvs.
2. Creați o bază de date numită `cakeTrackerDB`.
3. Creați o colecție numită `users`.

### Date de test
1. În repository-ul GitHub, există un fișier numit `dummyData`.
2. Utilizați acest fișier pentru a importa date de test în colecția `users` a bazei de date `cakeTrackerDB`.

## Rularea aplicației
1. Asigurați-vă că toate serviciile sunt pornite:
   - Backend-ul .NET
   - Frontend-ul React
   - MongoDB
2. Deschideți browserul și navigați la `http://localhost:3000/`.

## Funcționalitățile aplicației

### Navbar
- **Home:** Pagina de start.

- **Users:** 
  - Afișează toți utilizatorii într-un tabel sortabil.
  - Paginarea este implementată cu 5 utilizatori per pagină.
  - Sub tabel, există un buton "Adaugă utilizator".
  - Apăsând pe butonul "Adaugă utilizator" se deschide un formular care trebuie completat pentru a adăuga un nou utilizator.
  - Formularul include validare:
    - Toate câmpurile sunt obligatorii.
    - Vârsta trebuie să fie de cel puțin 18 ani.
    - Nu sunt permise nume sau locații duplicate.
  - Butonul "Adaugă" trimite formularul și adaugă un utilizator.
  - Butonul "Închide" închide formularul.

- **Birthdays:** 
  - Listează toți utilizatorii ordonați după zilele de naștere apropiate.

## Funcționalități backend
- Validare vârstă (minim 18 ani).
- Nu sunt permise înregistrări duplicate pentru nume sau locație.
- Suport pentru sortare și paginare.
