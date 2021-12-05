import React, {useState} from 'react';
import { IntlProvider } from "react-intl";
import App from './App';

//function to access to the current language
// function getLang() {
//     if (navigator.languages != undefined) 
//     return navigator.languages[0]; 
// return navigator.language;
// }

const messagesInEnglish = {
    login: "Login",
    profile: "Profile"
}

const messagesInSpanish = {
    login: "Iniciar sesion",
    profile: "Perfil"
}


let languageProps = {
    messages: messagesInEnglish,
    locale: "en-US"
}

const LanguageChanger =() => {
    const [locale, setLocale] = useState (
        "English"
    )

    if(locale === "English") {
        languageProps = {
            messages: messagesInEnglish,
            locale: "en-US"
        }
    } else if (locale === "Spanish") {
        languageProps = {
            messages: messagesInSpanish,
            locale: "es-ES"
        }
    }
    return (
        <IntlProvider messages={languageProps.messages} locale={languageProps.locale} defaultLocale="en">
            <App updateLocal={setLocale} />
        </IntlProvider>
    )


}
export default LanguageChanger;
