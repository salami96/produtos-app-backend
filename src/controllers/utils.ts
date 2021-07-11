export function removePopulatedFields(obj: any) {
    let obj2 = Object.keys(obj).map(key => {
        if (key !== '_id') {
            return key;
            if ((typeof obj[key]) == 'object' && obj[key]) {
                if ('_id' in obj[key]) {
                    obj[key] = obj[key]._id;
                } else {
                    obj[key].forEach(k => {
                        if ('_id' in k) {
                            k = k._id;
                        }
                    });
                }
            } else {
                return obj[key];
            }
        } else {
            return obj[key];
        }
    });
    console.log(obj.address)
    console.log(obj2)
}