const random = require('random')

const getMapWithRandomNumbers = (q_numbers=5000000) => {
    const result = new Map();

    for (let i = 0; i < q_numbers; i++) {
        const number = random.int((min = 1), (max = 1000));

        if (result[number]) result[number]++;
        else result[number] = 1;
    }
    return result;
};

process.on("message", (msg) => {
    const q_numbers = process.argv[2]
    const result = getMapWithRandomNumbers(q_numbers);
    process.send(result);
});
