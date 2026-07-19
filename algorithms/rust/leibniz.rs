// Name: leibniz.rs
// Purpose: Approximate pi with the Leibniz alternating series and show it crawl.
// Description: The Leibniz series says pi/4 = 1 - 1/3 + 1/5 - 1/7 + ... It is
//   correct but slow: the error shrinks about as 1/terms, so tenfold more work
//   buys only one more digit. The table walks the count up by powers of ten so
//   the crawl is plain, and the closing note is honest about the f64 wall.
// Usage: rustc -O leibniz.rs then run the binary (leibniz.exe on Windows).
// Tech Stack: Rust 2021, standard library only.
// License: MIT
// Author: Amey Thakur (https://github.com/Amey-Thakur)
// Date: 2026-07-18

use std::f64::consts::PI;

// Powers of ten so the "ten times the work for one more digit" pattern reads
// straight off the rows.
const CHECKPOINTS: [u64; 8] = [
    10,
    100,
    1_000,
    10_000,
    100_000,
    1_000_000,
    10_000_000,
    100_000_000,
];

fn main() {
    let target = CHECKPOINTS[CHECKPOINTS.len() - 1];

    println!("Leibniz series for pi:  pi/4 = 1 - 1/3 + 1/5 - 1/7 + ...");
    println!();
    println!("{:>12}  {:>18}  {:>12}", "terms", "pi estimate", "abs error");
    println!("{:>12}  {:>18}  {:>12}", "------------", "------------------", "------------");

    let mut sum = 0.0f64;
    let mut idx = 0usize;

    for n in 0..target {

        // Denominator runs 1, 3, 5, 7, ...; the sign flips every term.
        let term = 1.0 / (2.0 * n as f64 + 1.0);
        if n % 2 == 0 {
            sum += term;
        } else {
            sum -= term;
        }

        if idx < CHECKPOINTS.len() && n + 1 == CHECKPOINTS[idx] {
            let estimate = 4.0 * sum;
            let error = (estimate - PI).abs();
            println!("{:>12}  {:>18.15}  {:>12.3e}", CHECKPOINTS[idx], estimate, error);
            idx += 1;
        }
    }

    println!();
    println!("reference pi = {:.15}", PI);
    println!();

    // The honest ceiling: an f64 holds about 15 to 16 significant digits, but
    // Leibniz would need on the order of 10^15 terms to reach that wall. You run
    // out of patience long before the arithmetic runs out of precision. The last
    // row above, 10^8 terms, is worth only about 8 correct digits.
    println!("Note: f64 carries ~15-16 digits, but Leibniz would need ~10^15 terms");
    println!("to earn them. This series is a lesson in slowness, not a way to work.");
}
