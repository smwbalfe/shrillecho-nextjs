// Theme entry point
import { extendTheme } from '@chakra-ui/react'

// Global style overrides
import {styles } from '~/lib/theme/styles/styles' 

// // Foundational style overrides
import {borders} from './foundations/borders'

// // Component style overrides
import {Button} from './components/button'

import {fonts} from './fonts/fonts'

export const indexTheme = extendTheme({

    /* Foundational overrides*/
    styles,
    borders,
    fonts: fonts,
    /* Component overrides */
    components: {
        Button
    },

    textStyles: {
        
    }
})
