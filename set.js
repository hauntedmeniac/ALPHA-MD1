const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0xzcDNRK2tHSlRMMEw5OTJLRW5OUEV5c0VpcVYydzZXdUlINEd4V2EzTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNnFobzJrMHdjZnFVMnJyUWdtSDg0YlZSOFl2bEdYQlNpVnZQYnlEL0QyYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwUEFrSlhqRU50bUJvaU1lTW84UzhEbTRQdURkekVBMFJnWmdlYmE0NFZJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6cnQ3Z0ZmVi9TdEZ0enUxdkRqYkJHaWhrUDFJZWRqd1N1NURYQ1VSSHdzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1LVVU1ekR6RWpZOUc4c21ZQmIvUkllbmx4cWk0MmlIWGFZYjRVMVlPVkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9yenYzdlBabTY5cWZ3cTJ2eThpRkk0RnVTdDEzWkF1ZlM2ZlFWcVRZajg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0VXQUo1M0lzR3JzOFVHWUk4a0xmTWNnRHNMOGwvMVhiM1g5TkcwZ0ZGdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaTV2eHR0OXFKMDhaR1ZGOHhwaWlsYVNwWldHakNzcVpCYzk3NTgrcnB4cz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndvS1lhb1JDZTBXcVM3T0Jkc1ZlcTRCc0JEYmR5cWkxbCtqblR4SWlpcktYT3ZQc1RJb1pPellFZ3F0ZnFZejhuYVJkOGFMSzRINkVQci9GT1ZhMWdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY4LCJhZHZTZWNyZXRLZXkiOiJvOHVuQzNSdGZ1NzcyS2pOVlNWZnlGcmEzblR0RzNZRUcrN21zRnZST3g4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI1TlFrd01XS1Q1Q0U1clYtRjJqMHJRIiwicGhvbmVJZCI6ImQ2MTQ3ZTAzLTU0MDktNDdmYS04ZTFjLWJiMDhmZTE2YzJmNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5dTh4V1k2RktoQktodG5CVWc0cllDSzRmWUE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic3RCaHEvSUpCd0RxUnJxc3FvK1RKdHU4KzZzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkE4WEw3NkhXIiwibWUiOnsiaWQiOiIyNTQ3OTg3NDYzODg6MzBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSGF1bnRlZCBNZW5pYWMifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pia3haZ0dFTXZ6NUxVR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImdhVHdqMjcyRzJ3S21FM1gxL3N0RFdGaG1kSmwrdFdrbFpyM2Y1NFM1bmM9IiwiYWNjb3VudFNpZ25hdHVyZSI6InhhWjVUL1NjQi91Y1BSL1JVNE9OY0pRdEd4V0JsdkZId3NTVEIwN0tjUk8vZU5WQVJMSm1mNnZDNVVQQjZ4QkkrWW1kMWVMc0pveEdtTXVWbC9YN0R3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJKRnJNZnBNWmNWL2FUNFd0MHRwZnk0KzJtbUdYbWcrdVdmVzZnOGJ2dS9hSVozVHIvbEQyTEhuc2hVYzROWlFnMTVCRXdSMnQwbTZuN2FZbFVMckFoQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc5ODc0NjM4ODozMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZR2s4STl1OWh0c0NwaE4xOWY3TFExaFlablNaZnJWcEpXYTkzK2VFdVozIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzNDE1MDA1fQ==',
    PREFIXE: process.env.PREFIX || "!",
    OWNER_NAME: process.env.OWNER_NAME || "Hauntedmeniac",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "+254798746388",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'HauntedMeniac,
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'Typing',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
