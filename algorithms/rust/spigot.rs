// Name: spigot.rs
// Purpose: Print the first 1000 digits of pi with the Rabinowitz-Wagon spigot.
// Description: A spigot algorithm drips out digits one at a time using only
//   integer arithmetic, no big-float library and no long division of the whole
//   number. This is the Rabinowitz-Wagon method: pi in a mixed radix of
//   2/3, 4/5, 6/7, ... The code checks its own first 50 digits against the known
//   value before printing, so a wrong build fails loudly instead of lying.
// Usage: rustc -O spigot.rs then run the binary (spigot.exe on Windows).
// Tech Stack: Rust 2021, standard library only.
// License: MIT
// Author: Amey Thakur (https://github.com/Amey-Thakur)
// Date: 2026-07-18

// How many digits to show, counting the leading 3 as digit one.
const DIGITS: usize = 1000;

// A handful of extra digits are computed and thrown away. The spigot can hold a
// pending run of nines near the boundary, and the guard keeps that carry from
// touching the digits we keep.
const GUARD: usize = 32;

// The first 50 digits of pi, the yardstick the run measures itself against.
const KNOWN_50: &str = "31415926535897932384626433832795028841971693993751";

fn generate(count: usize) -> Vec<u8> {

    // The array length 10*count/3 + 1 is the classic Rabinowitz-Wagon sizing: it
    // is just enough base-10 room to pin down `count` digits.
    let len = 10 * count / 3 + 1;
    let mut a = vec![2i64; len];

    let mut digits: Vec<u8> = Vec::with_capacity(count + 1);
    let mut nines: usize = 0;
    let mut predigit: i64 = 0;

    for j in 0..count {

        // Sweep from the far end back, carrying the base conversion inward. Each
        // column i works in radix (2i - 1) over numerator 2i.
        let mut q: i64 = 0;
        for i in (1..=len).rev() {
            let x = 10 * a[i - 1] + q * i as i64;
            a[i - 1] = x % (2 * i as i64 - 1);
            q = x / (2 * i as i64 - 1);
        }
        a[0] = q % 10;
        q /= 10;

        // q is the next digit unless it is 9 (might carry) or 10 (does carry).
        // Nines are buffered until the ambiguity resolves.
        match q {
            9 => {
                nines += 1;
            }
            10 => {
                // The carry ripples: the held digit ticks up and the buffered
                // nines all flip to zeros.
                digits.push((predigit + 1) as u8);
                for _ in 0..nines {
                    digits.push(0);
                }
                predigit = 0;
                nines = 0;
            }
            _ => {
                // A plain digit settles everything: emit the held digit, then the
                // buffered nines as real nines, and hold the new one.
                if j > 0 {
                    digits.push(predigit as u8);
                }
                for _ in 0..nines {
                    digits.push(9);
                }
                predigit = q;
                nines = 0;
            }
        }
    }

    // Flush whatever is still held after the last pass.
    digits.push(predigit as u8);
    for _ in 0..nines {
        digits.push(9);
    }

    digits
}

fn main() {

    let digits = generate(DIGITS + GUARD);

    // Self-check before a single digit is printed: build the first 50 as a string
    // and compare to the known value. A mismatch means the algorithm or the build
    // is broken, and it is better to stop than to print convincing nonsense.
    let first_50: String = digits.iter().take(50).map(|d| (b'0' + d) as char).collect();
    if first_50 != KNOWN_50 {
        eprintln!("verification FAILED");
        eprintln!("  expected: {}", KNOWN_50);
        eprintln!("  got     : {}", first_50);
        std::process::exit(1);
    }

    println!("Rabinowitz-Wagon spigot: first {} digits of pi", DIGITS);
    println!("(self-check on the first 50 digits: PASSED)");
    println!();

    // Digit one is the integer part 3; the rest are decimals. Fifty per row,
    // grouped in tens, so a row lines up with the 50 checked at the top.
    for (i, d) in digits.iter().take(DIGITS).enumerate() {

        if i > 0 && i % 50 == 0 {
            println!();
        } else if i > 0 && i % 10 == 0 {
            print!(" ");
        }

        print!("{}", (b'0' + d) as char);
    }
    println!();
}
