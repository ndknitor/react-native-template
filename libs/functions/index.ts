export function toFormData(obj: any, formData = new FormData(), namespace = '') {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const property = obj[key];
            if (property instanceof File) {
                formData.append(namespace + key, property);
            } else if (Array.isArray(property)) {
                property.forEach((item, index) => {
                    const itemNamespace = `${namespace + key}[${index}].`;
                    if (typeof item === 'object' && item !== null) {
                        toFormData(item, formData, itemNamespace);
                    } else {
                        formData.append(itemNamespace, item);
                    }
                });
            } else if (typeof property === 'object' && property !== null) {
                toFormData(property, formData, namespace + key + '.');
            } else {
                formData.append(namespace + key, property);
            }
        }
    }
    return formData;
}

export function getPropertyName(propertyFunction: Function): string {
    const token = propertyFunction.toString().split('.');
    return token[token.length - 1];
}

export function toQueryString(obj: any) {
    const url = new URLSearchParams();
    for (const key in obj)
    {
        if (key !== undefined && key !== null) {
            url.append(key, obj[key]);
        }
    }
    return `?${url.toString()}`;
}

export function toJsonString(obj: Object) {
    return JSON.stringify(obj);
}

export function toType<T>(str: string) {
    return JSON.parse(str) as T;
}

export function formatNumber(num: number | undefined) {
    if (num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    }
    return "";
}

export function getMaxPage(limit: number, total: number) {
    return Math.ceil(total / limit);
}

export function range(start: number, end: number) {
    return Array.from(Array(end - start + 1).keys()).map(x => x + start);
}

export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function truncateString(str: string | undefined, wordCount: number): string {
    if (str) {
        const words = str.split(" ");
        if (words.length <= wordCount) {
            return str;
        } else {
            return words.slice(0, wordCount).join(" ") + "...";
        }
    }
    return "";
}
export function randomInt(min: number, max: number): number {
    // Ensure the minimum and maximum values are integers
    min = Math.floor(min);
    max = Math.floor(max);

    // Generate a random number between 0 and (max - min)
    const randomNumber = Math.floor(Math.random() * (max - min + 1));

    // Return the random number plus the minimum value
    return randomNumber + min;
}
