export const finance_time = (hr : number, min : number) => {
    return (hr >= 22 && hr < 23 && min > 55 && min < 56)
}

export const javascript_time = (hr : number, min : number) => {
    return (hr >= 23 && hr < 24 && min > 0 && min < 3)
}