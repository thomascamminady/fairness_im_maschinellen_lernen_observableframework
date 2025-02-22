def make_normal_items(category: int, pays_back: bool, n: int, mean: float, std: float):
    """
    Replicates the 'makeNormalItems' approach from the JavaScript code:
    - Distributes 'n' items across scores [0..99] according
      to the probability density of a normal distribution
      with given mean and std.
    - category: integer (like 0 or 1), to differentiate groups
    - pays_back: boolean, whether this group represents "pays back" or not
    - n: total count of items
    - mean, std: parameters of the normal distribution to approximate
    """
    import math

    items = []
    error_accumulator = 0.0
    for score in range(100):
        # Probability of 'score' under the normal, adjusted by 'n':
        p = math.exp(-((score - mean) ** 2) / (2.0 * (std ** 2)))
        pdf_value = p / (std * math.sqrt(2.0 * math.pi))

        # Weighted count for this score:
        e = error_accumulator + n * pdf_value
        m = int(math.floor(e))
        error_accumulator = e - m

        # Create m items with this exact score value:
        for _ in range(m):
            items.append({"category": category, "pays_back": pays_back, "score": score})

    return items

def generate_js_style_distributions():
    """
    Creates comparison datasets similar to the JavaScript code examples,
    with two groups (categories) having different distributions.
    """
    import polars as pl
    
    # Parameters from JS for comparison examples
    s0, s1 = 10, 10  # standard deviations
    d0, d1 = 8, 12   # differences from means
    m0, m1 = 55, 45  # means of overall distributions
    
    # Create comparison examples matching JS parameters
    comparison_items = (
        # Category 0: (m0 ± d0, s0)
        make_normal_items(category=0, pays_back=True,  n=100, mean=m0 + d0, std=s0) +
        make_normal_items(category=0, pays_back=False, n=100, mean=m0 - d0, std=s0) +
        # Category 1: (m1 ± d1, s1)
        make_normal_items(category=1, pays_back=True,  n=100, mean=m1 + d1, std=s1) +
        make_normal_items(category=1, pays_back=False, n=100, mean=m1 - d1, std=s1)
    )
    
    # Convert to DataFrame and add the required columns
    df = (pl.DataFrame(comparison_items)
          .with_columns([
              pl.when(pl.col("category") == 0)
                .then(pl.lit("Jung"))
                .otherwise(pl.lit("Alt"))
                .alias("age"),
              pl.when(pl.col("pays_back").not_())
                .then(pl.lit("Zahlt nicht zurück"))
                .otherwise(pl.lit("Zahlt zurück"))
                .alias("status")
          ])
          .select(["score", "age", "pays_back", "status"]))

    # Write single output file
    df.write_csv("../data/user/distribution.csv")

# If you want to run this standalone:
if __name__ == "__main__":
    generate_js_style_distributions()