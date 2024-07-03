export const fillImage = (images: any) => {
    return images?.[1]?.url || images?.[0]?.url || 'https://cdn-icons-png.flaticon.com/512/727/727239.png';
};
