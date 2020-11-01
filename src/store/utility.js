export const upObject = (oldObject, upProp) => {
    return {
        ...oldObject,
        ...upProp
    };
};