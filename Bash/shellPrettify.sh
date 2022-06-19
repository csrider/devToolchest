#!/usr/bin/env bash
########################################################################################################################
##
##  shellPrettify.sh
## _____________________________________________________________________________________________________________________
##
##  Provides all the shell colors, text formatting, etc. for you to use in making your terminal better looking.
##
##  USAGE:  In your shell script, bring in this script, then use macros wherever you like...
##    source ./shellPrettify.sh    (modify path as needed, of course)             #import shellPrettify
##    printf "Here is ${spBold}${spRed}bold and red${spEnd} but this is not!\n"   #printf example
##    echo -e "Here is ${spBold}${spRed}bold and red${spEnd} but this is not!"    #echo example
##
##  HISTORY:
##    2022-06-11  Chris Rider   Created initial version.
##
##  TO-DO:
##    - Make functions for even easier usage (see very bottom of this file for placeholder for those)
## 
## =====================================================================================================================
##
##  Copyright 2022 Chris Rider (csrider@gmail.com)
##
##  This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not 
##  distributed with this file, you can obtain one at http://mozilla.org/MPL/2.0/.
##
########################################################################################################################


########################################################################################################################
###/ Define control characters
##/  Example bold red color text (raw chars):  echo -e "\033[1;31mHello World\033[0m"

# Raw/plain characters
spCtrlChar_esc='\033'
spCtrlChar_begin='['
spCtrlChar_join=';'                #useful for joining multiple formats and colors
spCtrlChar_end='m'


########################################################################################################################
###/ Define formatting / text-styling characters
##/

# Format-codes
spFmtCode_bright='1'
spFmtCode_bold=$spFmtCodeBright    #just an alias you can use
spFmtCode_dim='2'
spFmtCode_italic='3'
spFmtCode_underline='4'
spFmtCode_blinking='5'             #only works in tty and xterm
spFmtCode_reverse='7'              #invert the foreground and background colors
spFmtCode_hidden='8'               #useful for passwords

# Format-reset-codes
spFmtCodeReset_all='0'
spFmtCodeReset_bright='21'
spFmtCodeReset_dim='22'
spFmtCodeReset_underline='24'
spFmtCodeReset_blink='25'
spFmtCodeReset_reverse='27'
spFmtCodeReset_hidden='28'


########################################################################################################################
###/ Define Colors - 8/16 Colors (Compatible with most terminals)
##/

# Define foreground (text) color codes
spColorFG_default='39'
spColorFG_black='30';       spColorFG_white='97'
spColorFG_red='31';         spColorFG_lightRed='91'
spColorFG_green='32';       spColorFG_lightGreen='92'
spColorFG_yellow='33';      spColorFG_lightYellow='93'
spColorFG_blue='34';        spColorFG_lightBlue='94'
spColorFG_magenta='35';     spColorFG_lightMagenta='95'
spColorFG_cyan='36';        spColorFG_lightCyan='96'
spColorFG_lightGray='37';   spColorFG_darkGray='90'

# Define background color codes
spColorBG_default='49'
spColorBG_black='40';       spColorBG_white='107'
spColorBG_red='41';         spColorBG_lightRed='101'
spColorBG_green='42';       spColorBG_lightGreen='102'
spColorBG_yellow='43';      spColorBG_lightYellow='103'
spColorBG_blue='44';        spColorBG_lightBlue='104'
spColorBG_magenta='45';     spColorBG_lightMagenta='105'
spColorBG_cyan='46';        spColorBG_lightCyan='106'
spColorBG_lightGray='47';   spColorBG_darkGray='100'

# Print a full demonstration:
spDemoColors16() {
  for clbg in {40..47} {100..107} 49 ; do   #background
    for clfg in {30..37} {90..97} 39 ; do   #foreground
      for attr in 0 1 2 4 5 7 ; do          #formatting
        echo -en "\e[${attr};${clbg};${clfg}m ^[${attr};${clbg};${clfg}m \e[0m"
      done; echo
    done
  done
}
#spDemoColors16


########################################################################################################################
###/ Define Colors - 88/256 Colors (Compatible with only some terminals)
##/  Compatibility List: https://misc.flogisoft.com/bash/tip_colors_and_formatting#terminals_compatibility

## FUTURE TO-DO!

## For using one of the 256 colors on the foreground (text color), the control sequence is:
## “<Esc>[38;5;ColorNumberm” where ColorNumber is one of the following colors:
## https://misc.flogisoft.com/_media/bash/colors_format/256_colors_fg.png
#for i in {16..21} {21..16} ; do echo -en "\e[38;5;${i}m#\e[0m" ; done ; echo   # DEMO!

# For using one of the 256 colors on the background, the control sequence is:
# “<Esc>[48;5;ColorNumberm” where ColorNumber is one of the following colors:
# https://misc.flogisoft.com/_media/bash/colors_format/256_colors_bg.png
#for i in {16..21} {21..16} ; do echo -en "\e[48;5;${i}m \e[0m" ; done ; echo   # DEMO!

# Print a full demonstration:
spDemoColors256() {
  for fgbg in 38 48 ; do                                    #foreground/background
    for color in {0..255} ; do                              #colors
      printf "\e[${fgbg};5;%sm  %3s  \e[0m" $color $color   #display the color
      if [ $((($color + 1) % 6)) == 4 ] ; then echo; fi     #display just 6 colors per line
    done; echo
  done
}
#spDemoColors256


########################################################################################################################
###/ Define visual elements
##/

