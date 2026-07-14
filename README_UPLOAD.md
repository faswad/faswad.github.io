# Compact mobile Salat website with Mosul default notice

This package contains the complete personal and Salat websites.

## Salat mobile improvements

- Smaller overall scale on phones
- Reduced title, cards, text, spacing, and button sizes
- Strict horizontal-overflow protection
- Fixed-width containment for CSV, gallery, cards, and grids
- Compact header and navigation
- Cleaner layout on 360 px, 390 px, and larger phones
- No empty strip or background area beside the page

## New visible notice

The page clearly explains in Arabic that:

- The installed application uses Mosul prayer times by default
- Users in other cities can prepare and upload their own CSV file
- Prayer times should be checked before mosque use

The notice appears:

1. Directly below the main hero section
2. In the CSV section
3. In the APK download card

## Upload

1. Extract `FASWAD_COMPACT_MOBILE_MOSUL_NOTE.zip`.
2. Replace the current repository files.
3. Keep the hidden `.git` folder.
4. Commit:
   `Make Salat mobile page compact and add Mosul CSV notice`
5. Push origin.
6. Test:
   - https://faswad.github.io/
   - https://faswad.github.io/salat/


## New APK metadata

The Salat page now displays:

- APK size: 61.1 MB
- SHA-256: `04910759d8f8fe5846f5a1c7979c106bbb643197dabb5a9d974dfa79386af45e`

The actual APK must still be uploaded as a GitHub Release asset using the exact filename `firas-prayer-display.apk`.
