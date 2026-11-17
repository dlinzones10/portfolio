// Everything personal lives here. Edit this file to change the hero copy,
// links, and role labels across the whole site.

export const profile = {
  name: 'Edlin Muzones',
  headline: ['I build the site,', 'design the brand,', 'and teach the class.'],
  intro:
    'I’m Edlin Muzones, a web developer, graphic designer, and IT instructor at West Visayas State University, Himamaylan City Campus.',
  email: '', // TODO: public contact email
  links: {
    // TODO: add the ones you want shown
    github: '',
    linkedin: '',
    facebook: '',
  },
}

// The three roles. `id` is used by the portfolio filter and the contact tags,
// `color` is the Tailwind colour token for that role.
export const roles = [
  { id: 'dev', label: 'Web development', color: 'dev' },
  { id: 'design', label: 'Graphic design', color: 'design' },
  { id: 'teach', label: 'Teaching and courses', color: 'teach' },
]

export const roleHex = {
  dev: '#56cfc0',
  design: '#ef5f68',
  teach: '#e2b55e',
}
