export const generalMenu =({postObject})=> [
    {
      type: 'date',
      label: 'Publish Date',
      initialValue: null,
      adminOnly:false,
      onValueChange: (value) => {
        // Handle the date change
        console.log('Date changed:', value);
      },
      description: 'Set a publish date.',
    },
    {
      type: 'select',
      label: 'Status',
      initialValue: '',
      adminOnly:false,
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
    },
    {
      type: 'url',
      label: 'Url',
      initialValue: '',
      onValueChange: (value) => {
        // Handle the value change, e.g., update parent component state
        console.log('Slug changed:', value);
      },
      description: 'Url slug for your post',
    },
    {
      type: 'number',
      label: 'Tier',
      initialValue: '',
      onValueChange: (value) => {
        // Handle the tier change
        console.log('Tier changed:', value);
      },
      description: '(1-5 for quality ranking)',
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