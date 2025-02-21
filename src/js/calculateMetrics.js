export function calculateMetrics(data, ageGroup, threshold) {
    let filteredData = data
    if (ageGroup != "") {
        filteredData = data.filter((d) => d.age === ageGroup)
    }
    const grp = filteredData
        .reduce((acc, item) => {
            const type = item.type;
            const score = item.score;
            if (!acc[type]) {
                acc[type] = {
                    belowthreshold: 0,
                    abovethreshold: 0
                };
            }
            if (score < threshold) {
                acc[type].belowthreshold += 1;
            } else {
                acc[type].abovethreshold += 1;
            }
            return acc;
        }, {});

    const n_true_positive = grp["Zahlt zurück"]["abovethreshold"];
    const n_false_positive = grp["Zahlt nicht zurück"]["abovethreshold"];
    const n_false_negative = grp["Zahlt zurück"]["belowthreshold"];
    const n_true_negative = grp["Zahlt nicht zurück"]["belowthreshold"];

    const total = n_true_positive + n_false_positive + n_false_negative + n_true_negative;
    const total_positive = n_true_positive + n_false_negative;

    const precision = (
        (100 * n_true_positive) /
        (n_true_positive + n_false_positive + 0.0000000001)
    ).toFixed(0);

    const recall = (
        (100 * n_true_positive) /
        (n_true_positive + n_false_negative)
    ).toFixed(0);

    const positive_rate = (((n_true_positive + n_true_negative) / total) * 100).toFixed(0);
    const true_positive_rate = (((n_true_positive) / total_positive) * 100).toFixed(0);
    const gewinn = 250 * grp["Zahlt zurück"]["abovethreshold"] - 1000 * grp["Zahlt nicht zurück"]["abovethreshold"]
    return {
        grp,
        n_true_positive,
        n_false_positive,
        n_false_negative,
        n_true_negative,
        total,
        total_positive,
        precision,
        recall,
        positive_rate,
        true_positive_rate,
        gewinn
    };
}
