export function hasChildren(item) {
    const { Items: children } = item;
    if (children === undefined) {
        return false;
    }

    if (children.constructor !== Object) {
        return false;
    }

    if (children.length === 0) {
        return false;
    }

    return true;
}
