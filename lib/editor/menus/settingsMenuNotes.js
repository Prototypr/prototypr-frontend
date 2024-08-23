export const settingsMenu = [
  {
    type: 'date',
    field:'date',
    label: 'Publish Date',
    initialValue: null,
    onValueChange: (value) => {
      // Handle the date change
      console.log('Date changed:', value);
    },
    description: 'Set a publish date.',
    adminOnly: true,
  },
  {
    type: 'select',
    label: 'Status',
    field:'status',
    initialValue: '',
    onValueChange: (value) => {
      // Handle the post status change
      console.log('Post status changed:', value);
    },
    options: [
      { label: 'Draft', value: 'draft' },
      { label: 'Pending', value: 'pending' },
      { label: 'Publish', value: 'publish' },
    ],
    description: '(draft, pending, or publish)',
    adminOnly: false,
  },
  {
    type: 'url',
    field:'slug',
    label: 'Url',
    initialValue: '',
    onValueChange: (value) => {
      // Handle the value change, e.g., update parent component state
      console.log('Slug changed:', value);
    },
    description: 'Url slug for your post',
    adminOnly: false,
  },
  {
    type: 'number',
    field:'tier',
    label: 'Tier',
    initialValue: '',
    onValueChange: (value) => {
      // Handle the tier change
      console.log('Tier changed:', value);
    },
    description: '(1-5 for quality ranking)',
    adminOnly: true,
  },
];


  export const seoMenu = [
    {
      type: 'text',
      field:'seo.opengraphTitle',
      label: 'Meta Title',
      initialValue: '',
      onValueChange: (value) => {
        // Handle the meta title change
        console.log('Meta title changed:', value);
      },
      description: 'SEO title for the post (max 60 characters)',
    },
    {
      type: 'description',
      field:'seo.metaDesc',
      label: 'Meta Description',
      initialValue: '',
      onValueChange: (value) => {
        // Handle the meta description change
        console.log('Meta description changed:', value);
      },
      description: 'SEO description for the post (max 160 characters)',
    },
  ];