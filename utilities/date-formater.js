"use strict";

/** @module utilities/date-formater */

module.exports = {
    /**
     * Converts a date object to a string for the specified format.
     *
     * @param {Date} [date=new Date()] - the date object to convert to string
     * @param {number} [formatCode=126] - formats the date and time string:\n
     * 1 (file format) === YYYY-mm-dd or YYYY-mm-ddTHH:MM:SS.mmm --- 
     * 2 (12 hour time file format) === H:MM AM/PM --- 
     * 100 === mon dd YYYY or mon dd YYYY HH:MM:SS AM/PM --- 
     * 101 === mm/dd/YYYY --- 
     * 102 === YYYY.mm.dd --- 
     * 103 === dd/mm/YYYY --- 
     * 104 === dd.mm.YYYY --- 
     * 105 === dd-mm-YYYY --- 
     * 106 === dd mon YYYY --- 
     * 107 === mon dd, YYYY --- 
     * 108 === HH:MM:SS --- 
     * 109 === mon dd YYYY or mon dd YYYY HH:MM:SS:mmm AM/PM --- 
     * 110 === mm-dd-YYYY --- 
     * 111 === YYYY/mm/dd --- 
     * 112 === YYYYmmdd --- 
     * 113 === dd mon YYYY or dd mon YYYY HH:MM:SS:mmm --- 
     * 114 === HH:MM:SS:mmm --- 
     * 120 === YYYY-mm-dd or YYYY-mm-dd HH:MM:SS --- 
     * 121 === YYYY-mm-dd or YYYY-mm-dd HH:MM:SS.mmm --- 
     * 126 === YYYY-mm-dd or YYYY-mm-ddTHH:MM:SS.mmm --- 
     * 127 === YYYY-mm-dd or YYYY-mm-ddTHH:MM:SS.mmmZ --- 
     * 130 === dd mm YYYY or dd mm YYYY HH:MM:SS:mmm --- 
     * 131 === dd/mm/YYYY or dd/mm/YYYY HH:MM:SS:mmm --- 
     * @param {boolean} [withTime=false] - whether to include time for the formats that support it.
     * @return {string} - the returned date string.
     */
    toString: (date = new Date(), formatCode = 126, withTime = false) => {
        switch (formatCode) {
            case 1:
                if (withTime === false) {
                    return (date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2));
                } else {
                    return (date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + "T" + 
                        ("0" + date.getHours()).slice(-2) + "_" + ("0" + date.getMinutes()).slice(-2) + "_" + ("0" + date.getSeconds()).slice(-2) +
                        "_" + ("00" + date.getMilliseconds()).slice(-3));
                }
                break;
            case 2:
                return (date.getHours().toString() === "0" ? "12" : (date.getHours() > 12 ? (date.getHours() - 12).toString() : date.getHours().toString()) + ":" + ("0" + date.getMinutes()).slice(-2) + " " + (date.getHours() >= 12 ? "PM" : "AM")).toString();
                break;
            case 100:
                if (withTime === false) {
                    return (date.toDateString().split(" ")[1] + " " + ("0" + date.getDate()).slice(-2) + " " + date.getFullYear());
                } else {
                    return (date.toDateString().split(" ")[1] + " " + ("0" + date.getDate()).slice(-2) + " " + date.getFullYear() + " " + 
                        ("0" + (date.getHours() === 0) ? "12" : date.getHours() > 12 ? (date.getHours() - 12).toString() : date.getHours().toString()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + (date.getHours() >= 12 ? "PM" : "AM"));
                }
                break;
            case 101:
                return (("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + "/" + date.getFullYear());
                break;
            case 102:
                return (date.getFullYear() + "." + ("0" + (date.getMonth() + 1)).slice(-2) + "." + ("0" + date.getDate()).slice(-2));
                break;
            case 103:
                return (("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear());
                break;
            case 104:
                return (("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth() + 1)).slice(-2) + "." + date.getFullYear());
                break;
            case 105:
                return (("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear());
                break;
            case 106:
                return (("0" + date.getDate()).slice(-2) + " " + date.toDateString().split(" ")[1] + " " + date.getFullYear());
                break;
            case 107:
                return (date.toDateString().split(" ")[1] + " " + ("0" + date.getDate()).slice(-2) + ", " + date.getFullYear());
                break;
            case 108:
                return (("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2));
                break;
            case 109:
                if (withTime === false) {
                    return (date.toDateString().split(" ")[1] + " " + ("0" + date.getDate()).slice(-2) + " " + date.getFullYear());
                } else {
                    return (date.toDateString().split(" ")[1] + " " + ("0" + date.getDate()).slice(-2) + " " + date.getFullYear() + " " + 
                        ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2) +
                        ":" + ("00" + date.getMilliseconds()).slice(-3) + (date.getHours() >= 12) ? "PM" : "AM");
                }
                break;
            case 110:
                return (("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + "-" + date.getFullYear());
                break;
            case 111:
                return (date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2));
                break;
            case 112:
                return (date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2));
                break;
            case 113:
                if (withTime === false) {
                    return (("0" + date.getDate()).slice(-2) + " " + date.toDateString().split(" ")[1] + " " + date.getFullYear());
                } else {
                    return (("0" + date.getDate()).slice(-2) + " " + date.toDateString().split(" ")[1] + " " + date.getFullYear() + " " + 
                        ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2) +
                        ":" + ("00" + date.getMilliseconds()).slice(-3));
                }
                break;
            case 114:
                return (("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2) +
                    ":" + ("00" + date.getMilliseconds()).slice(-3));
                break;
            case 120:
                if (withTime === false) {
                    return (date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2));
                } else {
                    return (date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + " " + 
                        ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2));
                }
                break;
            case 121:
                if (withTime === false) {
                    return (date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2));
                } else {
                    return (date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + " " + 
                        ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2) +
                        "." + ("00" + date.getMilliseconds()).slice(-3));
                }
                break;
            case 126:
                if (withTime === false) {
                    return (date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2));
                } else {
                    return (date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + "T" + 
                        ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2) +
                        "." + ("00" + date.getMilliseconds()).slice(-3));
                }
                break;
            case 127:
                if (withTime === false) {
                    return (date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2));
                } else {
                    return (date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + "T" + 
                        ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2) +
                        "." + ("00" + date.getMilliseconds()).slice(-3) + "Z");
                }
                break;
            case 130:
                if (withTime === false) {
                    return (("0" + date.getDate()).slice(-2) + " " + date.toDateString().split(" ")[1] + " " + date.getFullYear());
                } else {
                    return (("0" + date.getDate()).slice(-2) + " " + date.toDateString().split(" ")[1] + " " + date.getFullYear() + " " + 
                    ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2) +
                    ":" + ("00" + date.getMilliseconds()).slice(-3) + (date.getHours() >= 12) ? "PM" : "AM");
                }
                break;
            case 131:
                if (withTime === false) {
                    return (("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear());
                } else {
                    return (("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " " + 
                    ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2) +
                    ":" + ("00" + date.getMilliseconds()).slice(-3) + (date.getHours() >= 12) ? "PM" : "AM");
                }
                break;
        };
    }
};
