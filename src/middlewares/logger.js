export const logger = (store) => (next) => (action) => {
    console.log('action: ' + JSON.stringify(action));
    next(action);
}