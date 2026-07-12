# Correct GitHub Pages structure

This package creates two separate websites:

- Personal website: https://faswad.github.io/
- Salat application: https://faswad.github.io/salat/

The CV PDF files are NOT included and there are no CV download buttons.
Information from the CV was used only to write the personal profile.

## Recommended upload method using GitHub Desktop

1. Extract `faswad_correct_personal_and_salat.zip`.
2. Open your cloned `faswad.github.io` repository folder.
3. Delete the current website files and folders inside the repository, but do not delete the hidden `.git` folder.
4. Copy every extracted item into the repository folder.
5. Confirm this exact structure:

   index.html
   assets/
   salat/
     index.html
     assets/

6. In GitHub Desktop, commit with:

   Restore personal site and Salat app structure

7. Click `Push origin`.
8. Wait for the Pages deployment to finish.
9. Test:
   - https://faswad.github.io/
   - https://faswad.github.io/salat/

The APK Release is separate and will not be deleted by replacing website files.
