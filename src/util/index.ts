export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const formatter = new Intl.DateTimeFormat('en-En', {
    dateStyle: 'full',
    timeStyle: 'short',
});

export const shortFormatter = new Intl.DateTimeFormat('en-En', {
    dateStyle: 'medium',
})

