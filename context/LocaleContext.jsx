import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
export const LocaleContext = React.createContext({
    locale: "",
    setLocale: () => {}
});

export const LocaleProvider = ({ children }) => {
    const router = useRouter();
    const [lang, setLang] = useState(router.locale);

    useEffect(() => {
        console.log('language from browser*****' + navigator.language)
        if (lang && navigator.language !== locale) {
            console.log(`Do you what to switch to ${navigator.language}?`)
        }
        setLang(router.locale)
    }, []);


    return <LocaleContext.Provider value={{locale:lang, setLocale: (language) => {
        setLang(language)
        router.push(router.pathname, router.pathname, { locale:language })
    }}}>{children}</LocaleContext.Provider>
}
