export const endTest = (clickTimes = [], startTime = 0.0) => {
    const duration = (new Date().getTime() - startTime) / 1000;
    const seconds = Math.ceil(duration);

    // Bucket into per-second counts
    const cpsArray = Array(seconds).fill(0);
    clickTimes.forEach(t => {
        const secIndex = Math.floor((t - startTime) / 1000);
        cpsArray[secIndex] += 1;
    });
    return cpsArray;
};