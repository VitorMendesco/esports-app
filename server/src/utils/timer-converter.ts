export function hoursToMinutes(hourString: string) {
    // convert
    const [hours, minutes]: number[] = hourString.split(':').map(Number);
    
    // sum rest
    const minutesAmount: number = (hours * 60) + minutes;

    return minutesAmount;
}

export function minutesToHours(minutesAmount: number) {
    // convert
    let hours = String(Math.floor(minutesAmount / 60));
    let minutes = String(minutesAmount % 60);

    // adapt if 0
    hours = hours.padStart(2, '0');
    minutes = minutes.padStart(2, '0');

    // build
    const hourString: string = [hours, minutes].join(':');
    
    return (hourString);
}