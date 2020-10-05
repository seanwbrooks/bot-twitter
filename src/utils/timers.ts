export const query = (hr : number) => {
    if (hr >= 0 && hr < 6)
        return "financial independence";
    if (hr >= 6 && hr < 12)
        return "javascript";
    if (hr >= 12 && hr < 18)
        return "personal finance";
    if (hr >= 18 && hr < 24)
        return "real estate";
    else 
        return "codeNewbie";
}