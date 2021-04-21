function* generateBoolSeq(size = 3) {
    for (let i = 0, max = 2 ** size; i < max; i++) {
        const str = i.toString(2).padStart(size, 0);
        yield str.split('').map(val => val === '1');
    }
}

const table1 = Array.from(generateBoolSeq(4))
    .map(([A, B, C, D]) => ({
        A, B, C, D,
        'A || (B && C && D)': A || (B && C && D),
        'A || B && C && D': A || B && C && D,
        '(A || B && C) && D': (A || B && C) && D,
        '(A || B) && C && D': (A || B) && C && D
    }));

console.table(table1);