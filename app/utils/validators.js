export const required = value => ((value || String(value) === '0') ? undefined : 'This field is required');

export const sameValue = (val1, val2, field) => (val1 === val2 ? undefined : `${field} are not the same`);