# Border elements
spBorderTop80="╭──────────────────────────────────────────────────────────────────────────────╮"
spBorderTop100="╭──────────────────────────────────────────────────────────────────────────────────────────────────╮"
spBorderTop120="╭──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮"
spBorderBottom80="╰──────────────────────────────────────────────────────────────────────────────╯"
spBorderBottom100="╰──────────────────────────────────────────────────────────────────────────────────────────────────╯"
spBorderBottom120="╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯"
spBorderDiv80="│──────────────────────────────────────────────────────────────────────────────"
spBorderDiv100="│──────────────────────────────────────────────────────────────────────────────────────────────────"
spBorderDiv120="│──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────"
spBorderLeft="│"


########################################################################################################################
###/ Macros
##/  Example:  printf "Here is ${spBOLD}${spRED}bold and red${spEND} but this is not!\n"

# End Sequence (to end a range of formatted style and/or color) --IMPORTANT!
spEnd="${spCtrlChar_esc}${spCtrlChar_begin}${spFmtCodeReset_all}${spCtrlChar_end}"

# Text Styles
spBold="${spCtrlChar_esc}${spCtrlChar_begin}${spFmtCode_bright}${spCtrlChar_end}"
spDim="${spCtrlChar_esc}${spCtrlChar_begin}${spFmtCode_italic}${spCtrlChar_end}"
spItalic="${spCtrlChar_esc}${spCtrlChar_begin}${spFmtCode_italic}${spCtrlChar_end}"
spUnderline="${spCtrlChar_esc}${spCtrlChar_begin}${spFmtCode_underline}${spCtrlChar_end}"
spBlink="${spCtrlChar_esc}${spCtrlChar_begin}${spFmtCode_blinking}${spCtrlChar_end}"
spHidden="${spCtrlChar_esc}${spCtrlChar_begin}${spFmtCode_hidden}${spCtrlChar_end}"

# Text Color
spDefault="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_default}${spCtrlChar_end}"
spBlack="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_black}${spCtrlChar_end}"
spWhite="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_white}${spCtrlChar_end}"
spDkGray="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_darkGray}${spCtrlChar_end}"
spLtGray="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_lightGray}${spCtrlChar_end}"
spDkRed="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_red}${spCtrlChar_end}"
spLtRed="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_lightRed}${spCtrlChar_end}"
spDkGreen="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_green}${spCtrlChar_end}"
spLtGreen="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_lightGreen}${spCtrlChar_end}"
spDkYellow="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_yellow}${spCtrlChar_end}"
spLtYellow="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_lightYellow}${spCtrlChar_end}"
spDkBlue="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_blue}${spCtrlChar_end}"
spLtBlue="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_lightBlue}${spCtrlChar_end}"
spDkMagenta="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_magenta}${spCtrlChar_end}"
spLtMagenta="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_lightMagenta}${spCtrlChar_end}"
spDkCyan="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_cyan}${spCtrlChar_end}"
spLtCyan="${spCtrlChar_esc}${spCtrlChar_begin}${spColorFG_lightCyan}${spCtrlChar_end}"

# Background Color
spDefaultBG="${spCtrlChar_esc}${spCtrlChar_begin}${spColorBG_default}${spCtrlChar_end}"
spBlackBG="${spCtrlChar_esc}${spCtrlChar_begin}${spColorBG_black}${spCtrlChar_end}"
spWhiteBG="${spCtrlChar_esc}${spCtrlChar_begin}${spColorBG_white}${spCtrlChar_end}"
spDkGrayBG="${spCtrlChar_esc}${spCtrlChar_begin}${spColorBG_darkGray}${spCtrlChar_end}"
spLtGrayBG="${spCtrlChar_esc}${spCtrlChar_begin}${spColorBG_lightGray}${spCtrlChar_end}"
spDkRedBG="${spCtrlChar_esc}${spCtrlChar_begin}${spColorBG_red}${spCtrlChar_end}"
spLtRedBG="${spCtrlChar_esc}${spCtrlChar_begin}${spColorBG_lightRed}${spCtrlChar_end}"
spDkGreenBG="${spCtrlChar_esc}${spCtrlChar_begin}${spColorBG_green}${spCtrlChar_end}"
spLtGreenBG="${spCtrlChar_esc}${spCtrlChar_begin}${spColorBG_lightGreen}${spCtrlChar_end}"
spDkYellowBG="${spCtrlChar_esc}${spCtrlChar_begin}${spColorBG_yellow}${spCtrlChar_end}"
spLtYellowBG="${spCtrlChar_esc}${spCtrlChar_begin}${spColorBG_lightYellow}${spCtrlChar_end}"
spDkBlueBG="${spCtrlChar_esc}${spCtrlChar_begin}${spColorBG_blue}${spCtrlChar_end}"
spLtBlueBG="${spCtrlChar_esc}${spCtrlChar_begin}${spColorBG_lightBlue}${spCtrlChar_end}"
spDkMagentaBG="${spCtrlChar_esc}${spCtrlChar_begin}${spColorBG_magenta}${spCtrlChar_end}"
spLtMagentaBG="${spCtrlChar_esc}${spCtrlChar_begin}${spColorBG_lightMagenta}${spCtrlChar_end}"
spDkCyanBG="${spCtrlChar_esc}${spCtrlChar_begin}${spColorBG_cyan}${spCtrlChar_end}"
spLtCyanBG="${spCtrlChar_esc}${spCtrlChar_begin}${spColorBG_lightCyan}${spCtrlChar_end}"


########################################################################################################################
###/ Functions
##/  Simply invoke, passing in text you would like to be formatted.

## FUTURE TO-DO!

