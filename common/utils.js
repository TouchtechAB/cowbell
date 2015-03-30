trimWhitespace = function (string) {
    if (!string) return null;
    return string.replace(/^\s*|\s*$/g, "");
};

capitalizeString = function (string) {
    if (!string) return null;
    return string.charAt(0).toUpperCase() + string.substring(1);
};

stringify = function(value) {

    if(value === undefined){
        return;
    }

    return value.toString();
};