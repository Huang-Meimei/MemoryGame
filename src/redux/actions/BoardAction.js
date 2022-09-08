export const generateAction = (payload)=>({
    type:"generate",
    payload
});

export const storeFlippedAction = (data)=>({
    type:"storeFlipped",
    data
})

export const matchAction = ()=>({
    type:"match"
})