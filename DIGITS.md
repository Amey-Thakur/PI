<!--
  Name: DIGITS.md
  Purpose: The number itself, presented properly.
  Description: The first thousand decimals of pi laid out for human eyes,
    with position labels, landmark positions, and pointers to the larger
    verified datasets. Every digit and every position on this page comes
    from data/pi-1000000.txt, which two independent algorithms agree on.
  License: MIT
  Author: Amey Thakur (https://github.com/Amey-Thakur)
  Date: 2026-07-18
-->

# The Digits

This page is π to one thousand decimal places, arranged fifty to a row,
ten to a group. The row labels count decimal positions, so the digit at
position 762 is exactly where the label says it is. For deeper reading,
the [data folder](data/README.md) carries the same digits to one million
places, verified by two unrelated algorithms that agree on every one.

## π to 1,000 decimals

```
3.

1415926535 8979323846 2643383279 5028841971 6939937510      1 to 50
5820974944 5923078164 0628620899 8628034825 3421170679     51 to 100
8214808651 3282306647 0938446095 5058223172 5359408128    101 to 150
4811174502 8410270193 8521105559 6446229489 5493038196    151 to 200
4428810975 6659334461 2847564823 3786783165 2712019091    201 to 250
4564856692 3460348610 4543266482 1339360726 0249141273    251 to 300
7245870066 0631558817 4881520920 9628292540 9171536436    301 to 350
7892590360 0113305305 4882046652 1384146951 9415116094    351 to 400
3305727036 5759591953 0921861173 8193261179 3105118548    401 to 450
0744623799 6274956735 1885752724 8912279381 8301194912    451 to 500
9833673362 4406566430 8602139494 6395224737 1907021798    501 to 550
6094370277 0539217176 2931767523 8467481846 7669405132    551 to 600
0005681271 4526356082 7785771342 7577896091 7363717872    601 to 650
1468440901 2249534301 4654958537 1050792279 6892589235    651 to 700
4201995611 2129021960 8640344181 5981362977 4771309960    701 to 750
5187072113 4999999837 2978049951 0597317328 1609631859    751 to 800
5024459455 3469083026 4252230825 3344685035 2619311881    801 to 850
7101000313 7838752886 5875332083 8142061717 7669147303    851 to 900
5982534904 2875546873 1159562863 8823537875 9375195778    901 to 950
1857780532 1712268066 1300192787 6611195909 2164201989    951 to 1000
```

## Landmarks

Positions worth knowing, each verified against the million-digit dataset:

| Position | What lives there |
|---:|---|
| 1 | The famous opening: `1415926535` |
| 32 | The first zero. Nine digits manage to appear before it |
| 762 | The Feynman point: `999999`, six nines in a row, absurdly early |
| 33,789 | `271828`, the opening digits of e, paying a visit |
| 49,702 | `12345` |
| 176,451 | `314159`, π quoting itself |

In the first thousand decimals, 1 is the most frequent digit at 116
appearances, while 0 and 4 tie for rarest at 93. By the millionth decimal
the ten digits have pulled within 0.1 percent of a perfectly even split;
the full census is in [data/digit-frequency.json](data/digit-frequency.json).

## Going deeper

| File | Decimals | Size |
|---|---:|---:|
| [data/pi-1000.txt](data/pi-1000.txt) | 1,000 | 1 KB |
| [data/pi-10000.txt](data/pi-10000.txt) | 10,000 | 10 KB |
| [data/pi-100000.txt](data/pi-100000.txt) | 100,000 | 99 KB |
| [data/pi-1000000.txt](data/pi-1000000.txt) | 1,000,000 | 987 KB |

How these were generated and proven is documented in
[data/README.md](data/README.md). To test how many of them you can hold in
your head, the [Digit Trainer](https://amey-thakur.github.io/PI/#labs) is
waiting.
