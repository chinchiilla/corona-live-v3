import { useEffect, useState } from "react";

export const useBrowserCheck = () => {
    const [browser, setBrowser] = useState(null);
    useEffect(() => {
        var _broswer: any = "otherbrowser";
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            _broswer = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
        }
        setBrowser(_broswer);
    }, []);
    return browser;
};
