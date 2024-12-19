# %%
import numpy as np
import polars as pl
from randomuser import RandomUser

# %%
# scores = ["A", "B", "C", "D", "E", "F"]
scores = list(range(1, 11))
scores  =[_*10 for _ in scores]
default_prob = {i: np.exp(-i / 10) / 2 for i in scores}
N = 100

df_true = (
    pl.DataFrame(
        {
            "name": [
                u.get_full_name()
                for u in RandomUser.generate_users(N, {"nat": "de"})
            ],
            "score": [np.random.choice(scores) for _ in range(N)],
        }
    )
    .with_columns(
        defaults=pl.col("score").map_elements(
            lambda s: np.random.rand() < default_prob[s], return_dtype=pl.Int64
        )
    )
    .with_columns(
        type=pl.when(pl.col("defaults") == 1)
        .then(pl.lit("Zahlt nicht zurück"))
        .otherwise(pl.lit("Zahlt zurück"))
        .alias("status")
    )
)


df_fake_1 = (
    pl.DataFrame(
        {
            "name": [
                u.get_full_name()
                for u in RandomUser.generate_users(N, {"nat": "de"})
            ],
            "score": [np.random.choice(scores) for _ in range(N)],
        }
    )
    .with_columns(
        defaults=pl.col("score").map_elements(
            lambda s: np.random.rand() < default_prob[s], return_dtype=pl.Int64
        )
    )
    .with_columns(
        type=pl.when(pl.col("defaults") == 1)
        .then(pl.lit("Zahlt nicht zurück"))
        .otherwise(pl.lit("Zahlt zurück"))
        .alias("status")
    )
)


df_fake_2 = (
    pl.DataFrame(
        {
            "name": [
                u.get_full_name()
                for u in RandomUser.generate_users(N, {"nat": "de"})
            ],
            "score": [np.random.choice(scores) for _ in range(N)],
        }
    )
    .with_columns(
        defaults=pl.col("score").map_elements(
            lambda s: np.random.rand() < default_prob[s], return_dtype=pl.Int64
        )
    )
    .with_columns(
        type=pl.when(pl.col("defaults") == 1)
        .then(pl.lit("Zahlt nicht zurück"))
        .otherwise(pl.lit("Zahlt zurück"))
        .alias("status")
    )
)

df_true.write_csv("../data/user/random_user_1.csv")
df_fake_1.write_csv("../data/user/random_user_2.csv")
df_fake_2.write_csv("../data/user/random_user_3.csv")

# %%



