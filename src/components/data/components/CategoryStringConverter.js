
/* eslint-disable no-unused-vars */
import React from 'react';

const CategoryStringConverter= ({number}) => {

  function convertNumberToString(number) {
      switch (number) {
          case 0:
            return "Alla kategorier"
          case 10:
            return "Fordon, Båtar & Delar";
          case 11:
            return "Böcker & Tidningar";
          case 12:
            return "Datorer & Tillbehör";
          case 13:
            return "DVD & Videofilmer";
          case 14:
            return "Foto, Kameror & Optik";
          case 15:
            return "Frimärken";
          case 16:
            return "Kläder";
          case 17:
            return "Hemelektronik";
          case 18:
            return "Hobby";
          case 19:
            return "Klockor";
          case 20:
            return "Antikt & Design";
          case 21:
            return "Musik";
          case 2104:
            return "Musikinstrument";
          case 22:
            return "Mynt & Sedlar";
          case 23:
            return "Konst";
          case 24:
            return "Smycken & Ädelstenar";
          case 25:
            return "Sport & Fritid";
          case 26:
            return "Telefoni, Tablets & Wearables";
          case 27:
            return "Vykort & Bilder";
          case 28:
            return "Övrigt";
          case 29:
            return "Samlarsaker";
          case 30:
            return "TV-spel & Datorspel";
          case 31:
            return "Hem & Hushåll";
          case 32:
            return "Bygg & Verktyg";
          case 33:
            return "Barnkläder & Barnskor";
          case 34:
            return "Biljetter & Resor";
          case 36:
            return "Handgjort & Konsthantverk";
          case 1611:
            return "Barnartiklar";
          case 1612:
            return "Accessoarer";
          case 1623:
            return "Skor";
          case 302571:
            return "Barnleksaker";
          case 340736:
            return "Skönhetsvård";
          case 1605:
            return "Trädgård & Växter";
          case 34034:
            return "Herrskor";
          case 302074:
            return "Herrkläder"
          case 343367:
            return "Lås & larm"
          default:
            return number;
      }
  }
  return <>{convertNumberToString(number)}</>;
}

export default CategoryStringConverter;
