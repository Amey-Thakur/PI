// Name: monte_carlo.rs
// Purpose: Estimate pi by throwing random darts at a quarter circle.
// Description: Darts land uniformly in the unit square. The fraction landing
//   inside the quarter circle x^2 + y^2 <= 1 approaches pi/4, so four times that
//   fraction estimates pi. A tiny xorshift64 PRNG seeded with a fixed value keeps
//   the run reproducible: same seed, same darts, same answer every time.
// Usage: rustc -O monte_carlo.rs then run the binary (monte_carlo.exe on Windows).
// Tech Stack: Rust 2021, standard library only.
// License: MIT
// Author: Amey Thakur (https://github.com/Amey-Thakur)
// Date: 2026-07-18

use std::f64::consts::PI;

const SEED: u64 = 31415;
const DARTS: u64 = 10_000_000;

// Marsaglia's xorshift64. Small, fast, and good enough for a dartboard. The seed
// must be nonzero, which 31415 is, so the fixed seed makes the output repeatable.
struct XorShift64 {
    state: u64,
}

impl XorShift64 {
    fn new(seed: u64) -> Self {
        XorShift64 { state: seed }
    }

    fn next_u64(&mut self) -> u64 {
        let mut x = self.state;
        x ^= x << 13;
        x ^= x >> 7;
        x ^= x << 17;
        self.state = x;
        x
    }

    // Top 53 bits scaled into [0, 1). That is exactly the number of bits an f64
    // mantissa can hold, so every value is representable without rounding games.
    fn next_f64(&mut self) -> f64 {
        (self.next_u64() >> 11) as f64 * (1.0 / 9_007_199_254_740_992.0)
    }
}

fn main() {
    let mut rng = XorShift64::new(SEED);
    let mut inside: u64 = 0;

    for _ in 0..DARTS {
        let x = rng.next_f64();
        let y = rng.next_f64();
        if x * x + y * y <= 1.0 {
            inside += 1;
        }
    }

    let estimate = 4.0 * inside as f64 / DARTS as f64;
    let error = (estimate - PI).abs();

    println!("Monte Carlo estimate of pi");
    println!();
    println!("seed          : {}", SEED);
    println!("darts thrown  : {}", DARTS);
    println!("darts inside  : {}", inside);
    println!();
    println!("pi estimate   : {:.10}", estimate);
    println!("reference pi  : {:.10}", PI);
    println!("abs error     : {:.3e}", error);
    println!();

    // The error of a Monte Carlo estimate shrinks like 1/sqrt(darts), so ten
    // million darts is worth only two or three digits. Doubling the accuracy
    // costs four times the darts. It is a fine picture of the method, not a way
    // to chase precision.
    println!("Note: accuracy scales as 1/sqrt(darts), so more digits get expensive fast.");
}
