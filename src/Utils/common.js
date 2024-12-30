export const randId = () => "id" + Math.random().toString(16).slice(2)
export function generateRandomHex () {
    let hex = "#";
    for (let i = 0; i < 6; i++) {
        const randomValue = Math.floor(Math.random() * 16); // Generate a random number from 0 to 15
        hex += randomValue.toString(16); // Convert to hex and append
    }
    return hex;
}
export const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0
}