<<<<<<< HEAD
/**
 * Typography used in theme
 * @param {JsonObject} theme theme customization object
 */

export default function themeTypography(theme) {
    return {
        fontFamily: theme?.customization?.fontFamily,
        h6: {
            fontWeight: 500,
            color: "#495057",
            fontSize: '13px'
        },
        h5: {
            fontSize: '14px',
            color: "#495057",
            fontWeight: 400,
        },
        h4: {
            fontSize: '15px',
            color: "#495057",
            fontWeight: 400
        },
        h3: {
            fontSize: '16px',
            color: "#495057",
            fontWeight: 600
        },
        h2: {
            fontSize: '1.5rem',
            color: "#495057",
            fontWeight: 700
        },
        h1: {
            fontSize: '2.125rem',
            color: "#495057",
            fontWeight: 700
        },
        subtitle1: {
            fontSize: '14px',
            fontWeight: 400,
            color: "#495057"
        },
        subtitle2: {
            fontSize: '14px',
            fontWeight: 400,
            color: "#495057"
        },
        caption: {
            fontSize: '0.75rem',
            color: "#495057",
            fontWeight: 400,
            padding: 0
        },
        body1: {
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '1.334em',
            color: "#495057"
        },
        body2: {
            letterSpacing: '0em',
            fontWeight: 400,
            lineHeight: '1.5em',
            color: "495057"
        },
        button: {
            textTransform: 'capitalize',

        },
        customInput: {
            marginTop: 1,
            marginBottom: 1,
            '& > label': {
                top: 23,
                left: 0,
                color: theme.grey500,
                '&[data-shrink="false"]': {
                    top: 5
                }
            },
            '& > div > input': {
                padding: '30.5px 14px 11.5px !important'
            },
            '& legend': {
                display: 'none'
            },
            '& fieldset': {
                top: 0
            }
        },
        mainContent: {

        },
        menuCaption: {
            fontSize: '12px',
            fontWeight: 700,
            color: "#B9B9C3",
            padding: '6px',
            textTransform: 'uppercase',

        },
        subMenuCaption: {
            fontSize: '0.6875rem',
            fontWeight: 500,
            color: "#495057",
            textTransform: 'capitalize'
        },
        commonAvatar: {
            cursor: 'pointer',
            borderRadius: '8px'
        },
        smallAvatar: {
            width: '22px',
            height: '22px',
            fontSize: '1rem'
        },
        mediumAvatar: {
            width: '34px',
            height: '34px',
            fontSize: '1.2rem'
        },
        largeAvatar: {
            width: '44px',
            height: '44px',
            fontSize: '1.5rem'
        }
    };
}
=======
/**
 * Typography used in theme
 * @param {JsonObject} theme theme customization object
 */

export default function themeTypography(theme) {
    return {
        fontFamily: theme?.customization?.fontFamily,
        h6: {
            fontWeight: 500,
            color: "#505050",
            fontSize: '14px'
        },
        h5: {
            fontSize: '15px',
            color: "#505050",
            fontWeight: 500,
        },
        h4: {
            fontSize: '1rem',
            color: "#505050",
            fontWeight: 600
        },
        h3: {
            fontSize: '1.25rem',
            color: "#505050",
            fontWeight: 600
        },
        h2: {
            fontSize: '1.5rem',
            color: "#505050",
            fontWeight: 700
        },
        h1: {
            fontSize: '2.125rem',
            color: "#505050",
            fontWeight: 700
        },
        subtitle1: {
            fontSize: '0.875rem',
            fontWeight: 500,
            color: theme.textDark
        },
        subtitle2: {
            fontSize: '0.75rem',
            fontWeight: 400,
            color: theme.darkTextSecondary
        },
        caption: {
            fontSize: '0.75rem',
            color: theme.darkTextSecondary,
            fontWeight: 400
        },
        body1: {
            fontSize: '15px',
            fontWeight: 400,
            lineHeight: '1.334em'
        },
        body2: {
            letterSpacing: '0em',
            fontWeight: 400,
            lineHeight: '1.5em',
            color: theme.darkTextPrimary
        },
        button: {
            textTransform: 'capitalize'
        },
        customInput: {
            marginTop: 1,
            marginBottom: 1,
            '& > label': {
                top: 23,
                left: 0,
                color: theme.grey500,
                '&[data-shrink="false"]': {
                    top: 5
                }
            },
            '& > div > input': {
                padding: '30.5px 14px 11.5px !important'
            },
            '& legend': {
                display: 'none'
            },
            '& fieldset': {
                top: 0
            }
        },
        mainContent: {
            backgroundColor: theme.background,
            width: '100%',
            minHeight: 'calc(100vh - 88px)',
            flexGrow: 1,
            padding: '20px',
            marginTop: '88px',
            marginRight: '20px',
            borderRadius: `${theme?.customization?.borderRadius}px`
        },
        menuCaption: {
            fontSize: '12px',
            fontWeight: 700,
            color: "#B9B9C3",
            padding: '6px',
            textTransform: 'uppercase',
            marginTop: '10px'
        },
        subMenuCaption: {
            fontSize: '0.6875rem',
            fontWeight: 500,
            color: theme.darkTextSecondary,
            textTransform: 'capitalize'
        },
        commonAvatar: {
            cursor: 'pointer',
            borderRadius: '8px'
        },
        smallAvatar: {
            width: '22px',
            height: '22px',
            fontSize: '1rem'
        },
        mediumAvatar: {
            width: '34px',
            height: '34px',
            fontSize: '1.2rem'
        },
        largeAvatar: {
            width: '44px',
            height: '44px',
            fontSize: '1.5rem'
        }
    };
}
>>>>>>> a0d7b77f029b977fd804aed91e17ffad3b5bf592
