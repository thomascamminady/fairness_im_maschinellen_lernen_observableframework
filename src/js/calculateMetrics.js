import * as aq from "npm:arquero";

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

    const eps = 1e-9;
    const precision = Math.round(((n_true_positive + eps) / (n_true_positive + n_false_positive + eps)) * 100);
    const recall = Math.round((n_true_positive / (n_true_positive + n_false_negative)) * 100);
    const accuracy = Math.round(((n_true_positive + n_true_negative) / (n_true_positive + n_false_positive + n_false_negative + n_true_negative)) * 100);
    const positive_rate = Math.round(((n_true_positive + n_false_positive) / (n_true_positive + n_false_positive + n_false_negative + n_true_negative)) * 100);
    const true_positive_rate = recall;
    //const gewinn = 250 * n_true_positive - 1000 * n_false_positive
    const gewinn = 300 * n_true_positive - 700 * n_false_positive
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
        gewinn,
        accuracy
    };
}



export function calculateAllMetrics(data, ageGroup) {
    // thresholds are all numbers from 0 to 100
    let thresholds = Array.from({ length: 101 }, (_, i) => i);

    let metrics = thresholds.map((threshold) => calculateMetrics(data, ageGroup, threshold))

    //drop the grp key
    metrics = metrics.map((m) => {
        delete m.grp
        return m
    })

    // from list of objects to to object of lists
    metrics = metrics.reduce((acc, item) => {
        Object.keys(item).forEach((key) => {
            if (!acc[key]) {
                acc[key] = []
            }
            acc[key].push(item[key])
        })
        return acc
    }
        , {})

    // cast  entries in all lists to numbers if possible
    Object.keys(metrics).forEach((key) => {
        metrics[key] = metrics[key].map((v) => {
            if (isNaN(v)) {
                return v
            } else {
                return Number(v)
            }
        })
    })

    // add one row that is the threshold
    metrics["threshold"] = thresholds
    metrics["ageGroup"] = Array.from({ length: 101 }, (_, i) => ageGroup);
    let df = aq.table(metrics)

    // get all columns other than threshold and ageGroup
    // let columns = df.columnNames().filter((c) => c != "threshold" && c != "ageGroup")
    let columns = ["precision",
        "recall",
        "positive_rate",
        "true_positive_rate",
        "accuracy",
        "gewinn"]
    return df.select(["precision",
        "recall",
        "positive_rate",
        "true_positive_rate",
        "accuracy", "threshold", "ageGroup", "gewinn"]).fold(columns, { as: ["metric", "value"] })
}
