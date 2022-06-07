########################################################################################################################
##
##  Bash Snippets - Code Page / Bytes / Encodings / etc.
## _____________________________________________________________________________________________________________________
##
##  A collection of various codepage-related stuff (hex, unicode, etc.).
##
##  Note: This script, if mistakenly executed, will immediately exit and abort.
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
##/ Assignments
#/

HEX_A='\x41'        # Assign hex value of 'A' to variable


########################################################################################################################
##/ Output Printing
#/

echo -e "$HEX_A"    # Print out the glyph for 0x41 (assigned above), which is 'A'
echo -e '\U1f130'   # Convert hex 0x1f130 to glyph '🄰'
echo -e '\x30'      # Convert hex 0x0030 to glyph '0'