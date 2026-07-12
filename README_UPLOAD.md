# Correct final structure for faswad.github.io

This package contains two separate websites:

1. Personal website:
   https://faswad.github.io/

2. Salat application website:
   https://faswad.github.io/salat/

The personal website does NOT contain an APK download button.
It only links visitors to the Salat website.

The APK download appears only inside:
https://faswad.github.io/salat/

## Required repository structure

index.html                 Personal homepage
assets/                    Personal website assets
salat/index.html           Salat application homepage
salat/assets/              Salat application assets

## Upload using GitHub Desktop

1. Extract `faswad_personal_and_salat_separated.zip`.
2. Open the local folder cloned from `faswad/faswad.github.io`.
3. Delete the old website files and folders, but do not delete the hidden `.git` folder.
4. Copy every extracted item into the repository folder.
5. Confirm that `salat/index.html` exists.
6. Commit with:
   Separate personal website and Salat application
7. Click `Push origin`.
8. Wait for the GitHub Pages deployment.
9. Test:
   https://faswad.github.io/
   https://faswad.github.io/salat/

Do not upload the personal `index.html` inside the `salat` folder.
Do not create a second nested `salat/salat` folder.
The CV PDF files are not included.
