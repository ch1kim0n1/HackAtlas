/**
 * Component tokens generator
 * Generates semantic tokens for common UI components
 */

const { getBestContrastText } = require('./colors');

function generateComponentTokens(colors, typography, spacing, theme) {
  const lightText = colors.neutral['50'];
  const darkText = colors.neutral['950'];
  const arch = theme.archetype || {};

  const tokens = {
    button: {
      // Primary button
      primary: {
        bg: colors.primary['500'],
        bgHover: colors.primary['600'],
        bgActive: colors.primary['700'],
        text: getBestContrastText(colors.primary['500'], lightText, darkText),
        borderRadius: spacing.borderRadius['md'],
        padding: `${spacing.spacing['2.5']} ${spacing.spacing['6']}`,
        fontSize: typography.fontSize['base'],
        fontWeight: typography.fontWeight['semibold'],
        shadow: spacing.shadows['sm'],
      },
      // Secondary button
      secondary: {
        bg: colors.secondary['500'],
        bgHover: colors.secondary['600'],
        bgActive: colors.secondary['700'],
        text: getBestContrastText(colors.secondary['500'], lightText, darkText),
        borderRadius: spacing.borderRadius['md'],
        padding: `${spacing.spacing['2.5']} ${spacing.spacing['6']}`,
        fontSize: typography.fontSize['base'],
        fontWeight: typography.fontWeight['semibold'],
        shadow: spacing.shadows['sm'],
      },
      // Outline button
      outline: {
        bg: 'transparent',
        bgHover: colors.primary['50'],
        bgActive: colors.primary['100'],
        text: colors.primary['600'],
        border: `2px solid ${colors.primary['500']}`,
        borderRadius: spacing.borderRadius['md'],
        padding: `${spacing.spacing['2.5']} ${spacing.spacing['6']}`,
        fontSize: typography.fontSize['base'],
        fontWeight: typography.fontWeight['semibold'],
      },
      // Ghost button
      ghost: {
        bg: 'transparent',
        bgHover: colors.neutral['100'],
        bgActive: colors.neutral['200'],
        text: colors.neutral['700'],
        borderRadius: spacing.borderRadius['md'],
        padding: `${spacing.spacing['2.5']} ${spacing.spacing['6']}`,
        fontSize: typography.fontSize['base'],
        fontWeight: typography.fontWeight['medium'],
      },
    },
    
    input: {
      base: {
        bg: colors.neutral['50'],
        bgFocus: colors.neutral['50'],
        text: colors.neutral['900'],
        border: `1px solid ${colors.neutral['300']}`,
        borderFocus: `2px solid ${colors.primary['500']}`,
        borderRadius: spacing.borderRadius['md'],
        padding: `${spacing.spacing['2.5']} ${spacing.spacing['4']}`,
        fontSize: typography.fontSize['base'],
        placeholder: colors.neutral['400'],
        shadow: spacing.shadows['sm'],
        shadowFocus: `0 0 0 3px ${colors.primary['100']}`,
      },
      error: {
        border: `2px solid ${colors.error['500']}`,
        shadowFocus: `0 0 0 3px ${colors.error['100']}`,
      },
    },
    
    card: {
      base: {
        bg: colors.neutral['50'],
        border: `1px solid ${colors.neutral['200']}`,
        borderRadius: spacing.borderRadius['lg'],
        padding: spacing.spacing['6'],
        shadow: spacing.shadows['md'],
      },
      elevated: {
        bg: colors.neutral['50'],
        borderRadius: spacing.borderRadius['lg'],
        padding: spacing.spacing['6'],
        shadow: spacing.shadows['xl'],
      },
      outlined: {
        bg: 'transparent',
        border: `2px solid ${colors.neutral['300']}`,
        borderRadius: spacing.borderRadius['lg'],
        padding: spacing.spacing['6'],
      },
    },
    
    badge: {
      primary: {
        bg: colors.primary['100'],
        text: colors.primary['800'],
        borderRadius: spacing.borderRadius['full'],
        padding: `${spacing.spacing['1']} ${spacing.spacing['3']}`,
        fontSize: typography.fontSize['sm'],
        fontWeight: typography.fontWeight['semibold'],
      },
      success: {
        bg: colors.success['100'],
        text: colors.success['800'],
        borderRadius: spacing.borderRadius['full'],
        padding: `${spacing.spacing['1']} ${spacing.spacing['3']}`,
        fontSize: typography.fontSize['sm'],
        fontWeight: typography.fontWeight['semibold'],
      },
      warning: {
        bg: colors.warning['100'],
        text: colors.warning['800'],
        borderRadius: spacing.borderRadius['full'],
        padding: `${spacing.spacing['1']} ${spacing.spacing['3']}`,
        fontSize: typography.fontSize['sm'],
        fontWeight: typography.fontWeight['semibold'],
      },
      error: {
        bg: colors.error['100'],
        text: colors.error['800'],
        borderRadius: spacing.borderRadius['full'],
        padding: `${spacing.spacing['1']} ${spacing.spacing['3']}`,
        fontSize: typography.fontSize['sm'],
        fontWeight: typography.fontWeight['semibold'],
      },
    },
    
    alert: {
      info: {
        bg: colors.info['50'],
        border: `1px solid ${colors.info['200']}`,
        text: colors.info['900'],
        borderRadius: spacing.borderRadius['md'],
        padding: spacing.spacing['4'],
      },
      success: {
        bg: colors.success['50'],
        border: `1px solid ${colors.success['200']}`,
        text: colors.success['900'],
        borderRadius: spacing.borderRadius['md'],
        padding: spacing.spacing['4'],
      },
      warning: {
        bg: colors.warning['50'],
        border: `1px solid ${colors.warning['200']}`,
        text: colors.warning['900'],
        borderRadius: spacing.borderRadius['md'],
        padding: spacing.spacing['4'],
      },
      error: {
        bg: colors.error['50'],
        border: `1px solid ${colors.error['200']}`,
        text: colors.error['900'],
        borderRadius: spacing.borderRadius['md'],
        padding: spacing.spacing['4'],
      },
    },
    
    navigation: {
      nav: {
        bg: colors.neutral['900'],
        text: colors.neutral['100'],
        textHover: colors.primary['300'],
        borderBottom: `1px solid ${colors.neutral['800']}`,
        padding: `${spacing.spacing['4']} ${spacing.spacing['6']}`,
        shadow: spacing.shadows['md'],
      },
      link: {
        text: colors.primary['600'],
        textHover: colors.primary['700'],
        textActive: colors.primary['800'],
        textVisited: colors.primary['900'],
        fontSize: typography.fontSize['base'],
        fontWeight: typography.fontWeight['medium'],
      },
    },

    modal: {
      overlay: {
        bg: 'rgba(0, 0, 0, 0.5)',
        zIndex: spacing.zIndex['50'],
      },
      container: {
        bg: colors.neutral['50'],
        borderRadius: spacing.borderRadius['xl'],
        padding: spacing.spacing['8'],
        shadow: spacing.shadows['2xl'],
        maxWidth: '32rem',
        width: '100%',
        zIndex: spacing.zIndex['50'],
      },
      header: {
        fontSize: typography.fontSize['xl'],
        fontWeight: typography.fontWeight['bold'],
        text: colors.neutral['900'],
        borderBottom: `1px solid ${colors.neutral['200']}`,
        paddingBottom: spacing.spacing['4'],
        marginBottom: spacing.spacing['4'],
      },
      body: {
        fontSize: typography.fontSize['base'],
        text: colors.neutral['700'],
      },
      footer: {
        borderTop: `1px solid ${colors.neutral['200']}`,
        paddingTop: spacing.spacing['4'],
        marginTop: spacing.spacing['4'],
        gap: spacing.spacing['3'],
      },
    },

    tooltip: {
      base: {
        bg: colors.neutral['900'],
        text: colors.neutral['50'],
        borderRadius: spacing.borderRadius['md'],
        padding: `${spacing.spacing['1.5']} ${spacing.spacing['3']}`,
        fontSize: typography.fontSize['sm'],
        fontWeight: typography.fontWeight['medium'],
        shadow: spacing.shadows['lg'],
        zIndex: spacing.zIndex['40'],
        maxWidth: '16rem',
      },
      arrow: {
        bg: colors.neutral['900'],
        size: '6px',
      },
      light: {
        bg: colors.neutral['50'],
        text: colors.neutral['900'],
        border: `1px solid ${colors.neutral['200']}`,
        borderRadius: spacing.borderRadius['md'],
        padding: `${spacing.spacing['2']} ${spacing.spacing['4']}`,
        fontSize: typography.fontSize['sm'],
        shadow: spacing.shadows['md'],
      },
    },

    table: {
      container: {
        borderRadius: spacing.borderRadius['lg'],
        border: `1px solid ${colors.neutral['200']}`,
        overflow: 'hidden',
      },
      header: {
        bg: colors.neutral['100'],
        text: colors.neutral['700'],
        fontSize: typography.fontSize['sm'],
        fontWeight: typography.fontWeight['semibold'],
        padding: `${spacing.spacing['3']} ${spacing.spacing['4']}`,
        borderBottom: `2px solid ${colors.neutral['200']}`,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      },
      cell: {
        padding: `${spacing.spacing['3']} ${spacing.spacing['4']}`,
        fontSize: typography.fontSize['base'],
        text: colors.neutral['900'],
        borderBottom: `1px solid ${colors.neutral['100']}`,
      },
      rowHover: {
        bg: colors.primary['50'],
      },
      rowStriped: {
        bg: colors.neutral['50'],
      },
    },
  };

  // Apply archetype overrides
  if (arch.showBorders) {
    const borderWidth = arch.borderWidth || '1px';
    const borderColor = colors.neutral['950'];

    // Add borders to keys that commonly have them or should have them in neobrutalism
    ['primary', 'secondary'].forEach(type => {
      tokens.button[type].border = `${borderWidth} solid ${borderColor}`;
    });
    tokens.card.base.border = `${borderWidth} solid ${borderColor}`;
    tokens.card.elevated.border = `${borderWidth} solid ${borderColor}`;
    tokens.modal.container.border = `${borderWidth} solid ${borderColor}`;
    tokens.table.container.border = `${borderWidth} solid ${borderColor}`;
  }

  if (arch.blur) {
    tokens.card.base.backdropBlur = arch.blur;
    tokens.card.elevated.backdropBlur = arch.blur;
    tokens.card.base.bgOpacity = arch.opacity || 1;
    tokens.modal.container.backdropBlur = arch.blur;
    tokens.modal.container.bgOpacity = arch.opacity || 1;
  }

  return tokens;
}

module.exports = {
  generateComponentTokens,
};
