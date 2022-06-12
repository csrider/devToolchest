########################################################################################################################
##
##  Bash Snippets - Loops
## _____________________________________________________________________________________________________________________
##
##  A collection of various loop snippets and notes.
##
##  Note: This script, if mistakenly executed, will immediately exit and abort.
##
##  Note: Many of them are placed into functions just to block/scope them.
##        Otherwise, if they were commented out, it would be hard to read.
## 
## =====================================================================================================================
##
##  Copyright 2022 Chris Rider (csrider@gmail.com)
##
##  This Source Code Form is subject to the terms of the Mozilla Public License v. 2.0. If a copy of the MPL was not 
##  distributed with this file, you can obtain one at http://mozilla.org/MPL/2.0/.
##
########################################################################################################################
echo "This file is not meant to be executed! Exiting";  exit 1


########################################################################################################################
##/ Loops
#/

## Loop through an associative array
loop_for_array01() {
  declare -A LETTERS_BLACK_SQUARE_CAP
  LETTERS_BLACK_SQUARE_CAP['A']='\U1f130'   # Unicode UTF-8 hex for the glyph: 🄰
  LETTERS_BLACK_SQUARE_CAP['B']='\U1f131'   # Unicode UTF-8 hex for the glyph: 🄱
  LETTERS_BLACK_SQUARE_CAP['C']='\U1f132'   # Unicode UTF-8 hex for the glyph: 🄲

  # Use braces {} to refer to element value, avoiding issues with pathname expansion.
  for i in "${LETTERS_BLACK_SQUARE_CAP[@]}" # The '@' means all elements of the array
  do
    echo -e $i
  done

  #Output:
  # 🄰
  # 🄱
  # 🄲
}
