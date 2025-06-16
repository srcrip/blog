/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.black'),
            '--tw-prose-headings': theme('colors.black'),
            '--tw-prose-links': theme('colors.black'),
            '--tw-prose-bold': theme('colors.black'),
            '--tw-prose-code': theme('colors.black'),
            '--tw-prose-pre-code': theme('colors.black'),
            '--tw-prose-pre-bg': theme('colors.gray.100'),
            maxWidth: 'none',
            lineHeight: '1.6',
            fontSize: '1rem',
            'h1': {
              fontSize: '1.5rem',
              fontWeight: '500',
              marginBottom: '1rem',
              lineHeight: '1.3',
            },
            'h2': {
              fontSize: '1.25rem',
              fontWeight: '500',
              marginTop: '2rem',
              marginBottom: '0.75rem',
              lineHeight: '1.3',
            },
            'h3': {
              fontSize: '1.125rem',
              fontWeight: '500',
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              lineHeight: '1.3',
            },
            'p': {
              marginBottom: '1.25rem',
              lineHeight: '1.7',
            },
            'ul, ol': {
              marginBottom: '1.25rem',
              paddingLeft: '1.5rem',
            },
            'li': {
              marginBottom: '0.25rem',
            },
            'a': {
              textDecoration: 'underline',
              fontWeight: '400',
            },
            'strong': {
              fontWeight: '600',
            },
            'code': {
              backgroundColor: theme('colors.gray.100'),
              color: theme('colors.black'),
              padding: '0.125rem 0.375rem',
              fontSize: '0.875rem',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            'pre': {
              backgroundColor: theme('colors.gray.100'),
              color: theme('colors.black'),
              padding: '1rem',
              borderRadius: '0.375rem',
              overflow: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              fontSize: '0.875rem',
            },
            'blockquote': {
              borderLeftWidth: '3px',
              borderLeftColor: theme('colors.black'),
              paddingLeft: '1rem',
              fontStyle: 'italic',
              marginLeft: '0',
              marginRight: '0',
            },
          }
        }
      })
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
