# %%
import altair as alt
import numpy as np
import polars as pl

# %%
# %%
n = 500
std = 8

mu1_yes = 50
mu1_not = 40

mu2_yes = 60
mu2_not = 50


df = (
    pl.concat(
        [
            pl.DataFrame(
                {
                    "score": np.random.randn(n) * std + mu1_yes,
                    "age": ["Jung"] * n,
                    "pays_back": [True] * n,
                }
            ),
            pl.DataFrame(
                {
                    "score": np.random.randn(n) * std + mu1_not,
                    "age": ["Jung"] * n,
                    "pays_back": [False] * n,
                }
            ),
            pl.DataFrame(
                {
                    "score": np.random.randn(n) * std + mu2_yes,
                    "age": ["Alt"] * n,
                    "pays_back": [True] * n,
                }
            ),
            pl.DataFrame(
                {
                    "score": np.random.randn(n) * std + mu2_not,
                    "age": ["Alt"] * n,
                    "pays_back": [False] * n,
                }
            ),
        ]
    )
    .with_columns(
        type=pl.when(pl.col("pays_back").not_())
        .then(pl.lit("Zahlt nicht zurück"))
        .otherwise(pl.lit("Zahlt zurück"))
        .alias("status")
    )
    .with_columns(pl.col("score").cast(pl.Int64))
    .filter(pl.col("score").is_between(0, 100))
)

df.write_csv("../data/user/distribution.csv")

# %%
base = alt.Chart(df).transform_window(id="rank()", groupby=["score"])
(
    base.mark_point(filled=True, opacity=1, size=30).encode(
        x=alt.X("score:Q").scale(domain=[-4, 104]).title("Score"),
        y=alt.Y("id:O").axis(None).sort("descending"),
        color=alt.Color("age:N"),
        opacity=alt.Opacity("pays_back:N", scale=alt.Scale(range=[0.4, 1])),
    )
).properties(width=600, height=400)

# %%
base = alt.Chart(df).transform_window(id="rank()", groupby=["score", "age"])
(
    base.mark_point(filled=True, opacity=1, size=30).encode(
        x=alt.X("score:Q").scale(domain=[-4, 104]).title("Score"),
        y=alt.Y("id:O").axis(None).sort("descending"),
        color=alt.Color("age:N"),
        opacity=alt.Opacity("pays_back:N", scale=alt.Scale(range=[0.4, 1])),
        row="age:N",
    )
).properties(width=600, height=400)

# %%
