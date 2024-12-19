# %%
import altair as alt
import numpy as np
import polars as pl

# %%
n = 1000
std1 = 10
mu1 = 50

std2 = 10
mu2 = 70

df = (
    pl.concat(
        [
            pl.DataFrame(
                {"score": np.random.randn(n) * std1 + mu1, "age": ["young"] * n}
            ),
            pl.DataFrame(
                {"score": np.random.randn(n) * std2 + mu2, "age": ["old"] * n}
            ),
        ]
    )
    .with_columns(
        pays_back=pl.col("score").map_elements(
            lambda s: True if np.random.rand() < s / 100 else False,
            return_dtype=pl.Boolean,
        )
    )
    .with_columns(score=pl.col("score").round())
).with_columns(
        type=pl.when(pl.col("pays_back") ==False)
        .then(pl.lit("Zahlt nicht zurück"))
        .otherwise(pl.lit("Zahlt zurück"))
        .alias("status")
    ).with_columns(pl.col("score").cast(pl.Int64)).filter(pl.col("score").is_between(0,100))



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



